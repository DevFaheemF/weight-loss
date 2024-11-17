import React, { useState, useEffect } from "react";
import DataEntryForm from "./DataEntryForm";
import ProgressDisplay from "./ProgressTable";
import WeeklySummary from "./WeeklySummary";
import IndividualChart from "./IndividualChart";
import AOS from "aos";
import "aos/dist/aos.css";

const DietTracker = () => {
  const [dieters, setDieters] = useState([]);

  useEffect(() => {
    AOS.init({
      duration: 1000,
      easing: "ease-in-out",
      once: true, 
    });
  }, []);

  const handleNewEntry = (newData) => {
    setDieters((prevDieters) => {
      const existingDieterIndex = prevDieters.findIndex(
        (dieter) => dieter.name === newData.name
      );
      if (existingDieterIndex !== -1) {
        const updatedDieters = [...prevDieters];
        updatedDieters[existingDieterIndex] = {
          ...updatedDieters[existingDieterIndex],
          weightChange:
            newData.weight - prevDieters[existingDieterIndex].weight,
          percentageLoss:
            ((prevDieters[existingDieterIndex].weight - newData.weight) /
              prevDieters[existingDieterIndex].weight) *
            100,
          progress: [
            ...updatedDieters[existingDieterIndex].progress,
            {
              week: newData.week,
              weightLoss:
                newData.weight - updatedDieters[existingDieterIndex].weight,
            },
          ],
        };
        return updatedDieters;
      } else {
        return [
          ...prevDieters,
          { ...newData, progress: [{ week: newData.week, weightLoss: 0 }] },
        ];
      }
    });
  };

  return (
    <div>
      <div data-aos="zoom-in">
        <DataEntryForm dieters={dieters} onSubmit={handleNewEntry} />
      </div>
      <div data-aos="fade-right">
        <ProgressDisplay dieters={dieters} />
      </div>
      <div>
        <IndividualChart dieters={dieters} />
      </div>
      <h3 data-aos="zoom-in" className="custom-heading ms-3">
        Weekly Summary
      </h3>
      <div data-aos="zoom-in" id="weekly-summary">
        <WeeklySummary dieters={dieters} />
      </div>
    </div>
  );
};

export default DietTracker;
