import React, { useEffect } from "react";
import Loader from "../components/Loader";
import TopHeaderResponsive from "../components/TopHeaderResponsive.jsx";
import useAxios from "../hooks/useAxios";
import { Button, message, Modal, Popconfirm } from "antd";
import { useLocation, useNavigate } from "react-router-dom";
import { MdOutlineModeEdit } from "react-icons/md";
import { BiStore } from "react-icons/bi";
import { GrShareOption } from "react-icons/gr";
import HorizontalSeparator from "../components/HorizontalSeparator";
import CustomCheckbox from "../components/CustomCheckbox";
import dayjs from "dayjs";
import calculateMinutesToTargetDate from "../utils/calculateMinutesToTargetDate";
import ShareLink from "../components/ShareLink";
import { Divider, List } from "antd";
import replacePathInUrl from "../utils/replacePathInUrl.js";
import Footer from "../components/Footer.jsx";

const teamMemberDetailsBaseUrl =
  "https://ixmiyncibu2bfpr4wt64zbsz2y0rtczr.lambda-url.us-east-2.on.aws/";

const leaderBoardListUrl =
  "https://nbg6jhqi7scugaz3mhtxcscbdy0msbuv.lambda-url.us-east-2.on.aws/";

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

function sortByTotalSupportersPrice(arr) {
  return arr?.sort((a, b) => b.totalSupportersPrice - a.totalSupportersPrice);
}

const TeamMemberDetails = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [isShareModalVisible, setIsShareModalVisible] = React.useState(false);
  const teamMemberDetails = useAxios(teamMemberDetailsBaseUrl);
  const leaderBoardListData = useAxios(leaderBoardListUrl);

  useEffect(() => {
    leaderBoardListData.getData();
  }, []);

  useEffect(() => {
    if (leaderBoardListData.error) {
      message.error("Error fetching leaderboard details");
    }
  }, [leaderBoardListData]);

  useEffect(() => {
    teamMemberDetails.getData({
      eventCode: state?.eventCode,
      teamMemberId: state?.teamMemberId,
    });
    leaderBoardListData.getData({
      id: state?.eventId,
      leaderboard: true,
    });
  }, [state]);

  useEffect(() => {
    if (teamMemberDetails.error) {
      message.error("Error fetching team member details");
    }
  }, [teamMemberDetails]);

  const handleOkShareModal = () => {
    setIsShareModalVisible(false);
  };

  const handleCancelShareModal = () => {
    setIsShareModalVisible(false);
  };

  const showShareModal = () => {
    setIsShareModalVisible(true);
  };

  return (
    <>
      {teamMemberDetails?.loading || leaderBoardListData?.loading ? (
        <Loader />
      ) : (
        <div>
          <TopHeaderResponsive />
          <div className="flex items-center">
            <div>
              <TeamMemberBasicDetails
                teamMemberBasicDetails={{
                  eventName: teamMemberDetails?.data?.event?.eventName,
                  teamMemberName: teamMemberDetails?.data?.teamMember?.name,
                  organizationName:
                    teamMemberDetails?.data?.event?.organizationName,
                }}
              />
            </div>
            <div className="flex gap-2 ms-auto">
              <Button
                size="large"
                type="primary"
                onClick={() => {
                  const queryParams = new URLSearchParams({
                    eventCode: state?.eventCode,
                    teamMemberId: state?.teamMemberId,
                  }).toString();
                  navigate(`/store?${queryParams}`);
                }}
              >
                <div>
                  <BiStore className="text-2xl" />
                </div>
                My Store
              </Button>
              <Button
                size="large"
                type="primary"
                onClick={() => showShareModal()}
              >
                <div>
                  <GrShareOption className="text-2xl" />
                </div>
                Share Store Link{" "}
              </Button>
            </div>
          </div>
          <div className="mt-12 w-full flex">
            <div className="w-1/2 pe-16">
              <div className="text-2xl font-semibold my-4">
                Why are you raising funds?
              </div>
              <HorizontalSeparator />
              <div className="text-lg">
                {teamMemberDetails?.data?.teamMember?.description}
              </div>
            </div>
            <div className="w-1/2">
              <div className="text-2xl font-semibold my-4">
                Feature my store
              </div>
              <HorizontalSeparator />
              <div className="flex gap-2 items-center">
                <div>
                  <CustomCheckbox
                    disabled={true}
                    checked={
                      teamMemberDetails?.data?.teamMember?.isDiscoverable ===
                      "true"
                    }
                  />
                </div>
                <div className="mt-4">
                  Make my store discoverable on <p>shareacandle.com</p>
                </div>
              </div>
            </div>
          </div>
          <div className="my-10 flex justify-between items-center">
            <EventStartsIn
              startDate={teamMemberDetails?.data?.event?.startDate}
              endDate={teamMemberDetails?.data?.event?.endDate}
            />
            <Earnings />
          </div>
          <div className="flex my-10 pb-5">
            <div className="w-1/2">
              <SupportersList
                supportersList={teamMemberDetails?.data?.supporters}
              />
            </div>
            <div className="w-1/2">
              <LeaderboardList
                leaderBoardListData={sortByTotalSupportersPrice(
                  leaderBoardListData?.data?.teamMembers
                )}
              />
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
                Delete Store{" "}
              </Button>{" "}
            </Popconfirm>
          </div>
          <Footer />
          <Modal
            width={700}
            centered
            open={isShareModalVisible}
            onOk={handleOkShareModal}
            onCancel={handleCancelShareModal}
            footer={null} // Hide the footer
          >
            <ShareLink
              link={replacePathInUrl(
                window.location.href +
                  "?eventCode=" +
                  state?.eventCode +
                  "&teamMemberId=" +
                  state?.teamMemberId,
                "store"
              )}
            />
          </Modal>
        </div>
      )}
    </>
  );
};

