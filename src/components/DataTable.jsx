import React from "react";

const DataTable = ({ sensorData }) => {
  return (
    <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/80 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-6">
      <h3 className="text-xl font-bold text-white mb-6">Recent Readings</h3>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="text-left border-b border-slate-700">
              <th className="pb-4 text-slate-300 font-medium">Time</th>
              <th className="pb-4 text-slate-300 font-medium">Voltage (V)</th>
              <th className="pb-4 text-slate-300 font-medium">Current (A)</th>
              <th className="pb-4 text-slate-300 font-medium">Power (W)</th>
              <th className="pb-4 text-slate-300 font-medium">Status</th>
            </tr>
          </thead>
          <tbody>
            {sensorData.slice(-8).reverse().map((reading, index) => (
              <tr key={index} className="border-b border-slate-800/50">
                <td className="py-3 text-slate-300">{reading.time}</td>
                <td className="py-3 text-blue-400 font-medium">{reading.voltage}</td>
                <td className="py-3 text-purple-400 font-medium">{reading.current}</td>
                <td className="py-3 text-green-400 font-medium">{reading.power}</td>
                <td className="py-3">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      reading.voltage > 240 || reading.voltage < 220
                        ? "bg-yellow-500/20 text-yellow-300"
                        : "bg-green-500/20 text-green-300"
                    }`}
                  >
                    {reading.voltage > 240 || reading.voltage < 220 ? "Warning" : "Normal"}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DataTable;
