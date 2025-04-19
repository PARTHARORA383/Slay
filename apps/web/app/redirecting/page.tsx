"use client"
import { useRouter } from "next/navigation.js"
import { useState , useEffect } from "react"

 function ArrowIconBox() {
  return (
    <div className="w-24 h-24 bg-blue-500 rounded-lg flex items-center justify-center mt-8">
      <svg
        className="w-12 h-12 text-white"
        viewBox="0 0 24 24"
        fill="currentColor"
      >
        <path d="M18 6V16H16V9.41L6.41 19L5 17.59L14.59 8H8V6H18Z" />
      </svg>
    </div>
  );
}


export default function redirect (){

  const [count , setCount] = useState(5);
  const router = useRouter()


  useEffect (()=>{

  const interval =  setInterval(() => {
    setCount((prev)=>{

        if(prev <= 1){
        clearInterval(interval);
        return 0
      }
      return prev-1;
    });
  }, 1000);

},[])


  return <div>

    <div className="flex justify-center items-center h-screen ">

    <div className="relative bg-neutral-800 w-[400px] h-[350px] rounded-md flex flex-col items-center">

    <ArrowIconBox/>
    <div className = "flex flex-col items-center ">
    <p className="text-2xl text-neutral-100 font-bold mt-3 ">
      Hang Tight !
      </p>
    <p className="text-lg leading-relaxed text-neutral-100 font-normal text-center mt-2">
      {`You are being redirected to bank page in ${count} seconds`}
      </p>


      <div className="w-full h-10 bg-gradient-to-r from-blue-500 to-blue-700 absolute bottom-0 ">

      </div>

    </div>

    </div>
    </div>

  </div>

}