import React from "react";
import { ResponsiveContainer, LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from "recharts";

const PerformanceChart = ({ data }) => {
  return (
    <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/80 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-6">
      <h3 className="text-xl font-bold text-white mb-6">24-Hour Performance Overview</h3>
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
            <XAxis dataKey="time" stroke="#9CA3AF" fontSize={12} />
            <YAxis stroke="#9CA3AF" fontSize={12} />
            <Tooltip
              contentStyle={{
                backgroundColor: "#1F2937",
                border: "1px solid #374151",
                borderRadius: "12px",
                color: "#F9FAFB"
              }}
            />
            <Line type="monotone" dataKey="voltage" stroke="#3B82F6" strokeWidth={2} dot={false} name="Voltage (V)" />
            <Line type="monotone" dataKey="current" stroke="#8B5CF6" strokeWidth={2} dot={false} name="Current (A)" />
            <Line type="monotone" dataKey="power" stroke="#10B981" strokeWidth={2} dot={false} name="Power (W)" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default PerformanceChart;
