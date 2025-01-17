import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import Spinner from "../../utils/Spinner";
import useAuth from "../../hooks/useAuth";
import handleAuthError from "../../utils/handleAuthError";
import axiosInstance from "../../utils/axiosInstance";
import toast from "react-hot-toast"

const SignIn = () => {
  const { isSubmitting, setIsSubmitting, setToken, token, setUser } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();

  const handleSignIn = async (formData) => {
    setIsSubmitting(true);
    try {
      const { data } = await axiosInstance.post("/auth/signin", formData);
      setToken(data.token);
      setUser(data.user);
      localStorage.setItem("token", JSON.stringify(data.token));
      toast.success(`Welcome ${data.user.username}`);
      navigate("/");
    } catch (error) {
      handleAuthError(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const submit = (data) => {
    handleSignIn(data);
    console.log(data);
  };

  const btnText = isSubmitting ? <Spinner /> : "Sign In";

  return (
    <div className="bg-black d-flex flex-column justify-content-center right-side text-center">
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
            PASSWORD
          </label>
          <input
            {...register("password", { required: true })}
            type="text"
            className={`w-100 border-0 border-bottom bg-black ${
              errors.username ? "border-danger" : "border-secondary"
            }`}
            placeholder="*********"
          />
          {errors?.password?.type === "required" ? (
            <span className="text-danger fw-semibold position-absolute end-0">
              This field is required!
            </span>
          ) : null}
        </div>
        <p className="text-end">Forgot password?</p>
        <button
          disabled={isSubmitting}
          className="btn bg-white rounded-pill fw-bold py-2 text-black"
          type="submit"
        >
          {btnText}
        </button>
        <p className="text-center">
          Dont't have an account?
          <Link
            className="text-decoration-none text-white fw-semibold "
            to="/signup"
          >
            Sign Up
          </Link>
        </p>
      </form>
    </div>
  );
};

export default SignIn;
