import React from "react";

const AppointmentOption = ({ appointmentOptions, setTreatment }) => {
  const { name, slots, price } = appointmentOptions;
  return (
    <section>
      <div className="card bg-base-100 shadow-xl p-4">
        <div className="card-body text-center">
          <h2 className="text-2xl text-primary">{name}</h2>
          <p>{slots.length > 0 ? slots[0] : "Try Another Day"}</p>
          <p>
            {slots.length} {slots.length > 1 ? "Spaces" : "Space"} Available
          </p>
          <p>
            <small>Price ${price}</small>
          </p>
          <div className="card-actions justify-center">
            {/* The button to open modal */}
            <label
              disabled={slots.length === 0}
              htmlFor="booking-modal"
              className="btn btn-primary text-white"
              onClick={() => setTreatment(appointmentOptions)}
            >
              Booking Appointment
            </label>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AppointmentOption;
