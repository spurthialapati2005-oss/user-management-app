import React from 'react'
import {useForm} from 'react-hook-form'
import { useNavigate } from 'react-router';
import { useState } from 'react';

function AddUser() {
  const {register, handleSubmit, formState:{errors}} = useForm();
  let [loading,setLoading] = useState(false);
  let [Error, setError] = useState("");
  let navigate = useNavigate();

  //form submit
  const onUserCreate = async(newUser) => {
    //console.log(newUser)
    setLoading(true)
    //make HTTP POST req to create new user
    try{
      let res = await fetch("http://localhost:4000/user-api/users",{
        method:"POST",
        headers:{
          "Content-Type":"application/json",
        },
        body: JSON.stringify(newUser),
      });
      if(res.status === 201){
        //user created it shld navigate to users list
        navigate("/users-list")
      }else{
        throw new Error("error occurred");
      }
    } catch(err){
      setError(err)
    } finally{
      setLoading(false)
    }
  }
  if(loading){
   return <p className="text-center text-orange-400 text-3xl"> Loading...</p>;
  }

  if (Error) {
    return <p className="text-center text-red-400 text-3xl"> {Error.message}</p>;
  }

  return (
  <div className="min-h-screen bg-gray-50 flex flex-col items-center py-12 px-4">
    <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-lg border border-gray-100">
      <h1 className="text-4xl font-bold text-gray-800 text-center mb-8">Create Account</h1>

      {Error && (
        <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 text-red-700 flex items-center gap-2">
          <span>⚠️</span>
          <p className="font-medium text-sm">{Error.message}</p>
        </div>
      )}

      <form onSubmit={handleSubmit(onUserCreate)} className="space-y-5">
        <div>
          <label className="block text-sm font-semibold text-gray-600 mb-1">Full Name</label>
          <input
            type="text"
            {...register("name", { required: "Name is required" })}
            className={`w-full p-3 border rounded-lg outline-none focus:ring-2 transition-all ${
              errors.name ? "border-red-400 focus:ring-red-200" : "border-gray-300 focus:ring-blue-200"
            }`}
            placeholder="Name"
          />
          {errors.name && (
            <span className="text-red-500 text-xs mt-1 italic">{errors.name.message}</span>
          )}
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-600 mb-1">Email Address</label>
          <input
            type="email"
            {...register("email", {
              required: "Email is required",
              pattern: { value: /^\S+@\S+$/i, message: "Invalid email format" },
            })}
            className={`w-full p-3 border rounded-lg outline-none focus:ring-2 transition-all ${
              errors.email ? "border-red-400 focus:ring-red-200" : "border-gray-300 focus:ring-blue-200"
            }`}
            placeholder="example@email.com"
          />
          {errors.email && (
            <span className="text-red-500 text-xs mt-1 italic">{errors.email.message}</span>
          )}
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-600 mb-1">Date of Birth</label>
          <input
            type="date"
            {...register("dateOfBirth", { required: "Date of birth is required" })}
            className={`w-full p-3 border rounded-lg outline-none focus:ring-2 transition-all ${
              errors.dateOfBirth ? "border-red-400 focus:ring-red-200" : "border-gray-300 focus:ring-blue-200"
            }`}
          />
          {errors.dateOfBirth && (
            <span className="text-red-500 text-xs mt-1 italic">
              {errors.dateOfBirth.message}
            </span>
          )}
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-600 mb-1">Mobile Number</label>
          <input
            type="number"
            {...register("mobileNumber", {
              required: "Mobile number is required",
              minLength: { value: 10, message: "Must be at least 10 digits" },
            })}
            className={`w-full p-3 border rounded-lg outline-none focus:ring-2 transition-all ${
              errors.mobileNumber ? "border-red-400 focus:ring-red-200" : "border-gray-300 focus:ring-blue-200"
            }`}
            placeholder="9876543210"
          />
          {errors.mobileNumber && (
            <span className="text-red-500 text-xs mt-1 italic">
              {errors.mobileNumber.message}
            </span>
          )}
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`w-full text-white font-bold py-4 rounded-lg shadow-lg transition-all mt-4 flex justify-center items-center gap-2 ${
            loading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700 active:scale-95"
          }`}
        >
          {loading ? (
            <>
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              <span>Registering...</span>
            </>
          ) : (
            "Register User"
          )}
        </button>
      </form>
    </div>
  </div>
);
}
export default AddUser