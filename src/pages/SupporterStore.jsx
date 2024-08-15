import React, { useEffect } from "react";
import TopHeaderResponsive from "../components/TopHeaderResponsive";
import useAxios from "../hooks/useAxios";
import { Button, message, Modal, Divider, List } from "antd";
import storeImage from "../assets/images/store/store-placeholder.jpg.jpg";
import { Progress } from "antd";
import { useSearchParams, useNavigate } from "react-router-dom";
import normaliseWorddCase from "../utils/normaliseWordsCase";
import Loader from "../components/Loader";
import dayjs from "dayjs";
import ShareLink from "../components/ShareLink";
import ScrollResponsiveProducts from "../components/ScrollResponsiveProducts";
import StoreProductsSlider from "../components/StoreProductsSlider";
import useBreakpoint from "../hooks/useBreakpoint";
import ProductParentGrid from "../components/ProductParentGrid";
import LeaderboardCarousel from "../components/LeaderboardCarousel";
import { LeaderboardList } from "../pages/TeamMemberDetails";
import Footer from "../components/Footer";
import { createAbsolutePath } from "../utils/createAbsolutePath";
const storeDetailsBaseUrl =
  "https://ixmiyncibu2bfpr4wt64zbsz2y0rtczr.lambda-url.us-east-2.on.aws/";

