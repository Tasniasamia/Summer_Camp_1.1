"use client";
import { useState } from "react";
import {
  Card,
  Button,
  Form,
  Input,
  Radio,
  Space,
  Row,
  Col,
  message,
  Divider,
} from "antd";
import { FaCreditCard, FaWallet, FaTag, FaDollarSign } from "react-icons/fa";
import Image from "next/image";
import Banner from "@/components/(site)/common/banner";

export default function CheckoutPage({ params }) {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [couponCode, setCouponCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const [appliedCoupon, setAppliedCoupon] = useState(null);

  // Dummy course data
  const course = {
    id: "course-101",
    title: "Mastering React & Next.js",
    price: 199.99,
    description:
      "Learn to build modern web applications with React, Next.js, and TypeScript.",
    image: "/online-course-thumbnail.png",
  };

  // Dummy coupon data
  const validCoupons = {
    SAVE20: 20, // 20% discount
    FIRST50: 50, // $50 fixed discount
  };

  const subtotal = course.price;
  const totalPayment = subtotal - discount;

  const handleApplyCoupon = () => {
    if (couponCode.trim() === "") {
      message.warning("Please enter a coupon code.");
      return;
    }

    const upperCaseCoupon = couponCode.toUpperCase();

    if (validCoupons[upperCaseCoupon]) {
      const couponValue = validCoupons[upperCaseCoupon];
      if (upperCaseCoupon === "SAVE20") {
        setDiscount(subtotal * (couponValue / 100));
        message.success(
          `Coupon "${couponCode}" applied! You got ${couponValue}% off.`
        );
      } else if (upperCaseCoupon === "FIRST50") {
        setDiscount(couponValue);
        message.success(
          `Coupon "${couponCode}" applied! You got $${couponValue} off.`
        );
      }
      setAppliedCoupon(upperCaseCoupon);
    } else {
      setDiscount(0);
      setAppliedCoupon(null);
      message.error("Invalid coupon code.");
    }
  };

  const onFinish = async (values) => {
    setLoading(true);
    try {
      console.log("Checkout details:", {
        ...values,
        course,
        totalPayment,
        appliedCoupon,
      });
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));
      message.success("Payment successful! You are now enrolled.");
      // Redirect or show success message
    } catch (error) {
      message.error("Payment failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Banner title="Checkout" />
      <div className="lg:my-[120px] my-[60px]">
        <div className="custom-container">
          <Row gutter={[24, 24]}>
            <Col xs={24} lg={14}>
              <Card title="Course Details" className="mb-6">
                <div className="flex items-center space-x-4">
                  <Image
                    width={1000}
                    height={1000}
                    src={"/happy-campers.png"}
                    alt={course.title}
                    className="w-24 h-auto rounded-md object-cover"
                  />
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800">
                      {course.title}
                    </h3>
                    <p className="text-gray-600 text-sm">
                      {course.description}
                    </p>
                    <p className="text-lg font-bold text-orange-600 mt-2">
                      ${course.price.toFixed(2)}
                    </p>
                  </div>
                </div>
              </Card>

              <Card title="Payment Method" className="my-6">
                <Form
                  form={form}
                  layout="vertical"
                  onFinish={onFinish}
                  initialValues={{ paymentMethod: "credit_card" }}
                >
                  <Form.Item
                    name="paymentMethod"
                    rules={[
                      {
                        required: true,
                        message: "Please select a payment method!",
                      },
                    ]}
                  >
                    <Radio.Group className="w-full">
                      <Space direction="vertical" className="w-full">
                        <Radio value="credit_card" className="p-3 ">
                          <div className="flex items-center space-x-2">
                            <FaCreditCard className="w-5 h-5 text-gray-600" />
                            <span>Credit/Debit Card</span>
                          </div>
                        </Radio>
                        <Radio value="paypal" className="p-3 ">
                          <div className="flex items-center space-x-2">
                            <FaWallet className="w-5 h-5 text-gray-600" />
                            <span>PayPal</span>
                          </div>
                        </Radio>
                      </Space>
                    </Radio.Group>
                  </Form.Item>
                </Form>
              </Card>
            </Col>

            <Col xs={24} lg={10}>
              <div className="mb-6">
              <Card title="Order Summary" >
                <div className="space-y-2 text-gray-700">
                  <div className="flex justify-between">
                    <span>Subtotal:</span>
                    <span className="font-medium">${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Discount:</span>
                    <span className="font-medium text-red-500">
                      -${discount.toFixed(2)}
                    </span>
                  </div>
                  <Divider className="my-2" />
                  <div className="flex justify-between text-lg font-bold text-gray-900">
                    <span>Total Payment:</span>
                    <span>${totalPayment.toFixed(2)}</span>
                  </div>
                </div>

                <Divider className="my-4" />

                <h4 className="font-semibold text-gray-800 mb-3 flex items-center space-x-2">
                  <FaTag className="w-5 h-5" />
                  <span>Apply Coupon</span>
                </h4>
                <Space.Compact className="w-full ">
                  <Input
                    placeholder="Enter coupon code"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    size="large"
                    className=" h-12"
                  />
                  <button
                    type="primary"
                    onClick={handleApplyCoupon}
                    className="w-full  text-white h-12 rounded-e-lg bg-gradient-to-r from-orange-500 to-amber-500 border-0 hover:from-yellow-600 hover:to-orange-600 font-semibold text-lg shadow-lg"
                  >
                    Apply
                  </button>
                </Space.Compact>
                {appliedCoupon && (
                  <p className="text-green-600 text-sm mt-2">
                    Coupon "{appliedCoupon}" applied successfully!
                  </p>
                )}

                <button
                  size="large"
                  block
                  onClick={() => form.submit()} // Trigger form submission
                  loading={loading}
                  className="w-full mt-6 cursor-pointer text-white h-12 rounded-lg bg-gradient-to-r from-orange-500 to-amber-500 border-0 hover:from-yellow-600 hover:to-orange-600 font-semibold text-lg shadow-lg"
                >
                  Pay Now <FaDollarSign className="inline-block w-4 h-4 ml-2" />
                </button>
              </Card>
              </div>
            </Col>
          </Row>
        </div>
      </div>
    </div>
  );
}
