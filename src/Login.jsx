import {React, useState} from "react";
import axios from "axios";
const Login = () => {

const[emailId,setEmailId]= useState("suraj@gmail.com");
const[password,setPassword]= useState("Suraj@123");

const handleLogin = async()=>{
    try{
        const user= await axios.post("http://localhost:7777/login",{
            email:emailId,
            password:password
        }, {withCredentials:true});

    }catch(err){
        console.log(err.message);
        
    }

}

  return (
    <div className="flex justify-center my-10">
      <div className="card card-border bg-base-300 w-96 ">
        <div className="card-body ">
          <h2 className="card-title justify-center">Login</h2>
          <fieldset className="fieldset">
            <legend className="fieldset-legend">Email Id </legend>
            <input type="text" className="input" value={emailId} onChange={(e)=>setEmailId(e.target.value)} placeholder="EmailId" />

          </fieldset>

          <fieldset className="fieldset my-5">
            <legend className="fieldset-legend">Password</legend>
            <input type="text" className="input" value={password}  onChange={(e)=>setPassword(e.target.value)} placeholder="Password" />
            
          </fieldset>

          <div className="card-actions justify-center">
            <button className="btn btn-primary" onClick={handleLogin} >Login</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
