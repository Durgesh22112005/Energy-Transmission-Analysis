import React from "react";
import { ResponsiveContainer, AreaChart, Area, CartesianGrid, XAxis, YAxis, Tooltip } from "recharts";
import { TrendingUp } from "lucide-react";

const VoltageChart = ({ data }) => {
  return (
    <div className="bg-amber-50/80 backdrop-blur-xl border border-orange-200 rounded-2xl p-6 shadow-lg">
      <h3 className="text-xl font-bold text-stone-900 mb-6 flex items-center">
        <TrendingUp className="w-5 h-5 mr-2 text-orange-600" />
        Live Voltage Monitoring
      </h3>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data.slice(-12)}>
            <defs>
              <linearGradient id="voltageGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#EA580C" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#EA580C" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#FED7AA" />
            <XAxis dataKey="time" stroke="#78716C" fontSize={12} />
            <YAxis stroke="#78716C" fontSize={12} domain={["dataMin - 10", "dataMax + 10"]} />
            <Tooltip
              contentStyle={{
                backgroundColor: "#FEF3C7",
                border: "1px solid #F59E0B",
                borderRadius: "12px",
                color: "#78716C",
                boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)"
              }}
            />
            <Area type="monotone"  dataKey="voltage" stroke="#EA580C" strokeWidth={2} fill="url(#voltageGradient)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default VoltageChart;