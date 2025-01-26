"use client";

import { useActionState, useState } from "react";
import * as actions from "@/actions";

export default function LeadForm() {
  const [step, setStep] = useState(1); // To track the current step

  const [formState, action] = useActionState(actions.createLead, {
    message: "",
  });

  const handleNextStep = () => {
    if (step === 1) {
      setStep(2); // Proceed to step 2
    }
  };

  const handlePreviousStep = () => {
    if (step === 2) {
      setStep(1); // Go back to step 1
    }
  };

  return (
    <form action={action}>
      <h3 className="font-bold m-3">
        {step === 1
          ? "Step 1: Collect Lead Information"
          : "Step 2: Select Inquiry Source"}
      </h3>
      <div className="flex flex-col gap-4">
        {/* Step 1: Collect Name and Email */}
        <div className={step === 2 ? "hidden" : "visible flex flex-col gap-4"}>
          <div className="flex gap-4">
            <label className="w-12" htmlFor="name">
              Name
            </label>
            <input
              name="name"
              type="text"
              className="border rounded p-2 w-full"
              id="name"
              required
            />
          </div>

          <div className="flex gap-4">
            <label className="w-12" htmlFor="email">
              Email
            </label>
            <input
              name="email"
              type="email"
              className="border rounded p-2 w-full"
              id="email"
              required
            />
          </div>
        </div>

        {/* Step 2: Collect Inquiry Source */}
        <div className={step === 1 ? "hidden" : "visible"}>
          <div className="flex gap-4">
            <label className="w-12" htmlFor="source">
              Source
            </label>
            <select
              name="source"
              // value={formData.source}
              // onChange={handleChange}
              className="border rounded p-2 w-full"
              id="source"
              required
            >
              <option value="">Select a source</option>
              <option value="Google">Google</option>
              <option value="Social Media">Social Media</option>
              <option value="Friends">Friends</option>
            </select>
          </div>
        </div>

        {/* Error Message */}
        {formState?.message ? (
          <div className="my-2 p-2 bg-red-200 border rounded border-red-400">
            {formState.message}
          </div>
        ) : null}

        <div className="flex justify-between">
          {/* Buttons for navigating steps */}
          {step > 1 && (
            <button
              type="button"
              onClick={handlePreviousStep}
              className="rounded p-2 bg-gray-300"
            >
              Back
            </button>
          )}

          <button
            type={step === 1 ? "button" : "submit"}
            onClick={handleNextStep}
            className="rounded p-2 bg-blue-200"
          >
            {step === 1 ? "Next" : "Submit"}
          </button>
        </div>
      </div>
    </form>
  );
}
