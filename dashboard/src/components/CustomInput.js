import React from "react";

const CustomInput = ({ type, name, placeholder, className, id, val, change, onBul }) => {
  return (
    <div className="form-floating mt-3">
      <input
        type={type}
        name={name}
        onChange={change}
        onBlur={onBul}
        placeholder={placeholder}
        className={`form-control ${className}`}
        id={id}
        value={val}
      />
      <label htmlFor={placeholder}>{placeholder}</label>
    </div>
  );
};

export default CustomInput;
