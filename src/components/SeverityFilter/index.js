/**
 * LanguageFilter Component
 * 
 * This component renders a dropdown menu for selecting a language.
 * When the user selects an option, the onSelectLanguage callback is called.
 */
import React from "react";
import "./index.css";

const SeverityFilter = ({ intensity, setIntensity }) => {
  return (
    <div className="severity-filter">
      <label className="severity-filter-label">Select Severity:</label>
      <select
        className="severity-filter-select"
        value={intensity}
        onChange={(e) => setIntensity(e.target.value)}
      >
        <option value="ALL">All</option>
        <option value="LOW">Low</option>
        <option value="MEDIUM">Medium</option>
        <option value="HIGH">High</option>
        
      </select>
    </div>
  );
};

export default SeverityFilter;

