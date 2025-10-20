"use client";
import { useEffect, useState } from "react";
import {
  Form,
  Input,
  Card,
  Tabs,
  Row,
  Col,
  Space,
} from "antd";
import { FaUser, FaEnvelope, FaPhone, FaLock, FaCamera } from "react-icons/fa";
import ImageInput from "@/components/(site)/common/form/image";
import { useAuth } from "@/helpers/context/authContext";
import toast from "react-hot-toast";
import { useFetch, useMutationAction } from "@/helpers/utils/hooks";
import UserDashboardSkeleton from "@/components/(site)/skeleton/dashboardSkeleton";
import MultipleImageInput from "@/components/(site)/common/form/multipleImage";
const { TextArea } = Input;

export default function FormsPage() {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [passwordLoading, setPasswordLoading] = useState(false);
  const {
    currentUser,
    signup,
    signin,
    signout,
    resetPassword,
    profileUpdate,
    changePassword,
  } = useAuth();
  // const { data, isLoading, error } = useFetch("profile", "/user");
  /*my code*/
  const [data,setData]=useState({});
  useEffect(()=>{
    (async()=>{
    const fetchData=await fetch('http://localhost:4000/api/v1/auth/profile');
    const res=await fetchData.json();
    setData(res?.data);
    })()
  },[])
  console.log("fetchData", data);
    /*my code*/

  useEffect(() => {
      /*my code*/

    if (data) {
      form.setFieldsValue({
        name: data?.name || "",
        email: data?.email || "",
        phone: data?.phone_number || "",
        address: data?.address || "",
        id: data?.id,

        image: data?.image
          ? [
              {
                uid: "-1",
                name: "image.png",
                status: "done",
                url: data.image,
              },
            ]
          : [],
      });

    }
      /*my code*/



    // if (data?.data) {
    //   form.setFieldsValue({
    //     name: data?.data?.name || "",
    //     email: data?.data?.email || "",
    //     phone_number: data?.data?.phone_number || "",
    //     address: data?.data?.address || "",
    //     id: data?.data?.id,
    //     image: data?.data?.image
    //       ? [
    //           {
    //             uid: "-1",
    //             name: "image.png",
    //             status: "done",
    //             url: data.data.image.url,
    //             public_id: data.data.image.public_id,
    //           },
    //         ]
    //       : [],
    //   });
    // }
  }, [data, form]);
  // const updateSetting = useMutationAction("update", "/user", "settings");

  // Profile form submission
  const onProfileFinish = async (values) => {
    console.log("Profile form values:", values);
    setLoading(true);
  
    try {
      // 🔹 FormData তৈরি (image থাকলে form-data পাঠাতে হবে)
      const formData = new FormData();
  
      // text fields যোগ করো
      formData.append("id", values.id);
      formData.append("name", values.name);
      formData.append("email", values.email);
      formData.append("phone", values.phone_number);
      formData.append("address", values.address);
      formData.append('password','12345678')
  
      // 🔹 image থাকলে সেটাও পাঠাও
      if (values.image && values.image.length > 0) {
        const imageFile = values.image[0]?.originFileObj; // Ant Design upload থেকে file object নেওয়া
        if (imageFile) {
          formData.append("image", imageFile);
        }
      }
  
      // 🔹 API call
      const res = await fetch("http://localhost:4000/api/v1/auth/profile", {
        method: "PUT", // backend route অনুযায়ী
        body: formData,
      });
  
      const result = await res.json();
  
      if (res.ok) {
        toast.success("Profile updated successfully!");
        console.log("✅ Updated Profile:", result);
      } else {
        toast.error(result?.message || "Failed to update profile");
        console.error("❌ Update error:", result);
      }
    } catch (error) {
      console.error("Update failed:", error);
      toast.error("Something went wrong while updating profile");
    } finally {
      setLoading(false);
    }
  };
  

  // Password form submission
  const onPasswordFinish = async (values) => {
    setPasswordLoading(true);
    try {
      await resetPassword(values?.email);
      toast.success("Check email , reset your password");
    } catch (error) {
      toast.error("Failed to change password");
    } finally {
      setPasswordLoading(false);
    }
  };

  const ProfileForm = () => (
    <Card title="Profile Information" className="w-full">
      <Form form={form} layout="vertical" onFinish={onProfileFinish}>
        <Row gutter={24}>
          <Col xs={24} md={8}>
          <MultipleImageInput
            label="Card Image"
            name="image"
            
          />
            {/* <Form.Item name="image" label="Profile Picture">
              <ImageInput
                max={1}
                name="image"
                initialValue={
                  data?.data?.image
                    ? [
                        {
                          uid: "-1",
                          name: "image.png",
                          status: "done",
                          url: data.data.image.url,
                          public_id: data.data.image.public_id,
                        },
                      ]
                    : []
                }
                onUploadSuccess={(imageObj) =>
                  form.setFieldValue("image", imageObj)
                }
              />
            </Form.Item> */}
          </Col>
          <Form.Item name="id" hidden>
            <Input autoComplete="off" />
          </Form.Item>
          <Col xs={24} md={16}>
            <Row gutter={16}>
              <Col xs={24} md={12}>
                <Form.Item
                  label="Full Name"
                  name="name"
                  rules={[
                    { required: true, message: "Please enter your name!" },
                    { min: 2, message: "Name must be at least 2 characters!" },
                  ]}
                >
                  <Input
                    prefix={<FaUser className="w-4 h-4" />}
                    placeholder="Enter your full name"
                    size="large"
                  />
                </Form.Item>
              </Col>

              <Col xs={24} md={12}>
                <Form.Item
                  label="Email Address"
                  name="email"
                  rules={[
                    { required: true, message: "Please enter your email!" },
                    { type: "email", message: "Please enter a valid email!" },
                  ]}
                >
                  <Input
                    prefix={<FaEnvelope className="w-4 h-4" />}
                    placeholder="Enter your email"
                    size="large"
                    disabled={true}
                   />
                </Form.Item>
              </Col>
            </Row>

            <Form.Item
              label="Phone Number"
              name="phone_number"
              rules={[
                { required: true, message: "Please enter your phone number!" },
                {
                  pattern: /^[0-9+\-\s()]+$/,
                  message: "Please enter a valid phone number!",
                },
              ]}
            >
              <Input
                prefix={<FaPhone className="w-4 h-4" />}
                placeholder="Enter your phone number"
                size="large"
              />
            </Form.Item>

            <Form.Item
              label="Address"
              name="address"
              rules={[
                { required: true, message: "Please enter your address!" },
                { min: 10, message: "Address must be at least 10 characters!" },
              ]}
            >
              <TextArea
                placeholder="Enter your full address"
                rows={3}
                size="large"
              />
            </Form.Item>
          </Col>
        </Row>

        <Form.Item className="mb-0 pt-6">
          <Space>
            <button
              type="primary"
              htmlType="submit"
              className="w-full text-white h-12 rounded-lg bg-gradient-to-r from-orange-500 to-amber-500 border-0 hover:from-yellow-600 hover:to-orange-600 font-semibold text-base px-4 shadow-lg"
            >
              {" "}
              Update Profile
            </button>
            <button
              type="primary"
              htmlType="submit"
              onClick={() => form.resetFields()}
              className="w-full px-4  cursor-pointer h-12 rounded-lg border border-gray-200 hover:from-yellow-600 hover:to-orange-600 font-semibold text-base shadow-lg"
            >
              {" "}
              Reset
            </button>
          </Space>
        </Form.Item>
      </Form>
    </Card>
  );

  const PasswordForm = () => (
    <Card title="Change Password" className="w-full">
      <Form form={form} layout="vertical" onFinish={onPasswordFinish}>
        <Row gutter={16}>
          <Col xs={24} md={24}>
            <Form.Item
              label="Email Address"
              name="email"
              rules={[
                { required: true, message: "Please enter your email!" },
                { type: "email", message: "Please enter a valid email!" },
              ]}
            >
              <Input
                prefix={<FaEnvelope className="w-4 h-4" />}
                placeholder="Enter your email"
                size="large"
              />
            </Form.Item>
          </Col>
        </Row>

        <Form.Item className="mb-0 pt-6">
          <Space>
            <button
              type="primary"
              htmlType="submit"
              className="w-full px-4 text-white h-12 rounded-lg bg-gradient-to-r from-orange-500 to-amber-500 border-0 hover:from-yellow-600 hover:to-orange-600 font-semibold text-base shadow-lg"
            >
              {" "}
              Save
            </button>
            <button
              type="primary"
              htmlType="submit"
              onClick={() => form.resetFields()}
              className="w-full px-4  cursor-pointer h-12 rounded-lg border border-gray-200 hover:from-yellow-600 hover:to-orange-600 font-semibold text-base shadow-lg"
            >
              {" "}
              Reset
            </button>
          </Space>
        </Form.Item>
      </Form>
    </Card>
  );

  const tabItems = [
    {
      key: "1",
      label: (
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-yellow-500 font-bold">
          Profile Information
        </span>
      ),
      children: <ProfileForm />,
    },
    {
      key: "2",
      label: (
        <span className="text-transparent font-bold bg-clip-text bg-gradient-to-r  from-orange-500 to-yellow-500">
          Change Password
        </span>
      ),
      children: <PasswordForm />,
    },
  ];

  return (
    <div className="bg-gray-50">
      <div>
        <div className="text-center rounded-2xl mb-3 bg-gradient-to-br from-orange-50 via-yellow-50 to-amber-50 p-2 shadow-2xl">
          <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-yellow-500 mb-2">
            Account Settings
          </h1>
          <p className="text-gray-400">
            Manage your profile information and security settings
          </p>
        </div>
        {/* {isLoading ? (
          <UserDashboardSkeleton />
        ) : ( */}
          <Tabs
            centered
            defaultActiveKey="1"
            items={tabItems}
            size="large"
            className="bg-white rounded-lg shadow-sm bg-gradient-to-br from-orange-50 via-yellow-50 to-amber-50 "
          />
        {/* )} */}
      </div>
    </div>
  );
}
