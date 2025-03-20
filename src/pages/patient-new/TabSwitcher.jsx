import React, { useState } from "react";

const TabSwitcher = ({ handleChange }) => {
  const [activeTab, setActiveTab] = useState("Overview");

  const tabs = ["Overview", "Details", "Activity Timeline"];

  return (
    <div className="flex gap-4 p-4 bg-slate-200">
      {tabs.map((tab) => (
        <button
          key={tab}
          onClick={() => {
            handleChange(tab);
            setActiveTab(tab);
          }}
          className={`!text-xs !font-semibold cursor-pointer transition-colors duration-300 ${activeTab === tab ? "text-blue-600" : "text-black"
            }`}
        >
          {tab}
        </button>
      ))}
    </div>
  );
};

export default TabSwitcher;