export const dummyProducts = [
  {
    id: 8977677189351,
    title: "OZ. MASON JAR",
    body_html:
      "<p><span>*Price includes Standard Jar + Candle Wax Fill* Choose from one of our in-house fragrances. Premium fragrances are available at an additional cost. Check the Pick your scent tab for a full list of fragrances.</span></p>\n<!---->",
    image: {
      id: 42795851546855,
      alt: null,
      position: 1,
      product_id: 8977677189351,
      created_at: "2024-08-01T08:11:05-04:00",
      updated_at: "2024-08-01T08:11:17-04:00",
      admin_graphql_api_id: "gid://shopify/ProductImage/42795851546855",
      width: 298,
      height: 298,
      src: "https://cdn.shopify.com/s/files/1/0699/7403/2615/files/OZ.MASONJAR.jpg?v=1722514266",
    },
  },
  {
    id: 8977677189352,
    title: "SILVER CANDLE HOLDER",
    body_html:
      "<p><span>*Elegant silver candle holder for all occasions. Fits standard candles and adds a touch of sophistication to any room.*</span></p>\n<!---->",
    image: {
      id: 42795851546856,
      alt: null,
      position: 1,
      product_id: 8977677189352,
      created_at: "2024-08-02T08:11:05-04:00",
      updated_at: "2024-08-02T08:11:17-04:00",
      admin_graphql_api_id: "gid://shopify/ProductImage/42795851546856",
      width: 300,
      height: 300,
      src: "https://cdn.shopify.com/s/files/1/0699/7403/2615/files/OZ.MASONJAR.jpg?v=1722514266",
    },
  },
  {
    id: 8977677189353,
    title: "LUXURY SCENTED CANDLE",
    body_html:
      "<p><span>*Infused with premium fragrances, this candle creates a relaxing atmosphere. Choose from a variety of scents to suit your mood.*</span></p>\n<!---->",
    image: {
      id: 42795851546857,
      alt: null,
      position: 1,
      product_id: 8977677189353,
      created_at: "2024-08-03T08:11:05-04:00",
      updated_at: "2024-08-03T08:11:17-04:00",
      admin_graphql_api_id: "gid://shopify/ProductImage/42795851546857",
      width: 302,
      height: 302,
      src: "https://cdn.shopify.com/s/files/1/0699/7403/2615/files/OZ.MASONJAR.jpg?v=1722514266",
    },
  },
  {
    id: 8977677189354,
    title: "WAX MELTS SET",
    body_html:
      "<p><span>*Enjoy a variety of scents with this set of wax melts. Perfect for any wax warmer and creates a delightful aroma.*</span></p>\n<!---->",
    image: {
      id: 42795851546858,
      alt: null,
      position: 1,
      product_id: 8977677189354,
      created_at: "2024-08-04T08:11:05-04:00",
      updated_at: "2024-08-04T08:11:17-04:00",
      admin_graphql_api_id: "gid://shopify/ProductImage/42795851546858",
      width: 304,
      height: 304,
      src: "https://cdn.shopify.com/s/files/1/0699/7403/2615/files/OZ.MASONJAR.jpg?v=1722514266",
    },
  },
  {
    id: 8977677189355,
    title: "HANDMADE SOAP BAR",
    body_html:
      "<p><span>*Made with natural ingredients, this soap bar is gentle on the skin and provides a luxurious lather.*</span></p>\n<!---->",
    image: {
      id: 42795851546859,
      alt: null,
      position: 1,
      product_id: 8977677189355,
      created_at: "2024-08-05T08:11:05-04:00",
      updated_at: "2024-08-05T08:11:17-04:00",
      admin_graphql_api_id: "gid://shopify/ProductImage/42795851546859",
      width: 306,
      height: 306,
      src: "https://cdn.shopify.com/s/files/1/0699/7403/2615/files/OZ.MASONJAR.jpg?v=1722514266",
    },
  },
  {
    id: 8977677189356,
    title: "AROMATIC OIL SET",
    body_html:
      "<p><span>*Experience the benefits of aromatherapy with this set of essential oils. Perfect for diffusing or topical application.*</span></p>\n<!---->",
    image: {
      id: 42795851546860,
      alt: null,
      position: 1,
      product_id: 8977677189356,
      created_at: "2024-08-06T08:11:05-04:00",
      updated_at: "2024-08-06T08:11:17-04:00",
      admin_graphql_api_id: "gid://shopify/ProductImage/42795851546860",
      width: 308,
      height: 308,
      src: "https://cdn.shopify.com/s/files/1/0699/7403/2615/files/OZ.MASONJAR.jpg?v=1722514266",
    },
  },
  {
    id: 8977677189357,
    title: "DECORATIVE TRAY",
    body_html:
      "<p><span>*Stylish tray perfect for organizing candles and other small items. Adds a touch of elegance to any space.*</span></p>\n<!---->",
    image: {
      id: 42795851546861,
      alt: null,
      position: 1,
      product_id: 8977677189357,
      created_at: "2024-08-07T08:11:05-04:00",
      updated_at: "2024-08-07T08:11:17-04:00",
      admin_graphql_api_id: "gid://shopify/ProductImage/42795851546861",
      width: 310,
      height: 310,
      src: "https://cdn.shopify.com/s/files/1/0699/7403/2615/files/OZ.MASONJAR.jpg?v=1722514266",
    },
  },
  {
    id: 8977677189358,
    title: "SCENTED CANDLE TIN",
    body_html:
      "<p><span>*Compact and portable scented candle in a tin. Ideal for travel or small spaces.*</span></p>\n<!---->",
    image: {
      id: 42795851546862,
      alt: null,
      position: 1,
      product_id: 8977677189358,
      created_at: "2024-08-08T08:11:05-04:00",
      updated_at: "2024-08-08T08:11:17-04:00",
      admin_graphql_api_id: "gid://shopify/ProductImage/42795851546862",
      width: 312,
      height: 312,
      src: "https://cdn.shopify.com/s/files/1/0699/7403/2615/files/OZ.MASONJAR.jpg?v=1722514266",
    },
  },
  {
    id: 8977677189359,
    title: "CANDLE WARMER",
    body_html:
      "<p><span>*Electric candle warmer to safely melt your favorite candles without a flame.*</span></p>\n<!---->",
    image: {
      id: 42795851546863,
      alt: null,
      position: 1,
      product_id: 8977677189359,
      created_at: "2024-08-09T08:11:05-04:00",
      updated_at: "2024-08-09T08:11:17-04:00",
      admin_graphql_api_id: "gid://shopify/ProductImage/42795851546863",
      width: 314,
      height: 314,
      src: "https://cdn.shopify.com/s/files/1/0699/7403/2615/files/OZ.MASONJAR.jpg?v=1722514266",
    },
  },
  {
    id: 8977677189360,
    title: "WICK TRIMMER",
    body_html:
      "<p><span>*Essential tool for maintaining your candles. Keeps wicks trimmed for a cleaner burn.*</span></p>\n<!---->",
    image: {
      id: 42795851546864,
      alt: null,
      position: 1,
      product_id: 8977677189360,
      created_at: "2024-08-10T08:11:05-04:00",
      updated_at: "2024-08-10T08:11:17-04:00",
      admin_graphql_api_id: "gid://shopify/ProductImage/42795851546864",
      width: 316,
      height: 316,
      src: "https://cdn.shopify.com/s/files/1/0699/7403/2615/files/OZ.MASONJAR.jpg?v=1722514266",
    },
  },
  {
    id: 8977677189361,
    title: "CANDLE REFILL",
    body_html:
      "<p><span>*Refill for your candle jar. Available in a variety of scents.*</span></p>\n<!---->",
    image: {
      id: 42795851546865,
      alt: null,
      position: 1,
      product_id: 8977677189361,
      created_at: "2024-08-11T08:11:05-04:00",
      updated_at: "2024-08-11T08:11:17-04:00",
      admin_graphql_api_id: "gid://shopify/ProductImage/42795851546865",
      width: 318,
      height: 318,
      src: "https://cdn.shopify.com/s/files/1/0699/7403/2615/files/OZ.MASONJAR.jpg?v=1722514266",
    },
  },
  {
    id: 8977677189362,
    title: "CANDLE MAKING KIT",
    body_html:
      "<p><span>*Everything you need to make your own candles at home. Includes wax, wicks, and scents.*</span></p>\n<!---->",
    image: {
      id: 42795851546866,
      alt: null,
      position: 1,
      product_id: 8977677189362,
      created_at: "2024-08-12T08:11:05-04:00",
      updated_at: "2024-08-12T08:11:17-04:00",
      admin_graphql_api_id: "gid://shopify/ProductImage/42795851546866",
      width: 320,
      height: 320,
      src: "https://cdn.shopify.com/s/files/1/0699/7403/2615/files/OZ.MASONJAR.jpg?v=1722514266",
    },
  },
  {
    id: 8977677189363,
    title: "CANDLE SCENTED SPRAY",
    body_html:
      "<p><span>*Spray to add a burst of fragrance to any room. Long-lasting and refreshing.*</span></p>\n<!---->",
    image: {
      id: 42795851546867,
      alt: null,
      position: 1,
      product_id: 8977677189363,
      created_at: "2024-08-13T08:11:05-04:00",
      updated_at: "2024-08-13T08:11:17-04:00",
      admin_graphql_api_id: "gid://shopify/ProductImage/42795851546867",
      width: 322,
      height: 322,
      src: "https://cdn.shopify.com/s/files/1/0699/7403/2615/files/OZ.MASONJAR.jpg?v=1722514266",
    },
  },
  {
    id: 8977677189364,
    title: "WICK DIPPER",
    body_html:
      "<p><span>*Tool for extinguishing candles and preventing soot. Essential for candle care.*</span></p>\n<!---->",
    image: {
      id: 42795851546868,
      alt: null,
      position: 1,
      product_id: 8977677189364,
      created_at: "2024-08-14T08:11:05-04:00",
      updated_at: "2024-08-14T08:11:17-04:00",
      admin_graphql_api_id: "gid://shopify/ProductImage/42795851546868",
      width: 324,
      height: 324,
      src: "https://cdn.shopify.com/s/files/1/0699/7403/2615/files/OZ.MASONJAR.jpg?v=1722514266",
    },
  },
  {
    id: 8977677189365,
    title: "CANDLE STORAGE BOX",
    body_html:
      "<p><span>*Keep your candles organized and protected with this stylish storage box.*</span></p>\n<!---->",
    image: {
      id: 42795851546869,
      alt: null,
      position: 1,
      product_id: 8977677189365,
      created_at: "2024-08-15T08:11:05-04:00",
      updated_at: "2024-08-15T08:11:17-04:00",
      admin_graphql_api_id: "gid://shopify/ProductImage/42795851546869",
      width: 326,
      height: 326,
      src: "https://cdn.shopify.com/s/files/1/0699/7403/2615/files/OZ.MASONJAR.jpg?v=1722514266",
    },
  },
  {
    id: 8977677189366,
    title: "GIFT SET",
    body_html:
      "<p><span>*Perfect for any occasion. Includes a selection of our best-selling candles and accessories.*</span></p>\n<!---->",
    image: {
      id: 42795851546870,
      alt: null,
      position: 1,
      product_id: 8977677189366,
      created_at: "2024-08-16T08:11:05-04:00",
      updated_at: "2024-08-16T08:11:17-04:00",
      admin_graphql_api_id: "gid://shopify/ProductImage/42795851546870",
      width: 328,
      height: 328,
      src: "https://cdn.shopify.com/s/files/1/0699/7403/2615/files/OZ.MASONJAR.jpg?v=1722514266",
    },
  },
];

