import React, { useEffect, useState } from "react";
import { Steps, Button, Form } from "antd";

const CreateFormWithSteps = ({ stepsArray, formData }) => {
  const [form] = Form.useForm();
  const [currentStep, setCurrentStep] = useState(0);
  const [allStepsFormValue, setAllStepsFormValue] = useState({});

  const onStepChange = (value) => {
    setCurrentStep(value);
  };

  const nextStep = () => {
    if (currentStep < stepsArray.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const validateAndAppendFormValues = () => {
    form
      .validateFields()
      .then((values) => {
        console.log("Current Form Values:", values); // Logs the current form values
        setAllStepsFormValue({ ...allStepsFormValue, ...values });
        if (currentStep === stepsArray.length - 1) {
          formData({ ...allStepsFormValue, ...values });
        } else {
          nextStep();
        }
      })
      .catch((errorInfo) => {
        console.log("Failed:", errorInfo);
      });
  };

  return (
    <div className="flex flex-col items-center mb-5">
      <div className="w-full h-40">
        <img
          src="https://placebeard.it/2000/150?random"
          alt="random"
          className="object-cover w-full h-full"
        />
      </div>
      <div className="mt-8 flex justify-center w-full max-w-[600px]">
        <Steps
          type="navigation"
          size="small"
          current={currentStep}
          onChange={onStepChange}
          className="w-full flex gap-8"
          items={
            stepsArray?.map((step, index) => {
              return {
                title: "Step " + parseInt(index + 1),
                status: currentStep === index ? "process" : "wait",
                icon: <div></div>,
              };
            }) || []
          }
        />
      </div>
      <div className="mt-10 flex xs:max-md:flex-wrap xs:max-md:gap-10 w-full max-w-[800px]">
        <div className="xs:w-full md:w-1/3 min-h-[600px] rounded-2xl overflow-hidden">
          {stepsArray[currentStep]?.sidebar}
        </div>
        <div className="xs:w-full md:w-2/3 min-h-[600px] px-5">
          <div className="text-3xl font-bold">
            {stepsArray[currentStep]?.title}
          </div>
          <div className="text-sm text-gray-400 mt-5">
            {stepsArray[currentStep]?.subtitle}
          </div>
          <div className="mt-5">
            {React.cloneElement(stepsArray[currentStep]?.form, { form })}
          </div>
          <div className="mt-5">
            <Button
              type="primary"
              onClick={() => {
                validateAndAppendFormValues();
              }}
            >
              {stepsArray[currentStep]?.nextButtonText}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateFormWithSteps;
