import React from "react";

const Modal = ({ isOpen, onClose, children }) => {
  return (
    <>
      {isOpen && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-center justify-center mt-24">
            <div className="fixed inset-0 bg-gray-500 opacity-75"></div>
            <div className="relative bg-white rounded-lg p-8">
              <button
                onClick={onClose}
                className="absolute top-0 left-0 mt-4 ml-4 rounded-xl"
              >
                <svg
                  className="h-6 w-6 text-gray-500 hover:text-gray-800"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M12.707 7.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 001.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
              {children}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;
