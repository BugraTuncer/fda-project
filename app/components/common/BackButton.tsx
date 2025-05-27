import React from "react";

interface BackButtonProps {
  onClick: () => void;
  text?: string;
}

const BackButton: React.FC<BackButtonProps> = ({
  onClick,
  text = "Back to Device List",
}) => {
  return (
    <div className="mb-8">
      <button
        onClick={onClick}
        className="flex items-center space-x-3 px-6 py-3 bg-blue-600 text-white rounded-2xl shadow-lg hover:bg-blue-700 hover:shadow-xl transition-all cursor-pointer"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
            clipRule="evenodd"
          />
        </svg>
        <span className="font-semibold">{text}</span>
      </button>
    </div>
  );
};

export default BackButton;
