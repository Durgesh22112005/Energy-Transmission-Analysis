// import React from "react";
// import StatusHero from "../components/StatusHero";
// import MetricsCard from "../components/MetricsCard";
// import VoltageChart from "../components/VoltageChart";
// import PerformanceChart from "../components/PerformanceChart";
// import AlertsList from "../components/AlertsList";
// import DataTable from "../components/DataTable";

// import { Zap, Activity, Gauge } from "lucide-react";

// const HomeScreen = ({ isOnline, systemStatus, sensorData, alerts, setCurrentScreen }) => {
//   const latest = sensorData[sensorData.length - 1];

//   return (
//     <div className="max-w-7xl mx-auto px-6 py-10 space-y-10">
//       {/* Hero Status */}
//       <StatusHero isOnline={isOnline} systemStatus={systemStatus} />

//       {/* Metrics */}
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//         <MetricsCard
//           icon={<Zap className="w-6 h-6 text-yellow-400" />}
//           label="Voltage"
//           value={latest.voltage}
//           unit=" V"
//           color="blue"
//           percentage={((latest.voltage - 210) / 40) * 100}
//         />
//         <MetricsCard
//           icon={<Activity className="w-6 h-6 text-green-400" />}
//           label="Current"
//           value={latest.current}
//           unit=" A"
//           color="purple"
//           percentage={((latest.current - 10) / 20) * 100}
//         />
//         <MetricsCard
//           icon={<Gauge className="w-6 h-6 text-red-400" />}
//           label="Power"
//           value={latest.power}
//           unit=" W"
//           color="emerald"
//           percentage={((latest.power - 3000) / 1000) * 100}
//         />
//       </div>

//       {/* Charts + Alerts */}
//       <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//         <div className="lg:col-span-2 space-y-6">
//           <VoltageChart data={sensorData} />
//           <PerformanceChart data={sensorData} />
//         </div>
//         <AlertsList alerts={alerts} setCurrentScreen={setCurrentScreen} />
//       </div>

//       {/* Table */}
//       <DataTable sensorData={sensorData} />
//     </div>
//   );
// };

// export default HomeScreen;

import React from "react";
import StatusHero from "../components/StatusHero";
import MetricsCard from "../components/MetricsCard";
import VoltageChart from "../components/VoltageChart";
import PerformanceChart from "../components/PerformanceChart";
import AlertsList from "../components/AlertsList";
import DataTable from "../components/DataTable";

import { Zap, Activity, Gauge } from "lucide-react";
import "../styles/alerts.css"; // <-- make sure this file exists

const HomeScreen = ({ isOnline, systemStatus, sensorData, alerts, setCurrentScreen }) => {
  const latest = sensorData[sensorData.length - 1];

  // Detect critical alerts
  const hasCriticalAlert = alerts.some(
    (alert) =>
      alert.level === "high" || 
      alert.message?.toLowerCase().includes("critical")
  );

  return (
    <div className={`min-h-screen transition-all duration-500 ${hasCriticalAlert ? "flash-bg" : "bg-gray-900"}`}>
      {/* Critical Alert Banner */}
      {hasCriticalAlert && (
        <div className="fixed top-0 left-0 w-full bg-red-700 text-white text-center py-4 z-50 text-xl font-bold shadow-lg">
          🚨 DANGEROUS ALERT DETECTED! Immediate Action Required 🚨
        </div>
      )}

      <div className={`max-w-7xl mx-auto px-6 py-10 space-y-10 ${hasCriticalAlert ? "opacity-80 blur-[1px]" : ""}`}>
        {/* Hero Status */}
        <StatusHero isOnline={isOnline} systemStatus={systemStatus} />

        {/* Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <MetricsCard
            icon={<Zap className="w-6 h-6 text-yellow-400" />}
            label="Voltage"
            value={latest.voltage}
            unit=" V"
            color="blue"
            percentage={((latest.voltage - 210) / 40) * 100}
          />
          <MetricsCard
            icon={<Activity className="w-6 h-6 text-green-400" />}
            label="Current"
            value={latest.current}
            unit=" A"
            color="purple"
            percentage={((latest.current - 10) / 20) * 100}
          />
          <MetricsCard
            icon={<Gauge className="w-6 h-6 text-red-400" />}
            label="Power"
            value={latest.power}
            unit=" W"
            color="emerald"
            percentage={((latest.power - 3000) / 1000) * 100}
          />
        </div>

        {/* Charts + Alerts */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <VoltageChart data={sensorData} />
            <PerformanceChart data={sensorData} />
          </div>
          <AlertsList alerts={alerts} setCurrentScreen={setCurrentScreen} />
        </div>

        {/* Table */}
        <DataTable sensorData={sensorData} />
      </div>
    </div>
  );
};

export default HomeScreen;
