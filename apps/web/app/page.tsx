"use client";

import { useRouter } from "next/navigation.js";
import { easeIn, motion } from 'framer-motion';

const words = ['Simple.', 'Open.', 'Slay.'];
export default function Page() {
  // ✅ Make sure to call Authonchange() and destructure correctly

  const router =  useRouter()  

  return (
    <div>
     { /* Navbar*/}
     
     <div className="flex items-center justify-between p-4 bg-gradient-to-br from-neutral-800 to-neutral-900 shadow-lg">
      <div className=" text-neutral-100  "> 
        <img src = '/image/logo-removebg-preview.png' className="w-24 lg:w-28 "/>
      </div>
      
      <div className="flex gap-6">

      <div className="lg:text-lg text-neutral-300 hover:text-neutral-400 cursor-pointer transition-colors" onClick={()=>{
        router.push('/Auth/Signup')
      }} >
      Login
      </div>

      <div className="lg:text-lg text-neutral-200 lg:mr-10 hover:text-neutral-400 cursor-pointer transition-colors" onClick={()=>{
        router.push('/Auth/Signup')
      }} >
      Get Started
      </div>
        </div>
     </div>


     { /*Hero Section */}

     <div className="">
        <motion.div 
        initial = {{opacity : 0}}
        animate = {{opacity : 1}}
        transition={{duration : 0.4 , ease : 'easeIn'}}
        className=" text-4xl md:text-6xl lg:text-7xl font-semibold text-neutral-100 mt-12 lg:mt-32 lg:ml-20 ml-3">The Web’s Way to Pay</motion.div>
         <div className="text-4xl md:text-6xl lg:text-7xl font-semibold text-amber-50 mt-3 lg:mt-4 lg:ml-20 ml-3">
      {words.map((word, index) => (
        <motion.span
          key={index}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            delay: index * 1,
            duration: 0.6,
            ease : 'easeIn'
          }}
          className="inline-block mr-4"
        >
          {word}
        </motion.span>
      ))}
    </div>
     </div>
      <motion.div initial = {{opacity : 0}}
      animate = {{opacity : 1}}
      transition={{duration : 0.6 , ease : 'easeIn'}}
      className=" text-xl md:text-2xl text-neutral-400 lg:ml-20 mt-4 ml-3 lg:mr-10">
        
        Pay from any device. Anywhere. Anytime. 
        <br/>
        <div className=" mt-2 relative inline-block px-3 py-0.5">
             <motion.div
        initial={{ width: 0 , left : 0}}
        animate={{ width: '100%'}}
        transition={{ duration: 1.2, ease: 'easeInOut' }}
        className="absolute top-0 left-0 bg-yellow-600 h-full z-0   opacity-30 max-w-md "
      />

      <motion.div 
      initial = {{width : 0 , right : 0 }}
      animate = {{width : '100%'}} 
      transition={{duration : 1.2, ease : 'easeInOut' ,delay: 1.2 }}
       className="absolute top-0 right-0 bg-yellow-600 opacity-60  z-0 h-full max-w-md"   />

       <motion.div 
       initial = {{width : 0 , left : 0}}
       animate = {{width : '100%'}}
       transition={{duration : 1.2 , delay : 2.4}}
       className="absolute top-0 left-0  h-full opacity-100 bg-yellow-600 z-10 max-w-md"/>
      
        <p className="relative z-10 text-2xl font-semibold text-neutral-100 max-w-md">    
          The web is your wallet.
          </p>
        </div>
      </motion.div>

      <motion.div
       initial = {{opacity : 0}}
      animate = {{opacity : 1}}
      transition={{duration : 0.6 , ease : 'easeIn'}}
      className="bg-gradient-to-br from-neutral-700 to-neutral-950 rounded-md py-1.5 lg:py-2 px-4 w-[210px] lg:mt-10 mt-7 ml-3 lg:ml-20 flex justify-center items-center lg:text-lg text-neutral-200 cursor-pointer hover:opacity-80 transition-colors" onClick={()=>{
        router.push('/Auth/Signup')
      }} > 
        Get Started      
        </motion.div>

        <div className="">

        <motion.div 
        initial = {{opacity : 0}}
      animate = {{opacity : 1}}
      transition={{duration : 0.6 , ease : 'easeIn'}}
      className="border-[4px] rounded-3xl hidden lg:block lg:fixed w-[280px] lg:w-[350px]  lg:bottom-auto lg:left-auto  lg:top-28  lg:right-32  h-[400px] lg:h-[800px] translate-y-1/4 pl-6 pr-6 ml-4">

        <motion.div
             initial = {{opacity : 0}}
      animate = {{opacity : 1}}
      transition={{duration : 0.8 , ease : 'easeIn'}}
         className=" w-[100px] lg:w-[150px] bg-neutral-300 mt-6 absolute left-16 lg:left-24  h-5 lg:h-6 rounded-full">
        </motion.div>

        <motion.div>
        
        <motion.div className=" lg:h-[250px] bg-neutral-800 bg-opacity-80 mt-20 lg:mt-32 rounded-lg flex flex-col justify-start items-center">
        <div className=" w-20 h-20 mt-10 rounded-full bg-neutral-300">  

        <img src="/image/anime-character-using-virtual-reality-glasses-metaverse.jpg" className="h-20 w-20 rounded-full"/>
          </div>
          <div className="text-neutral-200 text-lg mt-3">Noddy Arora</div>
          <div className="bg-neutral-900 py-1.5 px-6  rounded-lg text-neutral-200 text-lg mt-4">Pay now</div>
        </motion.div>


        </motion.div>


        </motion.div>
        </div>
       
   
    </div>
  );
}