const dummyLeaderboard = [
  { id: 1, name: "John Doe", totalSupportersPrice: 500 },
  { id: 2, name: "Jane Doe", totalSupportersPrice: 480 },
  { id: 3, name: "Michael Smith", totalSupportersPrice: 460 },
  { id: 4, name: "Emily Johnson", totalSupportersPrice: 440 },
  { id: 5, name: "David Brown", totalSupportersPrice: 420 },
  { id: 6, name: "Sarah Davis", totalSupportersPrice: 400 },
  { id: 7, name: "James Wilson", totalSupportersPrice: 380 },
  { id: 8, name: "Patricia Miller", totalSupportersPrice: 360 },
  { id: 9, name: "Robert Moore", totalSupportersPrice: 340 },
  { id: 10, name: "Linda Taylor", totalSupportersPrice: 320 },
  { id: 11, name: "Charles Anderson", totalSupportersPrice: 300 },
  { id: 12, name: "Barbara Thomas", totalSupportersPrice: 280 },
  { id: 13, name: "Joseph Jackson", totalSupportersPrice: 260 },
  { id: 14, name: "Jennifer White", totalSupportersPrice: 240 },
  { id: 15, name: "Thomas Harris", totalSupportersPrice: 220 },
  { id: 16, name: "Elizabeth Martin", totalSupportersPrice: 200 },
  { id: 17, name: "Christopher Thompson", totalSupportersPrice: 180 },
  { id: 18, name: "Mary Garcia", totalSupportersPrice: 160 },
  { id: 19, name: "Daniel Martinez", totalSupportersPrice: 140 },
  { id: 20, name: "Nancy Robinson", totalSupportersPrice: 120 },
  { id: 21, name: "Matthew Clark", totalSupportersPrice: 100 },
  { id: 22, name: "Karen Rodriguez", totalSupportersPrice: 80 },
];

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

