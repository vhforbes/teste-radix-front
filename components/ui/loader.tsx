import React from "react";

export const Loader: React.FC = () => {
  return (
    <div className="flex items-center justify-center">
      <div className="loader h-6 w-6 animate-spin rounded-full border-4 border-solid border-t-transparent"></div>
      <style>
        {`
              @keyframes spin {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
              }
              .animate-spin {
                animation: spin 1s linear infinite;
              }
            `}
      </style>
    </div>
  );
};

export default Loader;
