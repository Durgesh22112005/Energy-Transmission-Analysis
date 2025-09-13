import React from "react";
import { Wifi, WifiOff, CheckCircle, AlertTriangle, AlertCircle } from "lucide-react";

const getStatusColor = (status) => {
  switch (status) {
    case "Normal":
      return "text-green-700 bg-green-50 border-green-300";
    case "Warning":
      return "text-amber-700 bg-amber-50 border-amber-300";
    case "Fault":
      return "text-red-700 bg-red-50 border-red-300";
    default:
      return "text-stone-700 bg-stone-50 border-stone-300";
  }
};

const StatusHero = ({ isOnline, systemStatus }) => {
  return (
    <div className="relative overflow-hidden bg-amber-50/80 backdrop-blur-xl border border-orange-200 rounded-3xl p-8 shadow-lg">
      <div className="absolute inset-0 bg-gradient-to-r from-orange-50/50 to-red-50/50"></div>
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-3xl font-bold text-stone-900 mb-2">System Status</h2>
            <p className="text-stone-600">Real-time transmission line monitoring</p>
          </div>
          <div
            className={`flex items-center space-x-2 px-4 py-2 rounded-full border ${
              isOnline
                ? "text-green-700 bg-green-50 border-green-300"
                : "text-red-700 bg-red-50 border-red-300"
            }`}
          >
            {isOnline ? <Wifi className="w-4 h-4" /> : <WifiOff className="w-4 h-4" />}
            <span className="font-medium">{isOnline ? "Online" : "Offline"}</span>
          </div>
        </div>

        <div
          className={`inline-flex items-center space-x-3 px-6 py-4 rounded-2xl border ${getStatusColor(
            systemStatus
          )}`}
        >
          {systemStatus === "Normal" && <CheckCircle className="w-8 h-8" />}
          {systemStatus === "Warning" && <AlertTriangle className="w-8 h-8" />}
          {systemStatus === "Fault" && <AlertCircle className="w-8 h-8" />}
          <div>
            <div className="text-2xl font-bold">{systemStatus}</div>
            <div className="text-sm opacity-75">All systems operational</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatusHero;

