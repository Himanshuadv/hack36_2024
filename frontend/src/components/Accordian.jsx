import { useState } from 'react';
// import { GoChevronDown, GoChevronLeft } from 'react-icons/go';
import { IoIosArrowDropdown } from "react-icons/io";
import { IoIosArrowDropup } from "react-icons/io";

function Accordion({ items }) {
  const [expandedIndex, setExpandedIndex] = useState(-1);

  const handleClick = (nextIndex) => {
    setExpandedIndex((currentExpandedIndex) => {
      if (currentExpandedIndex === nextIndex) {
        return -1;
      } else {
        return nextIndex;
      }
    });
  };

  const renderedItems = items.map((item, index) => {
    const isExpanded = index === expandedIndex;

    const icon = (
      <span className="text-xl">
        {isExpanded ? <IoIosArrowDropup/> : <IoIosArrowDropdown />}
      </span>
    );

    return (
      <div key={item.id} >
        <div
          className="flex  p-3 border-b  cursor-pointer justify-between "
          onClick={() => handleClick(index)}
        >
          {item.label}
          {icon}
        </div>
        {isExpanded && <div className="border-b p-5 text-white">{item.content}</div>}
      </div>
    );
  });

  return <div className="border-x border-t rounded  text-white flex flex-col justify-center  item-center">{renderedItems}</div>;
}

export default Accordion;
