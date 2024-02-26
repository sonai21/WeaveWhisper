import React from "react";
import { useSelector } from "react-redux";

export default function RegistrationBonusHeader() {
  const { currentUser } = useSelector((state) => state.user);
  return (
    <>
      {currentUser === null && (
        <div className="p-[6px] bg-cyan-700">
          <p className="text-center text-white font-semibold">
            Super Deal! Get Rs.200 wallet balance on sign up
          </p>
        </div>
      )}
    </>
  );
}
