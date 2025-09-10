import React from "react";
import { Wifi, WifiOff, CheckCircle, AlertTriangle, AlertCircle } from "lucide-react";

const getStatusColor = (status) => {
  switch (status) {
    case "Normal":
      return "text-green-400 bg-green-400/10 border-green-400/20";
    case "Warning":
      return "text-yellow-400 bg-yellow-400/10 border-yellow-400/20";
    case "Fault":
      return "text-red-400 bg-red-400/10 border-red-400/20";
    default:
      return "text-gray-400 bg-gray-400/10 border-gray-400/20";
  }
};

const StatusHero = ({ isOnline, systemStatus }) => {
  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-slate-800/50 to-slate-900/80 backdrop-blur-xl border border-slate-700/50 rounded-3xl p-8">
      <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 to-purple-600/5"></div>
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-3xl font-bold text-white mb-2">System Status</h2>
            <p className="text-slate-400">Real-time transmission line monitoring</p>
          </div>
          <div
            className={`flex items-center space-x-2 px-4 py-2 rounded-full border ${
              isOnline
                ? "text-green-400 bg-green-400/10 border-green-400/20"
                : "text-red-400 bg-red-400/10 border-red-400/20"
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
