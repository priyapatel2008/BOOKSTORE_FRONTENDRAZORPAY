import React from 'react';

const Alert = ({ type, message, onClose }) => {
  const bgColor = type === 'success' ? 'bg-green-100' : 'bg-red-100';
  const borderColor = type === 'success' ? 'border-green-400' : 'border-red-400';
  const textColor = type === 'success' ? 'text-green-800' : 'text-red-800';

  return (
    <div
      className={`${bgColor} ${borderColor} ${textColor} px-4 py-3 rounded-lg border-l-4 flex justify-between items-center`}
    >
      <span>{message}</span>
      <button
        onClick={onClose}
        className="text-xl font-bold hover:opacity-70"
      >
        ×
      </button>
    </div>
  );
};

export default Alert;
