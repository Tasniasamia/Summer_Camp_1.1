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
import { FaUser, FaEnvelope, FaPhone, FaLock, FaCamera, FaStar, FaIdBadge } from "react-icons/fa";
import ImageInput from "@/components/(site)/common/form/image";
import { useAuth } from "@/helpers/context/authContext";
import toast from "react-hot-toast";
import { useFetch, useMutationAction } from "@/helpers/utils/hooks";
import UserDashboardSkeleton from "@/components/(site)/skeleton/dashboardSkeleton";
import { FaEarthAsia } from "react-icons/fa6";
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
  const { data, isLoading, error } = useFetch("profile", "/user");
  const updateSetting = useMutationAction("update", "/user", "settings");
  useEffect(() => {
    if (data?.data) {
      form.setFieldsValue({
        name: data?.data?.name || "",
        email: data?.data?.email || "",
        phone_number: data?.data?.phone_number || "",
        address: data?.data?.address || "",
        id: data?.data?.id,
        image: data?.data?.image
          ? [
              {
                uid: "-1",
                name: "image.png",
                status: "done",
                url: data.data.image.url,
                public_id: data.data.image.public_id,
              },
            ]
          : [],
      });
    }
  }, [data, form]);

  // Profile form submission
  const onProfileFinish = async (values) => {
    console.log("Profile form values:", values);
    const res = await updateSetting.mutateAsync(values);
    console.log("after update", res);
    setLoading(true);
    try {
      toast.success("Profile updated successfully!");
    } catch (error) {
      toast.error("Failed to update profile");
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
            <Form.Item name="image" label="Profile Picture">
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
            </Form.Item>
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
              label="Rate"
              name="rate"
               >
              <Input
                prefix={<FaStar className="w-4 h-4" />}
                placeholder="Enter your rate"
                size="large"
              />
            </Form.Item>
            <Form.Item
              label="Experience"
              name="experience"
               >
              <Input
                prefix={<FaIdBadge className="w-4 h-4" />}
                placeholder="Enter your experience"
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
              className="w-full !cursor-pointer text-white h-12 rounded-lg bg-gradient-to-r from-orange-500 to-amber-500 border-0 hover:from-yellow-600 hover:to-orange-600 font-semibold text-base px-4 shadow-lg"
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
      <Form  layout="vertical" onFinish={onPasswordFinish}>
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
              className="w-full px-4 !cursor-pointer text-white h-12 rounded-lg bg-gradient-to-r from-orange-500 to-amber-500 border-0 hover:from-yellow-600 hover:to-orange-600 font-semibold text-base shadow-lg"
            >
              {" "}
              Save
            </button>
            <button
              type="primary"
              htmlType="submit"
              onClick={() => form.resetFields()}
              className="w-full px-4  !cursor-pointer h-12 rounded-lg border border-gray-200 hover:from-yellow-600 hover:to-orange-600 font-semibold text-base shadow-lg"
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
      
        {isLoading ? (
          <UserDashboardSkeleton />
        ) : (
          <Tabs
            centered
            defaultActiveKey="1"
            items={tabItems}
            size="large"
            className="bg-white rounded-lg shadow-sm bg-gradient-to-br from-orange-50 via-yellow-50 to-amber-50 "
          />
        )}
      </div>
    </div>
  );
}
