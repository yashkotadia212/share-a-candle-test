import React, { useState, useEffect } from "react";
import copy from "copy-text-to-clipboard";
import { BsCopy } from "react-icons/bs";
import TopHeader from "../components/TopHeader";
import { message, Modal, Form, Select, Input, DatePicker } from "antd";
import { Divider, List } from "antd";
import { MdOutlineModeEdit } from "react-icons/md";
import { useLocation } from "react-router-dom";
import useAxios from "../hooks/useAxios";
import Loader from "../components/Loader";
import calculateMinutesToTargetDate from "../utils/calculateMinutesToTargetDate";
import dayjs from "dayjs";

function convertMinutes(totalMinutes) {
  if (typeof totalMinutes !== "number") {
    throw new Error("Input must be a non-negative number");
  }

  if (totalMinutes <= 0) {
    return { days: 0, hours: 0, minutes: 0 };
  }

  const days = Math.floor(totalMinutes / (60 * 24));
  const hours = Math.floor((totalMinutes % (60 * 24)) / 60);
  const minutes = totalMinutes % 60;

  return { days, hours, minutes };
}

const supportersListData = [
  {
    supporterName: "Alice Johnson",
    donationHoursAgo: 5,
    city: "New York",
    state: "NY",
    amountInDollars: 100,
    message: "Keep up the great work!",
  },
  {
    supporterName: "Bob Smith",
    donationHoursAgo: 2,
    city: "Los Angeles",
    state: "CA",
    amountInDollars: 250,
    // No message provided
  },
  {
    supporterName: "Carol Davis",
    donationHoursAgo: 8,
    city: "Chicago",
    state: "IL",
    amountInDollars: 150,
    message: "Proud to support this cause!",
  },
  {
    supporterName: "David Lee",
    donationHoursAgo: 12,
    city: "Houston",
    state: "TX",
    amountInDollars: 200,
    // No message provided
  },
  {
    supporterName: "Eva Martinez",
    donationHoursAgo: 1,
    city: "San Francisco",
    state: "CA",
    amountInDollars: 75,
    message: "Happy to contribute!",
  },
  {
    supporterName: "Frank Wilson",
    donationHoursAgo: 3,
    city: "Seattle",
    state: "WA",
    amountInDollars: 125,
    message: "Glad to help out!",
  },
  {
    supporterName: "Grace Taylor",
    donationHoursAgo: 7,
    city: "Denver",
    state: "CO",
    amountInDollars: 90,
    message: "Supporting a great cause!",
  },
  {
    supporterName: "Hank Green",
    donationHoursAgo: 6,
    city: "Phoenix",
    state: "AZ",
    amountInDollars: 110,
    message: "Keep making a difference!",
  },
  {
    supporterName: "Ivy Brown",
    donationHoursAgo: 4,
    city: "Philadelphia",
    state: "PA",
    amountInDollars: 180,
    message: "Thank you for all you do!",
  },
  {
    supporterName: "Jack White",
    donationHoursAgo: 9,
    city: "San Antonio",
    state: "TX",
    amountInDollars: 220,
    message: "Here’s to making an impact!",
  },
  {
    supporterName: "Kara Black",
    donationHoursAgo: 11,
    city: "Dallas",
    state: "TX",
    amountInDollars: 95,
    message: "Keep up the good work!",
  },
  {
    supporterName: "Liam Harris",
    donationHoursAgo: 10,
    city: "San Diego",
    state: "CA",
    amountInDollars: 135,
    message: "Proud to be part of this!",
  },
  {
    supporterName: "Mia Clark",
    donationHoursAgo: 15,
    city: "San Jose",
    state: "CA",
    amountInDollars: 300,
    message: "Happy to support this initiative!",
  },
  {
    supporterName: "Noah Lewis",
    donationHoursAgo: 14,
    city: "Austin",
    state: "TX",
    amountInDollars: 140,
    message: "Glad to contribute!",
  },
  {
    supporterName: "Olivia King",
    donationHoursAgo: 13,
    city: "Jacksonville",
    state: "FL",
    amountInDollars: 70,
    message: "Happy to help!",
  },
  {
    supporterName: "Paul Young",
    donationHoursAgo: 16,
    city: "Columbus",
    state: "OH",
    amountInDollars: 80,
    message: "Every little bit helps!",
  },
  {
    supporterName: "Quinn Scott",
    donationHoursAgo: 18,
    city: "Indianapolis",
    state: "IN",
    amountInDollars: 65,
    message: "Glad to be of assistance!",
  },
];

