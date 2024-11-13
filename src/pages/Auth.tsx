import { useState } from "react";
import SignIn from "../components/SignIn";
import SignUp from "../components/SignUp";

const Auth = () => {
  const [isLogin, setIsLogin] = useState<boolean>(true);

  if (isLogin) {
    document.title = "Login";
  } else {
    document.title = "Create an Account";
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl grid md:grid-cols-2 gap-8 items-center">
        {isLogin ? (
          <SignIn setIsLogin={setIsLogin} />
        ) : (
          <SignUp setIsLogin={setIsLogin} />
        )}
      </div>
    </div>
  );
};

export default Auth;
