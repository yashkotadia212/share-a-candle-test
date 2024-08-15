import React, { useEffect } from "react";
import { Form, Input, Select, DatePicker, Radio, Button, message } from "antd";
import dayjs from "dayjs"; // For date formatting and parsing
import useAxios from "../hooks/useAxios";
import { useNavigate } from "react-router-dom";
import Loader from "../components/Loader";
import useAuthStore from "../zustand/authStore";
import TopHeaderResponsive from "../components/TopHeaderResponsive";
import Footer from "../components/Footer";

const { Option } = Select;
const { RangePicker } = DatePicker;

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
    getProductTypeCollections.getData();
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

  return (
    <>
      {getProductTypeCollections.loading || postOrganizeEventData.loading ? (
        <Loader />
      ) : (
        <div>
          <TopHeaderResponsive />
          <div className="w-full h-full flex mt-[25px]">
            <Form
              form={organizeEventForm}
              name="organization-form"
              onFinish={onFinish}
              initialValues={{
                minTeamSize: 1,
                maxTeamSize: 1,
                organizationType: "Non-Profit",
              }}
              style={{ maxWidth: "600px", margin: "0 auto" }}
              labelCol={{ span: 8 }}
              wrapperCol={{ span: 16 }}
            >
              <Form.Item
                name="eventName"
                label="Event Name"
                rules={[
                  { required: true, message: "Please input the event name!" },
                ]}
              >
                <Input placeholder="Enter event name" />
              </Form.Item>

              <Form.Item
                name="organizationType"
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
                label="Category"
                rules={[
                  { required: true, message: "Please input the category!" },
                ]}
              >
                <Input placeholder="Enter category" />
              </Form.Item>

              <Form.Item
                name="organizationName"
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
                label="Zipcode"
                rules={[
                  { required: true, message: "Please input the zipcode!" },
                  {
                    pattern: /^[0-9]{5}$/,
                    message: "Zipcode must be 5 digits!",
                  },
                ]}
              >
                <Input placeholder="Enter zipcode" />
              </Form.Item>

              <Form.Item
                name="teamSize"
                label="Team Size"
                rules={[
                  { required: true, message: "Please select the team size!" },
                ]}
              >
                <Radio.Group
                  optionType="button"
                  buttonStyle="solid"
                  className="flex flex-wrap gap-2"
                  onChange={(e) => setTeamSize(e.target.value)}
                >
                  <Radio value="1-1">Just me</Radio>
                  <Radio value="1-10">1 - 10</Radio>
                  <Radio value="11-20">11 - 20</Radio>
                  <Radio value="21-30">21 - 30</Radio>
                  <Radio value="31-40">31 - 40</Radio>
                  <Radio value="41-50">41 - 50</Radio>
                  <Radio value="51-999">51+</Radio>
                </Radio.Group>
              </Form.Item>

              <Form.Item
                name="productType"
                label="Product Type"
                rules={[
                  { required: true, message: "Please input the product type!" },
                ]}
              >
                {/* <Input placeholder="Enter product type" /> */}
                <Radio.Group optionType="button" buttonStyle="solid">
                  {productTypeCollections.map((productType, index) => (
                    <Radio
                      disabled={
                        productType?.title === "Customizable" &&
                        (teamSize == "" ||
                          teamSize == "1-1" ||
                          teamSize == "1-10")
                      }
                      key={index}
                      value={productType?.id}
                    >
                      {productType?.title}
                    </Radio>
                  ))}
                </Radio.Group>
              </Form.Item>

              <Form.Item
                name="dateRange"
                label="Event Date Range"
                rules={[
                  {
                    required: true,
                    message: "Please select the event date range!",
                  },
                ]}
              >
                <RangePicker
                  format="YYYY-MM-DD"
                  placeholder={["Start Date", "End Date"]}
                  style={{ width: "100%" }}
                />
              </Form.Item>

              <Form.Item className="w-full flex justify-center">
                <Button type="primary" htmlType="submit">
                  Submit
                </Button>
              </Form.Item>
            </Form>
          </div>
          <Footer />
        </div>
      )}
    </>
  );
};

export default OrganizeEvent;
