import React, { useState } from "react";
import { Form, Input, InputNumber, Button, Checkbox, message } from "antd";
import TopHeaderResponsive from "../components/TopHeaderResponsive";
import Footer from "../components/Footer";
import PasswordStrengthMeter from "../components/PasswordStrengthMeter";
import { Link, useNavigate } from "react-router-dom";
import { signUpWithCognito } from "../utils/userManagementUtils";

const Signup = () => {
  const navigate = useNavigate();
  const [signUpForm] = Form.useForm();
  const [pass, setPass] = useState("");
  const [loading, setLoading] = useState(false);

  const onFinish = (values) => {
    console.log("Successgyyfyfyu:", values);

    setLoading(true);
    signUpWithCognito(values)
      .then((result) => {
        setLoading(false);
        message.success("Verification code sent!");
        navigate("/verify-code", {
          state: { verifyCode: true, email: values.email },
        });
      })
      .catch((err) => {
        message.error(err.message);
        setLoading(false);
      });
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
            <h1 className="text-3xl font-bold text-center mt-5">Sign Up</h1>
          </div>
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
              <Button loading={loading} type="primary" htmlType="submit" block>
                Sign Up
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

export default Signup;
