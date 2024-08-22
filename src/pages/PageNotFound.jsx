import { Button } from "antd";
import React from "react";

const PageNotFound = () => {
  return (
    <div className="w-full h-screen flex justify-center items-center">
      <section className="bg-white">
        <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
          <div className="mx-auto max-w-screen-sm text-center">
            <h1 className="mb-4 text-7xl tracking-tight font-extrabold lg:text-9xl text-primary-600">
              404
            </h1>
            <p className="mb-4 text-3xl tracking-tight font-bold text-gray-900 md:text-4xl">
              Something's missing.
            </p>
            <p className="mb-4 text-lg font-light text-gray-500">
              Sorry, we can't find that page.
            </p>
            <Button
              type="primary"
              className="my-4"
              onClick={() => window.location.replace("/")}
            >
              Back to Homepage
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PageNotFound;
