import React, { useState, useEffect } from "react";
import { Form, Input, InputNumber, Button, Checkbox, message } from "antd";
import TopHeaderResponsive from "../components/TopHeaderResponsive";
import Footer from "../components/Footer";
import PasswordStrengthMeter from "../components/PasswordStrengthMeter";
import { Link } from "react-router-dom";

const Signup = () => {
  const [signUpForm] = Form.useForm();
  const [verifyCodeForm] = Form.useForm();
  const [pass, setPass] = useState("");
  const [isFormFilledAndValid, setIsFormFilledAndValid] = useState(false);
  const [isCodeSent, setIsCodeSent] = useState(false);
  const [timer, setTimer] = useState(60);
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

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
    // Simulate sending the code
    message.success("Verification code sent!");
    setIsCodeSent(true);
    setTimer(60);
    setIsButtonDisabled(true);
  };

  const onVerifyFinish = (values) => {
    console.log("Success:", values);
    message.success("Code verified successfully!");
  };

  const onFinish = (values) => {
    console.log("Successgyyfyfyu:", values);
    onSendCode();
    setIsFormFilledAndValid(true);
  };

  const validatePassword = (_, value) => {
    if (!value || signUpForm.getFieldValue("password") === value) {
      return Promise.resolve();
    }
    return Promise.reject(new Error("The two passwords do not match!"));
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
              {isFormFilledAndValid ? "Verify Your Email" : "Sign Up"}
            </h1>
          </div>
          {!isFormFilledAndValid ? (
            <Form
              form={signUpForm}
              name="signup"
              size="large"
              layout="vertical"
              onFinish={onFinish}
              className="p-5 bold-label-antd"
              requiredMark={false}
            >
              <Form.Item
                label="Phone Number"
                name="phone_number"
                rules={[
                  {
                    required: true,
                    message: "Please input your phone number!",
                  },
                  {
                    pattern: /^[0-9]{10}$/,
                    message: "Phone number must be 10 digits!",
                  },
                ]}
              >
                <InputNumber
                  className="w-full"
                  controls={false}
                  placeholder="Enter your phone number"
                />
              </Form.Item>

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
                  {
                    pattern:
                      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                    message: null,
                  },
                ]}
                hasFeedback
              >
                <Input.Password
                  placeholder="Enter your password"
                  onChange={(e) => setPass(e.target.value)}
                />
              </Form.Item>

              <PasswordStrengthMeter password={pass} />

              <Form.Item
                label="Confirm Password"
                name="confirm"
                dependencies={["password"]}
                rules={[
                  { required: true, message: "Please confirm your password!" },
                  { validator: validatePassword },
                ]}
                hasFeedback
              >
                <Input.Password placeholder="Confirm your password" />
              </Form.Item>

              <Form.Item
                name="terms"
                valuePropName="checked"
                rules={[
                  {
                    validator: (_, value) =>
                      value
                        ? Promise.resolve()
                        : Promise.reject(
                            new Error(
                              "You must agree to the terms and conditions!"
                            )
                          ),
                  },
                ]}
              >
                <Checkbox className="text-xs text-gray-500">
                  I agree to the Share a Candle's{" "}
                  <Link
                    to="/terms-of-service"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-semibold"
                  >
                    Terms of Service
                  </Link>{" "}
                  and{" "}
                  <Link
                    to="/privacy-policy"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-semibold"
                  >
                    Privacy Policy
                  </Link>
                  .
                </Checkbox>
              </Form.Item>

              <Form.Item>
                <Button type="primary" htmlType="submit" block>
                  Sign Up
                </Button>
              </Form.Item>
            </Form>
          ) : (
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
                <Button type="primary" htmlType="submit" block>
                  Verify Code
                </Button>
              </Form.Item>

              <Form.Item>
                <Button
                  type="default"
                  onClick={onSendCode}
                  disabled={isButtonDisabled}
                  block
                >
                  {isButtonDisabled ? `Resend Code (${timer}s)` : "Resend Code"}
                </Button>
              </Form.Item>
            </Form>
          )}

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

export default Signup;
