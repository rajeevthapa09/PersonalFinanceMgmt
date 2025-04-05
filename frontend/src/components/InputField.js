import React from "react";

export default function InputField({ label, name, type = "text", value, onChange, ...rest }) {
  return (
    <div style={{ margin: "10px 0" }}>
      <label htmlFor={name} style={{ marginRight: 8 }}>{label}</label>
      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        {...rest}
      />
    </div>
  );
}