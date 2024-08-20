import React, { useEffect, useState } from "react";
import {
  Form,
  Input,
  InputNumber,
  Select,
  DatePicker,
  Radio,
  Button,
  message,
  Upload,
} from "antd";
import dayjs from "dayjs"; // For date formatting and parsing
import useAxios from "../hooks/useAxios";
import { useNavigate } from "react-router-dom";
import Loader from "../components/Loader";
import useAuthStore from "../zustand/authStore";
import TopHeaderResponsive from "../components/TopHeaderResponsive";
import Footer from "../components/Footer";
import CreateFormWithSteps from "../components/CreateFormWithSteps";
import customisableIcon from "../assets/icons/customisableIcon.svg";
import nonCustomisableIcon from "../assets/icons/nonCustomisableIcon.svg";
import { IoCheckmarkOutline } from "react-icons/io5";
import { TbFileUpload } from "react-icons/tb";
import { GoArrowUpLeft } from "react-icons/go";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";

const { Option } = Select;
const { RangePicker } = DatePicker;
const { Dragger } = Upload;
dayjs.extend(isSameOrAfter);

const postOrganizeEventDataUrl =
  "https://nbg6jhqi7scugaz3mhtxcscbdy0msbuv.lambda-url.us-east-2.on.aws/";

const getProductTypeCollectionsUrl =
  "https://nbg6jhqi7scugaz3mhtxcscbdy0msbuv.lambda-url.us-east-2.on.aws/?collection=true";

