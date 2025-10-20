/* eslint-disable react-hooks/rules-of-hooks */
'use client';
import { Form, Upload, Modal, message } from "antd";
import axios from "axios";
import Image from "next/image";
import { useState } from "react";


const MultipleImageInput = (props) => {
  let max = props.max || 1;
  let name = props.name || "img";
  let label = props.label;
  let listType = props.listType || "picture-card";

  return (
    <div className="">
      <Form.Item
        name={name}
        label={label}
        rules={[
          {
            required: props?.required,
            message: `Please upload ${!!label ? label : props?.video ? "a video" : "an image"}`,
          }
        ]}
      >
        <Input
          max={max}
          listType={listType}
          pdf={props?.pdf}
          noWebp={props?.noWebp}
          video={props?.video}
        />
      </Form.Item>
    </div>
  );
};

const Input = ({ value, onChange, listType, max, noWebp, pdf, video }) => {
  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewImage, setPreviewImage] = useState("");

  const handleCancel = () => setPreviewVisible(false);

  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }

    setPreviewImage(file?.url || file?.preview);
    setPreviewVisible(true);
  };

  const handleChange = ({ fileList }) => {
    onChange(fileList);
  };

  const handleRemove = async (file) => {
    try {
        console.log("file?.url",file?.url)
      // যদি file.url থাকে এবং সেটা cloudinary এর হয়
      if (file?.url && file.url.includes("res.cloudinary.com")) {
        // Payload তৈরি করা
        const payload = { url: file.url };
  
        // API কল
        const res = await axios.post(
          "http://localhost:4000/api/v1/auth/deleteImage",
          payload,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
  
        if (res.data?.success) {
          message.success("Image deleted successfully!");
          return true;
        } else {
          message.error("Failed to delete image from server.");
          return false;
        }
      } else {
        // লোকাল file হলে API না ডেকে শুধু success রিটার্ন দাও
        message.info("Local image removed only from preview.");
        return true;
      }
    } catch (error) {
      console.error("Image deletion error:", error);
      message.error("Failed to delete image.");
      return false; // Prevent removal in case of API failure
    }
  };

  return (
    <>
      <Upload
        accept={`image/png, image/gif, image/jpeg, ${!noWebp && "image/webp"}${pdf && ",application/pdf"}${video && ",video/mp4, application/mpeg, video/*"}`}
        listType={listType}
        onPreview={handlePreview}
        fileList={value || []}
        onChange={handleChange}
        onRemove={handleRemove}
        maxCount={max}
       className={value?.length != max ? "" : "hide-upload"} // ✅ Updated condition
>
  {value?.length != max && <div>+ Upload</div> }
      </Upload>
      <Modal
        open={previewVisible}
        footer={null}
        onCancel={handleCancel}
        title={"Preview"}
      >
        {video && previewImage.endsWith(".mp4") && (
          <video width="100%" height="600" controls>
            <source src={previewImage} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        )}
        {pdf && previewImage.endsWith(".pdf") && (
          <embed
            src={previewImage}
            type="application/pdf"
            width="100%"
            height="600px"
          />
        )}
        {!video && !pdf && (
          <Image alt="example" width={1000} height={600} src={previewImage} />
        )}
      </Modal>
    </>
  );
};

export default MultipleImageInput;

function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
}

