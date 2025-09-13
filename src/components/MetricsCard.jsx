import React from "react";

const MetricsCard = ({ icon, label, value, unit, color, percentage }) => {
  return (
    <div className={`bg-amber-50/80 backdrop-blur-xl border border-${color}-200 rounded-2xl p-6 shadow-lg`}>
      <div className="flex items-center justify-between mb-4">
        <div className={`p-3 bg-${color}-100 rounded-xl`}>
          {icon}
        </div>
        <div className="text-right">
          <div className={`text-sm text-${color}-600`}>{label}</div>
          <div className="text-2xl font-bold text-stone-900">{value}{unit}</div>
        </div>
      </div>
      <div className={`w-full bg-${color}-100 rounded-full h-2`}>
        <div
          className={`bg-gradient-to-r from-${color}-500 to-${color}-400 h-2 rounded-full transition-all duration-300`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};

export default MetricsCard;