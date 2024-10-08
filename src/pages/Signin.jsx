import React, { useEffect, useState } from "react";
import { Form, Input, Button, message } from "antd";
import TopHeaderResponsive from "../components/TopHeaderResponsive";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";
import {
  checkLogin,
  resendVerificationCode,
  getCognitoSession,
} from "../utils/userManagementUtils";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../zustand/authStore";

// for api
import { useQuery } from "@tanstack/react-query";
import useAxiosAPI from "../api/useAxiosAPI";
import { apiRoutes } from "../api/apiRoutes";

const Signin = () => {
  const [email, setEmail] = useState();
  const [signInForm] = Form.useForm();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState(null);
  const { setAuth } = useAuthStore();
  const { getData } = useAxiosAPI();

  const loginUser = useQuery({
    queryKey: ["loginUser"],
    queryFn: () =>
      getData(apiRoutes.users.login, null, {
        email: email,
      }),
    enabled: email ? true : false,
  });

  useEffect(() => {
    if (loginUser.data && token) {
      let userData = {
        email: loginUser.data.email,
        token: token,
        userId: loginUser.data.id,
        role: loginUser.data.user_role,
      };
      setAuth(userData);
      navigate("/");
    }
  }, [loginUser.data, token]);

  const onFinish = (values) => {
    setLoading(true);
    setEmail(values.email);
    checkLogin(values.email, values.password)
      .then((result) => {
        if (result) {
          getCognitoSession()
            .then(({ idToken }) => {
              setToken(idToken);
              setLoading(false);
            })
            .catch((error) => {
              console.error("Error retrieving Cognito session:", error);
              setLoading(false);
            });
        }
      })
      .catch((err) => {
        setLoading(false);

        if (err.code === "UserNotConfirmedException") {
          resendVerificationCode(values.email)
            .then(() => {
              message.success("Verification code sent!");
            })
            .catch((err) => {
              message.error(err.message);
            });
          navigate("/verify-code", {
            state: { verifyCode: true, email: values.email },
          });
        } else if (err.code === "NotAuthorizedException") {
          message.error(err.message);
        }
      });
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
          {/* <Button
            onClick={() => {
              signInForm.setFieldsValue({
                email: "yashk@hexacoder.com",
                password: "Yash@123",
              });
            }}
          >
            Fill up Form
          </Button> */}
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
              <Button
                loading={loading || loginUser.isLoading}
                type="primary"
                htmlType="submit"
                block
              >
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

export default Signin;
