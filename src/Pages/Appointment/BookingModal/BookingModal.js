import React from "react";
import { format } from "date-fns";
import { useContext } from "react";
import { AuthContext } from "../../../contexts/Authentication/Authentication";
import toast from "react-hot-toast";

const BookingModal = ({ treatment, selectedDate, setTreatment, refetch }) => {
  const { name, slots } = treatment;
  const date = format(selectedDate, "PP");

  const { user } = useContext(AuthContext);

  const handleBooking = (event) => {
    event.preventDefault();
    const form = event.target;
    const slot = form.slot.value;
    const name = form.name.value;
    const email = form.email.value;
    const phone = form.phone.value;

    const booking = {
      appointmentDate: date,
      treatment: treatment.name,
      patient: name,
      slot,
      email,
      phone,
    };

    fetch(`http://localhost:5000/bookings`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(booking),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.acknowledged) {
          setTreatment(null);
          toast.success("Booking confirmed");
          refetch();
        } else {
          toast.error(data.message);
        }
      });
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
              defaultValue={user?.displayName}
              disabled
              name="name"
            />
            <input
              type="email"
              placeholder="your email"
              defaultValue={user?.email}
              disabled
              className="input w-full my-2 input-bordered"
              name="email"
            />
            <input
              type="phone"
              placeholder="phone number"
              className="input w-full my-2 input-bordered"
              required
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
