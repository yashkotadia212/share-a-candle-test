import React from "react";
import { Form, Input, InputNumber, Button } from "antd";
import TopHeaderResponsive from "../components/TopHeaderResponsive";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";

const Signup = () => {
  const [signInForm] = Form.useForm();

  const onFinish = (values) => {
    console.log("Success:", values);
  };

  return (
    <div>
      <TopHeaderResponsive />
      <div className="grid items-center xs:grid-cols-1 md:grid-cols-2 w-full max-w-[900px] m-auto mt-10 min-h-[84vh]">
        <div className="w-full xs:h-[200px] md:h-[600px] p-2">
          <div className="bg-theme-background w-full h-full rounded-lg"></div>
        </div>
        <div>
          <div>
            <h1 className="text-3xl font-bold text-center mt-5">Sign In</h1>
          </div>
          <Form
            form={signInForm}
            name="signin"
            size="large"
            layout="vertical"
            onFinish={onFinish}
            autoComplete="off"
            className="p-5 bold-label-antd"
            requiredMark={false}
          >
            <Form.Item
              label="Email"
              name="email"
              rules={[
                { required: true, message: "Please input your email!" },
                { type: "email", message: "Please enter a valid email!" },
              ]}
            >
              <Input placeholder="Enter your email" />
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              rules={[
                { required: true, message: "Please input your password!" },
              ]}
            >
              <Input.Password placeholder="Enter your password" />
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit" block>
                Log In
              </Button>
            </Form.Item>
          </Form>

          <div className="-mt-6">
            <p className="text-center text-sm text-gray-500">
              Don't have an account?{" "}
              <Link to="/sign-up" className="font-semibold">
                Sign Up
              </Link>
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Signup;
