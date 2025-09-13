import React from "react";
import { Zap, Home, BarChart3, Bell } from "lucide-react";

const Navigation = ({ currentScreen, setCurrentScreen, alerts }) => {
  return (
    <nav className="bg-amber-50/90 backdrop-blur-xl border-b border-orange-200 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-3">
            <div className="bg-gradient-to-r from-orange-500 to-red-500 p-2 rounded-xl">
              <Zap className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-stone-900">PowerLine Monitor</h1>
              <p className="text-xs text-stone-500">Transmission Line Analytics</p>
            </div>
          </div>

          <div className="flex space-x-2">
            <button
              onClick={() => setCurrentScreen("home")}
              className={`flex items-center space-x-2 px-4 py-2 rounded-xl transition-all ${
                currentScreen === "home"
                  ? "bg-orange-600 text-white shadow-lg shadow-orange-600/25"
                  : "text-stone-600 hover:text-stone-900 hover:bg-amber-100"
              }`}
            >
              <Home className="w-4 h-4" />
              <span>Home</span>
            </button>

            <button
              onClick={() => setCurrentScreen("logs")}
              className={`flex items-center space-x-2 px-4 py-2 rounded-xl transition-all ${
                currentScreen === "logs"
                  ? "bg-orange-600 text-white shadow-lg shadow-orange-600/25"
                  : "text-stone-600 hover:text-stone-900 hover:bg-amber-100"
              }`}
            >
              <BarChart3 className="w-4 h-4" />
              <span>Logs</span>
            </button>

            <button
              onClick={() => setCurrentScreen("alerts")}
              className={`flex items-center space-x-2 px-4 py-2 rounded-xl transition-all ${
                currentScreen === "alerts"
                  ? "bg-orange-600 text-white shadow-lg shadow-orange-600/25"
                  : "text-stone-600 hover:text-stone-900 hover:bg-amber-100"
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
