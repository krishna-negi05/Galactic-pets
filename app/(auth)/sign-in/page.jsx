"use client";
import GlobalApi from "@/app/_utils/GlobalApi";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";

function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  // Check if user is already logged in (based on localStorage) and redirect
  useEffect(() => {
    const jwt = typeof window !== "undefined" ? localStorage.getItem("jwt") : null; // Use localStorage here
    if (jwt) {
      router.push("/"); // Redirect to home page if logged in
    }
  }, [router]);

  const onSignIn = async () => {
    if (!email || !password) return; // Prevent invalid submissions

    setIsLoading(true); // Start loading
    try {
      const resp = await GlobalApi.SignIn(email, password);
      localStorage.setItem("user", JSON.stringify(resp.data.user)); // Save user info in localStorage
      localStorage.setItem("jwt", resp.data.jwt); // Save JWT in localStorage
      toast.success("Login Successful");
      router.push("/"); // Navigate to home
    } catch (e) {
      console.error("Sign-in error:", e);
      toast.error("Invalid credentials or server error");
    } finally {
      setIsLoading(false); // Stop loading
    }
  };

  return (
    <div className="flex items-baseline justify-center">
      <div className="flex flex-col items-center justify-center p-10 bg-slate-100 border border-gray-200">
        <Image src="/logo.png" width={100} height={100} alt="pic" />
        <h2 className="font-bold text-3xl">Sign In to Account</h2>
        <div className="w-full flex flex-col gap-5 mt-7">
          <Input
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            disabled={!email || !password || isLoading}
            onClick={onSignIn}
          >
            {isLoading ? "Signing In..." : "Sign In"} {/* Show loading state */}
          </Button>
          <p>
            Don't have an account?{" "}
            <Link className="text-blue-500" href={"/create-account"}>
              Click Here to Create One
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default SignIn;
