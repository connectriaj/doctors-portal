import React from "react";
import { format } from "date-fns";

const BookingModal = ({ treatment, selectedDate, setTreatment }) => {
  const { name, slots } = treatment;
  const date = format(selectedDate, "PP");

  const handleBooking = (event) => {
    event.preventDefault();
    const form = event.target;
    const slot = form.slot.value;
    const name = form.name.value;
    const email = form.email.value;
    const phone = form.phone.value;

    const booking = {
      appointmentDate: date,
      treatment: name,
      patient: name,
      slot,
      email,
      phone,
    };
    setTreatment(null);
  };

  return (
    <section>
      {/* Put this part before </body> tag */}
      <input type="checkbox" id="booking-modal" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box relative">
          <label
            htmlFor="booking-modal"
            className="btn btn-sm btn-circle absolute right-2 top-2"
          >
            ✕
          </label>
          <h3 className="text-lg font-bold lg:mb-3">{name}</h3>
          <form onSubmit={handleBooking}>
            <input
              type="text"
              disabled
              value={date}
              className="input w-full my-2 input-bordered"
            />
            <select name="slot" className="select select-bordered w-full">
              {slots.map((slot) => (
                <option value={slot}>{slot}</option>
              ))}
            </select>
            <input
              type="text"
              placeholder="your name"
              className="input w-full my-2 input-bordered"
              name="name"
            />
            <input
              type="email"
              placeholder="email address"
              className="input w-full my-2 input-bordered"
              name="email"
            />
            <input
              type="phone"
              placeholder="phone number"
              className="input w-full my-2 input-bordered"
              name="phone"
            />
            <br />
            <input
              className="w-full  my-2 btn btn-accent mt-4"
              type="submit"
              value="submit"
            />
          </form>
        </div>
      </div>
    </section>
  );
};

export default BookingModal;
