import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useContext } from "react";
import { AuthContext } from "../../contexts/Authentication/Authentication";
import toast from "react-hot-toast";

const SignUp = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const { createUser, updateUser, googleLogin } = useContext(AuthContext);
  const [signUpError, setSignUpError] = useState("");

  const handleSignUp = (data) => {
    // console.log(data);
    setSignUpError("");
    createUser(data.email, data.password)
      .then((result) => {
        const user = result.user;
        reset();
        toast("user created successfully");
        const userInfo = {
          displayName: data.name,
        };
        updateUser(userInfo)
          .then(() => {})
          .catch((err) => console.error(err));
      })
      .catch((err) => {
        console.error(err);
        setSignUpError(err.message);
      });
  };

  const handleGoogleLogin = () => {
    googleLogin()
      .then((result) => {
        const user = result.user;
        toast("user login successfully");
        console.log(user);
      })
      .catch((err) => {
        console.error(err);
        signUpError(err.message);
      });
  };

  return (
    <section className="lg:h-[800px]  flex justify-center items-center lg:my-10 lg:mt-20">
      <div className="w-96 p-12 lg:shadow-lg rounded-lg">
        <h2 className="lg:text-3xl text-xl text-bold text-center mb-4 mt-10 lg:mt-0">
          Sign Up
        </h2>
        <form onSubmit={handleSubmit(handleSignUp)}>
          <div className="form-control w-full max-w-xs">
            <label className="label">
              <span className="label-text">Name</span>
            </label>
            <input
              className="input input-bordered w-full"
              type="text"
              {...register("name", {
                required: "* name is required",
              })}
            />
            {errors.name && (
              <p className="text-red-600">{errors.name.message}</p>
            )}
          </div>
          <div className="form-control w-full max-w-xs">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              className="input input-bordered w-full"
              type="email"
              {...register("email", {
                required: "* email is required",
              })}
            />
            {errors.email && (
              <p className="text-red-600">{errors.email.message}</p>
            )}
          </div>
          <div className="form-control w-full max-w-xs">
            <label className="label">
              <span className="label-text">Password</span>
            </label>
            <input
              className="input input-bordered w-full"
              type="password"
              {...register("password", {
                required: "* password is required",
                minLength: {
                  value: 6,
                  message: "password must be 6 characters or longer",
                },
                pattern: {
                  value: /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z].)/,
                  message: "password must be more strong",
                },
              })}
            />
            <p className="text-red-600" role="alert"></p>
            {errors.password && (
              <p className="text-red-600">{errors.password.message}</p>
            )}
          </div>

          <input
            className="btn btn-dark w-full mt-6"
            type="submit"
            value="Sign Up"
          />
          {signUpError && <p className="text-red-600">{signUpError}</p>}
        </form>
        <p className="text-center my-2">
          <small>
            Already have an account?{" "}
            <Link to="/login" className="text-info">
              Please login
            </Link>{" "}
          </small>
        </p>
        <div className="divider">OR</div>
        <button onClick={handleGoogleLogin} className="btn btn-outline w-full">
          Continue With Google
        </button>
      </div>
    </section>
  );
};

export default SignUp;
