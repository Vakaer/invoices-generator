"use client";
import React, { useState } from "react";

import "@/app/dashboard/globalDashboard.scss";

const SelectForm: React.FC = () => {
  const [selectedValue, setSelectedValue] = useState<number>(1);

  const options: JSX.Element[] = [];
  for (let i = 1; i <= 10; i++) {
    options.push(
      <option key={i} value={i}>
        {i}
      </option>
    );
  }

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = parseInt(event.target.value, 10);
    setSelectedValue(value);
  };

  return (
      <select
        name="selectedValue"
        id="selectedValue"
        onChange={handleSelectChange}
        value={selectedValue}
				className="col-2 text-gray outline-none"
      >
        {options}
      </select>
  );
};

export default SelectForm;
