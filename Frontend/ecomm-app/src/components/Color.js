import React from "react";

const Color = ({ colorData, setColor }) => {
  return (
    <>
      <ul className="colors ps-0">
        {colorData &&
          colorData.map((color) => (
            <li
              onClick={() => setColor(color?._id)}
              key={color?._id}
              style={{ backgroundColor: `${color?.title}` }}
            ></li>
          ))}
      </ul>
    </>
  );
};

export default Color;
