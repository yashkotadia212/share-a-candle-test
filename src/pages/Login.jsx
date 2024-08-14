import React, { useEffect, useState } from "react";
import TopHeaderResponsive from "../components/TopHeaderResponsive";
import { Form, Input, Button, message } from "antd";
import "antd/dist/reset.css";
import { useNavigate } from "react-router-dom";
import useAxios from "../hooks/useAxios";
import useAuthStore from "../zustand/authStore";

const sendEmailCodeUrl =
  "https://tndjg6asaamlgqzxabm6ozrft40afjae.lambda-url.us-east-2.on.aws/";

const verifyEmailCodeUrl =
  "https://tndjg6asaamlgqzxabm6ozrft40afjae.lambda-url.us-east-2.on.aws/";

const Login = () => {
  const [emailForm] = Form.useForm();
  const [verifyEmailForm] = Form.useForm();
  const [step, setStep] = useState(1);
  const navigate = useNavigate();
  const sendEmailCode = useAxios(sendEmailCodeUrl);
  const verifyEmailCode = useAxios(verifyEmailCodeUrl);
  const { setAuth } = useAuthStore();

  const centerFormClasses = "flex flex-col justify-center items-center h-full";

  const handleSendEmailCode = () => {
    emailForm
      .validateFields()
      .then(() => {
        const values = emailForm.getFieldsValue();
        sendEmailCode.postData({ email: values.email });
      })
      .catch((error) => {
        console.log(error);
      });
    setAuth({
      email: emailForm.getFieldValue("email"),
      isAuthorized: true,
    });
  };

  useEffect(() => {
    if (step === 1) {
      if (sendEmailCode.error) {
        message.error("Failed to send verification code!");
      } else if (sendEmailCode.data) {
        message.success("Verification code sent to email!");
        setStep(2); // Move to verification step
      }
    }
  }, [sendEmailCode]);

  const handleVerifyEmailCode = () => {
    verifyEmailForm
      .validateFields()
      .then(() => {
        const values = verifyEmailForm.getFieldsValue();
        verifyEmailCode.postData({
          email: emailForm.getFieldValue("email"),
          otp: values.code,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    if (step === 2) {
      if (verifyEmailCode.error) {
        message.error("Failed to verify OTP! " + verifyEmailCode.error);
      } else if (verifyEmailCode.data) {
        message.success("Email Verified successfully!");
        setStep(3);

        if (step === 3) {
          setAuth({
            email: emailForm.getFieldValue("email"),
            isAuthorized: true,
          });
        }
      }
    }
  }, [verifyEmailCode]);

  useEffect(() => {
    if (step === 3) {
      setTimeout(() => {
        navigate("/events");
      }, 2500);
    }
  }, [step, navigate]);

  return (
    <>
      <TopHeaderResponsive />
      <div className="p-5 h-[85vh]">
        {/* {step === 1 && (
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
        )} */}
        {step === 1 && (
          <Form
            form={emailForm}
            name="email"
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
              <Button
                loading={sendEmailCode.loading}
                type="primary"
                onClick={() => handleSendEmailCode()}
              >
                Send Verification Code
              </Button>
            </Form.Item>
          </Form>
        )}
        {step === 2 && (
          <Form
            form={verifyEmailForm}
            name="verifyEmailCode"
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
              <Button
                loading={verifyEmailCode.loading}
                type="primary"
                onClick={() => handleVerifyEmailCode()}
              >
                Verify OTP
              </Button>
            </Form.Item>
          </Form>
        )}
        {step === 3 && (
          <div className={centerFormClasses}>
            <h1>Success!</h1>
            <p>
              Email address: {emailForm.getFieldValue("email")} is verified!
              <br />
            </p>
            <div className="text-2xl font-semibold">
              You have successfully logged in!
            </div>
            <p className="mt-5"> Redirecting to Events Page...</p>
          </div>
        )}
      </div>
    </>
  );
};

export default Login;
