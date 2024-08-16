import React, { useEffect, useState } from "react";
import { Steps, Button, Form } from "antd";

// props

// Array of objects
// where each object is a step
// {
//     sidebar: Component,
//     title: string,
//     subtitle: string,
//     form: Component,
//     nextButtonText: string,
// }

const CreateFormWithSteps = ({ stepsArray }) => {
  const [form] = Form.useForm();
  const [currentStep, setCurrentStep] = useState(2);
  const [stepsItems, setStepsItems] = useState([]);
  const [allStepsFormValue, setAllStepsFormValue] = useState({});

  function createStepsItems(stepsArray) {
    return stepsArray.map((step, index) => {
      return {
        title: "Step " + parseInt(index + 1),
        status: currentStep === index ? "process" : "wait",
        icon: <div></div>,
      };
    });
  }

  useEffect(() => {
    setStepsItems(createStepsItems(stepsArray));
  }, [stepsArray]);

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
        nextStep();
      })
      .catch((errorInfo) => {
        console.log("Failed:", errorInfo);
      });
  };

  useEffect(() => {
    console.log("All Steps Form Values:", allStepsFormValue); // Logs all form values
  }, [allStepsFormValue]);

  return (
    <div className="flex flex-col items-center">
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
          className="w-full"
          items={stepsItems}
        />
      </div>
      <div className="mt-10 flex w-full max-w-[800px]">
        <div className="w-1/3 min-h-[600px] rounded-2xl overflow-hidden">
          {stepsArray[currentStep]?.sidebar}
        </div>
        <div className="w-2/3 min-h-[600px] px-5">
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