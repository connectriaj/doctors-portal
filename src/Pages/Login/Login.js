import React from "react";
import { useContext } from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/Authentication/Authentication";
import useToken from "../../hooks/useToken";

const Login = () => {
  const {
    register,
    reset,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const { loginUser, googleLogin, forgetPassword, setLoading } =
    useContext(AuthContext);
  const [loginError, setLoginError] = useState("");
  const [loginUserEmail, setLoginUserEmail] = useState("");
  const [token] = useToken(loginUserEmail);

  // these are two for private route and user redirect
  const location = useLocation();
  const navigate = useNavigate();

  const from = location.state?.from?.pathname || "/";

  if (token) {
    navigate(from, { replace: true });
  }

  const handleLogin = (data) => {
    // console.log(data);
    setLoginError("");
    loginUser(data.email, data.password)
      .then((result) => {
        const user = result.user;
        if (user.emailVerified) {
          setLoginUserEmail(data.email);
          toast.success("user login successfully.");
        } else {
          toast.error("your email is not verified, please verify your email!");
        }
        reset();
        // console.log(user);
      })
      .catch((error) => {
        console.error(error);
        setLoginError(error.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleForgetPassword = (data, email) => {
    forgetPassword(data.email)
      .then(() => {})
      .catch((err) => console.error(err));
  };

  // handle google login
  const handleGoogleLogin = () => {
    googleLogin()
      .then((result) => {
        const user = result.user;
        toast.success("user login successfully");
        console.log(user);
      })
      .catch((err) => {
        console.error(err);
        loginError(err.message);
      });
  };

  return (
    <section className="lg:h-[800px]  flex justify-center items-center lg:my-10 lg:mt-20">
      <div className="w-96 p-12 lg:shadow-lg rounded-lg">
        <h2 className="lg:text-3xl text-xl text-bold text-center mb-4 mt-10 lg:mt-0">
          Login
        </h2>
        <form onSubmit={handleSubmit(handleLogin)}>
          <div className="form-control w-full max-w-xs">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              className="input input-bordered w-full"
              type="email"
              {...register("email", { required: "Email is required" })}
            />
            {errors.email && (
              <p className="text-red-600" role="alert">
                {errors.email?.message}
              </p>
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
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be 6 characters or longer",
                },
              })}
            />
            <div>
              {loginError && (
                <p className="text-red-700 text-center">{loginError}</p>
              )}
            </div>
            <p className="text-red-600" role="alert">
              {errors.password?.message}
            </p>
            <label className="label">
              <button onClick={handleForgetPassword}>
                <span className="label-text underline">Forget password?</span>
              </button>
            </label>
          </div>

          <input
            className="btn btn-dark w-full mt-2"
            type="submit"
            value="Login"
          />
        </form>
        <p className="text-center my-2">
          <small>
            New to Doctors Portal?{" "}
            <Link to="/signup" className="text-info">
              Create new account
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

export default Login;
