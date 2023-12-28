import React, { useState } from "react";
import { updateTicket } from "../../services/TicketServices";

function Dialog({ ticket, project, setproject, setFilteredTickets }) {
  const [newTicketName, setNewTicketName] = useState(ticket.title);
  const [description, setDescription] = useState(ticket.description);
  const [SelectedLabel, setSelectedLabel] = useState(ticket.label);
  const [SelectedCritical, setSelectedCritical] = useState(ticket.priority);
  const [SelectedStatus, setSelectedStatus] = useState(ticket.status);

  const editTicket = async (e) => {
    const newTicket = {
      ...ticket,
      //   _id: ticket._id,
      title: newTicketName,
      description: description,
      label: SelectedLabel,
      priority: SelectedCritical,
      status: SelectedStatus,
    };

    const updatedTickets = project.tickets.map((ticket) =>
      ticket._id == newTicket._id ? { ...newTicket } : ticket
    );

    project.tickets = updatedTickets;
    setproject(project);
    setFilteredTickets(updatedTickets);

    //update in backend

    updateTicket(ticket._id, newTicket);

    document.getElementById("cancelBtnTicket").click();
  };

  return (
    <dialog id={"editTicket" + ticket._id} className="modal">
      <div className="modal-box flex flex-col justify-center items-center rounded-xl bg-[#FFF] border-2 ">
        <div className="flex flex-row justify-between items-center w-full">
          <h2 className="text-2xl text-left w-full text-s_black font-bold">
            Edit Ticket
          </h2>
          <div className="flex flex-row items-center">
            <div role="tablist" className="tabs tabs-boxed bg-[#FFF] border-2 ">
              <a
                role="tab"
                className={`tab text-xs ${
                  SelectedStatus === "open"
                    ? "bg-green-400 border-2 text-s_black font-bold mr-2 scale-110"
                    : "text-green-400 border-2 hover:border-green-400 mr-2 scale-90"
                } transition-color duration-300`}
                onClick={() => setSelectedStatus("open")}
              >
                Opened
              </a>

              <a
                role="tab"
                className={`tab text-xs  ${
                  SelectedStatus === "closed"
                    ? "bg-red-400 border-2 text-s_black font-bold scale-110"
                    : "text-red-400 border-2 hover:border-red-400 scale-90"
                } transition-color duration-500`}
                onClick={() => setSelectedStatus("closed")}
              >
                Closed
              </a>
            </div>
          </div>
        </div>
        <label className="form-control w-full flex flex-col">
          <div className="label">
            <span className="label-text text-s_black">Ticket Name</span>
          </div>
          <input
            type="text"
            placeholder="Ex. Fix slow loading..."
            value={newTicketName}
            className="input input-bordered w-full mb-5 input-ghost text-[#4e565e] placeholder:text-[#4e565e] bg-[#f6f8fa] border-2 border-[#dee3e8] focus:bg-transparent focus:outline-[#0366d6] focus:text-[#4e565e] placeholder:italic"
            onChange={(e) => setNewTicketName(e.target.value)}
          />
        </label>
        <label className="form-control w-full flex flex-col mb-5">
          <div className="label" for="description">
            <span className="label-text text-s_black">Description</span>
          </div>
          <input
            id="description"
            type="text"
            placeholder="Ex. Slow loading when opening..."
            value={description}
            className="input input-bordered w-full mb-5 input-ghost text-[#4e565e] placeholder:text-[#4e565e] bg-[#f6f8fa] border-2 border-[#dee3e8] focus:bg-transparent focus:outline-[#0366d6] focus:text-[#4e565e] placeholder:italic"
            onChange={(e) => setDescription(e.target.value)}
          />
        </label>
        <div className="flex flex-row justify-around items-center w-full mb-5">
          <div>
            <div className="join bg-[#FFF]">
              <button
                className={
                  "btn join-item bg-[#FFF] text-[#0366d6] w-20 border-2 border-gray-300 hover:bg-[#e2edfb] hover:border-gray-300 hover:scale-105 " +
                  (SelectedLabel == "feature" && "scale-105 bg-[#e2edfb]")
                }
                onClick={(e) => setSelectedLabel("feature")}
              >
                Feature
              </button>
              <button
                className={
                  "btn join-item bg-[#FFF] text-[#de9a52] border-2 border-gray-300 w-20 hover:bg-[#faf3eb] hover:border-gray-300 hover:scale-105 " +
                  (SelectedLabel == "bug" && "scale-105 bg-[#faf3eb]")
                }
                onClick={(e) => setSelectedLabel("bug")}
              >
                Bug
              </button>
            </div>
          </div>
          <div
            className={
              "flex flex-row items-center p-2 rounded-lg border-2 transition-all duration-500 " +
              (SelectedCritical && "bg-[#fee8e7] scale-105")
            }
          >
            <input
              value="Critical"
              type="checkbox"
              className={
                "toggle toggle-sm z-0 toggle-error [--tglbg:#fff] mr-2"
              }
              checked={SelectedCritical}
              onChange={(e) => setSelectedCritical(!SelectedCritical)}
            />
            <p className="text-[#d35a51] text-base font-bold mr-1">Critical</p>
          </div>
        </div>

        <div className="flex">
          <form method="dialog" className="mr-5">
            <button
              id="cancelBtnTicket"
              className="btn w-20 bg-[#d6dade] text-gray-600 border-gray-300 border-2 hover:scale-105 hover:bg-[#d6dade]"
            >
              Cancel
            </button>
          </form>

          <button
            className="btn w-20 bg-[#0366d6] text-[#FFF] border-gray-300 border-2 hover:scale-105 hover:bg-[#0366d6]"
            onClick={editTicket}
          >
            Edit
          </button>
        </div>
      </div>
      <form method="dialog" className="modal-backdrop">
        <button id="closeNewTicketForm">close</button>
      </form>
    </dialog>
  );
}

export default Dialog;
