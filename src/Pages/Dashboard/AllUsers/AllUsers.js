import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useState } from "react";
import { toast } from "react-hot-toast";
import ConfirmModal from "../../Shared/ConfirmModal/ConfirmModal";
import Loading from "../../Shared/Loading/Loading";

const AllUsers = () => {
  const [deletingUser, setDeletingUser] = useState(null);
  const closeModal = () => {
    setDeletingUser(null);
  };

  const {
    data: users = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await fetch(`http://localhost:5000/users`);
      const data = await res.json();
      return data;
    },
  });

  const handleMakeAdmin = (id) => {
    fetch(`http://localhost:5000/users/admin/${id}`, {
      method: "PUT",
      headers: {
        authorization: `bearer ${localStorage.getItem("accessToken")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.modifiedCount > 0) {
          toast.success("Make admin successfully");
          refetch();
        }
      });
  };

  const handleDeleteUser = (user) => {
    fetch(`http://localhost:5000/users/${user._id}`, {
      method: "DELETE",
      headers: {
        authorization: `bearer ${localStorage.getItem("accessToken")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.deletedCount > 0) {
          refetch();
          toast.success(`User ${user.name} deleted successfully`);
        }
      });
  };

  if (isLoading) {
    <Loading></Loading>;
  }

  return (
    <section>
      <h2 className="lg:text-3xl font-semibold lg:mb-10 lg:mt-4 text-center">
        All Users
      </h2>
      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th></th>
              <th>User Name</th>
              <th>User Email</th>
              <th>Admin</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={user._id}>
                <th>{index + 1}</th>
                <td>{user?.name}</td>
                <td>{user?.email}</td>
                <td>
                  {user?.role !== "admin" && (
                    <button
                      onClick={() => handleMakeAdmin(user._id)}
                      className="btn btn-xs btn-primary capitalize"
                    >
                      Make Admin
                    </button>
                  )}
                </td>
                <td>
                  {/* The button to open modal */}
                  <label
                    onClick={() => setDeletingUser(user)}
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
      {deletingUser && (
        <ConfirmModal
          warning={`Warning!`}
          title={`Are you sure you want to delete?`}
          message={`If you delete ${deletingUser.name}. It cannot be undone!`}
          modalData={deletingUser}
          closeModal={closeModal}
          successButtonName="Delete"
          successAction={handleDeleteUser}
        ></ConfirmModal>
      )}
    </section>
  );
};

export default AllUsers;
