import React, { useEffect } from "react";
import useAxios from "../hooks/useAxios";
import TopHeader from "../components/TopHeader";
import { Button, message, Modal, Divider, List } from "antd";
import storeImage from "../assets/images/store/store-placeholder.jpg.jpg";
import { Progress } from "antd";
import { useSearchParams } from "react-router-dom";
import normaliseWorddCase from "../utils/normaliseWordsCase";
import Loader from "../components/Loader";
import dayjs from "dayjs";
import ShareLink from "../components/ShareLink";
import ThreeDCarousel from "../components/ThreeDCarousel";

const storeDetailsBaseUrl =
  "https://ixmiyncibu2bfpr4wt64zbsz2y0rtczr.lambda-url.us-east-2.on.aws/";

const productCheckoutUrl =
  "https://3z5hdsxs6q62srcolcwfvmvnje0mpiip.lambda-url.us-east-2.on.aws/";

function calculateDays(startDate, endDate) {
  const start = dayjs(startDate);
  const end = dayjs(endDate);
  const today = dayjs();

  // Calculate total days between start and end date
  const totalDays = end.diff(start, "day");

  // Calculate remaining days from today to the end date
  const remainingDays =
    end.diff(today, "day") > totalDays ? totalDays : end.diff(today, "day");

  return {
    totalDays,
    remainingDays: remainingDays >= 0 ? remainingDays : 0, // Ensure no negative values
  };
}

const SupporterStore = () => {
  const [searchParams] = useSearchParams();
  const eventCode = searchParams?.get("eventCode");
  const teamMemberId = searchParams?.get("teamMemberId");

  const storeDetails = useAxios(storeDetailsBaseUrl);

  useEffect(() => {
    storeDetails.getData({
      eventCode: eventCode,
      teamMemberId: teamMemberId,
    });
  }, [searchParams]);

  useEffect(() => {
    if (storeDetails.error) {
      message.error("Error fetching team member details");
    } else if (storeDetails.data) {
      console.log("storeDetails", storeDetails?.data);
    }
  }, [storeDetails]);

  return (
    <>
      {storeDetails?.loading ? (
        <Loader />
      ) : (
        <div>
          <TopHeader />
          <StoreBanner
            storeBannerData={{
              eventName: storeDetails?.data?.event?.eventName,
              teamMemberName: storeDetails?.data?.teamMember?.name,
              description: storeDetails?.data?.teamMember?.description,
              fundsRaised:
                storeDetails?.data?.teamMember?.fundraisingGoal * 0.55,
              fundraisingGoal: storeDetails?.data?.teamMember?.fundraisingGoal,
              eventStartDate: storeDetails?.data?.event?.startDate,
              eventEndDate: storeDetails?.data?.event?.endDate,
            }}
          />
          <StoreItem storeDetails={storeDetails} />
          <RecentSupporters supportersList={storeDetails?.data?.supporters} />
          <ThreeDCarousel />
        </div>
      )}
    </>
  );
};

const StoreBanner = ({ storeBannerData }) => {
  const [isShareModalVisible, setIsShareModalVisible] = React.useState(false);

  const { totalDays, remainingDays } = calculateDays(
    storeBannerData?.eventStartDate,
    storeBannerData?.eventEndDate
  );

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
      <div className="flex items-center gap-1.5">
        <div className="w-1/2">
          <div>{storeBannerData?.eventName}</div>
          <div className="text-3xl font-semibold mt-3">
            {storeBannerData?.teamMemberName} live store
          </div>
          <div className="mt-3 text-gray-600">
            {storeBannerData?.description}
          </div>
          <div className="mt-5">
            <Button
              size="large"
              type="primary"
              onClick={() => showShareModal()}
            >
              Share Store Link{" "}
            </Button>
          </div>
        </div>
        <div className="w-1/2 p-2 grid place-items-end">
          <div className="w-7/12 p-5 aspect-[4/5] bg-gray-200 rounded-xl">
            <div
              style={{
                backgroundImage: `url(${storeImage})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
              className="relative aspect-square overflow-hidden rounded-xl bg-blue-500"
            >
              <div className="flex items-center justify-center text-white text-xl font-semibold w-full bg-black h-10 absolute bottom-0">
                {storeBannerData?.teamMemberName}
              </div>
            </div>
            <FundraisingProgress
              fundsRaised={storeBannerData?.fundsRaised}
              targetGoal={storeBannerData?.fundraisingGoal}
            />
            <div className="w-full mt-10 text-center text-gray-400">
              Remaining Days - {remainingDays} / {totalDays} Days
            </div>
          </div>
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
    </>
  );
};

const FundraisingProgress = ({ fundsRaised, targetGoal }) => {
  // Calculate progress percentage
  const progressPercentage = (fundsRaised / targetGoal) * 100;

  return (
    <div className="w-full my-7 relative">
      {/* Progress bar */}
      <Progress
        className="relative"
        format={() => (
          <div>
            $
            <span className="text-lg font-semibold">
              {fundsRaised.toLocaleString()}
            </span>
          </div>
        )}
        percent={progressPercentage}
        trailColor="#D0D0D0"
        percentPosition={{
          align: "center",
          type: "outer",
        }}
        strokeColor={{
          "0%": "#000000",
          "100%": "#000000",
        }}
        showInfo={false}
      />
      <div className="flex justify-between absolute top-5 w-full">
        {progressPercentage >= 0 && progressPercentage <= 9 ? (
          <span className="text-gray-500 text-sm"></span>
        ) : (
          <span className="text-gray-500 text-sm">${0}</span>
        )}

        {progressPercentage >= 85 && progressPercentage <= 100 ? (
          <span className="text-gray-500 text-sm"></span>
        ) : (
          <span className="text-gray-500 text-sm">
            ${targetGoal?.toLocaleString()}
          </span>
        )}
      </div>
      <div>
        <span
          style={{
            left: `calc(${progressPercentage}% - 25px)`,
          }}
          className="text-lg font-semibold absolute bg-gray-200 z-10"
        >
          ${fundsRaised.toLocaleString()}
        </span>
      </div>
    </div>
  );
};

const StoreItem = ({ storeDetails }) => {
  return (
    <div className="pb-16 my-16">
      <div className="w-full text-center text-4xl font-semibold">
        Buy to support
      </div>
      <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 mt-7 max-w-[3500px] gap-5">
        {[storeDetails?.data?.products].map((product, index) => (
          <ProductCard
            key={index}
            product={product}
            event={storeDetails?.data?.event}
            teamMember={storeDetails?.data?.teamMember}
          />
        ))}
      </div>
    </div>
  );
};

const ProductCard = ({ product, event, teamMember }) => {
  const productCheckout = useAxios(productCheckoutUrl);

  useEffect(() => {
    if (productCheckout.error) {
      message.error("Error Buying Product");
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
        <div className="text-xl">${5}</div>

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

const RecentSupporters = ({ supportersList }) => {
  return (
    <div className="mt-10">
      <div className="w-full text-center text-4xl font-semibold">
        Recent Supporters
      </div>
      <div className="w-full">
        <SupportersList supportersList={supportersList} />
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
      {/* <div className="text-xl font-semibold">Your Supporters</div>  */}
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

export default SupporterStore;
