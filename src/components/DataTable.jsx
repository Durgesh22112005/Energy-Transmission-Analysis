import React from "react";

const DataTable = ({ sensorData }) => {
  return (
    <div className="bg-amber-50/80 backdrop-blur-xl border border-orange-200 rounded-2xl p-6 shadow-lg">
      <h3 className="text-xl font-bold text-stone-900 mb-6">Recent Readings</h3>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="text-left border-b border-amber-300">
              <th className="pb-4 text-stone-600 font-medium">Time</th>
              <th className="pb-4 text-stone-600 font-medium">Voltage (V)</th>
              <th className="pb-4 text-stone-600 font-medium">Current (A)</th>
              <th className="pb-4 text-stone-600 font-medium">Power (W)</th>
              <th className="pb-4 text-stone-600 font-medium">Status</th>
            </tr>
          </thead>
          <tbody>
            {sensorData.slice(-8).reverse().map((reading, index) => (
              <tr key={index} className="border-b border-orange-200/70">
                <td className="py-3 text-stone-700">{reading.time}</td>
                <td className="py-3 text-orange-600 font-medium">{reading.voltage}</td>
                <td className="py-3 text-red-600 font-medium">{reading.current}</td>
                <td className="py-3 text-amber-600 font-medium">{reading.power}</td>
                <td className="py-3">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      reading.voltage > 240 || reading.voltage < 220
                        ? "bg-amber-100 text-amber-800"
                        : "bg-green-100 text-green-800"
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