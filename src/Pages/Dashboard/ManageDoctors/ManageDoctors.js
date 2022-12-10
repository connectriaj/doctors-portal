import { async } from "@firebase/util";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useState } from "react";
import { toast } from "react-hot-toast";
import ConfirmModal from "../../Shared/ConfirmModal/ConfirmModal";
import Loading from "../../Shared/Loading/Loading";

const ManageDoctors = () => {
  const [deletingDoctor, setDeletingDoctor] = useState(null);
  const closeModal = () => {
    setDeletingDoctor(null);
  };

  const {
    data: doctors,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["doctors"],
    queryFn: async () => {
      try {
        const res = await fetch(`http://localhost:5000/doctors`, {
          headers: {
            authorization: `bearer ${localStorage.getItem("accessToken")}`,
          },
        });
        const data = await res.json();
        return data;
      } catch (error) {}
    },
  });

  const handleDeleteDoctor = (doctor) => {
    fetch(`http://localhost:5000/doctors/${doctor._id}`, {
      method: "DELETE",
      headers: {
        authorization: `bearer ${localStorage.getItem("accessToken")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.deletedCount > 0) {
          refetch();
          toast.success(`Doctor ${doctor.name} deleted successfully`);
        }
      });
  };

  if (isLoading) {
    <Loading></Loading>;
  }

  return (
    <section>
      <h2 className="lg:text-3xl font-semibold lg:mb-10 lg:mt-4 text-center">
        Manage Doctors
      </h2>
      <div className="overflow-x-auto">
        <table className="table table-zebra w-full">
          <thead>
            <tr>
              <th>SN</th>
              <th>Avatar</th>
              <th>Doctor Name</th>
              <th>Email Address</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {doctors &&
              doctors?.map((doctor, index) => (
                <tr key={doctor?._id}>
                  <th>{index + 1}</th>
                  <th>
                    <div className="avatar">
                      <div className="w-10 rounded-full ring ring-secondary ring-offset-base-100 ring-offset-2">
                        <img src={doctor?.image} alt="img" />
                      </div>
                    </div>
                  </th>
                  <td>{doctor?.name}</td>
                  <td>{doctor?.email}</td>
                  <td>
                    {/* The button to open modal */}
                    <label
                      onClick={() => setDeletingDoctor(doctor)}
                      htmlFor="confirm-modal"
                      className="btn btn-sm btn-error rounded-full"
                    >
                      Remove
                    </label>
                    {/* end modal button */}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
      {deletingDoctor && (
        <ConfirmModal
          warning={`Warning!`}
          title={`Are you sure you want to delete?`}
          message={`If you delete ${deletingDoctor.name}. It cannot be undone!`}
          modalData={deletingDoctor}
          closeModal={closeModal}
          successButtonName="Delete"
          successAction={handleDeleteDoctor}
        ></ConfirmModal>
      )}
    </section>
  );
};

export default ManageDoctors;