const OrganizeEvent = () => {
  const { auth } = useAuthStore();
  const [organizeEventForm] = Form.useForm();
  const navigate = useNavigate();
  const postOrganizeEventData = useAxios(postOrganizeEventDataUrl);
  const getProductTypeCollections = useAxios(getProductTypeCollectionsUrl);
  const [productTypeCollections, setProductTypeCollections] = React.useState(
    []
  );
  const [teamSize, setTeamSize] = React.useState("");

  const onFinish = (values) => {
    message.success("Form submitted successfully!");

    let organizeEventDetails = {
      eventName: values.eventName,
      organizationType: values.organizationType,
      category: values.category,
      organizationName: values.organizationName,
      zipcode: values.zipcode,
      minTeamSize: parseInt(values.teamSize.split("-")[0]),
      maxTeamSize: parseInt(values.teamSize.split("-")[1]),
      productType: values.productType.toString(),
      startDate: dayjs(values.dateRange[0]).format("YYYY-MM-DD"),
      endDate: dayjs(values.dateRange[1]).format("YYYY-MM-DD"),
      email: auth?.email,
    };
    console.log("Form Values:", organizeEventDetails);

    postOrganizeEventData.postData(organizeEventDetails);
    navigate("/events");
  };

  useEffect(() => {
    if (postOrganizeEventData.error) {
      message.error("An error occurred. Please try again later.");
    } else if (postOrganizeEventData.data) {
      console.log("Data posted successfully:", postOrganizeEventData.data);
    }
  }, [postOrganizeEventData]);

  useEffect(() => {
    // getProductTypeCollections.getData();
  }, []);

  useEffect(() => {
    if (getProductTypeCollections.error) {
      message.error(
        "An error occurred. Please try again later." +
          getProductTypeCollections.error
      );
    } else if (getProductTypeCollections.data) {
      console.log("Product Type Collections:", getProductTypeCollections.data);
      setProductTypeCollections(getProductTypeCollections.data);
    }
  }, [getProductTypeCollections]);

  useEffect(() => {
    console.log(organizeEventForm.getFieldValue("productType"));
    let currentProductTypeId = organizeEventForm.getFieldValue("productType");
    let selectedProductTypeObj = productTypeCollections.find(
      (productType) => productType.id === currentProductTypeId
    );
    if (
      selectedProductTypeObj?.title === "Customizable" &&
      (teamSize == "" || teamSize == "1-1" || teamSize == "1-10")
    ) {
      organizeEventForm.setFieldsValue({
        productType: productTypeCollections.find(
          (productType) => productType.title === "Non Customizable"
        )?.id,
      });
    }
  }, [teamSize]);

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
    <div className="w-full h-full flex flex-col justify-center items-center bg-theme-background p-5">
      <div className="text-2xl font-semibold">Whoa !</div>
      <div className="text-center my-1">Your team's estimated earnings are</div>
      <div className="text-2xl font-semibold">$600 - $700</div>
      <div className="text-center mt-1">
        for the chosen team size and event window
      </div>
    </div>
  );

  const Form1 = ({ form }) => (
    <Form
      form={form}
      layout="vertical"
      requiredMark={false} // This hides the required asterisk
      className="max-w-[300px] create-form-with-steps-label-bold"
      size="large"
    >
      <Form.Item
        name="event_name"
        label="Event Name"
        rules={[{ required: true, message: "Please input the event name!" }]}
      >
        <Input placeholder="Enter event name" />
      </Form.Item>
    </Form>
  );
  const Form2 = ({ form }) => (
    <Form
      form={form}
      layout="vertical"
      requiredMark={false} // This hides the required asterisk
      className="max-w-[300px] create-form-with-steps-label-bold"
      size="large"
    >
      <Form.Item
        name="organization_type"
        label="Organization Type"
        rules={[
          {
            required: true,
            message: "Please select the organization type!",
          },
        ]}
      >
        <Select placeholder="Select organization type">
          <Option value="Non-Profit">Non-Profit</Option>
          <Option value="Sports">Sports</Option>
          <Option value="Educational">Educational</Option>
          {/* Add more options as needed */}
        </Select>
      </Form.Item>

      <Form.Item
        name="category"
        label="Organization sub category"
        rules={[
          {
            required: true,
            message: "Please input the organization name!",
          },
        ]}
      >
        <Input placeholder="Enter organization name" />
      </Form.Item>

      <Form.Item
        name="organization_name"
        label="Organization Name"
        rules={[
          {
            required: true,
            message: "Please input the organization name!",
          },
        ]}
      >
        <Input placeholder="Enter organization name" />
      </Form.Item>

      <Form.Item
        name="zipcode"
        label="Zip Code"
        rules={[
          { required: true, message: "Please input the zipcode!" },
          {
            pattern: /^[0-9]{5}$/,
            message: "Zipcode must be 5 digits!",
          },
        ]}
      >
        <InputNumber placeholder="eg.: 96162" className="w-full" />
      </Form.Item>
    </Form>
  );
  const Form3 = ({ form }) => {
    const [isTickVisible, setIsTickVisible] = React.useState(false);
    const [fileList, setFileList] = useState([]);

    const handleUploadChange = ({ fileList }) => {
      console.log("File List:", fileList);
      setFileList(fileList);
    };

    const disabledStartDate = (current) => {
      const minStartDate = dayjs().add(8, "day").startOf("day");
      return current && current.isBefore(minStartDate);
    };

    const disabledEndDate = (current, startDate) => {
      if (!startDate) {
        return true; // Disable all dates if no start date is selected
      }
      const minEndDate = dayjs(startDate).add(1, "days");
      const maxEndDate = dayjs(startDate).add(14, "days");
      return (
        current.isBefore(minEndDate.startOf("day")) ||
        current.isAfter(maxEndDate.endOf("day"))
      );
    };

    return (
      <Form
        form={form}
        layout="vertical"
        requiredMark={false} // This hides the required asterisk
        className="max-w-[300px] create-form-with-steps-label-bold"
        size="large"
        initialValues={{ is_customizable: false }}
      >
        <Form.Item
          name="team_size"
          label="Team Size"
          rules={[{ required: true, message: "Please select the team size!" }]}
        >
          <Radio.Group
            optionType="button"
            buttonStyle="solid"
            className="flex flex-wrap gap-3 xs:w-[300px] sm:w-[500px] md:w-[620px]"
            onChange={(e) => setTeamSize(e.target.value)}
          >
            <Radio
              className="w-36 !h-12 pt-[5px] text-center !rounded-lg"
              value="1-1"
            >
              Just me
            </Radio>
            <Radio
              className="w-36 !h-12 pt-[5px] text-center !rounded-lg before:!w-[15px] before:rounded-lg before:!bg-transparent before:border-s before:!h-[99%]"
              value="1-10"
            >
              1 - 10
            </Radio>
            <Radio
              className="w-36 !h-12 pt-[5px] text-center !rounded-lg before:!w-[15px] before:rounded-lg before:!bg-transparent before:border-s before:!h-[99%]"
              value="11-20"
            >
              11 - 20
            </Radio>
            <Radio
              className="w-36 !h-12 pt-[5px] text-center !rounded-lg before:!w-[15px] before:rounded-lg before:!bg-transparent before:border-s before:!h-[99%]"
              value="21-30"
            >
              21 - 30
            </Radio>
            <Radio
              className="w-36 !h-12 pt-[5px] text-center !rounded-lg before:!w-[15px] before:rounded-lg before:!bg-transparent before:border-s before:!h-[99%]"
              value="31-40"
            >
              31 - 40
            </Radio>
            <Radio
              className="w-36 !h-12 pt-[5px] text-center !rounded-lg before:!w-[15px] before:rounded-lg before:!bg-transparent before:border-s before:!h-[99%]"
              value="41-50"
            >
              41 - 50
            </Radio>
            <Radio
              className="w-36 !h-12 pt-[5px] text-center !rounded-lg before:!w-[15px] before:rounded-lg before:!bg-transparent before:border-s before:!h-[99%]"
              value="51-999"
            >
              51+
            </Radio>
            <Radio
              className="w-36 !h-12 pt-[5px] text-center !rounded-lg before:!w-[15px] before:rounded-lg before:!bg-transparent before:border-s before:!h-[99%]"
              value="0"
            >
              I'm not sure
            </Radio>
          </Radio.Group>
        </Form.Item>

        <Form.Item
          name="is_customizable"
          rules={[
            { required: true, message: "Please input the product type!" },
          ]}
        >
          <Radio.Group
            // optionType="button"
            className="flex gap-3 w-[700px]"
            optionType="button"
            buttonStyle="outline"
            size="small"
            onChange={() => {
              setIsTickVisible(form.getFieldValue("is_customizable"));
            }}
          >
            <IsCustomizableCard
              logo={nonCustomisableIcon}
              title={"Non-Customizable"}
              text={"Standard products without logo customization"}
            >
              <Radio
                value={false}
                className="w-6 flex justify-center items-center"
              >
                {!isTickVisible ? (
                  <IoCheckmarkOutline className="text-lg" />
                ) : (
                  ""
                )}
              </Radio>{" "}
            </IsCustomizableCard>{" "}
            <IsCustomizableCard
              logo={customisableIcon}
              title={"Customizable"}
              text={"Upload your logo to our standard unlabeled product"}
            >
              <Radio
                value={true}
                className="w-6 flex justify-center items-center"
              >
                {isTickVisible ? (
                  <IoCheckmarkOutline className="text-lg" />
                ) : (
                  ""
                )}{" "}
              </Radio>
            </IsCustomizableCard>
          </Radio.Group>
        </Form.Item>

        <div className="flex gap-3 w-[700px]">
          <Form.Item
            name="logo"
            label="Upload a Logo"
            valuePropName="fileList"
            getValueFromEvent={(e) => e && e.fileList}
            rules={[{ required: true, message: "Please upload your logo!" }]}
            className="w-[390px]"
          >
            <Dragger
              name="logo"
              multiple={false}
              fileList={fileList}
              beforeUpload={() => false} // Prevent auto-upload
              onChange={handleUploadChange}
              className="w-[390px] organize-event-choose-custom-product-input"
            >
              <div className="flex items-center gap-3">
                <div>
                  <TbFileUpload />
                </div>
                <div>
                  Drag & Drop file here or{" "}
                  <span className="font-semibold underline">Choose File</span>
                </div>
              </div>
            </Dragger>
          </Form.Item>
          <div className="w-[390px] border h-[57px] mt-[29px] rounded-lg flex justify-center items-center cursor-pointer">
            <div>
              <GoArrowUpLeft className="text-2xl" />
            </div>
            <div>View Product</div>
          </div>
        </div>

        <div className="flex items-center gap-3 w-[700px]">
          <Form.Item
            name="start_date"
            label="Start Date"
            className="w-[345px]"
            rules={[
              { required: true, message: "Please select a start date!" },
              () => ({
                validator(_, value) {
                  const minStartDate = dayjs().add(8, "day").startOf("day");
                  if (!value || value.isSameOrAfter(minStartDate)) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error("Start date must be at least 8 days from today!")
                  );
                },
              }),
            ]}
          >
            <DatePicker
              placeholder="Select start date"
              className="w-full rounded-lg p-3"
              showTime={{ format: "HH:mm" }}
              disabledDate={disabledStartDate}
            />
          </Form.Item>

          <Form.Item
            name="end_date"
            label="End Date"
            className="w-[345px]"
            rules={[
              { required: true, message: "Please select an end date!" },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (
                    !value ||
                    dayjs(value).isAfter(getFieldValue("start_date"))
                  ) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error("End date must be after the start date!")
                  );
                },
              }),
            ]}
          >
            <DatePicker
              className="w-full rounded-lg p-3"
              placeholder="Select end date"
              showTime={{ format: "HH:mm" }}
              disabledDate={(current) =>
                disabledEndDate(current, form?.getFieldValue("start_date"))
              }
            />
          </Form.Item>
        </div>
      </Form>
    );
  };

  const createEventPropsData = [
    {
      sidebar: <Sidebar1 />,
      title: "Type in the name of your event",
      subtitle:
        "The event name will be displayed in each participant's live store",
      form: <Form1 />,
      nextButtonText: "Next - Team Details",
    },
    {
      sidebar: <Sidebar2 />,
      title: "Tell us about your team",
      subtitle:
        "From sports to arts, we help you fundraise to achieve your goals.",
      form: <Form2 />,
      nextButtonText: "Next - Event Time, Team Size",
    },
    {
      sidebar: <Sidebar3 />,
      title: "Event Time & Team Size",
      subtitle:
        "Choose a team size. Unlock customization with a team of 11 or more",
      form: <Form3 />,
      nextButtonText: "Done",
    },
  ];

  return (
    <>
      {getProductTypeCollections.loading || postOrganizeEventData.loading ? (
        <Loader />
      ) : (
        <div>
          <TopHeaderResponsive />
          <CreateFormWithSteps stepsArray={createEventPropsData} />
          <Footer />
        </div>
      )}
    </>
  );
};

const IsCustomizableCard = ({ children, logo, title, text }) => {
  return (
    <div className="flex items-center gap-4 w-[390px] border p-4 rounded-lg">
      <div className="text-4xl">
        <img src={logo} alt="logo" />
      </div>
      <div className="leading-5">
        <div className="font-semibold text-sm">{title}</div>
        <div className="text-xs text-gray-400">{text}</div>
      </div>
      <div>{children}</div>
    </div>
  );
};

export default OrganizeEvent;
