import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignOutButton,
} from "@clerk/nextjs";
import React from "react";

const HomePage = () => {
  return (
    <div>
      HomePage
      <div className="border-2 w-fit">
        {/* If sign out show sign in btn */}
        <SignedOut>
          <SignInButton />
        </SignedOut>

        {/* if sign in show signout btn */}
        <SignedIn>
          <SignOutButton />
        </SignedIn>
      </div>
    </div>
  );
};

export default HomePage;
