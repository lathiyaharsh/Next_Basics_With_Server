"use client";
import fetchUser from "@/Components/getUserData";
import { ModelContext } from "@/app/context/userContext";
import Image from "next/image";
import userImage from "@/images/profile-picture-5.jpg";
import React, { useContext, useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

function Profile() {
  const [user, setUser] = useContext(ModelContext);
  const [viewModel, setViewModel] = useState(false);
  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      name: "",
      description: "",
      city: "",
      gender: "",
      hobby: [],
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .max(15, "Must be 15 characters or less")
        .min(3, "Must be 3 characters or more")
        .required("Name is required"),
      city: Yup.string()
        .max(15, "Must be 15 characters or less")
        .min(3, "Must be 3 characters or more")
        .required("city is required"),
      description: Yup.string()
        .max(15, "Must be 15 characters or less")
        .min(3, "Must be 3 characters or more")
        .required("description is required"),
      hobby: Yup.array().min(1, "Please select at least one hobby"),
      gender: Yup.string().required("Gender is required"),
    }),
    onSubmit: async (values) => {
      //   if (values.image) {
      //     formData.append("image", values.image);
      //   }
      try {
        fetch("/api/users/profile", {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        }).then((response) => {
          if (response.ok) {
            toast.success("Profile updated successfully");
            formik.resetForm();
            setViewModel(false);
            getApi();
            router.push("/user/profile");
          } else {
            toast.error("Failed to update profile");
          }
        });
      } catch (error: any) {
        console.error(
          "SignUp error:",
          error.response ? error.response.data : error.message
        );
      }
    },
  });
  const handleHobbyChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = event.target;
    const { hobby } = formik.values;
    if (checked) {
      formik.setFieldValue("hobby", [...hobby, value]);
    } else {
      formik.setFieldValue(
        "hobby",
        hobby.filter((hobbyValue: string) => hobbyValue !== value)
      );
    }
  };

  const hobbyOptions = [
    "reading",
    "playing sports",
    "traveling",
    "cooking",
    "photography",
    "gaming",
  ];

  const getApi = async () => {
    const result = await fetchUser();
    setUser(result);
  };

  useEffect(() => {
    if (!user) getApi();
  }, [user]);

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
        <>
          <div className="flex items-center justify-center">
            <Image
              src={userImage}
              alt="User Avatar"
              className="rounded w-36 h-36"
              width={150}
              height={150}
            />
          </div>
          <div className="mt-4 text-center">
            <h2 className="text-xl font-semibold text-black">{user.name}</h2>
            <p className="text-gray-600">{user.email}</p>
            <div className="mt-2">
              <p
                className={`text-sm font-medium ${user.isActive ? "text-green-500" : "text-red-500"}`}
              >
                {user.isActive ? "Active" : "Inactive"}
              </p>
            </div>
            <div className="mt-4">
              <p className="text-gray-800">Bio:</p>
              <p className="text-gray-600">
                Software developer with a passion for creating amazing web
                applications.
              </p>
            </div>
            <div className="mt-4">
              <p className="text-gray-800">City:</p>
              <p className="text-gray-600">{user.city}</p>
            </div>
            <div className="mt-4">
              <p className="text-gray-800">Gender:</p>
              <p className="text-gray-600">{user.gender}</p>
            </div>
            <div className="mt-4">
              <p className="text-gray-800">Hobbies:</p>
              <p className="text-gray-600">{user.hobby.join(", ")}</p>
            </div>
            <div className="mt-4">
              <p className="text-gray-800">Role:</p>
              <p className="text-gray-600">{user.role}</p>
            </div>
            <div className="mt-4">
              <button
                onClick={() => {
                  formik.setValues(user);
                  setViewModel(true);
                }}
                className="px-4 py-2 bg-blue-500 text-white rounded"
              >
                Edit Profile
              </button>
            </div>
          </div>

          {viewModel && (
            <div className="flex overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
              <div className="relative p-4 w-full max-w-md max-h-full">
                <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                  <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                      Edit Profile
                    </h3>
                    <button
                      type="button"
                      className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                      onClick={() => {
                        setViewModel(false);
                        formik.resetForm();
                      }}
                    >
                      <svg
                        className="w-3 h-3"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 14 14"
                      >
                        <path
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                        />
                      </svg>
                      <span className="sr-only">Close modal</span>
                    </button>
                  </div>

                  <div className=" bg-gray-100  flex items-center justify-center ">
                    <div className="max-w-xl mx-auto bg-white shadow-md rounded px-8 pt-6 pb-8  w-full">
                      
                      <form onSubmit={formik.handleSubmit}>
                        <div className="mb-4">
                          <label
                            htmlFor="name"
                            className="block text-gray-700 text-sm font-bold mb-2"
                          >
                            Name:
                          </label>
                          <input
                            id="name"
                            name="name"
                            type="text"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.name}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                          />
                          {formik.touched.name && formik.errors.name ? (
                            <div className="text-red-500 text-xs italic">
                              {formik.errors.name}
                            </div>
                          ) : null}
                        </div>

                        <div className="mb-4">
                          <label
                            htmlFor="gender"
                            className="block text-gray-700 text-sm font-bold mb-2"
                          >
                            Gender:
                          </label>
                          <select
                            id="gender"
                            name="gender"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.gender}
                            className="shadow border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                          >
                            <option value="">Select Gender</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                            <option value="other">Other</option>
                          </select>
                          {formik.touched.gender && formik.errors.gender ? (
                            <div className="text-red-500 text-xs italic">
                              {formik.errors.gender}
                            </div>
                          ) : null}
                        </div>

                        <div className="mb-4">
                          <label
                            htmlFor="city"
                            className="block text-gray-700 text-sm font-bold mb-2"
                          >
                            City:
                          </label>
                          <input
                            id="city"
                            name="city"
                            type="text"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.city}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                          />
                          {formik.touched.city && formik.errors.city ? (
                            <div className="text-red-500 text-xs italic">
                              {formik.errors.city}
                            </div>
                          ) : null}
                        </div>

                        <div className="mb-4">
                          <label
                            htmlFor="description"
                            className="block text-gray-700 text-sm font-bold mb-2"
                          >
                            Description:
                          </label>
                          <textarea
                            id="description"
                            name="description"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.description}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                          />
                          {formik.touched.description &&
                          formik.errors.description ? (
                            <div className="text-red-500 text-xs italic">
                              {formik.errors.description}
                            </div>
                          ) : null}
                        </div>
                        <div className="mb-4">
                          <label
                            htmlFor="hobby"
                            className="block text-gray-700 text-sm font-bold mb-2"
                          >
                            Hobby:
                          </label>
                          {hobbyOptions.map((hobby: string, index: number) => (
                            <div key={index}>
                              <label
                                htmlFor={hobby}
                                className="inline-flex items-center"
                              >
                                <input
                                  id={hobby}
                                  type="checkbox"
                                  name="hobby"
                                  value={hobby}
                                  onChange={handleHobbyChange}
                                  checked={formik.values.hobby.includes(hobby)}
                                  className="form-checkbox h-5 w-5 text-gray-600"
                                />
                                <span className="ml-2 text-gray-700 capitalize">
                                  {hobby}
                                </span>
                              </label>
                            </div>
                          ))}
                          {formik.touched.hobby && formik.errors.hobby ? (
                            <div className="text-red-500 text-xs italic">
                              {formik.errors.hobby}
                            </div>
                          ) : null}
                        </div>

                     

                        <div className="flex items-center justify-between">
                          <button
                            type="submit"
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                          >
                            Submit
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </>
      </div>
    </div>
  );
}

export default Profile;
