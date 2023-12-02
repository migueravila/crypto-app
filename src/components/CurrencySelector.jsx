import React from "react";

function CurrencySelector({ label, value, onChange, options }) {
  return (
    <div className="form-group">
      <label>
        {label}:
        <select value={value} onChange={onChange}>
          <option value="">Select {label}</option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </label>
    </div>
  );
}

export default CurrencySelector;
