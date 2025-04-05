"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation.js";
export const Authonchange = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token"); // ✅ Check token in localStorage

    if (token) {
      setIsAuthenticated(true); // ✅ User stays on the page
    } else {
      router.replace("/Auth/Signin"); // ❌ Invalid token → Redirect
    }
  }, []); // ✅ Runs only once on mount

  return { isAuthenticated };
};
