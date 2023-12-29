import React, { useEffect } from "react";

function Confirmation({ isConfirmed, setIsConfirmed }) {
  useEffect(() => {
    if (!isConfirmed) document.getElementById("mobileCheckModal").showModal();
  }, []);

  return (
    <dialog className=" modal" id="mobileCheckModal">
      <div className="modal-box flex w-fit flex-col justify-center items-center rounded-xl bg-[#FFF] border-2 ">
        <p className="text-black text-lg">The mobile version is ugly :)</p>
        <p className="text-black text-base">
          The Bug Watch is a Desktop-First app
        </p>
        <p className="text-black mt-5">Please use your nearest pc.</p>
        <button
          className="btn mt-5 text-white"
          onClick={(e) => {
            document.getElementById("closeMobileCheck").click();
            setIsConfirmed(true);
          }}
        >
          I don't mind
        </button>
      </div>

      <form method="dialog" className="modal-backdrop">
        <button id="closeMobileCheck">close</button>
      </form>
    </dialog>
  );
}

export default Confirmation;
