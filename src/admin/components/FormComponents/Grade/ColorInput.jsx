import React, { useState } from "react";
import TamanhoInput from "./TamanhoInput";

const handleColor = () => {};

const ColorInput = ({
  color: cor,
  selectedColor,
  setSelectedColor,
  ...props
}) => {
  //   const [selectedColor, setSelectedColor] = useState(null);
  return (
    <>
      {console.log("selectedColor", selectedColor)}
      {cor && (
        <p
          style={{
            color: cor.value,
            cursor: "pointer",
            border: `1px solid ${cor.value}`,
          }}
          //   onClick={() => setSelectedColor(cor.id)}
          onClick={() =>
            setSelectedColor(
              !selectedColor || selectedColor === cor.id ? cor.id : null
            )
          }
        >
          {cor.name}
        </p>
      )}
    </>
  );
};

export default ColorInput;
