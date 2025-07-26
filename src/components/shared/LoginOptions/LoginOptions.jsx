import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import React from "react";
import { FaArrowLeft, FaGithub, FaGoogle } from "react-icons/fa6";
import { useNavigate } from "react-router";

const LoginOptions = () => {
  const { googleLogin, githubLogin, stateData } = useAuth();
  const navigate = useNavigate();
  return (
    <>
      {/* google signup */}
      <div className="mt-6 w-full">
        <div className="relative my-4">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="bg-white px-2 text-muted-foreground">Or</span>
          </div>
        </div>

        <div className="flex justify-center">
          <Button
            type="submit"
            variant="outline"
            className="w-full sm:w-72 flex items-center gap-3 text-sm font-medium shadow-sm hover:bg-muted transition"
            onClick={() =>
              googleLogin().then(() => {
                navigate(stateData ? stateData : "/");
              })
            }
          >
            <FaGoogle className="w-5 h-5 text-primary" />
            Continue with Google
          </Button>
        </div>
      </div>
      {/* github */}
      <div className="mt-6 w-full">
        <div className="flex justify-center">
          <Button
            type="submit"
            variant="outline"
            className="w-full sm:w-72 flex items-center gap-3 text-sm font-medium shadow-sm hover:bg-muted transition"
            onClick={() => {
              githubLogin().then(() => {
                navigate(stateData ? stateData : "/");
              });
            }}
          >
            <FaGithub className="w-5 h-5 text-primary" />
            Continue with Github
          </Button>
        </div>
      </div>
      {/* back to homepage*/}
      <div className="mt-6 w-full">
        <div className="flex justify-center">
          <Button
            type="submit"
            variant="outline"
            className="w-full sm:w-72 flex items-center gap-3 text-sm font-medium shadow-sm hover:bg-muted transition"
            onClick={() => {
              if (
                stateData === null ||
                stateData === "/login" ||
                stateData === "/register"
              ) {
                navigate("/");
              } else {
                navigate(stateData);
              }
            }}
          >
            <FaArrowLeft className="w-5 h-5 text-primary" />
            Go back
          </Button>
        </div>
      </div>
    </>
  );
};

export default LoginOptions;
