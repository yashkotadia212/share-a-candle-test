import React, { useState } from "react";
import AdminTopHeader from "../components/AdminTopHeader";
import { Form, Radio, DatePicker, Select } from "antd";
import AdminTable from "../components/AdminTable";
// import AdminChart from "../components/AdminChart";
import AGAdminChart from "../components/AGAdminChart";

const stat1Array = [
  { title: "Total Sales", value: "$22,000" },
  { title: "Total Orders", value: 200 },
  { title: "Current Earnings", value: "$10,000" },
];

const stat2Array = [
  { title: "Total Events", value: 40 },
  { title: "Total Supporters", value: 2000 },
  { title: "Live Events", value: 2 },
];

const eventTableLegendData = [
  {
    text: "Non-customized Products",
    color: "#8D8D8D",
  },
  {
    text: "Customized Products",
    color: "#6A8BFF",
  },
  {
    text: "Upcoming Payout",
    color: "#B6B6B6",
  },
  {
    text: "Payout Completed",
    color: "#6AFFA6",
  },
  {
    text: "Payout Pending",
    color: "#FF766D",
  },
  {
    text: "Upcoming Event",
    color: "#C4E8C4",
  },
  {
    text: "Running Event",
    color: "#97C3F8",
  },
  {
    text: "Completed Event",
    color: "#94A5FE",
  },
];

const Admin = () => {
  return (
    <div>
      <AdminTopHeader />
      <DateFormatBasedFilter />
      <div className="flex flex-wrap justify-between">
        <AdminStatsCard statsArray={stat1Array} />
        <AdminStatsCard statsArray={stat2Array} />
      </div>
      <div className="flex mt-10">
        <div className="w-3/4 me-2">
          <EventsTable />
        </div>
        <div className="w-1/4 h-fit border border-gray-300 rounded-lg py-8 mt-16">
          <div className="text-xl font-semibold mb-2 text-center">
            Current Earnings
          </div>
          <AGAdminChart />
        </div>
      </div>
    </div>
  );
};

const { Option } = Select;
const { RangePicker } = DatePicker;

const getYearOptions = () => {
  const currentYear = new Date().getFullYear();
  const startYear = currentYear - 50;
  return Array.from({ length: 51 }, (_, index) => currentYear - index).map(
    (year) => (
      <Option key={year} value={year}>
        {year}
      </Option>
    )
  );
};

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const DateFormatBasedFilter = () => {
  const [dateFilterForm] = Form.useForm();
  const [value, setValue] = useState("day");
  const [form] = Form.useForm();

  const handleRadioChange = (e) => {
    setValue(e.target.value);
    form.resetFields();
  };

  const onFinish = (values) => {
    console.log("Received values:", values);
  };

  return (
    <Form
      onFinish={onFinish}
      form={dateFilterForm}
      layout="horizontal"
      className="flex gap-8 items-center"
    >
      <Form.Item>
        <Radio.Group
          onChange={handleRadioChange}
          value={value}
          optionType="button"
          buttonStyle="solid"
          className="bg-black p-1 rounded-md"
        >
          <Radio value="day">Day</Radio>
          <Radio value="month">Month</Radio>
          <Radio value="year">Year</Radio>
          <Radio value="custom">Custom</Radio>
        </Radio.Group>
      </Form.Item>

      {value === "day" && (
        <Form.Item required="true" label="Select a Day" name="day">
          <DatePicker onChange={() => dateFilterForm.submit()} />
        </Form.Item>
      )}

      {value === "month" && (
        <Form.Item required="true" label="Select a Month" name="month">
          <Select
            placeholder="Select a month"
            onChange={() => dateFilterForm.submit()}
          >
            {months.map((month, index) => (
              <Option key={index} value={month}>
                {month}
              </Option>
            ))}
          </Select>
        </Form.Item>
      )}

      {value === "year" && (
        <Form.Item required="true" label="Select a Year" name="year">
          <Select
            onChange={() => dateFilterForm.submit()}
            placeholder="Select a year"
          >
            {getYearOptions()}
          </Select>
        </Form.Item>
      )}

      {value === "custom" && (
        <Form.Item required="true" label="Select a Date Range" name="range">
          <RangePicker onChange={() => dateFilterForm.submit()} />
        </Form.Item>
      )}
    </Form>
  );
};

const AdminStatsCard = ({ statsArray }) => {
  return (
    <div className="border flex w-fit p-4 px-8 rounded-2xl">
      {statsArray.map((stat, index) => {
        return (
          <React.Fragment key={index}>
            <div>
              <div className="text-lg mb-2">{stat.title}</div>
              <div className="text-5xl">{stat.value}</div>
            </div>
            {index !== statsArray.length - 1 && (
              <VerticalSeparator height="100px" />
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
};

const VerticalSeparator = ({ height }) => {
  return (
    <div
      className={`bg-gray-200 mx-16`} // Default to a light gray color
      style={{ height: height || "100%", width: "2px" }} // Apply height and fixed width
    />
  );
};

const EventsTableLegends = () => {
  return (
    <div className="flex flex-wrap gap-6">
      {eventTableLegendData.map((legend, index) => {
        return (
          <div key={index} className="flex items-center gap-2">
            <div
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: legend.color }}
            ></div>
            <div>{legend.text}</div>
          </div>
        );
      })}
    </div>
  );
};

const EventsTable = () => {
  return (
    <div>
      <EventsTableLegends />
      <AdminTable />
    </div>
  );
};

export default Admin;
