import React from "react";

const ConfirmModal = ({
  title,
  message,
  warning,
  closeModal,
  modalData,
  successAction,
  successButtonName,
}) => {
  return (
    <div>
      {/* Put this part before </body> tag */}
      <input type="checkbox" id="confirm-modal" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box">
          <p className="text-error font-bold py-2">{warning}</p>
          <h3 className="font-bold text-lg">{title}</h3>
          <p className="py-4">{message}</p>
          <div className="modal-action">
            <label
              onClick={() => successAction(modalData)}
              htmlFor="confirm-modal"
              className="btn btn-error
            rounded-full"
            >
              {successButtonName}
            </label>
            <button
              onClick={closeModal}
              className="btn btn-primary rounded-full"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
