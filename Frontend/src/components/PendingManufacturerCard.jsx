/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from "react";

export default function PendingManufacturerCard({
  item,
  registrationRequestsubmit,
}) {
  console.log(item);
  return (
    <div className="flex flex-row p-4 gap-10 border-2 items-center rounded-sm justify-between pr-10">
      <div className="flex flex-col gap-2 p-3 font-semibold text-slate-700">
        <span>Email : {item.email}</span>
        <span>Brand Name : {item.brandName}</span>
        <span>Pan Number : {item.panNumber}</span>
        <span>Requested On : {item.createdDate}</span>
      </div>
      <div className="flex flex-col gap-3 items-center">
        <button
          className="uppercase font-semibold p-2 border bg-green-600 text-white border-green-600 w-20 rounded-sm hover:opacity-80"
          onClick={() => {
            registrationRequestsubmit({
              manufacturerId: item.id,
              accountStatus: "ACCEPTED",
            });
          }}
        >
          Accept
        </button>
        <button
          className="uppercase font-semibold p-2 border text-red-600 border-red-600 w-20 rounded-sm hover:text-white hover:bg-red-600"
          onClick={() => {
            registrationRequestsubmit({
              manufacturerId: item.id,
              accountStatus: "REJECTED",
            });
          }}
        >
          Reject
        </button>
      </div>
    </div>
  );
}
