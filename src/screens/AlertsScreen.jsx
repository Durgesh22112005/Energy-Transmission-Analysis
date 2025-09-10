import React from "react";
import { Clock } from "lucide-react";

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

const AlertsScreen = ({ alerts }) => {
  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      <h2 className="text-3xl font-bold text-white mb-6">All Alerts</h2>
      <div className="space-y-4">
        {alerts.map((alert) => (
          <div key={alert.id} className={`p-4 rounded-xl border ${getAlertColor(alert.severity)}`}>
            <div className="flex items-start justify-between">
              <div>
                <p className="font-medium">{alert.message}</p>
                <p className="text-sm opacity-75 mt-1 flex items-center">
                  <Clock className="w-4 h-4 mr-1" />
                  {alert.timestamp}
                </p>
              </div>
              <span
                className={`px-2 py-1 rounded-full text-xs font-medium ${
                  alert.severity === "high"
                    ? "bg-red-500/20 text-red-300"
                    : alert.severity === "medium"
                    ? "bg-yellow-500/20 text-yellow-300"
                    : "bg-blue-500/20 text-blue-300"
                }`}
              >
                {alert.severity}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AlertsScreen;
