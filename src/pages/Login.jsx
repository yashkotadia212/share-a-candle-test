import React, { useEffect, useState } from "react";
import { Form, Input, Button, message } from "antd";
import "antd/dist/reset.css";
import { useNavigate } from "react-router-dom";
import TopHeader from "../components/TopHeader";

const Login = () => {
  const [step, setStep] = useState(1);
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const centerFormClasses = "flex flex-col justify-center items-center h-full";

  const handleSendMobileCode = (values) => {
    // Here you would send the mobile number to your backend to request a verification code
    setMobile(values.mobile);
    message.success("Verification code sent to mobile!");
    setStep(2); // Move to next step
    console.log(values.mobile);
  };

  const handleVerifyMobileCode = (values) => {
    // Here you would verify the code sent to the mobile number
    message.success("Mobile number verified successfully!");
    setStep(3); // Reset to the first step
    console.log(values.code);
  };

  const handleSendEmailCode = (values) => {
    // Here you would send the email address to your backend to request a verification code
    setEmail(values.email);
    message.success("Verification code sent to email!");
    setStep(4); // Move to verification step
    console.log(values.email);
  };

  const handleVerifyEmailCode = (values) => {
    // Here you would verify the code sent to the email address
    message.success("Email verified successfully!");
    setStep(5); // Reset to the first step
    console.log(values.code);
  };

  useEffect(() => {
    if (step === 5) {
      setTimeout(() => {
        navigate("/events");
      }, 2000);
    }
  }, [step, navigate]);

  return (
    <>
      <TopHeader />
      <div className="p-5 h-[85vh]">
        {step === 1 && (
          <Form
            name="mobile"
            onFinish={handleSendMobileCode}
            style={{ maxWidth: "400px", margin: "0 auto" }}
            className={centerFormClasses}
          >
            <Form.Item
              name="mobile"
              rules={[
                { required: true, message: "Please input your mobile number!" },
                {
                  pattern: new RegExp(/^\d{10}$/),
                  message: "Mobile number must be a number!",
                },
              ]}
            >
              <Input placeholder="Enter mobile number" />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Send Verification Code
              </Button>
            </Form.Item>
          </Form>
        )}

        {step === 2 && (
          <Form
            name="verify-mobile"
            onFinish={handleVerifyMobileCode}
            style={{ maxWidth: "400px", margin: "0 auto" }}
            className={centerFormClasses}
          >
            <Form.Item
              name="code"
              rules={[
                {
                  required: true,
                  message: "Please input the verification code!",
                },
              ]}
            >
              <Input placeholder="Enter verification code" />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Verify Code
              </Button>
            </Form.Item>
          </Form>
        )}

        {step === 3 && (
          <Form
            name="email"
            onFinish={handleSendEmailCode}
            style={{ maxWidth: "400px", margin: "0 auto" }}
            className={centerFormClasses}
          >
            <Form.Item
              name="email"
              rules={[
                {
                  required: true,
                  type: "email",
                  message: "Please input a valid email address!",
                },
              ]}
            >
              <Input placeholder="Enter email address" />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Send Verification Code
              </Button>
            </Form.Item>
          </Form>
        )}

        {step === 4 && (
          <Form
            name="verify-email"
            onFinish={handleVerifyEmailCode}
            style={{ maxWidth: "400px", margin: "0 auto" }}
            className={centerFormClasses}
          >
            <Form.Item
              name="code"
              rules={[
                {
                  required: true,
                  message: "Please input the verification code!",
                },
              ]}
            >
              <Input placeholder="Enter verification code" />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Verify Code
              </Button>
            </Form.Item>
          </Form>
        )}

        {step === 5 && (
          <div className={centerFormClasses}>
            <h1>Success!</h1>
            <p>
              Mobile number: {mobile} <br />
              Email address: {email}
            </p>
            <p> Redirecting to Events Page...</p>
          </div>
        )}
      </div>
    </>
  );
};

export default Login;
