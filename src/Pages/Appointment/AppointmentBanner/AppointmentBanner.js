import React from "react";
import chair from "../../../assets/images/chair.png";
import { DayPicker } from "react-day-picker";
import bg from "../../../assets/images/bg.png";

const AppointmentBanner = ({ selectedDate, setSelectedDate }) => {
  return (
    <header className="lg:my-14" style={{ background: `url(${bg})` }}>
      <div className="hero">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <div className="lg:px-20">
            <img
              src={chair}
              className="rounded-lg shadow-2xl lg:w-full"
              alt="pic"
            />
          </div>

          {/* calender react day picker */}
          <div className="lg:px-20 lg:py-0 py-6">
            <DayPicker
              mode="single"
              selected={selectedDate}
              onSelect={setSelectedDate}
            ></DayPicker>
          </div>
        </div>
      </div>
    </header>
  );
};

export default AppointmentBanner;
