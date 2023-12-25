import React from "react";

const Login = () => {
  return (
    <div className="loginDiv">
      <div className="h-[500px] w-11/12 sm:w-[475px] bg-white rounded-[20px] p-5 flex justify-between flex-col items-center ">
        <div className="flex justify-center items-center mt-2 gap-2">
          <span className="w-[6px] bg-yellow-500 h-[39px]"></span>
          <h1 className="text-[22px] sm:text-[32px] font-montserrat font-[700] uppercase">Clarus Store</h1>
        </div>
        <div>
          <h3>SIGN IN</h3>
          <p>Enter your credentials to access your account</p>
        </div>
        <form>
          <div className="">
            <label htmlFor="email">Email</label>
            <input type="email" placeholder="Enter your email" required />
          </div>
          <div>
            <label htmlFor="pass">Password</label>
            <input
              type="password"
              name="pass"
              placeholder="Enter your password"
              required
            />
          </div>
          <button>Sign In</button>
          <p>
            <span> Forgot your password? </span>
            <span>Reset Password</span>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
