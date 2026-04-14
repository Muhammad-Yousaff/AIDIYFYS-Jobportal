import React from 'react';

const InputControl = ({ label, ...props }) => {
  return (
    <div className="flex flex-col gap-2">
      {label && <label className="font-bold">{label}</label>}
      <input
        className="px-2 py-2 w-full text-left border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
        type="text"
        {...props}
      />
    </div>
  );
};

export default InputControl;
