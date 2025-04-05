"use client"


export const Button =({
  label ,
  handleclick
}:{
  label :  string
  handleclick : ()=>void
})=>{



  return<div  onClick= {handleclick}className="bg-gradient-to-tr from-neutral-900 to-neutral-950 rounded-md w-[190px] flex justify-center items-center hover:bg-gradient-to-bl duration-500 cursor-pointer text-lg p-2.5 hover:opacity-70">
    {label}
      </div>
}