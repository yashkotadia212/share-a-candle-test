import React, { useState, useEffect } from "react";
import TopHeaderResponsive from "../components/TopHeaderResponsive";
import copy from "copy-text-to-clipboard";
import getEventStatus from "../utils/getEventStatus";
import { BsCopy } from "react-icons/bs";
import {
  message,
  Modal,
  Form,
  Select,
  Input,
  DatePicker,
  Button,
  Popconfirm,
} from "antd";
import { Divider, List } from "antd";
import { MdOutlineModeEdit } from "react-icons/md";
import { useLocation, useNavigate } from "react-router-dom";
import useAxios from "../hooks/useAxios";
import Loader from "../components/Loader";
import calculateMinutesToTargetDate from "../utils/calculateMinutesToTargetDate";
import dayjs from "dayjs";
import normaliseWorddCase from "../utils/normaliseWordsCase";
import useAuthStore from "../zustand/authStore";
import areEmailsSame from "../utils/areEmailsSame";
import Footer from "../components/Footer";

function convertMinutes(totalMinutes) {
  if (typeof totalMinutes !== "number") {
    throw new Error("Input must be a non-negative number");
  }

  if (totalMinutes <= 0) {
    return { days: 0, hours: 0, minutes: 0 };
  }

  const days = Math.floor(totalMinutes / (60 * 24));
  const hours = Math.floor((totalMinutes % (60 * 24)) / 60);
  const minutes = (totalMinutes % 60) + 1;

  return { days, hours, minutes };
}

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

const editEventDetailUrl =
  "https://nbg6jhqi7scugaz3mhtxcscbdy0msbuv.lambda-url.us-east-2.on.aws/";

const approveTeamMemberUrl =
  "https://nbg6jhqi7scugaz3mhtxcscbdy0msbuv.lambda-url.us-east-2.on.aws/";

const deleteEventbyIdUrl =
  "https://nbg6jhqi7scugaz3mhtxcscbdy0msbuv.lambda-url.us-east-2.on.aws/";

