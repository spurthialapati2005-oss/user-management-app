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
    <div className="text-center">
      <h1 className="text-5xl text-gray-600">Add New User</h1>
      {/* Create user form */}
      <form onSubmit={handleSubmit(onUserCreate)} className="max-w-96 mx-auto mt-10">
        <input type="text" {...register("name")} className="mb-5 border w-full text-2xl" placeholder="Name" />
        <input type="email" {...register("email")} className="mb-5 border w-full text-2xl" placeholder="Email" />
        <input type="date" {...register("dateOfBirth")} className="mb-5 border w-full text-2xl" placeholder="Date of birth" />
        <input type="number" {...register("mobileNumber")} className="mb-5 border w-full text-2xl" placeholder="Mobile number" />
        <button type="submit" className="text-2xl bg-blue-400 text-blue-50 px-8 py-4">Add User</button>
      </form>
    </div>
  );
}
export default AddUser