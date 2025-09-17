import { useState } from "react";
import PhishingInfo from "../PhishingInfo";

export default function PhishingMainPage() {
  const [currentStep, setCurrentStep] = useState(1);

  return (
    <div>
      <PhishingInfo />
    </div>
  );
}
