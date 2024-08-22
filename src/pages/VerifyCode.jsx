import React, { useState, useEffect } from "react";
import TopHeaderResponsive from "../components/TopHeaderResponsive";
import Footer from "../components/Footer";
import { signUpConfirmCode } from "../utils/userManagementUtils";
import { Form, Input, Button, message } from "antd";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { resendVerificationCode } from "../utils/userManagementUtils";

const VerifyCode = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [verifyCodeForm] = Form.useForm();
  const [isCodeSent, setIsCodeSent] = useState(false);
  const [timer, setTimer] = useState(60);
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (state && state.verifyCode && !isCodeSent) {
      onSendCode();
    }
  }, [state]);

  // Handle the countdown timer
  useEffect(() => {
    let interval = null;
    if (isCodeSent && timer > 0) {
      interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    } else if (timer === 0) {
      setIsButtonDisabled(false);
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isCodeSent, timer]);

  const onSendCode = () => {
    setIsCodeSent(true);
    setTimer(60);
    setIsButtonDisabled(true);
  };

  const onResendCode = () => {
    onSendCode();
    resendVerificationCode(state.email)
      .then(() => {
        message.success("Verification code sent again!");
      })
      .catch((err) => {
        message.error(err.message);
      });
  };

  const onVerifyFinish = (values) => {
    setLoading(true);
    signUpConfirmCode(state.email, values.verificationCode)
      .then((result) => {
        message.success("Verification successful!");
        navigate("/sign-in");
        setLoading(false);
      })
      .catch((err) => {
        message.error({
          content: err.message,
        });
        setLoading(false);
      });
  };

  return (
    <div>
      <TopHeaderResponsive />
      <div className="grid items-center xs:grid-cols-1 md:grid-cols-2 w-full max-w-[950px] m-auto mt-10 min-h-[85vh]">
        <div className="w-full xs:h-[250px] md:h-[770px] p-2">
          <div className="bg-theme-background w-full h-full rounded-lg"></div>
        </div>
        <div>
          <div>
            <h1 className="text-3xl font-bold text-center mt-5">
              Verify your Email
            </h1>
          </div>
          <Form
            form={verifyCodeForm}
            name="verification"
            size="large"
            layout="vertical"
            onFinish={onVerifyFinish}
            autoComplete="off"
            className="p-5 bold-label-antd"
            requiredMark={false}
          >
            <Form.Item
              label="Verification Code"
              name="verificationCode"
              rules={[
                {
                  required: true,
                  message: "Please enter the verification code!",
                },
                { len: 6, message: "Verification code must be 6 digits!" },
              ]}
            >
              <Input placeholder="Enter code" maxLength={6} />
            </Form.Item>

            <Form.Item>
              <Button loading={loading} type="primary" htmlType="submit" block>
                Verify Code
              </Button>
            </Form.Item>

            <Form.Item>
              <Button
                type="default"
                onClick={onResendCode}
                disabled={isButtonDisabled}
                block
              >
                {isButtonDisabled ? `Resend Code (${timer}s)` : "Resend Code"}
              </Button>
            </Form.Item>
          </Form>

          <div className="-mt-6">
            <p className="text-center text-sm text-gray-500">
              Already have an account?{" "}
              <Link to="/sign-in" className="font-semibold">
                Sign In
              </Link>
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default VerifyCode;
