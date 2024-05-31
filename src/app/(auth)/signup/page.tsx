"use client";
import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useRouter } from "next/navigation";

const SignUp = () => {
  const router = useRouter();
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      description: "",
      city: "",
      gender: "",
      hobby: [],
      confirmPassword: "",
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
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
      gender: Yup.string().required("Gender is required"),
      hobby: Yup.array()
        .min(1, "Please select at least one hobby")
        .required("hobby is required"),
      password: Yup.string()
        .min(3, "Must be 3 characters or more")
        .max(12, "Must be 12 characters or less")
        .required("Password is required"),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref("password")], "Passwords must match")
        .required("Confirm password is required"),
    }),
    onSubmit: async (values) => {
      //   if (values.image) {
      //     formData.append("image", values.image);
      //   }
      try {
        fetch("/api/users", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        }).then((response) => {
          if (response.ok) {
            alert("SignUp successful!");
            formik.resetForm();
            router.push("/login");
          } else {
            alert("SignUp failed!");
          }
        });
      } catch (error: any) {
        console.error(
          "SignUp error:",
          error.response ? error.response.data : error.message
        );
        alert("SignUp failed!");
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

  return (
    <div className="p-8  bg-gray-100 min-h-screen flex items-center justify-center ">
      <div className="max-w-xl mx-auto bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full">
        <div className="text-3xl text-black font-bold underline text-center mb-6">
          SignUp Page
        </div>
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
              htmlFor="email"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Email:
            </label>
            <input
              id="email"
              name="email"
              type="email"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
            {formik.touched.email && formik.errors.email ? (
              <div className="text-red-500 text-xs italic">
                {formik.errors.email}
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
            {formik.touched.description && formik.errors.description ? (
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
                <label htmlFor={hobby} className="inline-flex items-center">
                  <input
                    id={hobby}
                    type="checkbox"
                    name="hobby"
                    value={hobby}
                    onChange={handleHobbyChange}
                    checked={formik.values.hobby.includes(hobby)}
                    className="form-checkbox h-5 w-5 text-gray-600"
                  />
                  <span className="ml-2 text-gray-700 capitalize">{hobby}</span>
                </label>
              </div>
            ))}
            {formik.touched.hobby && formik.errors.hobby ? (
              <div className="text-red-500 text-xs italic">
                {formik.errors.hobby}
              </div>
            ) : null}
          </div>

          <div className="mb-6">
            <label
              htmlFor="password"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Password:
            </label>
            <input
              id="password"
              name="password"
              type="password"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
            {formik.touched.password && formik.errors.password ? (
              <div className="text-red-500 text-xs italic">
                {formik.errors.password}
              </div>
            ) : null}
          </div>

          <div className="mb-6">
            <label
              htmlFor="confirmPassword"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Confirm Password:
            </label>
            <input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.confirmPassword}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
            {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
              <div className="text-red-500 text-xs italic">
                {formik.errors.confirmPassword}
              </div>
            ) : null}
          </div>

          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Sign Up
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
