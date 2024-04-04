import React from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import Spinner from "../../utils/Spinner";
import useAuth from "../../hooks/useAuth";

const SignUp = () => {
  const { handleSignUp, isSubmitting } = useAuth();
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm();

  const submit = (data) => {
    handleSignUp(data);
  };

  const btnText = isSubmitting ? <Spinner /> : "Sign Up";
  return (
   
        <div className="bg-black d-flex flex-column justify-content-center right-side">
          <h2>BQ</h2>
          <h2>Welcome to BQ</h2>
          <p>Join our Vibrant community and unlock a world of possibilties!</p>
          <form
            onSubmit={handleSubmit(submit)}
            action=""
            className="d-flex flex-column gap-4 px-4 text-start"
          >
            <div className="position-relative">
              <label htmlFor="" className="fw-semibold">
                USERNAME
              </label>
              <input
                {...register("username", { required: true })}
                type="text"
                className={`w-100 border-0 border-bottom bg-black ${
                  errors.username ? "border-danger" : "border-secondary"
                }`}
                placeholder="John.Doe.200"
              />
              {errors?.username?.type === "required" ? (
                <span className="text-danger fw-semibold position-absolute end-0">
                  This field is required!
                </span>
              ) : null}
            </div>
            <div className="position-relative">
              <label htmlFor="" className="fw-semibold">
                EMAIL
              </label>
              <input
                {...register("email", { required: true })}
                type="text"
                className={`w-100 border-0 border-bottom bg-black ${
                  errors.email ? "border-danger" : "border-secondary"
                }`}
                placeholder="John.Doe.200@gmail.com"

              />
              {errors?.email?.type === "required" ? (
                <span className="text-danger fw-semibold position-absolute end-0">
                  This field is required!
                </span>
              ) : null}
            </div>
            <div className="position-relative">
              <label htmlFor="" className="fw-semibold">
                PASSWORD
              </label>
              <input
                {...register("password", { required: true })}
                type="password"
                className={`w-100 border-0 border-bottom bg-black ${
                  errors.password ? "border-danger" : "border-secondary"
                }`}
                placeholder="***********"
              />
              {errors?.password?.type === "required" ? (
                <span className="text-danger fw-semibold position-absolute end-0">
                  This field is required!
                </span>
              ) : null}
            </div>
            <div className="position-relative">
              <label htmlFor="" className="fw-semibold">
                CONFIRM PASSWORD
              </label>
              <input
                {...register("confirmPassword", {
                  required: true,
                  validate: (inputValue) => {
                    return getValues("password") === inputValue;
                  },
                })}
                type="password"
                className={`w-100 border-0 border-bottom bg-black ${
                  errors.confirmPassword ? "border-danger" : "border-secondary"
                }`}
                placeholder="**********"
                
              />
              {errors?.confirmPassword?.type === "required" ? (
                <span className="text-danger fw-semibold position-absolute end-0">
                  This field is required!
                </span>
              ) : null}
              {errors?.confirmPassword?.type === "validate" ? (
                <span className="text-danger fw-semibold position-absolute end-0">
                  Password does not match!
                </span>
              ) : null}
            </div>
            <button
              disabled={isSubmitting}
              className="btn bg-white rounded-pill fw-bold py-2 text-black"
            >
              {btnText}
            </button>
            <p className="text-center">
              Dont't have an account?{" "}
              <Link
                className="text-decoration-none text-white fw-semibold  "
                to="/signin"
              >
                Sign In
              </Link>
            </p>
          </form>
        </div>
  );
};

export default SignUp;
