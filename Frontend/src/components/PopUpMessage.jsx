import React from "react";
import { IoIosClose } from "react-icons/io";
export default function PopUpMessage({ message, onClose }) {
  return (
    <div className="flex flex-row justify-center items-center border p-3 mt-5 mx-auto max-w-fit gap-6 rounded-lg shadow-lg px-5">
      <p className="text-lg text-gray-600">{message}</p>
      {/* <button onClick={onClose}>Close</button> */}
      <IoIosClose
        onClick={onClose}
        className="text-4xl cursor-pointer hover:shadow-lg text-green-900"
      />
    </div>
  );
}