const leaderboardListData = [
  { rank: 1, teamMemberName: "Bob Smith", donation: 1500 },
  { rank: 2, teamMemberName: "Ivy Brown", donation: 1000 },
  { rank: 3, teamMemberName: "Grace Taylor", donation: 950 },
  { rank: 4, teamMemberName: "Eva Martinez", donation: 800 },
  { rank: 5, teamMemberName: "Carol Davis", donation: 700 },
  { rank: 6, teamMemberName: "Jack White", donation: 650 },
  { rank: 7, teamMemberName: "Alice Johnson", donation: 500 },
  { rank: 8, teamMemberName: "Frank Wilson", donation: 450 },
  { rank: 9, teamMemberName: "Hank Green", donation: 300 },
  { rank: 10, teamMemberName: "David Lee", donation: 1200 },
  { rank: 11, teamMemberName: "Liam Harris", donation: 550 },
  { rank: 12, teamMemberName: "Mia Clark", donation: 400 },
  { rank: 13, teamMemberName: "Noah Lewis", donation: 350 },
  { rank: 14, teamMemberName: "Olivia King", donation: 300 },
  { rank: 15, teamMemberName: "Paul Young", donation: 275 },
  { rank: 16, teamMemberName: "Quinn Scott", donation: 250 },
  { rank: 17, teamMemberName: "Riley Adams", donation: 225 },
  { rank: 18, teamMemberName: "Sophia Brown", donation: 200 },
  { rank: 19, teamMemberName: "Thomas Green", donation: 175 },
  { rank: 20, teamMemberName: "Ursula White", donation: 150 },
];

const productNumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

// Option data for Select components
const organizationTypes = [
  { value: "non-profit", label: "Non-Profit" },
  { value: "charity", label: "Charity" },
  { value: "foundation", label: "Foundation" },
  // Add more options as needed
];

const subCategories = [
  { value: "education", label: "Education" },
  { value: "health", label: "Health" },
  { value: "environment", label: "Environment" },
  // Add more options as needed
];

const { Option } = Select;
const { RangePicker } = DatePicker;

const getEventByIdUrl =
  "https://nbg6jhqi7scugaz3mhtxcscbdy0msbuv.lambda-url.us-east-2.on.aws/";

