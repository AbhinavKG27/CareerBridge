import React from "react";

import {
  RxCross2,
} from "react-icons/rx";

const ResumeModal = ({
  imageUrl,
  onClose,
}) => {
  return (
    <div className="resume-modal">
      <div className="resume-modal-content">
        <button
          className="resume-close-btn"
          onClick={onClose}
        >
          <RxCross2 />
        </button>

        <img
          src={imageUrl}
          alt="Resume Preview"
        />
      </div>
    </div>
  );
};

export default ResumeModal;