import React, { useEffect } from "react";
import TopHeader from "../components/TopHeader";
import { FaArrowRight } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { message } from "antd";
import dayjs from "dayjs";
import useAxios from "../hooks/useAxios";
import Loader from "../components/Loader";

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

          <div className="text-3xl font-semibold mt-10">
            Create Event or Join Team
          </div>
          <div className="flex justify-start flex-wrap gap-4 pt-2 pb-10">
            <EventCard
              ev={{
                eventName: "Organize Event",
                url: "/organize-event",
              }}
            />
            <EventCard
              ev={{
                eventName: "Join Team",
                url: "/join-team",
              }}
            />
          </div>

          <div className="text-3xl font-semibold mt-10">My Events</div>
          <div className="flex justify-center flex-wrap gap-4 pt-2 pb-10">
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
        className="border p-4 mt-4 w-64 h-80 rounded-xl flex justify-start bg-gray-200 cursor-pointer hover:shadow-xl hover:scale-[101%] transition"
        onClick={() =>
          navigate(ev.url || `/event-details`, {
            state: { eventId: ev.id },
          })
        }
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
