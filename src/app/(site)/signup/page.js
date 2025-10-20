"use client";
import { useState } from "react";
import {
  Form,
  Input,
  Card,
  Typography,
  Divider,
  Radio,
  Spin,
  message,
} from "antd";
import { FaLock, FaEnvelope, FaPhone, FaUser } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query"; // ✅ React Query import
import axios from "axios";

const { Title, Text } = Typography;

// ✅ API helper
const sendOTP = async (params = {}) => {
  const res = await axios.post("/otp/send", params);
  return res.data;
};

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [form] = Form.useForm();
  const { push } = useRouter();

  const sendOTPMutation = useMutation({
    mutationFn: (payload) => sendOTP(payload),
    onSuccess: (res, variables) => {
      if (res?.success) {
        message.success(res?.message || "OTP sent successfully!");
        push(`/otp?email=${variables.identifier}&action=signup`);
      } else {
        message.error(res?.errorMessage || "Failed to send OTP.");
      }
    },
    onError: (error) => {
      console.error("OTP send error:", error);
      message.error("Something went wrong while sending OTP.");
    },
  });

  // ✅ Handle form submit
  const handleSubmit = async (values) => {
    const payload = {
      identifier: values?.email,
      action: "signup",
    };
    sendOTPMutation.mutate(payload);
  };

  return (
    <div className="min-h-screen pt-44 mb-44 flex items-center justify-center p-4 relative">
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-10 w-20 h-20 bg-orange-300 rounded-full opacity-20 animate-bounce"></div>
        <div className="absolute top-32 right-20 w-16 h-16 bg-yellow-300 rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute bottom-20 left-20 w-24 h-24 bg-amber-500 rounded-full opacity-20 animate-bounce delay-1000"></div>
        <div className="absolute bottom-32 right-10 w-12 h-12 bg-amber-800 rounded-full opacity-20 animate-pulse delay-500"></div>
      </div>

      <Card
        className="w-full max-w-md mx-auto shadow-2xl border-0 backdrop-blur-sm bg-white/95"
        style={{ borderRadius: "20px" }}
      >
        <div className="text-center mb-8">
          <div className="mb-4">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-orange-500 to-yellow-500 text-white py-2 rounded-full mb-4">
              <span className="text-2xl">🏕️</span>
            </div>
          </div>
          <Title level={2} className="!mb-2 !text-gray-800">
            Join Summer Camp!
          </Title>
          <Text className="text-gray-600">
            Create your account for an amazing summer experience
          </Text>
        </div>

        <Form
          form={form}
          name={"register"}
          onFinish={handleSubmit}
          layout="vertical"
          size="large"
          className="space-y-4"
        >
          {isLogin && (
            <Form.Item
              name="role"
              rules={[{ required: true, message: "Please select your role!" }]}
            >
              <Radio.Group>
                <Radio value="ADMIN">ADMIN</Radio>
                <Radio value="TEACHER">TEACHER</Radio>
                <Radio value="USER">USER</Radio>
              </Radio.Group>
            </Form.Item>
          )}

          <Form.Item
            name="Name"
            rules={[{ required: true, message: "Please enter your name!" }]}
          >
            <Input
              prefix={<FaUser className="text-gray-400" />}
              placeholder="Name"
              className="rounded-lg h-12"
            />
          </Form.Item>

          <Form.Item
            name="email"
            rules={[
              { required: true, message: "Please enter your email!" },
              { type: "email", message: "Please enter a valid email!" },
            ]}
          >
            <Input
              prefix={<FaEnvelope className="text-gray-400" />}
              placeholder="Email Address"
              className="rounded-lg h-12"
            />
          </Form.Item>

          <Form.Item
            name="phone"
            rules={[{ required: true, message: "Please enter your phone!" }]}
          >
            <Input
              prefix={<FaPhone className="text-gray-400" />}
              placeholder="Phone Number"
              className="rounded-lg h-12"
            />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[
              { required: true, message: "Please enter your password!" },
              { min: 6, message: "Password must be at least 6 characters!" },
            ]}
          >
            <Input.Password
              prefix={<FaLock className="text-gray-400" />}
              placeholder="Password"
              className="rounded-lg h-12"
            />
          </Form.Item>

          <Form.Item className="!mb-6">
            <button
              type="submit"
              className="w-full !text-white h-12 rounded-lg bg-gradient-to-r from-orange-500 to-amber-500 border-0 hover:from-yellow-600 hover:to-orange-600 font-semibold text-lg shadow-lg"
              disabled={sendOTPMutation.isLoading}
            >
              {sendOTPMutation.isLoading ? <Spin /> : "🎉 Create Account"}
            </button>
          </Form.Item>
        </Form>

        <Divider className="!my-6">
          <Text className="text-gray-500">or</Text>
        </Divider>

        <div className="text-center space-y-4">
          <button className="w-full h-12 rounded-lg text-orange-500 border-2 border-gray-200 hover:border-orange-300 font-medium">
            Already have an account? Welcome back!
          </button>
        </div>

        <div className="mt-8 text-center">
          <Text className="text-xs text-gray-500">
            Summer Camp 2024 • Making memories that last forever ✨
          </Text>
        </div>
      </Card>
    </div>
  );
}
