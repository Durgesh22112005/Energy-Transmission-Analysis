import React, { useEffect, useState } from "react";
import PerformanceChart from "../components/PerformanceChart";
import DataTable from "../components/DataTable";
import { Database, Activity, TrendingUp } from "lucide-react";

const LogsScreen = ({ sensorData }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [visibleSections, setVisibleSections] = useState({
    header: false,
    stats: false,
    chart: false,
    table: false
  });

  // Calculate some stats for the header
  const totalEntries = sensorData.length;
  const latestReading = sensorData[sensorData.length - 1];
  const avgVoltage = (sensorData.reduce((sum, data) => sum + data.voltage, 0) / totalEntries).toFixed(1);
  const dataRange = sensorData.length > 1 ? 
    `${sensorData[0].time} - ${sensorData[sensorData.length - 1].time}` : 
    latestReading?.time || 'No data';

  useEffect(() => {
    setIsLoaded(true);
    
    // Staggered animations
    const timeouts = [
      setTimeout(() => setVisibleSections(prev => ({ ...prev, header: true })), 100),
      setTimeout(() => setVisibleSections(prev => ({ ...prev, stats: true })), 300),
      setTimeout(() => setVisibleSections(prev => ({ ...prev, chart: true })), 600),
      setTimeout(() => setVisibleSections(prev => ({ ...prev, table: true })), 900)
    ];

    return () => timeouts.forEach(clearTimeout);
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-6 py-10 space-y-10 relative">
      {/* Animated Header */}
      <div 
        className={`transform transition-all duration-1000 ease-out ${
          visibleSections.header 
            ? 'opacity-100 translate-y-0' 
            : 'opacity-0 translate-y-8'
        }`}
      >
        <div className="flex items-center space-x-4 mb-2">
          <Database className="w-8 h-8 text-orange-600 animate-pulse" />
          <h2 className="text-3xl font-bold text-stone-900">System Logs</h2>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-green-500 rounded-full animate-ping"></div>
            <span className="text-sm text-green-600 font-medium">Live Data</span>
          </div>
        </div>
        <p className="text-stone-600 ml-12">Historical performance data and system metrics</p>
      </div>

      {/* Stats Cards */}
      <div 
        className={`grid grid-cols-1 md:grid-cols-3 gap-6 transform transition-all duration-1000 ease-out ${
          visibleSections.stats 
            ? 'opacity-100 translate-y-0' 
            : 'opacity-0 translate-y-8'
        }`}
      >
        {[
          {
            icon: <Database className="w-6 h-6 text-blue-600" />,
            label: "Total Entries",
            value: totalEntries.toLocaleString(),
            color: "blue",
            delay: 0
          },
          {
            icon: <Activity className="w-6 h-6 text-orange-600" />,
            label: "Average Voltage",
            value: `${avgVoltage}V`,
            color: "orange",
            delay: 200
          },
          {
            icon: <TrendingUp className="w-6 h-6 text-green-600" />,
            label: "Data Range",
            value: dataRange,
            color: "green",
            delay: 400,
            small: true
          }
        ].map((stat, index) => (
          <div
            key={stat.label}
            className={`transform transition-all duration-700 ease-out hover:scale-105 hover:-translate-y-1 ${
              visibleSections.stats 
                ? 'opacity-100 translate-y-0' 
                : 'opacity-0 translate-y-8'
            }`}
            style={{ 
              transitionDelay: visibleSections.stats ? `${stat.delay}ms` : '0ms' 
            }}
          >
            <div className={`bg-white/90 backdrop-blur-xl border border-${stat.color}-200 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 group`}>
              <div className="flex items-center justify-between">
                <div>
                  <div className="flex items-center space-x-3 mb-2">
                    {stat.icon}
                    <h3 className="text-sm font-medium text-stone-600">{stat.label}</h3>
                  </div>
                  <p className={`font-bold text-stone-900 ${stat.small ? 'text-sm' : 'text-2xl'} group-hover:scale-110 transition-transform duration-300`}>
                    {stat.value}
                  </p>
                </div>
                <div className={`w-12 h-12 bg-${stat.color}-100 rounded-xl flex items-center justify-center group-hover:rotate-12 transition-transform duration-300`}>
                  {React.cloneElement(stat.icon, { className: `w-6 h-6 text-${stat.color}-600` })}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Performance Chart with slide-in animation */}
      <div 
        className={`transform transition-all duration-1000 ease-out ${
          visibleSections.chart 
            ? 'opacity-100 translate-x-0' 
            : 'opacity-0 -translate-x-12'
        }`}
      >
        <div className="group hover:scale-[1.01] transition-transform duration-300">
          <div className="relative">
            <PerformanceChart data={sensorData} />
            {/* Data flow animation overlay */}
            <div className="absolute top-4 right-4 flex items-center space-x-2">
              <div className="w-2 h-2 bg-orange-500 rounded-full animate-ping"></div>
              <span className="text-xs text-orange-600 font-medium">Updating</span>
            </div>
          </div>
        </div>
      </div>

      {/* Data Table with slide-in animation */}
      <div 
        className={`transform transition-all duration-1000 ease-out ${
          visibleSections.table 
            ? 'opacity-100 translate-y-0' 
            : 'opacity-0 translate-y-8'
        }`}
      >
        <div className="group hover:scale-[1.002] transition-transform duration-300">
          <div className="relative">
            <DataTable sensorData={sensorData} />
            {/* Scroll indicator */}
            <div className="absolute bottom-4 right-4 text-xs text-stone-400 flex items-center space-x-1">
              <div className="w-1 h-1 bg-stone-400 rounded-full animate-bounce"></div>
              <div className="w-1 h-1 bg-stone-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
              <div className="w-1 h-1 bg-stone-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating data stream particles */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className={`absolute w-1.5 h-1.5 bg-gradient-to-r from-blue-400 to-green-500 rounded-full opacity-30 ${
              isLoaded ? 'animate-dataFlow' : ''
            }`}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 4}s`,
              animationDuration: `${4 + Math.random() * 2}s`
            }}
          />
        ))}
      </div>



      <style jsx>{`
        @keyframes dataFlow {
          0% {
            transform: translateX(-10px) translateY(0px) scale(0);
            opacity: 0;
          }
          50% {
            opacity: 0.6;
            transform: translateX(0px) translateY(-10px) scale(1);
          }
          100% {
            transform: translateX(10px) translateY(-20px) scale(0);
            opacity: 0;
          }
        }

        .animate-dataFlow {
          animation: dataFlow 5s ease-in-out infinite;
        }

        /* Pulse effect for live indicators */
        @keyframes livePulse {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.3;
          }
        }

        .animate-livePulse {
          animation: livePulse 2s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default LogsScreen;