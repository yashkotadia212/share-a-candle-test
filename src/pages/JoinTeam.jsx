import React, { useEffect, useState } from "react";
import TopHeader from "../components/TopHeader";
import { Form, Input, InputNumber, Button } from "antd";
import { FaMinus, FaPlus } from "react-icons/fa";

const JoinTeam = () => {
  const [joinTeamFormRef] = Form.useForm();
  const [internalValue, setInternalValue] = useState(2000);

  const onFinish = (values) => {
    console.log("Form Values:", values);
  };

  const increment = () => {
    const newValue = internalValue + 100;
    setInternalValue(newValue);
  };

  const decrement = () => {
    const newValue = internalValue - 100;
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
      <div style={{ maxWidth: 400, margin: "0 auto", padding: 20 }}>
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

          <Form.Item className="w-full flex justify-center">
            <Button type="primary" htmlType="submit">
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
