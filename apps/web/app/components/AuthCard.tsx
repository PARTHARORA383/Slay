



import Link from "next/link.js";
import GoogleButton from "./GoogleButton.tsx";


interface AuthCardProps {
  email: string;
  password: string;
  setEmail: (email: string) => void;
  setPassword: (password: string) => void;
  handleSubmit: () => void;
  type: "signin" | "signup";
}

export const AuthCard = ({ email, password, setEmail, setPassword, handleSubmit, type }: AuthCardProps) => {
  const isSignup = type === "signup"; 

  return (
    <div className="bg-neutral-900 h-full w-full  lg:p-4 pt-20 p-5">
      <div className="flex flex-col lg:mt-16 lg:ml-10">
        <h1 className="text-2xl lg:text-3xl text-neutral-100 font-medium">
          {isSignup ? "Welcome to Slay !" : "Welcome Back"}
        </h1>
        <div className=" text-sm lg:text-md leading-relaxed text-neutral-300">
      
          Signup/Login to get started
            
            
        
        </div>

        <div className="flex flex-col mt-10">
        

          <label className="text-neutral-200 text-md mb-2">Email</label>
          <input 
            type="email" 
            className="bg-neutral-800 text-neutral-200 mb-7 shadow-lg rounded-md h-10 lg:w-2/3 p-2" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            placeholder="Enter your email" 
          />

          <label className="text-neutral-200 text-md mb-2">Password</label>
          <input 
            type="password" 
            className="bg-neutral-800 text-neutral-200 shadow-lg rounded-md h-10 lg:w-2/3 p-2" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            placeholder="Enter your password" 
          />

          <button 
            type="button" 
            onClick={handleSubmit}  
            className="bg-neutral-100 mt-7 text-neutral-950 font-medium text-lg rounded-lg lg:w-2/3 h-10"
          >
            {isSignup ? "Sign Up" : "Sign In"}
          </button>

          <div className="flex items-center my-7  lg:w-2/3">
            <div className="flex-grow border-t border-gray-300"></div>
            <span className="px-4 text-neutral-300 text-sm">or {isSignup ? "register" : "sign in"} with</span>
            <div className="flex-grow border-t border-gray-300"></div>
          </div>

          <div>
            <GoogleButton />
          </div>
        </div>
      </div>
    </div>
  );
};
