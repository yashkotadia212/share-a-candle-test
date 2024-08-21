import React, { useEffect, useState } from "react";
import TopHeaderResponsive from "../components/TopHeaderResponsive";
import {
  Form,
  Input,
  InputNumber,
  Button,
  message,
  Checkbox,
  Upload,
} from "antd";
import { FaMinus, FaPlus } from "react-icons/fa";
import useAxios from "../hooks/useAxios";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import CreateFormWithSteps from "../components/CreateFormWithSteps";
import { FaArrowRight } from "react-icons/fa6";
import { motion } from "framer-motion";
import { TbFileUpload } from "react-icons/tb";
import dayjs from "dayjs";

const { Dragger } = Upload;

const INITIAL_FUNDRAISING_GOAL = 2000;
const STEP_AMOUNT = 100;
const joinTeamUrl =
  "https://ixmiyncibu2bfpr4wt64zbsz2y0rtczr.lambda-url.us-east-2.on.aws/";

const JoinTeam = () => {
  const navigate = useNavigate();
  const joinTeam = useAxios(joinTeamUrl);

  useEffect(() => {
    if (joinTeam?.error) {
      message.error("An error occurred joining team. Please try again later.");
    }
    if (joinTeam?.data) {
      message.success("Successfully joined team!");
      setTimeout(() => {
        navigate("/events");
      }, 1200);
    }
  }, [joinTeam]);

  const Sidebar1 = () => (
    <div className="w-full h-full flex justify-center items-center bg-theme-background text-3xl font-semibold">
      Guide
    </div>
  );
  const Sidebar2 = () => (
    <div className="w-full h-full flex justify-center items-center bg-theme-background text-3xl font-semibold">
      Guide
    </div>
  );
  const Sidebar3 = () => (
    <div className="w-full h-full flex justify-center items-center bg-theme-background text-3xl font-semibold">
      Guide
    </div>
  );

  const Form1 = ({ form }) => {
    const [eventDetails, setEventDetails] = React.useState(null);
    const handleEventCodeClick = () => {
      if (form.getFieldValue("teamCode")?.length !== 7) {
        message.error("Enter valid team Code!");
        return;
      }
      // Call API to get event details based on the event code

      setEventDetails({
        eventname: "Event Name",
        startDateTime: "2022-12-12T01:00:00",
        endDateTime: "2022-12-20T17:00:00",
      });
    };
    return (
      <Form
        form={form}
        layout="vertical"
        requiredMark={false} // This hides the required asterisk
        className="max-w-[300px] create-form-with-steps-label-bold"
        size="large"
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
          <CustomInput handleEventCodeClick={handleEventCodeClick} />
        </Form.Item>

        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={
            eventDetails
              ? { opacity: 1, height: "auto" }
              : { opacity: 0, height: 0 }
          }
          transition={{
            duration: 0.3,
            type: "tween ",
          }}
        >
          {eventDetails ? (
            <div className="w-full">
              <div className="font-semibold">Event Details</div>
              <EventDetailsWithUnderline
                title="Event Name"
                value={eventDetails.eventname}
              />

              <EventDetailsWithUnderline
                title="Start Date"
                value={eventDetails.startDateTime}
              />

              <EventDetailsWithUnderline
                title="End Date"
                value={eventDetails.endDateTime}
              />
            </div>
          ) : (
            ""
          )}
        </motion.div>
      </Form>
    );
  };
  const Form2 = ({ form }) => (
    <>
      <div className="font-semibold">Your virtual live store</div>
      <div className="text-gray-400 mt-1">
        You will have a unique link to share with your friends and family
      </div>

      <div className="font-semibold mt-5">It's a sprint not a marathon</div>
      <div className="text-gray-400 mt-1 mb-8">
        Our fundraising window is tried, true and evidence-based
      </div>
    </>
  );
  const Form3 = ({ form }) => {
    const [internalValue, setInternalValue] = useState(
      INITIAL_FUNDRAISING_GOAL
    );
    const [fileList, setFileList] = useState([]);

    const handleUploadChange = ({ fileList }) => {
      setFileList(fileList);
    };

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
      form.setFieldValue("fundraising_goal", internalValue);
    }, [internalValue]);

    return (
      <Form
        form={form}
        layout="vertical"
        requiredMark={false} // This hides the required asterisk
        className="create-form-with-steps-label-bold"
        size="large"
        initialValues={{
          fundraisingGoal: internalValue,
          is_discoverable: false,
        }}
      >
        <Form.Item
          label="Fundraising Goal"
          name="fundraising_goal"
          className="w-[380px]"
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

        <Form.Item
          name="upload_photo_video"
          label="Upload your store photo or video"
          valuePropName="fileList"
          getValueFromEvent={(e) => e && e.fileList}
          rules={[{ required: true, message: "Please upload your logo!" }]}
          className="w-[380px]"
        >
          <Dragger
            name="logo"
            multiple={false}
            fileList={fileList}
            beforeUpload={() => false} // Prevent auto-upload
            onChange={handleUploadChange}
            className="w-full organize-event-choose-custom-product-input"
          >
            <div className="flex items-center gap-3">
              <div>
                <TbFileUpload className="text-2xl" />
              </div>
              <div>
                Drag & Drop file here or{" "}
                <span className="font-semibold underline">Choose File</span>
              </div>
            </div>
          </Dragger>
        </Form.Item>

        <Form.Item
          className="w-[380px]"
          label="Why are you raising funds?"
          name="description"
          rules={[
            {
              required: true,
              message: "Please input the description!",
            },
          ]}
        >
          <Input.TextArea
            className="w-full"
            rows={5}
            placeholder="e.g., Raising funds for a medical emergency"
          />
        </Form.Item>

        <Form.Item
          className="w-[395px]"
          name="is_discoverable"
          valuePropName="checked"
        >
          <Checkbox className="w-full" size="large">
            Make my store discoverable on shareacandle.com
          </Checkbox>
        </Form.Item>
      </Form>
    );
  };

  const joinTeamPropsData = [
    {
      sidebar: <Sidebar1 />,
      title: "Enter team code",
      subtitle:
        "The team name will be displayed in each participant's live store",
      form: <Form1 />,
      nextButtonText: "Join Now",
    },
    {
      sidebar: <Sidebar2 />,
      title: "Few things to consider",
      subtitle: "Your store goes live once the event window starts",
      form: <Form2 />,
      nextButtonText: "Next: Store Details",
    },
    {
      sidebar: <Sidebar3 />,
      title: "Store Details",
      subtitle: "The details you share here will be displayed in your store",
      form: <Form3 />,
      nextButtonText: "Create my store",
    },
  ];

  return (
    <div>
      <TopHeaderResponsive />
      <CreateFormWithSteps stepsArray={joinTeamPropsData} />
      <Footer />
    </div>
  );
};

const CustomInput = ({ value = "", onChange, handleEventCodeClick }) => {
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
    <>
      <Input
        size="large"
        placeholder="Example: DAC B2D"
        value={value}
        onChange={handleChange}
        className="relative"
      />
      <FaArrowRight
        onClick={handleEventCodeClick}
        className="w-6 h-6 cursor-pointer absolute right-3 top-1/2 transform -translate-y-1/2 text-lg text-gray-300"
      />
    </>
  );
};

const EventDetailsWithUnderline = ({ title, value }) => (
  <div className="flex flex-col w-full my-3">
    <div className="text-gray-400">{title}</div>
    <div className="border-b border-black w-full mt-1">
      {dayjs(value).isValid()
        ? dayjs(value).format("D MMM YYYY, dddd, [at] h:mmA")
        : value}
    </div>
  </div>
);

export default JoinTeam;