const EventDetails = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const getEventById = useAxios(getEventByIdUrl);
  const editEventDetail = useAxios(editEventDetailUrl);
  const approveTeamMember = useAxios(approveTeamMemberUrl);
  const deleteEventById = useAxios(deleteEventbyIdUrl);
  const [eventBasicDetailsForm] = Form.useForm();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [eventData, setEventData] = useState({});
  const [isTimeModalVisible, setIsTimeModalVisible] = useState(false);
  const [selectedRange, setSelectedRange] = useState(null);
  const { auth } = useAuthStore();

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
    values.id = state?.eventId;
    editEventDetail.putData(values);
    setIsModalOpen(false);
  };

  useEffect(() => {
    if (editEventDetail.error) {
      message.error(
        "An error occurred. Please try again later. " + editEventDetail.error
      );
    } else if (editEventDetail.data) {
      message.success("Event details updated successfully");
      setTimeout(() => {
        window.location.reload();
      }, 200);
    }
  }, [editEventDetail]);

  useEffect(() => {
    getEventById.getData({ id: state?.eventId });
  }, [state]);

  useEffect(() => {
    if (getEventById.error) {
      message.error(
        "An error occurred. Please try again later. " + getEventById.error
      );
    } else if (getEventById.data) {
      console.log("Event data:", getEventById.data);

      setEventData(getEventById.data);
    }
  }, [getEventById]);

  console.log("Event data:", eventData?.event?.email, auth?.email);

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
      let startDate = selectedRange[0].format("YYYY-MM-DD HH:mm:ss");
      let endDate = selectedRange[1].format("YYYY-MM-DD HH:mm:ss");

      editEventDetail.putData({
        id: state.eventId,
        startDate: startDate,
        endDate: endDate,
      });
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

  const handleApproveTeamMember = (teamMemberPutData, ev) => {
    ev.stopPropagation(); // Prevents the event from bubbling up to the parent
    approveTeamMember.putData(teamMemberPutData);
  };

  useEffect(() => {
    if (approveTeamMember.error) {
      message.error(
        "An error occurred while approving Team Member. Please try again later. " +
          approveTeamMember.error
      );
    } else if (approveTeamMember.data) {
      message.success("Team member approved successfully");
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    }
  }, [approveTeamMember]);

  const handleDeleteEventById = () => {
    deleteEventById.deleteData(eventData?.event?.id);
  };

  useEffect(() => {
    if (deleteEventById.error) {
      message.error(
        "An error occurred while deleting Event. Please try again later. " +
          deleteEventById.error
      );
    } else if (deleteEventById.data) {
      message.success("Event deleted successfully");
      navigate("/events");
    }
  }, [deleteEventById]);

  return (
    <>
      {getEventById.loading ? (
        <Loader />
      ) : (
        <div>
          <TopHeaderResponsive />
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
            {eventData?.event?.email === auth?.email && (
              <ShareCode eventCode={eventData?.event?.eventCode} />
            )}
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
              <SupportersList supportersList={eventData?.supporters} />
            </div>
            <div className="w-1/2">
              {/* <LeaderboardList /> */}
              <TeamMembersList
                teamMembersList={eventData?.teamMembers}
                handleApproveTeamMember={handleApproveTeamMember}
                eventId={eventData?.event?.id}
                eventCode={eventData?.event?.eventCode}
                isApproveVisible={areEmailsSame(
                  eventData?.event?.email,
                  auth?.email
                )}
              />
            </div>
          </div>
          <div className="mt-14">
            <div className="text-2xl font-semibold">Products</div>
            <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 mt-3 max-w-[3500px]">
              {eventData?.products?.map((product) => (
                <div key={product.id} className="p-3 flex justify-center">
                  <ProductCard product={product} />
                </div>
              ))}
            </div>
          </div>
          <div className="w-full py-10 flex justify-center">
            <Popconfirm
              title="Delete Event"
              description="Are you sure to delete this event?"
              onConfirm={() => handleDeleteEventById()}
              okText="Delete"
              cancelText="Cancel"
            >
              <Button danger size="large" type="primary">
                Delete Event{" "}
              </Button>{" "}
            </Popconfirm>
          </div>
          <Footer />
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

  const status = getEventStatus(startsInMinutes, endsInMinutes);

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
          src={`https://ui-avatars.com/api/?name=${supporter.name.replace(
            " ",
            "+"
          )}&font-size=0.33&size=40&color=fff`}
          className="rounded-full"
        />
      </div>
      <div>
        <div>
          <div className="text-lg">{supporter.name}</div>
          <div>{supporter.message || ""}</div>
          {/* <div className="text-gray-400">
            {supporter.donationHoursAgo + " hours ago - "} {supporter.city},{" "}
            {supporter.state}
          </div> */}
        </div>
      </div>
      <div className="ms-auto text-xl font-semibold">${supporter.total}</div>
    </div>
  );
};

const SupportersList = ({ supportersList }) => {
  return (
    <div>
      <div className="text-xl font-semibold">Your Supporters</div>
      <Divider
        orientation="left"
        style={{ color: "#333", fontWeight: "normal" }}
      />
      <div className="px-4 h-[500px] overflow-scroll">
        <List
          dataSource={supportersList}
          renderItem={(supporter) => (
            <List.Item>
              <SupporterCard supporter={supporter} />
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

const ProductCard = ({ product }) => {
  return (
    <div className="w-full h-[380px] rounded-xl border border-gray-200 shadow-xl p-3 bg-gray-50">
      <div
        className="w-full h-52 rounded-lg"
        style={{
          backgroundImage: `url(${product.image.src})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      ></div>
      <div className="m-1">
        <div className="text-2xl font-semibold">
          {product.title.replace(/-/g, " ")}
        </div>
        <div className="text-xl">
          ${Math.floor(Math.random() * (20 - 10 + 1)) + 10}
        </div>

        <div>
          <span className="text-sm normal-case font-semibold">
            <span>product by </span>
            <span className="font-jua">
              {normaliseWorddCase(product.vendor)}
            </span>
          </span>
        </div>
        <div className="text-xs text-gray-400 mt-1">
          {product.body_html.replace(/<\/?[^>]+(>|$)/g, "").substring(0, 100)}
        </div>
        {/* <div className="my-2">
          <Button type="primary">Buy Now</Button>
        </div> */}
      </div>
    </div>
  );
};

const TeamMembersList = ({
  teamMembersList,
  handleApproveTeamMember,
  eventId,
  eventCode,
  isApproveVisible,
}) => {
  const navigate = useNavigate();

  return (
    <div>
      <div className="text-xl font-semibold">Team Members</div>
      <Divider
        orientation="left"
        style={{ color: "#333", fontWeight: "normal" }}
      />
      <div className="px-4 h-[500px] overflow-scroll">
        <List
          dataSource={teamMembersList}
          renderItem={(teamMember) => (
            <List.Item
              className="cursor-pointer mb-1 hover:shadow-md transition"
              onClick={() => {
                teamMember.status === "approved"
                  ? navigate("/team-member-details", {
                      state: {
                        eventId: eventId,
                        eventCode: eventCode,
                        teamMemberId: teamMember.id,
                      },
                    })
                  : message.error(
                      "You are not authorized to view this page until approved!"
                    );
              }}
            >
              <TeamMemberCard
                teamMember={teamMember}
                handleApproveTeamMember={handleApproveTeamMember}
                isApproveVisible={isApproveVisible}
              />
            </List.Item>
          )}
        />
      </div>
    </div>
  );
};

const TeamMemberCard = ({
  teamMember,
  handleApproveTeamMember,
  isApproveVisible,
}) => {
  return (
    <div
      className="flex gap-4 w-full items-center px-2"
      title={teamMember.description}
    >
      <div>
        <img
          alt="name placeholder"
          src={`https://ui-avatars.com/api/?name=${teamMember.email
            .split("@")[0]
            .replace(" ", "+")}&font-size=0.33&size=40&color=fff`}
          className="rounded-full"
        />
      </div>
      <div>
        <div>{teamMember.name}</div>
        <div>
          <span className="text-gray-400">Fundraising Goal: </span>
          <span className="font-semibold">${teamMember.fundraisingGoal}</span>
        </div>
      </div>
      {isApproveVisible && teamMember.status !== "approved" && (
        <div className="ms-auto">
          <button
            className="bg-green-100 hover:bg-green-800 text-green-800 hover:text-white px-2 py-1 rounded-md transition"
            type="primary"
            onClick={(evnt) =>
              handleApproveTeamMember(
                {
                  id: teamMember.id,
                  memberStatus: "approved",
                },
                evnt
              )
            }
          >
            Approve
          </button>
        </div>
      )}
    </div>
  );
};

export default EventDetails;
