import React from "react";
import { ResponsiveContainer, LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from "recharts";

const PerformanceChart = ({ data }) => {
  return (
    <div className="bg-amber-50/80 backdrop-blur-xl border border-orange-200 rounded-2xl p-6 shadow-lg">
      <h3 className="text-xl font-bold text-stone-900 mb-6">24-Hour Performance Overview</h3>
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#FED7AA" />
            <XAxis dataKey="time" stroke="#78716C" fontSize={12} />
            <YAxis stroke="#78716C" fontSize={12} />
            <Tooltip
              contentStyle={{
                backgroundColor: "#FEF3C7",
                border: "1px solid #F59E0B",
                borderRadius: "12px",
                color: "#78716C",
                boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)"
              }}
            />
            <Line type="monotone" dataKey="voltage" stroke="#EA580C" strokeWidth={2} dot={false} name="Voltage (V)" />
            <Line type="monotone" dataKey="current" stroke="#DC2626" strokeWidth={2} dot={false} name="Current (A)" />
            <Line type="monotone" dataKey="power" stroke="#F59E0B" strokeWidth={2} dot={false} name="Power (W)" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default PerformanceChart;