const TeamMemberBasicDetails = ({ showModal, teamMemberBasicDetails }) => {
  return (
    <div className="flex items-center gap-4">
      <div>
        <img
          alt="name placeholder"
          src={`https://ui-avatars.com/api/?name=${teamMemberBasicDetails.teamMemberName
            ?.toLowerCase()
            .replace(/\s+/g, "+")}&font-size=0.33&size=45&color=fff`}
          className="rounded-full"
        />
      </div>
      <div className="flex flex-col">
        <div>
          <div className="text-gray-400">
            {teamMemberBasicDetails.eventName}
            <button className="ml-2" onClick={() => showModal()}>
              <MdOutlineModeEdit className="text-lg text-gray-500" />
            </button>
          </div>
        </div>
        <div className="text-3xl mb-2 font-semibold">
          {teamMemberBasicDetails.teamMemberName}
        </div>
        <div className="text-gray-800">
          {teamMemberBasicDetails.organizationName}
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
        <div className="rounded-xl">
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
        <div className="rounded-xl">
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

export const LeaderboardCard = ({ teamMember, rank }) => {
  return (
    <div className="flex gap-4 w-full items-center">
      <div>
        <div className="text-xl">{rank}</div>
      </div>
      <div>
        <img
          alt="name placeholder"
          src={`https://ui-avatars.com/api/?name=${teamMember.name.replace(
            " ",
            "+"
          )}&font-size=0.33&size=40&color=fff`}
          className="rounded-full"
        />
      </div>
      <div>
        <div>
          <div className="text-lg">{teamMember.name}</div>
        </div>
      </div>
      <div className="ms-auto text-xl font-semibold">
        ${teamMember.totalSupportersPrice}
      </div>
    </div>
  );
};

export const LeaderboardList = ({ leaderBoardListData }) => {
  return (
    <div>
      <div className="text-xl font-semibold">Leaderboard</div>
      <Divider
        orientation="left"
        style={{ color: "#333", fontWeight: "normal" }}
      />
      <div className="px-4 h-[500px] overflow-scroll">
        <List
          dataSource={leaderBoardListData}
          renderItem={(item, index) => (
            <List.Item>
              <LeaderboardCard teamMember={item} rank={index + 1} />
            </List.Item>
          )}
        />
      </div>
    </div>
  );
};

export default TeamMemberDetails;
