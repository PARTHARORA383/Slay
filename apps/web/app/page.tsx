"use client";

import { Card } from "@repo/ui/card";
import { Authonchange } from "./lib/actions/Authonchange.ts";
import { auth } from "@repo/firebase/config";

export default function Page() {
  // ✅ Make sure to call Authonchange() and destructure correctly

  

  const { isAuthenticated } = Authonchange(); 

  if(!isAuthenticated){
    return(
      <div>
        Loading........
      </div>
    )
  }
  return (
    <div>
      <h1>Dashboard</h1>
   
    </div>
  );
}
