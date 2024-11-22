import React from "react";

const Color = (props) => {
  const { colorData, setColor } = props;
  console.log(colorData);
  return (
    <>
      <ul className="colors ps-0">
        <li
          onClick={(e) => setColor(colorData?._id)}
          style={{ backgroundColor: colorData?.title }}
        ></li>
        {/* {colorData?.map((item, index) => {
          return (
            <li
              key={index}
              onClick={(e) => setColor(item._id)}
              style={{backgroundColor: item.title }}
            ></li>
          );
        })} */}
      </ul>
    </>
  );
};

export default Color;
