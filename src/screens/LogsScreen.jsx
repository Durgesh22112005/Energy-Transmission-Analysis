import React from "react";
import PerformanceChart from "../components/PerformanceChart";
import DataTable from "../components/DataTable";

const LogsScreen = ({ sensorData }) => {
  return (
    <div className="max-w-7xl mx-auto px-6 py-10 space-y-10">
      <h2 className="text-3xl font-bold text-white mb-6">System Logs</h2>
      <PerformanceChart data={sensorData} />
      <DataTable sensorData={sensorData} />
    </div>
  );
};

export default LogsScreen;
