import React, { useEffect, useState } from "react";
import { Progress, List, Tooltip } from "antd";
import { InfoCircleOutlined } from "@ant-design/icons";
import { FaCheck, FaXmark } from "react-icons/fa6";

const PasswordStrengthMeter = ({ password }) => {
  const [strength, setStrength] = useState(0);

  useEffect(() => {
    calculateStrength(password);
  }, [password]);

  // Function to calculate the strength score based on password criteria
  const calculateStrength = (password) => {
    let score = 0;
    const minLength = password?.length >= 8;
    const hasNumber = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    const hasUppercase = /[A-Z]/.test(password);
    const hasLowercase = /[a-z]/.test(password);

    if (minLength) score += 20;
    if (hasNumber) score += 20;
    if (hasSpecialChar) score += 20;
    if (hasUppercase) score += 20;
    if (hasLowercase) score += 20;

    setStrength(score);
  };

  const criteria = [
    { text: "Minimum 8 characters", check: password?.length >= 8 },
    { text: "At least 1 number", check: /\d/.test(password) },
    {
      text: "At least 1 special character",
      check: /[!@#$%^&*(),.?":{}|<>]/.test(password),
    },
    { text: "At least 1 uppercase letter", check: /[A-Z]/.test(password) },
    { text: "At least 1 lowercase letter", check: /[a-z]/.test(password) },
  ];

  return (
    <div className="-mt-4 relative mb-4">
      <Progress
        size={"small"}
        percent={strength}
        showInfo={false}
        strokeColor={
          strength === 100 ? "#52c41a" : strength >= 60 ? "#faad14" : "#f5222d"
        }
        className="mb-2"
      />

      <List
        size="small"
        dataSource={criteria}
        renderItem={(item) => (
          <List.Item className="!py-px">
            <div className="flex items-center">
              {item.check ? (
                <div style={{ color: "green", marginRight: "8px" }}>
                  <FaCheck />
                </div>
              ) : (
                <div style={{ color: "red", marginRight: "8px" }}>
                  <FaXmark />
                </div>
              )}
              <div>{item.text}</div>
            </div>
          </List.Item>
        )}
      />
      <Tooltip
        className="absolute right-0 bottom-0"
        title="Password should include all the criteria listed above"
      >
        <InfoCircleOutlined style={{ fontSize: "16px", marginTop: "10px" }} />
      </Tooltip>
    </div>
  );
};

export default PasswordStrengthMeter;
