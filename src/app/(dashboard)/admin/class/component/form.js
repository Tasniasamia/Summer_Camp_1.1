"use client";
import React, { useState, useRef, useEffect } from "react";
import {
  Form,
  Input,
  InputNumber,
  Select,
  TimePicker,
  DatePicker,
  Switch,
} from "antd";
import JoditEditor from "jodit-react";
import ImageInput from "@/components/(site)/common/form/image";
import { useFetch, useMutationAction } from "@/helpers/utils/hooks";
import toast from "react-hot-toast";
import dayjs from "dayjs";

const { Option } = Select;

const categories = [
  { label: "Water", value: "water" },
  { label: "Mountain", value: "mountain" },
  { label: "Yoga", value: "yoga" },
  { label: "Adventure", value: "adventure" },
  { label: "Cycling", value: "cycling" },
];

const daysOptions = [
  { label: "Monday", value: "Mon" },
  { label: "Tuesday", value: "Tue" },
  { label: "Wednesday", value: "Wed" },
  { label: "Thursday", value: "Thu" },
  { label: "Friday", value: "Fri" },
  { label: "Saturday", value: "Sat" },
  { label: "Sunday", value: "Sun" },
];

const ClassForm = ({ id }) => {
  const [form] = Form.useForm();
  const editor = useRef(null);
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const updateClass = useMutationAction("update", "/class", "updateClass");
  const createClass = useMutationAction("create", "/class", "createClass");
  const { data: users, isLoading, error } = useFetch("user", "/getUsers");
  console.log("id here", id);
  const {
    data: getClass,
    isLoading: loading2,
    error: err,
  } = useFetch("class", `/class?id=${id}`);
  console.log("getClass data", getClass);

  const instructor = users?.filter((i) => i?.role === "instructor");
  console.log("user data", instructor);

  useEffect(() => {
    if (getClass) {
      form.setFieldsValue({
        ...getClass,
        name: getClass?.name,
        category: getClass?.category,
        price: getClass?.price,
        instructor: getClass?.instructorId,
        description: getClass?.description,
        duration: getClass?.duration,
        time: getClass?.time ? dayjs(getClass.time) : null,
        place: getClass?.place,
        sit: getClass?.sit,
        enrollment: getClass?.enrollment,
        status: getClass?.status,
        createdAt: getClass?.createdAt ? dayjs(getClass.createdAt) : null,
        rate: getClass?.rate,
        days: getClass?.days,
        // image: getClass?.image
        //   ? [
        //       {
        //         uid: "-1",
        //         name: "image.png",
        //         status: "done",
        //         url: getClass?.image?.url,
        //         public_id: getClass?.image?.public_id,
        //       },
        //     ]
        //   : [],
      });

      setDescription(getClass?.description || "");
    }
  }, [getClass, form]);

  const onFinish = async (values) => {
    setLoading(true);
    try {
      const formattedValues = {
        ...values,
        time: values?.time,
        createdAt: values?.createdAt,
        description,
        instructor: {
          connect: { id: values?.instructor },
        },
      };
      console.log("formattedValues", formattedValues);
      const mutation = id ? updateClass : createClass;
      const res = await mutation.mutateAsync(
        id ? { id, ...formattedValues } : formattedValues
      );
      if (res?.success) {
        toast.success(
          id ? "Class updated successfully" : "Class created successfully"
        );
       !id &&  form.resetFields();
      } else {
        toast.error(res?.msg || "Something went wrong!");
      }
    } catch (e) {
      console.error("catch error", e.message);
      toast.error(e.message || "Unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gradient-to-br from-orange-50 via-yellow-50 to-amber-50 p-6 sm:p-4 shadow-2xl">
      <Form form={form} layout="vertical" onFinish={onFinish}>
        <Form.Item name="image" label="Profile Picture">
          <ImageInput
            max={1}
            name="image"
            initialValue={
              getClass?.image
                ? [
                    {
                      uid: "-1",
                      name: "image.png",
                      status: "done",
                      url: getClass?.image?.url,
                      public_id: getClass?.image?.public_id,
                    },
                  ]
                : []
            }
            onUploadSuccess={(imageObj) =>
              form.setFieldValue("image", imageObj)
            }
          />
        </Form.Item>

        <Form.Item
          label="Name"
          name="name"
          rules={[{ required: true, message: "Please input the class name" }]}
        >
          <Input placeholder="Enter class name" />
        </Form.Item>
        <Form.Item
          label="Category"
          name="category"
          rules={[{ required: true, message: "Please select a category" }]}
        >
          <Select
            placeholder="Select category"
            options={categories}
            allowClear
          />
        </Form.Item>
        <Form.Item label="Price" name="price" required>
          <InputNumber min={0} max={5} style={{ width: "100%" }} />
        </Form.Item>

        <Form.Item
          label="Instructor"
          name="instructor"
          rules={[{ required: true, message: "Please select an instructor" }]}
        >
          <Select
            placeholder="Select instructor"
            options={instructor?.map((i) => {
              return { label: i?.name, value: i?.id };
            })}
          />
        </Form.Item>
        <Form.Item label="Rate" name="rate">
          <InputNumber min={0} max={5} step={0.1} style={{ width: "100%" }} />
        </Form.Item>

        <Form.Item label="Description" name="description">
          <JoditEditor
            ref={editor}
            value={description}
            tabIndex={1}
            onBlur={(newContent) => setDescription(newContent)}
            onChange={() => {}}
          />
        </Form.Item>

        <Form.Item
          label="Duration"
          name="duration"
          rules={[{ required: true, message: "Please input the duration" }]}
        >
          <Input placeholder="e.g. 2 hours" />
        </Form.Item>

        <Form.Item
          label="Days"
          name="days"
          rules={[{ required: true, message: "Please select days" }]}
        >
          <Select
            mode="multiple"
            placeholder="Select days"
            options={daysOptions}
            allowClear
          />
        </Form.Item>

        <Form.Item
          label="Time"
          name="time"
          rules={[{ required: true, message: "Please select time" }]}
        >
          <TimePicker format="HH:mm" style={{ width: "100%" }} />
        </Form.Item>

        <Form.Item
          label="Place"
          name="place"
          rules={[{ required: true, message: "Please input the place" }]}
        >
          <Input placeholder="Enter place" />
        </Form.Item>

        <Form.Item
          label="Create Date"
          name="createdAt"
          rules={[{ required: true, message: "Please select create date" }]}
        >
          <DatePicker style={{ width: "100%" }} />
        </Form.Item>

        <Form.Item label="Seats" name="sit">
          <InputNumber min={1} style={{ width: "100%" }} />
        </Form.Item>

        <Form.Item
          label="Enrollment"
          name="enrollment"
          rules={[{ required: true, message: "Please input enrollment count" }]}
        >
          <InputNumber min={0} style={{ width: "100%" }} />
        </Form.Item>

        <Form.Item label="Status" name="status" valuePropName="checked">
          <Switch defaultChecked={true} />
        </Form.Item>

        <button
          type="submit"
          className="!cursor-pointer w-full text-white h-12 rounded-lg 
             bg-gradient-to-r from-orange-500 to-amber-500 border-0 
             hover:from-yellow-600 hover:to-orange-600 font-semibold 
             text-lg shadow-lg"
        >
          {loading ? "Loading..." : "Save"}
        </button>
      </Form>
    </div>
  );
};

export default ClassForm;
