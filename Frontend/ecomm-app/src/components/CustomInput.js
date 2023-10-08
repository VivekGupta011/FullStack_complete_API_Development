import React from "react";

const CustomInput = ({ type, name, placeholder, className, value, change, onBlur, disabled }) => {
  return (
    <div>
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        className={className}
        onChange={change}
        onBlur={onBlur}
        value={value}
        disabled={disabled}
      />
    </div>
  );
};

export default CustomInput;
