import React from "react";
import { Zap, Home, BarChart3, Bell } from "lucide-react";

const Navigation = ({ currentScreen, setCurrentScreen, alerts }) => {
  return (
    <nav className="bg-slate-900/80 backdrop-blur-xl border-b border-slate-800 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-3">
            <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-2 rounded-xl">
              <Zap className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold">PowerLine Monitor</h1>
              <p className="text-xs text-slate-400">Transmission Line Analytics</p>
            </div>
          </div>

          <div className="flex space-x-2">
            <button
              onClick={() => setCurrentScreen("home")}
              className={`flex items-center space-x-2 px-4 py-2 rounded-xl transition-all ${
                currentScreen === "home"
                  ? "bg-blue-600 text-white shadow-lg shadow-blue-600/25"
                  : "text-slate-300 hover:text-white hover:bg-slate-800"
              }`}
            >
              <Home className="w-4 h-4" />
              <span>Home</span>
            </button>

            <button
              onClick={() => setCurrentScreen("logs")}
              className={`flex items-center space-x-2 px-4 py-2 rounded-xl transition-all ${
                currentScreen === "logs"
                  ? "bg-blue-600 text-white shadow-lg shadow-blue-600/25"
                  : "text-slate-300 hover:text-white hover:bg-slate-800"
              }`}
            >
              <BarChart3 className="w-4 h-4" />
              <span>Logs</span>
            </button>

            <button
              onClick={() => setCurrentScreen("alerts")}
              className={`flex items-center space-x-2 px-4 py-2 rounded-xl transition-all ${
                currentScreen === "alerts"
                  ? "bg-blue-600 text-white shadow-lg shadow-blue-600/25"
                  : "text-slate-300 hover:text-white hover:bg-slate-800"
              }`}
            >
              <Bell className="w-4 h-4" />
              <span>Alerts</span>
              {alerts.filter((a) => a.severity === "high").length > 0 && (
                <span className="bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {alerts.filter((a) => a.severity === "high").length}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
