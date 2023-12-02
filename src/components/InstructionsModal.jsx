import React from "react";
import Modal from "react-modal";

function InstructionsModal({ isOpen, closeModal }) {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={closeModal}
      className="modal"
      overlayClassName="overlay"
    >
      <button className="modal-close-btn" onClick={closeModal}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          width="24"
          height="24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="12" cy="12" r="10" />
          <line x1="15" y1="9" x2="9" y2="15" />
          <line x1="9" y1="9" x2="15" y2="15" />
        </svg>
      </button>
      <h2>Instructions</h2>
      <p>
        This web app allows you to check the exchange rate of cryptocurrencies.
      </p>
      <p>
        1. Select a cryptocurrency from the dropdown list.
        <br />
        2. Choose a traditional currency for comparison.
        <br />
        3. View the exchange rate between the selected cryptocurrency and
        traditional currency.
      </p>
    </Modal>
  );
}

export default InstructionsModal;
