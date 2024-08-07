import React, { useEffect, useState } from "react";
import TopHeader from "../components/TopHeader";
import { Form, Input, InputNumber, Button, message, Checkbox } from "antd";
import { FaMinus, FaPlus } from "react-icons/fa";
import useAuthStore from "../zustand/authStore";
import useAxios from "../hooks/useAxios";

const INITIAL_FUNDRAISING_GOAL = 2000;
const STEP_AMOUNT = 100;
const joinTeamUrl =
  "https://ixmiyncibu2bfpr4wt64zbsz2y0rtczr.lambda-url.us-east-2.on.aws/";

const JoinTeam = () => {
  const [joinTeamFormRef] = Form.useForm();
  const [internalValue, setInternalValue] = useState(INITIAL_FUNDRAISING_GOAL);
  const { auth } = useAuthStore();
  const joinTeam = useAxios(joinTeamUrl);

  const onFinish = (values) => {
    console.log("Form Values:", values);
    joinTeam.postData({
      eventCode: values.teamCode.replace(/\s/g, ""),
      fundraisingGoal: values.fundraisingGoal,
      email: auth.email,
      name: values.name,
      description: values.description,
      isDiscoverable: values.isDiscoverable.toString(),
    });
  };

  useEffect(() => {
    if (joinTeam?.error) {
      message.error("An error occurred joining team. Please try again later.");
    }
    if (joinTeam?.data) {
      message.success("Successfully joined team!");
      console.log("Join Team Response:", joinTeam.data);
    }
  }, [joinTeam]);

  const increment = () => {
    const newValue = internalValue + STEP_AMOUNT;
    setInternalValue(newValue);
  };

  const decrement = () => {
    const newValue = internalValue - STEP_AMOUNT;
    setInternalValue(newValue);
  };

  const handleInputChange = (num) => {
    const newValue = parseInt(num);
    if (!isNaN(newValue)) {
      setInternalValue(newValue);
    }
  };

  useEffect(() => {
    joinTeamFormRef.setFieldValue("fundraisingGoal", internalValue);
  }, [internalValue]);

  return (
    <div>
      <TopHeader />
      <div className="max-w-96 m-auto p-4 h-[80vh] flex items-center">
        <Form
          form={joinTeamFormRef}
          name="joinTeamForm"
          onFinish={onFinish}
          initialValues={{ teamCode: "", fundraisingGoal: internalValue }}
          layout="vertical"
        >
          <Form.Item
            label="Team Code"
            name="teamCode"
            rules={[
              {
                required: true,
                message: "Please input the team code!",
              },
              {
                validator: (_, value) => {
                  const rawValue = value.replace(/\s/g, "");
                  if (rawValue.length !== 6) {
                    return Promise.reject(
                      new Error(
                        "Team code must be exactly 6 characters (excluding spaces)!"
                      )
                    );
                  }
                  return Promise.resolve();
                },
              },
            ]}
          >
            <CustomInput />
          </Form.Item>

          <Form.Item
            label="Name"
            name="name"
            rules={[
              {
                required: true,
                message: "Please input the name!",
              },
            ]}
          >
            <Input size="large" />
          </Form.Item>

          <Form.Item
            label="Why are you raising funds?"
            name="description"
            rules={[
              {
                required: true,
                message: "Please input the description!",
              },
            ]}
          >
            <Input.TextArea rows={4} />
          </Form.Item>

          <Form.Item
            label="Fundraising Goal"
            name="fundraisingGoal"
            rules={[
              {
                required: true,
                message: "Please input the fundraising goal!",
              },
              {
                type: "number",
                min: 0,
                message: "Fundraising goal cannot be negative!",
              },
            ]}
          >
            <InputNumber
              value={internalValue}
              onChange={(num) => handleInputChange(num)}
              className="w-full fundraining-custom-number-input"
              controls={false}
              min={0}
              addonBefore={
                <Button
                  className="h-full"
                  type="primary"
                  onClick={decrement}
                  icon={<FaMinus />}
                />
              }
              addonAfter={
                <Button
                  className="h-full"
                  type="primary"
                  onClick={increment}
                  icon={<FaPlus />}
                />
              }
            />
          </Form.Item>

          <Form.Item name="isDiscoverable" valuePropName="checked">
            <Checkbox size="large">
              Make my store discoverable on shareacandle.com
            </Checkbox>
          </Form.Item>

          <Form.Item className="w-full flex justify-center">
            <Button
              loading={joinTeam?.loading}
              type="primary"
              htmlType="submit"
            >
              Create My Store
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

const CustomInput = ({ value = "", onChange }) => {
  const handleChange = (e) => {
    let inputValue = e.target.value.toUpperCase().replace(/\s/g, "");
    // Limit input length to 6 characters
    if (inputValue.length > 6) {
      inputValue = inputValue.slice(0, 6);
    }
    let formattedValue = inputValue.replace(/(.{3})/g, "$1 ").trim();
    if (onChange) {
      onChange(formattedValue);
    }
  };

  return (
    <Input
      size="large"
      placeholder="Example: DAC B2D"
      value={value}
      onChange={handleChange}
    />
  );
};

export default JoinTeam;
