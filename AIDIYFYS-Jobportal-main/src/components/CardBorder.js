import React, { useState, useEffect } from 'react';
import { FaPlus, FaMinus } from "react-icons/fa";

const CardBorder = ({ title, content, style, icon, open }) => {
  const [isOpen, setIsOpen] = useState(open);

  useEffect(() => {
    setIsOpen(open);
  }, [open]);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div
      className={`border border-gray-300 border-l-2 border-l-blue bg-white text-secondary ${style} transition-all ease-in-out duration-300`}
    >
      <div
        className="flex gap-4 items-center justify-between px-2 py-[8px] cursor-pointer"
        onClick={toggleAccordion}
      >
        <div className="flex gap-4 items-center">
          <h3 className={`${isOpen ? 'text-blue font-semibold' : ''}`}>{title}</h3>
          {icon && <img src={icon} alt="icon" height={20} width={25} />}
        </div>
        <button
          type="button"
          className={`transition-transform transform font-semibold h-7 min-w-7 rounded-full flex justify-center items-center ${isOpen
              ? 'border-blue border-[1.5px] text-gray bg-white rotate-180'
              : 'text-white bg-blue rotate-0'
            }`}
        >
          {isOpen ? <FaMinus size={11} /> : <FaPlus size={11} />}
        </button>
      </div>
      <div
        className={`overflow-hidden transition-all duration-500 ease-in-out ${isOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
          }`}
      >
        <div
          className={`border-t-[1px] text-sm border-gray-300 py-2 px-2 ${isOpen ? 'opacity-100' : 'opacity-0'
            }`}
        >
          {content}
        </div>
      </div>
    </div>
  );
};

export default CardBorder;
