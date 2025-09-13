import React from "react";
import { Bell, Clock } from "lucide-react";

const getAlertColor = (severity) => {
  switch (severity) {
    case "high":
      return "bg-red-50 border-red-300 text-red-800";
    case "medium":
      return "bg-amber-50 border-amber-300 text-amber-800";
    case "low":
      return "bg-orange-50 border-orange-300 text-orange-800";
    default:
      return "bg-stone-50 border-stone-300 text-stone-800";
  }
};

const AlertsList = ({ alerts, setCurrentScreen }) => {
  return (
    <div className="bg-amber-50/80 backdrop-blur-xl border border-orange-200 rounded-2xl p-6 shadow-lg">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-bold text-stone-900 flex items-center">
          <Bell className="w-5 h-5 mr-2 text-red-500" />
          Recent Alerts
        </h3>
        <button
          onClick={() => setCurrentScreen("alerts")}
          className="text-orange-600 hover:text-red-600 transition-colors font-medium"
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
                    ? "bg-red-100 text-red-800"
                    : alert.severity === "medium"
                    ? "bg-amber-100 text-amber-800"
                    : "bg-orange-100 text-orange-800"
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