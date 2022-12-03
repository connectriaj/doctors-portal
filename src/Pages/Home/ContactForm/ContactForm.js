import React from "react";
import { Link } from "react-router-dom";
import appointment from "../../../assets/images/appointment.png";
import PrimaryButton from "../../../components/PrimaryButton/PrimaryButton";

const ContactForm = () => {
  return (
    <section
      className="pb-[70px] lg:pb-[154px] rounded-xl"
      style={{ background: `url(${appointment}) ` }}
    >
      <div className="pt-16 pb-10">
        <h4 className="text-primary text-center">Contact Us</h4>
        <h1 className="text-center text-white text-xl lg:text-3xl">
          Stay connected with us
        </h1>
      </div>
      <div className="hero">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <div className="card flex-shrink-0 w-full shadow-2xl bg-base-100">
            <div className="card-body">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="text"
                  placeholder="email"
                  className="input input-bordered"
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input
                  type="text"
                  placeholder="password"
                  className="input input-bordered"
                />
                <label className="label">
                  <Link to="" className="label-text-alt link link-hover">
                    Forgot password?
                  </Link>
                </label>
              </div>
              <div className="form-control mt-6">
                <PrimaryButton>Login</PrimaryButton>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;
