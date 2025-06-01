
export const DashboardSkeleton =  ()=>{


  return <div>

     <div className="grid  grid-cols-1 lg:grid-cols-6 lg:max-h-screen">
    
    <div className=" ml-4 mr-4 lg:ml-72 lg:col-span-4 flex flex-col lg:mt-10">


  <div className="grid grid-cols-2 pt-8 gap-5">
    <div className="col-span-1 h-[150px] pt-5 pl-2 pb-5 rounded-md bg-gradient-to-br from-neutral-800 to-neutral-900 animate-pulse ">
    </div>
   <div className="col-span-1 bg-neutral-700 pt-5 pl-2 pb-5 rounded-md bg-gradient-to-br from-neutral-800 to-neutral-900 animate-pulse">
    </div>
  </div>



      <div className="  h-[450px]  mt-6  bg-gradient-to-br from-neutral-800 to-neutral-900 animate-pulse rounded-md shadow-xl ">
    
        
      </div>
    </div>
    
    
    <div className="lg:col-span-2 pt-2 mr-5 lg:ml-0 ml-4 mb-10 lg:mb-0 lg:mt-10 ">
    
    <div className=" h-[300px]  mt-6  bg-gradient-to-br from-neutral-800 to-neutral-900 animate-pulse rounded-md shadow-xl  "> 
    </div>
    
    <div className=" h-[300px]  mt-6  bg-gradient-to-br from-neutral-800 to-neutral-900 animate-pulse rounded-md shadow-xl  "> 
    </div>
    
    
    
    </div>
    </div>
  </div>
}