import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import BlankSpace from "../components/BlankSpace";
import SectionTitle from "../components/SectionTitle";
import SocialLogin from "../components/SocialLogin";
import useAuth from "../hooks/useAuth";
import useAxiosPublic from "../hooks/useAxiosPublic";
const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const SignUp = () => {
  const navigate = useNavigate();
  const { createUser, updateUserProfile, logOut } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const axiosPublic = useAxiosPublic();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const name = data.name;
    const email = data.email;
    const role = data.role;
    const image = data.image[0];
    const password = data.password;
    const formData = new FormData();

    formData.append("image", image);
    try {
      setLoading(true);
      const { data } = await axios.post(image_hosting_api, formData);
      setLoading(false);
      setError("");
      console.log(data.data.display_url);
      await createUser(email, password);
      const userInfo = {
        name: name,
        email: email,
        image: data.data.display_url,
        role: role,
      };

      await updateUserProfile(name, data?.data?.display_url);
      await logOut();
      await axiosPublic.post("/users", userInfo).then((res) => {
        if (res.data.insertedId) {
          console.log("user added to the database");
          reset();
          Swal.fire({
            title: "You have Successfully signed up. Please login..",
            showClass: {
              popup: "animate__animated animate__fadeInDown",
            },
            hideClass: {
              popup: "animate__animated animate__fadeOutUp",
            },
          });
        }
      });
      await navigate("/login");
    } catch (err) {
      setError("The email you provided is already signed up.");
      console.log(err);
    }
  };

  return (
    <section className="min-h-screen">
      <BlankSpace></BlankSpace>
      <div className="w-full md:max-w-3xl mx-auto mt-10 p-4 rounded-md shadow sm:p-8 dark:bg-gray-50 dark:text-gray-800">
        <SectionTitle heading={"Sign up please"}></SectionTitle>

        <div className="my-6 space-y-4"></div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          <div className="space-y-4">
            <div className="form-control">
              <label className="label">
                <span className="label-text">User Name</span>
              </label>
              <input
                type="text"
                {...register("name", { required: true })}
                name="name"
                placeholder="User Name"
                className="w-full px-3 py-2 border rounded-md dark:border-gray-300 dark:bg-gray-50 dark:text-gray-800 focus:dark:border-violet-600"
              />
              {errors.name && (
                <span className="text-red-600">Name is required</span>
              )}
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                {...register("email", { required: true })}
                name="email"
                placeholder="Your Email"
                className="w-full px-3 py-2 border rounded-md dark:border-gray-300 dark:bg-gray-50 dark:text-gray-800 focus:dark:border-violet-600"
              />
              {errors.email && (
                <span className="text-red-600">Email is required</span>
              )}
            </div>
            <div className="flex flex-col md:flex-row gap-6">
              <div className="form-control w-full ">
                <label className="label">
                  <span className="label-text">Role</span>
                </label>
                <select
                  defaultValue="user"
                  {...register("role", { required: true })}
                  className="select select-bordered w-full"
                >
                  <option value="user">User</option>
                  <option value="seller">Seller</option>
                </select>
              </div>

              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text">Upload Your Photo</span>
                </label>
                <input
                  {...register("image", { required: true })}
                  type="file"
                  className="file-input w-full "
                />
                {errors.image && (
                  <span className="text-red-600">Photo is required</span>
                )}
              </div>
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                {...register("password", {
                  required: true,
                  minLength: 6,
                  maxLength: 20,
                  pattern: /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z])/,
                })}
                placeholder="Password"
                className="w-full px-3 py-2 border rounded-md dark:border-gray-300 dark:bg-gray-50 dark:text-gray-800 focus:dark:border-violet-600"
              />
              {errors.password?.type === "required" && (
                <p className="text-red-600">Password is required</p>
              )}
              {errors.password?.type === "minLength" && (
                <p className="text-red-600">Password must be 6 characters</p>
              )}
              {errors.password?.type === "maxLength" && (
                <p className="text-red-600">
                  Password must be less than 20 characters
                </p>
              )}
              {errors.password?.type === "pattern" && (
                <p className="text-red-600">
                  Password must have one Uppercase one lower case, one number
                  and one special character.
                </p>
              )}
            </div>
          </div>
          <div className="form-control mt-6">
            <input
              disabled={loading}
              className="btn btn-primary"
              type="submit"
              value={loading ? "Signing Up" : "Sign Up"}
            />
            {error && <p className="text-red-500 text-center">{error}</p>}
          </div>
        </form>
        <p className="text-xs text-center sm:px-6 dark:text-gray-600 font-poppins mt-2">
          Already have an account?
          <Link className="underline text-blue-600" to="/login">
            Login
          </Link>
        </p>
        <div className="flex items-center w-full my-4">
          <hr className="w-full dark:text-gray-600" />
          <p className="px-3 dark:text-gray-600">OR</p>
          <hr className="w-full dark:text-gray-600" />
        </div>
        <SocialLogin></SocialLogin>
      </div>
    </section>
  );
};

export default SignUp;
