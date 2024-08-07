import React, { useEffect } from "react";
import Loader from "../components/Loader";
import TopHeader from "../components/TopHeader";
import useAxios from "../hooks/useAxios";
import { Button, message } from "antd";
import { useSearchParams } from "react-router-dom";
import { MdOutlineModeEdit } from "react-icons/md";
import normaliseWorddCase from "../utils/normaliseWordsCase";

const teamMemberDetailsBaseUrl =
  "https://ixmiyncibu2bfpr4wt64zbsz2y0rtczr.lambda-url.us-east-2.on.aws/";

const productCheckoutUrl =
  "https://3z5hdsxs6q62srcolcwfvmvnje0mpiip.lambda-url.us-east-2.on.aws/";

const TeamMemberDetails = () => {
  const [searchParams] = useSearchParams();

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
                My Store
              </Button>
              <Button size="large" type="primary">
                Share Store Link{" "}
              </Button>
            </div>
          </div>
          <div>
            <div className="text-2xl font-semibold my-4">Products</div>
            <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 mt-3 max-w-[3500px] gap-5">
              {teamMemberDetails?.data?.products
                ?.slice(0, 1)
                .map((product, index) => (
                  <ProductCard
                    key={index}
                    product={product}
                    eventName={teamMemberDetails?.data?.event?.eventName}
                    teamName={teamMemberDetails?.data?.teamMember?.name}
                  />
                ))}
            </div>
          </div>
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
        <div className="text-xl">{teamMemberBasicDetails.teamMemberName}</div>
        <div className="text-gray-800">
          {teamMemberBasicDetails.organizationName}
        </div>
      </div>
    </div>
  );
};

const ProductCard = ({ product, eventName, teamName }) => {
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
          backgroundImage: `url(${product.image.src})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      ></div>
      <div className="m-1 flex flex-col">
        <div className="text-2xl font-semibold">
          {product.title.replace(/-/g, " ")}
        </div>
        <div className="text-xl">
          ${Math.floor(Math.random() * (20 - 10 + 1)) + 10}
        </div>

        <div className="mt-10">
          <span className="text-sm normal-case font-semibold">
            <span>product by </span>
            <span className="font-jua">
              {normaliseWorddCase(product.vendor)}
            </span>
          </span>
        </div>
        <div className="text-xs text-gray-400">
          {product.body_html.replace(/<\/?[^>]+(>|$)/g, "").substring(0, 100)}
        </div>
        <div className="my-2">
          <Button
            onClick={() => {
              productCheckout.postData({
                variantId: "gid://shopify/ProductVariant/50070182691047",
                quantity: 1,
                eventName: eventName,
                teamName: teamName,
              });
            }}
            type="primary"
          >
            Buy Now
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TeamMemberDetails;
