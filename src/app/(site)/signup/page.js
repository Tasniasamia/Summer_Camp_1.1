"use client";
import { useState } from "react";
import {
  Form,
  Input,
  Card,
  Typography,
  Divider,
  Checkbox,
  Spin,
  Radio,
} from "antd";
import {
  FaLock,
  FaEnvelope,
} from "react-icons/fa";
import { useAuth } from "@/helpers/context/authContext";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
const { Title, Text } = Typography;

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const { currentUser,setCurrentUser, signup, signin, user,setUser,loading2 } =useAuth();
  const {push}=useRouter();
  console.log("loading", loading);
  const handleSubmit = async (values) => {
    try {
      setLoading(true);
      if (!isLogin) {
        // await signup(values.email, values.password);
        } else {
        // console.log("login res",loginRes);
        const dbRes = await fetch("/api/auth/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: values?.email,
            password: values?.password,
            role: values?.role
          }),
        });
        const dbData = await dbRes.json();
        console.log("DB response", dbData);
      
        if (dbData.success) {
          if(!currentUser){
            setIsLogin(true);
             toast.success(dbData?.msg || 'User Created Successfully');
             toast.success("Loggedin Successfully");
             switch (dbData?.user?.role) {
                case "instructor":
                push("/trainer");
                setUser(dbData?.user);
                localStorage.setItem('token',dbData?.token);
                break;
               case "admin":
                push("/admin");
                setUser(dbData?.user);
                localStorage.setItem('token',dbData?.token);
                break;
                default:
                push("/user");
                setUser(dbData?.user);
                localStorage.setItem('token',dbData?.token);
                break;
            } }
          else{
            toast.error("Already authenticate");
          }
        }
         else {
          toast.error("No Create User Into Database");
        }
      }
    } catch (error) {
      console.error(error);
      toast.error("Authentication Failed");
    } finally {
      setLoading(false); 
    }
  };

  const toggleMode = () => {
    setIsLogin(!isLogin);
    form.resetFields();
  };

  return (
    <div className="min-h-screen  pt-44 mb-44 flex items-center justify-center p-4 relative">
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
            {isLogin ? "Welcome Back!" : "Join Summer Camp!"}
          </Title>
          <Text className="text-gray-600">
            {isLogin
              ? "Sign in to access your camp adventure"
              : "Create your account for an amazing summer experience"}
          </Text>
        </div>

        <Form
          form={form}
          name={isLogin ? "login" : "register"}
          onFinish={handleSubmit}
          layout="vertical"
          size="large"
          className="space-y-4"
        >
        {isLogin && ( <Form.Item
              name="role"
              rules={[{ required: true, message: "Please select your role!" }]}
            >
              <Radio.Group>
              <Radio value="admin">Admin</Radio>
              <Radio value="instructor">Instructor</Radio>
              <Radio value="student">Student</Radio>
              </Radio.Group>
            </Form.Item>)}
           
     
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

          {!isLogin && (
            <Form.Item
              name="confirmPassword"
              dependencies={["password"]}
              rules={[
                { required: true, message: "Please confirm your password!" },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("password") === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(new Error("Passwords do not match!"));
                  },
                }),
              ]}
            >
              <Input.Password
                prefix={<FaLock className="text-gray-400" />}
                placeholder="Confirm Password"
                className="rounded-lg h-12"
              />
            </Form.Item>
          )}

          {isLogin && (
            <Form.Item name="remember" valuePropName="checked">
              <Checkbox className="text-gray-600">Remember me</Checkbox>
            </Form.Item>
          )}

          {!isLogin && (
            <Form.Item name="terms" valuePropName="checked">
              <Checkbox className="text-gray-600">
                I agree to the{" "}
                <a href="#" className="text-orange-600 hover:text-orange-700">
                  Terms and Conditions
                </a>
              </Checkbox>
            </Form.Item>
          )}

          <Form.Item className="!mb-6">
            <button className="w-full !text-white h-12 rounded-lg bg-gradient-to-r from-orange-500 to-amber-500 border-0 hover:from-yellow-600 hover:to-orange-600 font-semibold text-lg shadow-lg">
              {(loading||loading2) ? (
                <Spin />
              ) : isLogin ? (
                "🚀 Sign In"
              ) : (
                "🎉 Create Account"
              )}
            </button>
          </Form.Item>
        </Form>

        <Divider className="!my-6">
          <Text className="text-gray-500">or</Text>
        </Divider>

        <div className="text-center space-y-4">
          <button
            className="w-full h-12 rounded-lg text-orange-500 border-2 border-gray-200 hover:border-orange-300 font-medium"
            onClick={toggleMode}
          >
            {isLogin
              ? "Don't have an account? Join the fun! 🎪"
              : "Already have an account? Welcome back! 👋"}
          </button>

          {isLogin && (
            <div className="pt-2">
              <a
                href="#"
                className="text-orange-600 hover:text-orange-700 text-sm"
              >
                Forgot your password? 🤔
              </a>
            </div>
          )}
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
