import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../../contexts/Authentication/Authentication";

const MyAppointment = () => {
  const { user } = useContext(AuthContext);

  const url = `http://localhost:5000/bookings?email=${user?.email}`;

  const { data: bookings = [] } = useQuery({
    queryKey: ["bookings", user?.email],
    queryFn: async () => {
      const res = await fetch(url, {
        headers: {
          authorization: `bearer ${localStorage.getItem("accessToken")}`,
        },
      });
      const data = await res.json();
      return data;
    },
  });

  return (
    <div>
      <h2 className="lg:text-3xl font-semibold lg:mb-10 lg:mt-4 text-center">
        My Appointments
      </h2>
      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th className="capitalize text-lg">Serial No</th>
              <th className="capitalize text-lg">Patient Name</th>
              <th className="capitalize text-lg">Treatment Name</th>
              <th className="capitalize text-lg">Date</th>
              <th className="capitalize text-lg">Time Slot</th>
              <th className="capitalize text-lg">Payment</th>
            </tr>
          </thead>
          <tbody>
            {bookings &&
              bookings?.map((booking, index) => (
                <tr key={booking._id}>
                  <th>{index + 1}</th>
                  <td>{booking?.patient}</td>
                  <td>{booking?.treatment}</td>
                  <td>{booking.appointmentDate}</td>
                  <td>{booking.slot}</td>
                  <td>
                    {booking.price && !booking.paid && (
                      <Link to={`/dashboard/payment/${booking._id}`}>
                        <button className="btn btn-primary btn-sm px-6">
                          Pay
                        </button>
                      </Link>
                    )}
                    {booking.price && booking.paid && (
                      <button className=" btn btn-sm lg:ml-2">
                        <span className="text-green-600">Paid</span>
                      </button>
                    )}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyAppointment;