const getChunkSizeBasedOnScreenWidth = (breakpoint) => {
  const chunkSizes = {
    xs: 1,
    sm: 2,
    md: 3,
    lg: 4,
    xl: 5,
    "2xl": 5, // Same as 'xl' for 2xl and above
  };

  return chunkSizes[breakpoint] * 2 || 2; // Default to 2 if no match is found
};

const SupporterStore = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const eventCode = searchParams?.get("eventCode");
  const teamMemberId = searchParams?.get("teamMemberId");
  const currentBreakpoint = useBreakpoint();

  const storeDetails = useAxios(storeDetailsBaseUrl);

  useEffect(() => {
    storeDetails.getData({
      eventCode: eventCode,
      teamMemberId: teamMemberId,
    });
  }, [searchParams]);

  useEffect(() => {
    if (storeDetails.error) {
      message.error("Error fetching store details");
      if (!eventCode || !teamMemberId) {
        message.error("Invalid Store Link!");
        navigate("/");
      }
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
          <TopHeaderResponsive />
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
          <StoreItem
            storeDetails={storeDetails}
            currentBreakpoint={currentBreakpoint}
          />
          <ScrollResponsiveProducts />
          <RecentSupporters supportersList={storeDetails?.data?.supporters} />
          <ProductParentGrid />
          <Leaderboard />
          <Footer />
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
      <div className="grid grid-cols-1 sm:grid-cols-2 items-center gap-1.5">
        <div className="sm:text-start text-center mb-5 sm:mb-0">
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
        <div className="p-2 grid place-items-center sm:place-items-end">
          <div className="w-full max-w-[380px] p-5 aspect-[4/5] bg-gray-200 rounded-xl">
            <div
              style={{
                backgroundImage: `url(${createAbsolutePath(
                  "/assets/images/store/store-placeholder.jpg"
                )})`,
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

const StoreItem = ({ storeDetails, currentBreakpoint }) => {
  return (
    <div className="pb-16 my-16">
      <div className="w-full text-center text-4xl font-semibold">
        Buy to support
      </div>
      <StoreProductsSlider
        totalProducts={
          Array.isArray(storeDetails?.data?.products)
            ? storeDetails?.data?.products
            : [storeDetails?.data?.products]
        }
        chunkSize={getChunkSizeBasedOnScreenWidth(currentBreakpoint)}
      />
    </div>
  );
};

const RecentSupporters = ({ supportersList }) => {
  return (
    <div className="mt-24">
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

const Leaderboard = () => {
  const [isLeaderBoardModalVisible, setIsLeaderBoardModalVisible] =
    React.useState(false);

  const handleOkLeaderBoardModal = () => {
    setIsLeaderBoardModalVisible(false);
  };

  const handleCancelLeaderBoardModal = () => {
    setIsLeaderBoardModalVisible(false);
  };

  return (
    <>
      <div className="flex flex-col items-center">
        <div className="text-4xl font-semibold text-center">Leaderboard</div>
        <div className="text-center max-w-[1000px] my-6">
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aut error
          voluptatum est, fugiat ipsum similique ducimus unde asperiores
          cupiditate dolore sed explicabo animi doloremque modi saepe, placeat
          autem, nulla qui.
        </div>
        <div className="-mt-10 overflow-hidden w-screen">
          <LeaderboardCarousel />
        </div>
        <div>
          <Button
            className="text-black hover:!text-black underline underline-offset-4 font-semibold mt-5"
            type="link"
            onClick={() => setIsLeaderBoardModalVisible(true)}
          >
            View full leader board
          </Button>
        </div>
      </div>
      <Modal
        centered
        open={isLeaderBoardModalVisible}
        onOk={handleOkLeaderBoardModal}
        onCancel={handleCancelLeaderBoardModal}
        footer={null}
        className="!w-full max-w-2xl !h-fit !rounded-xl overflow-hidden"
      >
        <LeaderboardList leaderBoardListData={dummyLeaderboard} />
      </Modal>
    </>
  );
};

export default SupporterStore;
