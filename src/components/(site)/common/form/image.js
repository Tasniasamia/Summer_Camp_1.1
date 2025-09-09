import React, { useState, useEffect } from "react";
import { Upload, Image, Spin } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import toast from "react-hot-toast";

const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

const ImageInput = ({
  initialValue = [],
  max = 1,
  name = "file",
  onUploadSuccess,
}) => {
  const [fileList, setFileList] = useState([]);
  const [loading,setLoading]=useState(false);
  const [loading2,setLoading2]=useState(false);

  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [responseImage, setResonseImage] = useState({});
  console.log("initialValue", initialValue);
  // Set initial value only once
  useEffect(() => {
    if (initialValue && initialValue.length > 0) {
      setFileList(initialValue);
      if (initialValue[0]?.url) {
        setResonseImage(initialValue[0]);
      }
    }
  }, [initialValue[0]?.url]); // ✅ only on mount

  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
  };

  const handleChange = async ({ fileList: newFileList }) => {
    setLoading(true);
    setFileList(newFileList);
    if (newFileList.length > 0) {
      const file = newFileList[0].originFileObj;
      if (file) {
        if (uploadedFiles.includes(file.name)) {
          setLoading(false);
          toast.success("এই ফাইলটি ইতিমধ্যে আপলোড করা হয়েছে।");
          return;
        }

        const formData = new FormData();
        formData.append("file", file);

        try {
          if (newFileList[0]?.status !== "uploading") {
            setLoading(true);
            const res = await fetch("/api/upload", {
              method: "POST",
              body: formData,
            });
            const image = await res.json();

            if (res.ok) {
              setLoading(false);
              toast.success("ছবি সফলভাবে আপলোড হয়েছে!");
              setUploadedFiles((prev) => [...prev, file.name]);
              setResonseImage(image);
              console.log("image file", image);
              // parent কে image url পাঠানো হচ্ছে
              if (onUploadSuccess) {
                onUploadSuccess(image);
              }
            } else {
              setLoading(false);
              toast.error("ছবি আপলোডে সমস্যা হয়েছে!");
            }
          }
        } catch (err) {
          setLoading(false);
          toast.error("সার্ভারে সমস্যা হয়েছে!");
        }
        finally{
          setLoading(false);

        }
      }
    } else {
      // যদি user remove করে
      setResonseImage({});
      if (onUploadSuccess) onUploadSuccess(null);
    }
  };

  const handleDelete = async () => {
    setLoading2(true);
    if (!responseImage.public_id) {
      
      toast.error("ডিলিট করার জন্য ফাইল পাওয়া যায়নি!");
      setLoading2(false);
      return;
    }
    try {
      const res = await fetch("/api/upload", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ public_id: responseImage.public_id }),
      });

      if (res.ok) {
        console.log("res",res);
       
        toast.success("ছবি সফলভাবে ডিলিট হয়েছে!");
        setFileList([]);
        setResonseImage({});
        if (onUploadSuccess) onUploadSuccess(null);
        setLoading2(false);
      } else {
        setLoading2(false);
        toast.error("ডিলিট করতে সমস্যা হয়েছে!");
      }
    } catch (error) {
      setLoading2(false);
      toast.error("সার্ভারে সমস্যা হয়েছে!");
    }
    finally{
      setLoading2(false);
    }
  };


  //  if(loading){
  //   return <Spin fullscreen/>
  //  }
   if(loading2){
    return <Spin fullscreen/>
   }
  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  return (
    <>
      <Upload
        name={name}
        listType="picture-card"
        fileList={fileList}
        onPreview={handlePreview}
        onChange={handleChange}
        multiple={max > 1}
        maxCount={max}
        onRemove={handleDelete}
      >
        {fileList.length >= max ? null : uploadButton}
      </Upload>
      <Image
        style={{ display: "none" }}
        preview={{
          visible: previewOpen,
          src: previewImage,
          onVisibleChange: (visible) => setPreviewOpen(visible),
        }}
      />
    </>
  );
};

export default ImageInput;
