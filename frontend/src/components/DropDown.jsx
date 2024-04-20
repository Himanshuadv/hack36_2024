import { useState, useEffect, useRef } from 'react';
// import { GoChevronDown } from 'react-icons/go';
import Panel from './Panel';

function Dropdown({ options, value, onChange,name }) {
  const [isOpen, setIsOpen] = useState(false);
  const divEl = useRef();

  useEffect(() => {
    const handler = (event) => {
      if (!divEl.current) {
        return;
      }

      if (!divEl.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('click', handler, true);

    return () => {
      document.removeEventListener('click', handler);
    };
  }, []);

  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (option) => {
    setIsOpen(false);
    onChange(option);
  };

  const renderedOptions = options.map((option) => {
    return (
      <div
        className="hover:bg-sky-100 rounded cursor-pointer p-1"
        onClick={() => handleOptionClick(option)}
        key={option.value}
      >
        {option.label}
      </div>
    );
  });

  return (
    <div ref={divEl} className="w-full flex items-center justify-center  relative">
      <Panel
        className="flex justify-center items-center  cursor-pointer"
        onClick={handleClick}
      >
        {value?.label || name}
        {/* <GoChevronDown className="text-lg" /> */}
      </Panel>
      {isOpen && <Panel className="absolute top-[80%] z-50">{renderedOptions}</Panel>}
    </div>
  );
}

export default Dropdown;
