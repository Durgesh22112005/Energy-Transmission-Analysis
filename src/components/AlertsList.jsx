import React from "react";
import { Bell, Clock } from "lucide-react";

const getAlertColor = (severity) => {
  switch (severity) {
    case "high":
      return "bg-red-500/10 border-red-500/20 text-red-400";
    case "medium":
      return "bg-yellow-500/10 border-yellow-500/20 text-yellow-400";
    case "low":
      return "bg-blue-500/10 border-blue-500/20 text-blue-400";
    default:
      return "bg-gray-500/10 border-gray-500/20 text-gray-400";
  }
};

const AlertsList = ({ alerts, setCurrentScreen }) => {
  return (
    <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/80 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-bold text-white flex items-center">
          <Bell className="w-5 h-5 mr-2 text-yellow-400" />
          Recent Alerts
        </h3>
        <button
          onClick={() => setCurrentScreen("alerts")}
          className="text-blue-400 hover:text-blue-300 transition-colors font-medium"
        >
          View All
        </button>
      </div>
      <div className="space-y-3">
        {alerts.slice(0, 2).map((alert) => (
          <div key={alert.id} className={`p-4 rounded-xl border ${getAlertColor(alert.severity)}`}>
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <p className="font-medium">{alert.message}</p>
                <p className="text-sm opacity-75 mt-1 flex items-center">
                  <Clock className="w-4 h-4 mr-1" />
                  {alert.timestamp}
                </p>
              </div>
              <div
                className={`px-2 py-1 rounded-full text-xs font-medium ${
                  alert.severity === "high"
                    ? "bg-red-500/20 text-red-300"
                    : alert.severity === "medium"
                    ? "bg-yellow-500/20 text-yellow-300"
                    : "bg-blue-500/20 text-blue-300"
                }`}
              >
                {alert.severity}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AlertsList;
