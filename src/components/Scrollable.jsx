import React, { useRef } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

const ScrollableNav = ({ items, title, subtitle, onItemClick }) => {
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    const { current } = scrollRef;
    if (current) {
      current.scrollBy({
        left: direction === "left" ? -300 : 300,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="flex flex-col items-center justify-center mt-[2rem]">
      {title && (
        <nav className="text-center py-[1rem]">
          <h2 className="text-3xl font-bold font-KhmerOSBattambang mb-4">{title}</h2>
          {subtitle && <p className="text-gray-700 font-KhmerOSBattambang">{subtitle}</p>}
        </nav>
      )}

      <nav className="flex justify-center">
        <div className="flex items-center w-[19rem] sm375:w-[23rem] sm425:w-[25rem] md:w-[40rem] lg:w-full">
          <button
            onClick={() => scroll("left")}
            className="mx-[0.5rem] mt-[1px] w-[33px] h-[32px] flex items-center justify-center text-green-700 hover:text-green-300 ring-2 ring-green-700 hover:ring-green-300 rounded-full bg-white"
          >
            <FiChevronLeft size={32} />
          </button>

          <div ref={scrollRef} className="flex items-center overflow-x-auto scrollbar-hide">
            {items.map((item) => (
              <button
                key={item.id}
                className="flex-shrink-0 px-2 py-2 bg-Colorlogo rounded-full text-center text-white font-KhmerOSBattambang text-sm font-medium hover:bg-green-500 mx-2"
                onClick={() => onItemClick(item.id)}
              >
                {item.title}
              </button>
            ))}
          </div>

          <button
            onClick={() => scroll("right")}
            className="mx-[0.5rem] mt-[1px] w-[33px] h-[33px] flex items-center justify-center text-Colorlogo hover:text-green-300 ring-2 ring-green-700 hover:ring-green-300 rounded-full bg-white"
          >
            <FiChevronRight size={32} />
          </button>
        </div>
      </nav>
    </div>
  );
};

export default ScrollableNav;
