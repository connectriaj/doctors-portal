import React from "react";
import { useContext } from "react";
import { Link, Outlet } from "react-router-dom";
import { AuthContext } from "../contexts/Authentication/Authentication";
import useAdmin from "../hooks/useAdmin";
import Navbar from "../Pages/Shared/Navbar/Navbar";

const DashboardLayout = () => {
  const { user } = useContext(AuthContext);
  const [isAdmin] = useAdmin(user?.email);

  return (
    <section>
      <Navbar></Navbar>
      <div className="drawer drawer-mobile lg:mt-16">
        <input
          id="dashboard-drawer"
          type="checkbox"
          className="drawer-toggle"
        />
        <div className="drawer-content">
          <Outlet />
        </div>
        <div className="drawer-side">
          <label htmlFor="dashboard-drawer" className="drawer-overlay"></label>
          <ul className="menu p-4 w-80 bg-base-100 text-base-content">
            <li>
              <Link
                to="/dashboard"
                className="lg:text-lg lg:font-bold text-info underline"
              >
                My Appointments
              </Link>
              {isAdmin && (
                <>
                  <Link
                    to="/dashboard/users"
                    className="lg:text-lg lg:font-bold text-info underline"
                  >
                    All Users
                  </Link>
                  <Link
                    to="/dashboard/add-doctor"
                    className="lg:text-lg lg:font-bold text-info underline"
                  >
                    Add A Doctor
                  </Link>
                  <Link
                    to="/dashboard/manage-doctors"
                    className="lg:text-lg lg:font-bold text-info underline"
                  >
                    Manage Doctors
                  </Link>
                </>
              )}
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default DashboardLayout;
