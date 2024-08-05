import React, { useEffect } from "react";
import TopHeader from "../components/TopHeader";
import { FaArrowRight } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { message } from "antd";
import dayjs from "dayjs";
import useAxios from "../hooks/useAxios";
import Loader from "../components/Loader";

// {
//   "id": "018d48b0-25e0-460e-911a-3f09e59a17cc",
//   "eventName": "Share Candle2",
//   "organizationType": "Non-Profit",
//   "category": "Candle",
//   "organizationName": "PLC",
//   "zipcode": "12345",
//   "minTeamSize": null,
//   "maxTeamSize": null,
//   "productType": "Software",
//   "startDate": "2024-08-01",
//   "endDate": "2024-08-05",
//   "eventCode": "CLS1H7"
// }

const getAllEventsUrl =
  "https://nbg6jhqi7scugaz3mhtxcscbdy0msbuv.lambda-url.us-east-2.on.aws/";

const Event = () => {
  const getAllEventsData = useAxios(getAllEventsUrl);

  useEffect(() => {
    getAllEventsData.getData();
  }, []);

  useEffect(() => {
    if (getAllEventsData.error) {
      message.error(
        "An error occurred. Please try again later. " + getAllEventsData.error
      );
    }
    console.log("getAllEventsData", getAllEventsData.data);
  }, [getAllEventsData]);

  return (
    <>
      {getAllEventsData.loading ? (
        <div>
          <Loader />
        </div>
      ) : (
        <div>
          <TopHeader />

          <div className="text-4xl font-semibold">Fundraising</div>
          <div className="text-3xl font-semibold mt-10">My Events</div>

          <div className="flex flex-wrap gap-4">
            {getAllEventsData?.data?.length === 0 && (
              <EventCard
                ev={{
                  eventName: "Organize an Event",
                  url: "/organize-event",
                }}
              />
            )}
            {getAllEventsData?.data?.map((event) => (
              <EventCard ev={event} key={event.id} />
            ))}
          </div>
        </div>
      )}
    </>
  );
};

const EventCard = ({ ev }) => {
  const navigate = useNavigate();

  return (
    <>
      <div
        className="border p-4 mt-4 w-64 h-80 rounded-xl flex justify-start bg-gray-200 cursor-pointer"
        onClick={() => navigate(ev.url || `/event-details`)}
      >
        <div className="mt-auto">
          <div className="flex">
            <div className="text-2xl font-semibold mb-2">{ev.eventName}</div>
            <FaArrowRight className="text-2xl mt-auto ms-2 mb-3" />
          </div>
          {ev.startDate && (
            <div className="mt-auto">
              {dayjs(ev.startDate).format("MMM D, YYYY")}
              {" - "}
              {dayjs(ev.endDate).format("MMM D, YYYY")}
            </div>
          )}
        </div>
      </div>
    </>
  );
};
export default Event;
