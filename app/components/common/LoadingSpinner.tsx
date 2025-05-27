import React from "react";

interface LoadingSpinnerProps {
  size?: "sm" | "md" | "lg";
  message?: string;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = "md",
  message = "Loading...",
}) => {
  const sizeClasses = {
    sm: "h-8 w-8",
    md: "h-16 w-16",
    lg: "h-24 w-24",
  };

  return (
    <div className="min-h-[400px] flex flex-col items-center justify-center space-y-6">
      <div className="relative">
        <div
          className={`${sizeClasses[size]} rounded-full border-4 border-gray-200 border-t-blue-500 animate-spin`}
        />
      </div>

      <div className="text-center space-y-2">
        <p className="text-lg font-medium text-gray-700">{message}</p>

        <div className="flex justify-center space-x-1">
          {[0, 1, 2].map((index) => (
            <div
              key={index}
              className="w-2 h-2 rounded-full"
              style={{
                backgroundColor:
                  index === 0 ? "#60a5fa" : index === 1 ? "#a78bfa" : "#f472b6",
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default LoadingSpinner;