const EventDetails = () => {
  const { state } = useLocation();
  const getEventById = useAxios(getEventByIdUrl);
  const [eventBasicDetailsForm] = Form.useForm();
  const [eventStartsInForm] = Form.useForm();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [eventData, setEventData] = useState({});
  const [isTimeModalVisible, setIsTimeModalVisible] = useState(false);
  const [selectedRange, setSelectedRange] = useState(null);

  const showModal = () => {
    eventBasicDetailsForm.setFieldsValue({
      eventName: eventData?.event?.eventName,
      organizationType: eventData?.event?.organizationType,
      subCategory: eventData?.event?.category,
      organizationName: eventData?.event?.organizationName,
    });
    setIsModalOpen(true);
  };

  const handleOk = () => {
    eventBasicDetailsForm.submit();
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const onFinish = (values) => {
    // console.log("Form values:", values);
    setIsModalOpen(false);
  };

  useEffect(() => {
    // console.log("EVENT ID:", { id: state.eventId });
    getEventById.getData({ id: state.eventId });
  }, [state]);

  useEffect(() => {
    if (getEventById.error) {
      message.error(
        "An error occurred. Please try again later. " + getEventById.error
      );
    }
    setEventData(getEventById.data);
  }, [getEventById]);

  const showTimeModal = () => {
    setSelectedRange([
      dayjs(eventData?.event?.startDate),
      dayjs(eventData?.event?.endDate),
    ]);
    setIsTimeModalVisible(true);
  };

  const handleOkOfTimeModal = () => {
    if (selectedRange) {
      console.log("Selected range:", selectedRange);
    } else {
      message.error("Please select a date range");
    }
    setIsTimeModalVisible(false);
  };

  const handleCancelOfTimeModaal = () => {
    setIsTimeModalVisible(false);
  };

  const onRangeChangeOfTimeModal = (dates, dateStrings) => {
    setSelectedRange(dates);
  };

  return (
    <>
      {getEventById.loading ? (
        <Loader />
      ) : (
        <div>
          <TopHeader />
          <div className="flex justify-between mt-10">
            <EventBasicDetails
              eventBasicDetails={{
                eventName: eventData?.event?.eventName,
                organizationType: eventData?.event?.organizationType,
                subCategory: eventData?.event?.category,
                organizationName: eventData?.event?.organizationName,
              }}
              showModal={showModal}
            />
            <ShareCode eventCode={eventData?.event?.eventCode} />
          </div>
          <div className="mt-10 flex justify-between">
            <EventStartsIn
              startDate={eventData?.event?.startDate}
              endDate={eventData?.event?.endDate}
              showTimeModal={showTimeModal}
            />
            <Earnings />
          </div>
          <div className="flex mt-10">
            <div className="w-1/2">
              <SupportersList />
            </div>
            <div className="w-1/2">
              <LeaderboardList />
            </div>
          </div>
          <div className="mt-14">
            <div className="text-2xl font-semibold">Products</div>
            <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 mt-3 max-w-[3500px]">
              {productNumbers.map((productNumber) => (
                <div key={productNumber} className="p-3 flex justify-center">
                  <ProductCard productIndex={productNumber} />
                </div>
              ))}
            </div>
          </div>
          <Modal
            centered
            title="Event Details"
            open={isModalOpen}
            onOk={handleOk}
            onCancel={handleCancel}
          >
            <Form
              form={eventBasicDetailsForm}
              name="basic"
              initialValues={{ remember: true }}
              onFinish={onFinish}
              layout="vertical"
            >
              {/* Event Name */}
              <Form.Item
                label="Event Name"
                name="eventName"
                rules={[
                  { required: true, message: "Please input the event name!" },
                ]}
              >
                <Input />
              </Form.Item>

              {/* Organization Type */}
              <Form.Item
                label="Organization Type"
                name="organizationType"
                rules={[
                  {
                    required: true,
                    message: "Please select the organization type!",
                  },
                ]}
              >
                <Select placeholder="Select an organization type">
                  {organizationTypes.map((type) => (
                    <Option key={type.value} value={type.value}>
                      {type.label}
                    </Option>
                  ))}
                </Select>
              </Form.Item>

              {/* Sub Category */}
              <Form.Item
                label="Sub Category"
                name="subCategory"
                rules={[
                  {
                    required: true,
                    message: "Please select the sub category!",
                  },
                ]}
              >
                <Select placeholder="Select a sub category">
                  {subCategories.map((category) => (
                    <Option key={category.value} value={category.value}>
                      {category.label}
                    </Option>
                  ))}
                </Select>
              </Form.Item>

              {/* Organization Name */}
              <Form.Item
                label="Organization Name"
                name="organizationName"
                rules={[
                  {
                    required: true,
                    message: "Please input the organization name!",
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </Form>
          </Modal>
          <Modal
            width={505}
            height={600}
            centered
            title="Edit Event Dates"
            open={isTimeModalVisible}
            onOk={handleOkOfTimeModal}
            onCancel={handleCancelOfTimeModaal}
            okButtonProps={{
              disabled: !selectedRange,
            }}
          >
            <RangePicker
              value={selectedRange}
              className="mb-80 w-full"
              showTime
              onChange={onRangeChangeOfTimeModal}
            />
          </Modal>
        </div>
      )}
    </>
  );
};

const ShareCode = ({ eventCode }) => {
  return (
    <div className="w-80 bg-black text-white p-4 py-5 rounded-xl">
      <div className="flex justify-between">
        <div>
          <div>Share Code</div>
          <div className="mt-2 text-2xl">{eventCode}</div>
        </div>
        <div className="flex items-center me-1">
          <button>
            <BsCopy
              className="text-2xl hover:text-gray-400 transition"
              onClick={() => {
                copy(eventCode);
                message.success("Code copied to clipboard");
              }}
            />
          </button>
        </div>
      </div>
    </div>
  );
};

const EventBasicDetails = ({ showModal, eventBasicDetails }) => {
  return (
    <div className="flex items-center gap-4">
      <div>
        <img
          alt="name placeholder"
          src={`https://ui-avatars.com/api/?name=${eventBasicDetails.eventName
            ?.toLowerCase()
            .replace(/\s+/g, "+")}&font-size=0.33&size=45&color=fff`}
          className="rounded-full"
        />
      </div>
      <div className="flex flex-col">
        <div>
          <div className="text-gray-400">
            {eventBasicDetails.organizationType} -{" "}
            {eventBasicDetails.subCategory}
            <button className="ml-2" onClick={() => showModal()}>
              <MdOutlineModeEdit className="text-lg text-gray-500" />
            </button>
          </div>
        </div>
        <div className="text-xl">{eventBasicDetails.eventName}</div>
        <div className="text-gray-800">
          {eventBasicDetails.organizationName}
        </div>
      </div>
    </div>
  );
};

const EventStartsIn = ({ startDate, endDate, showTimeModal }) => {
  const startsInMinutes = convertMinutes(
    calculateMinutesToTargetDate(startDate)
  );

  const endsInMinutes = convertMinutes(calculateMinutesToTargetDate(endDate));

  const status =
    startsInMinutes.days > 0 &&
    startsInMinutes.hours > 0 &&
    startsInMinutes.minutes > 0
      ? "Upcoming"
      : endsInMinutes.days == 0 &&
        endsInMinutes.hours == 0 &&
        endsInMinutes.minutes == 0
      ? "Ended"
      : "Ongoing";

  return (
    <>
      {status === "Upcoming" && (
        <div className="p-4 rounded-xl">
          <div className="flex">
            <div className="text-xl">Event Starts in</div>
            <button
              className="ml-2"
              onClick={() => {
                showTimeModal();
              }}
            >
              <MdOutlineModeEdit className="text-lg text-gray-500" />
            </button>
          </div>
          <div className="text-3xl">
            {startsInMinutes.days}{" "}
            <span className="text-gray-500 text-2xl">Days</span>{" "}
            {startsInMinutes.hours}{" "}
            <span className="text-gray-500 text-2xl">Hours</span>{" "}
            {startsInMinutes.minutes}{" "}
            <span className="text-gray-500 text-2xl">Minutes</span>{" "}
          </div>
        </div>
      )}

      {status === "Ongoing" && (
        <div className="p-4 rounded-xl">
          <div className="text-2xl text-green-600">Event is Ongoing</div>
          <div className="text-xl">Event Ends in</div>
          <div className="text-3xl">
            {endsInMinutes.days}{" "}
            <span className="text-gray-500 text-2xl">Days</span>{" "}
            {endsInMinutes.hours}{" "}
            <span className="text-gray-500 text-2xl">Hours</span>{" "}
            {endsInMinutes.minutes}{" "}
            <span className="text-gray-500 text-2xl">Minutes</span>{" "}
          </div>
        </div>
      )}

      {status === "Ended" && (
        <div className="p-4 rounded-xl text-red-600">
          <div className="text-3xl">
            Event Ended on {dayjs(endDate).format("MMM D YYYY")}
          </div>
        </div>
      )}
    </>
  );
};

const Earnings = () => {
  return (
    <div className="flex gap-5">
      <div>
        <div className="text-xl text-center">
          <div>Estimated Earnings</div>
          <div className="text-sm text-gray-400">/Team Members</div>
        </div>
        <div className="text-center mt-2">
          <span className="text-3xl font-semibold">$500</span>
          <span className="text-sm text-gray-400">/60</span>
        </div>
      </div>

      <div>
        <div className="text-xl text-center">
          <div>Current Earnings</div>
          <div className="text-sm text-gray-400">/No. of Supporters</div>
        </div>
        <div className="text-center mt-2">
          <span className="text-3xl font-semibold">$600</span>
          <span className="text-sm text-gray-400">/12</span>
        </div>
      </div>

      <div>
        <div className="text-xl text-center">
          <div>Total Earnings</div>
          <div className="text-sm text-gray-400">/No. of Orders</div>
        </div>
        <div className="text-center mt-2">
          <span className="text-3xl font-semibold">$300</span>
          <span className="text-sm text-gray-400">/23</span>
        </div>
      </div>
    </div>
  );
};

const SupporterCard = ({ supporter }) => {
  return (
    <div className="flex gap-4 w-full items-center">
      <div>
        <img
          alt="name placeholder"
          src={`https://ui-avatars.com/api/?name=${supporter.supporterName.replace(
            " ",
            "+"
          )}&font-size=0.33&size=40&color=fff`}
          className="rounded-full"
        />
      </div>
      <div>
        <div>
          <div className="text-lg">{supporter.supporterName}</div>
          <div>{supporter.message || ""}</div>
          <div className="text-gray-400">
            {supporter.donationHoursAgo + " hours ago - "} {supporter.city},{" "}
            {supporter.state}
          </div>
        </div>
      </div>
      <div className="ms-auto text-xl font-semibold">
        ${supporter.amountInDollars}
      </div>
    </div>
  );
};

const SupportersList = () => {
  return (
    <div>
      <div className="text-xl font-semibold">Your Supporters</div>
      <Divider
        orientation="left"
        style={{ color: "#333", fontWeight: "normal" }}
      />
      <div className="px-4 h-[500px] overflow-scroll">
        <List
          dataSource={supportersListData}
          renderItem={(item) => (
            <List.Item>
              <SupporterCard supporter={item} />
            </List.Item>
          )}
        />
      </div>
    </div>
  );
};

const LeaderboardCard = ({ supporter }) => {
  return (
    <div className="flex gap-4 w-full items-center">
      <div>
        <div className="text-xl">{supporter.rank}</div>
      </div>
      <div>
        <img
          alt="name placeholder"
          src={`https://ui-avatars.com/api/?name=${supporter.teamMemberName.replace(
            " ",
            "+"
          )}&font-size=0.33&size=40&color=fff`}
          className="rounded-full"
        />
      </div>
      <div>
        <div>
          <div className="text-lg">{supporter.teamMemberName}</div>
        </div>
      </div>
      <div className="ms-auto text-xl font-semibold">${supporter.donation}</div>
    </div>
  );
};

const LeaderboardList = () => {
  return (
    <div>
      <div className="text-xl font-semibold">Leaderboard</div>
      <Divider
        orientation="left"
        style={{ color: "#333", fontWeight: "normal" }}
      />
      <div className="px-4 h-[500px] overflow-scroll">
        <List
          dataSource={leaderboardListData}
          renderItem={(item) => (
            <List.Item>
              <LeaderboardCard supporter={item} />
            </List.Item>
          )}
        />
      </div>
    </div>
  );
};

const ProductCard = ({ productIndex }) => {
  return (
    <div className="w-full h-96 rounded-xl border flex justify-center items-end pb-3 bg-gradient-to-b from-gray-100 to-white">
      <div className="text-xl">Product {productIndex + 1}</div>
    </div>
  );
};

export default EventDetails;
