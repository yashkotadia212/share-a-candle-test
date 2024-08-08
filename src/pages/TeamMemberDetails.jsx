import React, { useEffect } from "react";
import Loader from "../components/Loader";
import TopHeader from "../components/TopHeader";
import useAxios from "../hooks/useAxios";
import { Button, message, Modal } from "antd";
import { useSearchParams } from "react-router-dom";
import { MdOutlineModeEdit } from "react-icons/md";
import normaliseWorddCase from "../utils/normaliseWordsCase";
import { BiStore } from "react-icons/bi";
import { GrShareOption } from "react-icons/gr";
import HorizontalSeparator from "../components/HorizontalSeparator";
import CustomCheckbox from "../components/CustomCheckbox";
import dayjs from "dayjs";
import calculateMinutesToTargetDate from "../utils/calculateMinutesToTargetDate";
import ShareLink from "../components/ShareLink";
import { Divider, List } from "antd";

const teamMemberDetailsBaseUrl =
  "https://ixmiyncibu2bfpr4wt64zbsz2y0rtczr.lambda-url.us-east-2.on.aws/";

const productCheckoutUrl =
  "https://3z5hdsxs6q62srcolcwfvmvnje0mpiip.lambda-url.us-east-2.on.aws/";

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

const TeamMemberDetails = () => {
  const [searchParams] = useSearchParams();
  const [isShareModalVisible, setIsShareModalVisible] = React.useState(false);
  const eventCode = searchParams.get("eventCode");
  const teamMemberId = searchParams.get("teamMemberId");

  const teamMemberDetails = useAxios(teamMemberDetailsBaseUrl);

  useEffect(() => {
    teamMemberDetails.getData({
      eventCode: eventCode,
      teamMemberId: teamMemberId,
    });
  }, [searchParams]);

  useEffect(() => {
    if (teamMemberDetails.error) {
      message.error("Error fetching team member details");
    } else if (teamMemberDetails.data) {
      console.log("teamMemberDetails", teamMemberDetails?.data);
    }
  }, [teamMemberDetails]);

  console.log("teamMemberDetails?.data?.products?", teamMemberDetails?.data);

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
      {teamMemberDetails.loading ? (
        <Loader />
      ) : (
        <div>
          <TopHeader />
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
              <Button size="large" type="primary">
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
          <div className="flex my-16">
            <div className="w-1/2">
              <SupportersList
                supportersList={teamMemberDetails?.data?.supporters}
              />
            </div>
            <div className="w-1/2">
              <LeaderboardList />
            </div>
          </div>
          <div className="pb-16">
            <div className="text-2xl font-semibold my-4">Products</div>
            <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 mt-3 max-w-[3500px] gap-5">
              {[teamMemberDetails?.data?.products].map((product, index) => (
                <ProductCard
                  key={index}
                  product={product}
                  event={teamMemberDetails?.data?.event}
                  teamMember={teamMemberDetails?.data?.teamMember}
                />
              ))}
            </div>
          </div>
          <Modal
            width={700}
            centered
            open={isShareModalVisible}
            onOk={handleOkShareModal}
            onCancel={handleCancelShareModal}
            footer={null} // Hide the footer
          >
            <ShareLink link={window.location.href} />
          </Modal>
        </div>
      )}
    </>
  );
};

const TeamMemberBasicDetails = ({ showModal, teamMemberBasicDetails }) => {
  console.log("teamMemberBasicDetails", teamMemberBasicDetails);

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

const ProductCard = ({ product, event, teamMember }) => {
  const productCheckout = useAxios(productCheckoutUrl);

  useEffect(() => {
    if (productCheckout.error) {
      message.error("Error fetching product details");
    } else if (productCheckout.data) {
      window.location.href = productCheckout.data.checkout.webUrl;
    }
  }, [productCheckout]);

  return (
    <div className="w-full h-[450px] rounded-xl border border-gray-200 shadow-xl p-3 bg-gray-50">
      <div
        className="w-full h-52 rounded-lg"
        style={{
          backgroundImage: `url(${product?.image?.src})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      ></div>
      <div className="m-1 flex flex-col h-[210px]">
        <div className="text-2xl font-semibold">
          {product?.title?.replace(/-/g, " ")}
        </div>
        <div className="text-xl">
          ${Math.floor(Math.random() * (20 - 10 + 1)) + 10}
        </div>

        <div className="mt-auto">
          <div>
            <span className="text-sm normal-case font-semibold">
              <span>product by </span>
              <span className="font-jua">
                {normaliseWorddCase(product?.vendor || "vendor")}
              </span>
            </span>
          </div>
          <div className="text-xs text-gray-400">
            {product?.body_html
              ?.replace(/<\/?[^>]+(>|$)/g, "")
              .substring(0, 100)}
          </div>
          <div className="my-2">
            <Button
              loading={productCheckout.loading}
              onClick={() => {
                productCheckout.postData({
                  variantId: "gid://shopify/ProductVariant/50070182691047",
                  quantity: 1,
                  eventName: event?.eventName,
                  eventCode: event?.eventCode,
                  teamName: teamMember?.name,
                  teamMemberId: teamMember?.id,
                });
              }}
              type="primary"
            >
              Buy Now
            </Button>
          </div>
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

export default TeamMemberDetails;

// SUPPORTERS
// {
//   "id": 6018029781223,
//   "email": "yash@hexacoder.com",
//   "name": "yash shah",
//   "total": "0.00"
// }
