import React from "react";
import SignupForm from "./SignupForm";

function SignupPage() {
  const handleSignup = (name, email, password) => {};
  return (
    <>
      <SignupForm onSignup={handleSignup} />
    </>
  );
}

export default SignupPage;
