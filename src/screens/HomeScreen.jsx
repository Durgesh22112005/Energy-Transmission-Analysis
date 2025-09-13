import React, { useEffect, useState } from "react";
import StatusHero from "../components/StatusHero";
import MetricsCard from "../components/MetricsCard";
import VoltageChart from "../components/VoltageChart";
import PerformanceChart from "../components/PerformanceChart";
import AlertsList from "../components/AlertsList";
import DataTable from "../components/DataTable";

import { Zap, Activity, Gauge, MapPin, AlertTriangle } from "lucide-react";

const HomeScreen = ({ isOnline, systemStatus, sensorData, alerts, setCurrentScreen }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [visibleSections, setVisibleSections] = useState({
    hero: false,
    metrics: false,
    powerLine: false,
    charts: false,
    table: false
  });

  const latest = sensorData[sensorData.length - 1];

  // Function to detect power line issues based on sensor data
  const detectLineIssue = (data) => {
    // Logic to determine if there's a line cut or blockage
    // This could be based on voltage drops, current anomalies, etc.
    const voltageThreshold = 200; // Minimum acceptable voltage
    const isVoltageLow = data.voltage < voltageThreshold;
    const isCurrentAnomalous = data.current < 1; // Very low current might indicate a break
    
    if (isVoltageLow || isCurrentAnomalous) {
      // Calculate estimated distance based on voltage drop or other factors
      // This is a simplified calculation - you'd replace with your actual algorithm
      const baseDistance = 2.5; // km
      const voltageRatio = data.voltage / 230; // Normal voltage
      const estimatedDistance = baseDistance * (1 - voltageRatio) * 10;
      
      return {
        hasIssue: true,
        distance: Math.max(0.1, Math.min(estimatedDistance, 50)), // Clamp between 0.1 and 50 km
        severity: isVoltageLow && isCurrentAnomalous ? 'critical' : 'warning'
      };
    }
    
    return {
      hasIssue: false,
      distance: 0,
      severity: 'normal'
    };
  };

  const lineIssue = detectLineIssue(latest);

  // Trigger animations on mount
  useEffect(() => {
    setIsLoaded(true);
    
    // Staggered section animations
    const timeouts = [
      setTimeout(() => setVisibleSections(prev => ({ ...prev, hero: true })), 100),
      setTimeout(() => setVisibleSections(prev => ({ ...prev, metrics: true })), 300),
      setTimeout(() => setVisibleSections(prev => ({ ...prev, powerLine: true })), 500),
      setTimeout(() => setVisibleSections(prev => ({ ...prev, charts: true })), 700),
      setTimeout(() => setVisibleSections(prev => ({ ...prev, table: true })), 900)
    ];

    return () => timeouts.forEach(clearTimeout);
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-6 py-10 space-y-10">
      {/* Hero Status with fade-in animation */}
      <div 
        className={`transform transition-all duration-1000 ease-out ${
          visibleSections.hero 
            ? 'opacity-100 translate-y-0' 
            : 'opacity-0 translate-y-8'
        }`}
      >
        <StatusHero isOnline={isOnline} systemStatus={systemStatus} />
      </div>

      {/* Metrics with staggered slide-in animation */}
      <div 
        className={`grid grid-cols-1 md:grid-cols-3 gap-6 transform transition-all duration-1000 ease-out ${
          visibleSections.metrics 
            ? 'opacity-100 translate-y-0' 
            : 'opacity-0 translate-y-8'
        }`}
      >
        {[
          {
            icon: <Zap className="w-6 h-6 text-orange-600" />,
            label: "Voltage",
            value: latest.voltage,
            unit: " V",
            color: "orange",
            percentage: ((latest.voltage - 210) / 40) * 100,
            delay: 0
          },
          {
            icon: <Activity className="w-6 h-6 text-red-600" />,
            label: "Current",
            value: latest.current,
            unit: " A",
            color: "red",
            percentage: ((latest.current - 10) / 20) * 100,
            delay: 200
          },
          {
            icon: <Gauge className="w-6 h-6 text-amber-600" />,
            label: "Power",
            value: latest.power,
            unit: " W",
            color: "amber",
            percentage: ((latest.power - 3000) / 1000) * 100,
            delay: 400
          }
        ].map((metric, index) => (
          <div
            key={metric.label}
            className={`transform transition-all duration-700 ease-out hover:scale-105 hover:-translate-y-1 ${
              visibleSections.metrics 
                ? 'opacity-100 translate-y-0' 
                : 'opacity-0 translate-y-8'
            }`}
            style={{ 
              transitionDelay: visibleSections.metrics ? `${metric.delay}ms` : '0ms' 
            }}
          >
            <div className="group relative">
              <MetricsCard
                icon={metric.icon}
                label={metric.label}
                value={metric.value}
                unit={metric.unit}
                color={metric.color}
                percentage={metric.percentage}
              />
              {/* Pulse effect for critical values */}
              {((metric.label === "Voltage" && (metric.value < 220 || metric.value > 240)) ||
                (metric.label === "Current" && metric.value > 25) ||
                (metric.label === "Power" && metric.value > 3500)) && (
                <div className="absolute inset-0 rounded-2xl bg-red-400 opacity-20 animate-pulse pointer-events-none" />
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Power Line Distance Monitor Section */}
      <div 
        className={`transform transition-all duration-1000 ease-out ${
          visibleSections.powerLine 
            ? 'opacity-100 translate-y-0' 
            : 'opacity-0 translate-y-8'
        }`}
      >
        <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-3xl p-8 border border-slate-700 shadow-2xl">
          <div className="flex items-center gap-4 mb-6">
            <div className="p-3 bg-blue-600 rounded-xl">
              <MapPin className="w-8 h-8 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white">Power Line Monitor</h2>
              <p className="text-slate-400">Real-time line integrity and distance tracking</p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Distance Display */}
            <div className="space-y-6">
              <div className={`p-6 rounded-2xl border-2 transition-all duration-500 ${
                lineIssue.hasIssue 
                  ? lineIssue.severity === 'critical' 
                    ? 'bg-red-950 border-red-500 shadow-red-500/20 shadow-lg' 
                    : 'bg-yellow-950 border-yellow-500 shadow-yellow-500/20 shadow-lg'
                  : 'bg-green-950 border-green-500 shadow-green-500/20 shadow-lg'
              }`}>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-lg font-semibold text-white">Line Status</span>
                  <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                    lineIssue.hasIssue 
                      ? lineIssue.severity === 'critical' 
                        ? 'bg-red-500 text-white' 
                        : 'bg-yellow-500 text-black'
                      : 'bg-green-500 text-white'
                  }`}>
                    {lineIssue.hasIssue 
                      ? lineIssue.severity === 'critical' ? 'CRITICAL' : 'WARNING'
                      : 'NORMAL'
                    }
                  </div>
                </div>
                
                <div className="text-center">
                  <div className="text-4xl font-bold text-white mb-2">
                    {lineIssue.hasIssue ? `${lineIssue.distance.toFixed(1)} km` : 'All Clear'}
                  </div>
                  <p className="text-slate-300">
                    {lineIssue.hasIssue 
                      ? 'Estimated distance to issue location' 
                      : 'No line issues detected'
                    }
                  </p>
                </div>

                {lineIssue.hasIssue && (
                  <div className="mt-4 p-4 bg-black/30 rounded-xl">
                    <div className="flex items-center gap-2 text-white">
                      <AlertTriangle className="w-5 h-5 animate-pulse" />
                      <span className="font-medium">Issue Details:</span>
                    </div>
                    <ul className="mt-2 text-sm text-slate-300 space-y-1">
                      <li>• Voltage: {latest.voltage}V {latest.voltage < 220 ? '(Below normal)' : ''}</li>
                      <li>• Current: {latest.current}A {latest.current < 1 ? '(Abnormally low)' : ''}</li>
                      <li>• Detected at: {new Date().toLocaleTimeString()}</li>
                    </ul>
                  </div>
                )}
              </div>
            </div>

            {/* Visual Line Representation */}
            <div className="space-y-6">
              <div className="p-6 bg-slate-800 rounded-2xl border border-slate-600">
                <h3 className="text-lg font-semibold text-white mb-4">Line Visualization</h3>
                
                <div className="relative h-32 bg-slate-900 rounded-xl overflow-hidden">
                  {/* Power line representation */}
                  <div className="absolute top-1/2 left-0 w-full h-2 bg-gradient-to-r from-green-500 to-orange-500 transform -translate-y-1/2">
                    {/* Normal flow animation */}
                    {!lineIssue.hasIssue && (
                      <div className="absolute top-0 left-0 w-8 h-full bg-white opacity-50 animate-pulse" 
                           style={{ animation: 'slide 2s linear infinite' }} />
                    )}
                    
                    {/* Issue marker */}
                    {lineIssue.hasIssue && (
                      <div 
                        className={`absolute top-1/2 w-4 h-8 transform -translate-y-1/2 ${
                          lineIssue.severity === 'critical' ? 'bg-red-500' : 'bg-yellow-500'
                        } rounded animate-bounce`}
                        style={{ 
                          left: `${Math.min(90, (lineIssue.distance / 50) * 100)}%`,
                          boxShadow: '0 0 10px currentColor'
                        }}
                      />
                    )}
                  </div>
                  
                  {/* Distance markers */}
                  <div className="absolute bottom-2 left-0 w-full flex justify-between text-xs text-slate-400 px-2">
                    <span>0 km</span>
                    <span>25 km</span>
                    <span>50+ km</span>
                  </div>
                </div>
              </div>

              {/* Additional Info */}
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-slate-800 rounded-xl border border-slate-600 text-center">
                  <div className="text-2xl font-bold text-blue-400">
                    {sensorData.filter(d => d.voltage < 220).length}
                  </div>
                  <div className="text-sm text-slate-400">Voltage Drops</div>
                </div>
                <div className="p-4 bg-slate-800 rounded-xl border border-slate-600 text-center">
                  <div className="text-2xl font-bold text-purple-400">
                    {((Date.now() / 1000) % 24).toFixed(0)}h
                  </div>
                  <div className="text-sm text-slate-400">Monitoring</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Charts + Alerts with slide-in from different directions */}
      <div 
        className={`grid grid-cols-1 lg:grid-cols-3 gap-6 ${
          visibleSections.charts ? 'animate-fadeInUp' : 'opacity-0'
        }`}
      >
        <div className={`lg:col-span-2 space-y-6 transform transition-all duration-1000 ease-out ${
          visibleSections.charts 
            ? 'opacity-100 translate-x-0' 
            : 'opacity-0 -translate-x-12'
        }`}>
          <div className="group hover:scale-[1.01] transition-transform duration-300">
            <VoltageChart data={sensorData} />
          </div>
          <div className="group hover:scale-[1.01] transition-transform duration-300">
            <PerformanceChart data={sensorData} />
          </div>
        </div>
        
        <div className={`transform transition-all duration-1000 ease-out ${
          visibleSections.charts 
            ? 'opacity-100 translate-x-0' 
            : 'opacity-0 translate-x-12'
        }`} style={{ transitionDelay: '200ms' }}>
          <div className="group hover:scale-[1.02] hover:-translate-y-1 transition-all duration-300 relative">
            <AlertsList alerts={alerts} setCurrentScreen={setCurrentScreen} />
            {/* Alert notification pulse */}
            {(alerts.some(alert => alert.severity === 'high') || lineIssue.hasIssue) && (
              <div className="absolute -top-2 -right-2 w-4 h-4 bg-red-500 rounded-full animate-ping" />
            )}
          </div>
        </div>
      </div>

      {/* Table with fade-in animation */}
      <div 
        className={`transform transition-all duration-1000 ease-out ${
          visibleSections.table 
            ? 'opacity-100 translate-y-0' 
            : 'opacity-0 translate-y-8'
        }`}
      >
        <div className="group hover:scale-[1.005] transition-transform duration-300">
          <DataTable sensorData={sensorData} />
        </div>
      </div>

      {/* Floating electrical particles animation */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className={`absolute w-2 h-2 bg-gradient-to-r from-orange-400 to-amber-500 rounded-full opacity-20 animate-float ${
              isLoaded ? 'animate-pulse' : ''
            }`}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${3 + Math.random() * 2}s`
            }}
          />
        ))}
      </div>

      {/* Power grid lines animation */}
      <div className="fixed inset-0 pointer-events-none opacity-5">
        <svg className="w-full h-full">
          <defs>
            <pattern id="grid" width="100" height="100" patternUnits="userSpaceOnUse">
              <path 
                d="M 100 0 L 0 0 0 100" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="1"
                className="text-orange-500"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes float {
          0%, 100% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-20px) rotate(180deg);
          }
        }

        @keyframes slide {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(400%); }
        }

        .animate-fadeInUp {
          animation: fadeInUp 1s ease-out forwards;
        }

        .animate-float {
          animation: float 4s ease-in-out infinite;
        }

        /* Hover glow effects */
        .group:hover .glow {
          box-shadow: 0 0 20px rgba(249, 115, 22, 0.3);
        }

        /* Electrical current animation */
        @keyframes current-flow {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100vw); }
        }

        .current-line {
          position: absolute;
          top: 50%;
          left: 0;
          width: 2px;
          height: 2px;
          background: linear-gradient(90deg, transparent, #f97316, transparent);
          animation: current-flow 3s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default HomeScreen;



// import React, { useEffect, useState } from "react";
// import StatusHero from "../components/StatusHero";
// import MetricsCard from "../components/MetricsCard";
// import VoltageChart from "../components/VoltageChart";
// import PerformanceChart from "../components/PerformanceChart";
// import AlertsList from "../components/AlertsList";
// import DataTable from "../components/DataTable";

// import { Zap, Activity, Gauge, MapPin, AlertTriangle } from "lucide-react";

// const HomeScreen = ({ isOnline, systemStatus, sensorData, alerts, setCurrentScreen }) => {
//   const [isLoaded, setIsLoaded] = useState(false);
//   const [visibleSections, setVisibleSections] = useState({
//     hero: false,
//     metrics: false,
//     powerLine: false,
//     charts: false,
//     table: false
//   });

//   const latest = sensorData[sensorData.length - 1];

//   // Function to detect power line issues based on sensor data
//   const detectLineIssue = (data) => {
//     // Logic to determine if there's a line cut or blockage
//     // This could be based on voltage drops, current anomalies, etc.
//     const voltageThreshold = 200; // Minimum acceptable voltage
//     const isVoltageLow = data.voltage < voltageThreshold;
//     const isCurrentAnomalous = data.current < 1; // Very low current might indicate a break
    
//     if (isVoltageLow || isCurrentAnomalous) {
//       // Calculate estimated distance based on voltage drop or other factors
//       // This is a simplified calculation - you'd replace with your actual algorithm
//       const baseDistance = 2.5; // km
//       const voltageRatio = data.voltage / 230; // Normal voltage
//       const estimatedDistance = baseDistance * (1 - voltageRatio) * 10;
      
//       return {
//         hasIssue: true,
//         distance: Math.max(0.1, Math.min(estimatedDistance, 50)), // Clamp between 0.1 and 50 km
//         severity: isVoltageLow && isCurrentAnomalous ? 'critical' : 'warning'
//       };
//     }
    
//     return {
//       hasIssue: false,
//       distance: 0,
//       severity: 'normal'
//     };
//   };

//   const lineIssue = detectLineIssue(latest);

//   // Trigger animations on mount
//   useEffect(() => {
//     setIsLoaded(true);
    
//     // Staggered section animations
//     const timeouts = [
//       setTimeout(() => setVisibleSections(prev => ({ ...prev, hero: true })), 100),
//       setTimeout(() => setVisibleSections(prev => ({ ...prev, metrics: true })), 300),
//       setTimeout(() => setVisibleSections(prev => ({ ...prev, powerLine: true })), 500),
//       setTimeout(() => setVisibleSections(prev => ({ ...prev, charts: true })), 700),
//       setTimeout(() => setVisibleSections(prev => ({ ...prev, table: true })), 900)
//     ];

//     return () => timeouts.forEach(clearTimeout);
//   }, []);

//   return (
//     <div className="max-w-7xl mx-auto px-6 py-10 space-y-10">
//       {/* Hero Status with fade-in animation */}
//       <div 
//         className={`transform transition-all duration-1000 ease-out ${
//           visibleSections.hero 
//             ? 'opacity-100 translate-y-0' 
//             : 'opacity-0 translate-y-8'
//         }`}
//       >
//         <StatusHero isOnline={isOnline} systemStatus={systemStatus} />
//       </div>

//       {/* Metrics with staggered slide-in animation */}
//       <div 
//         className={`grid grid-cols-1 md:grid-cols-3 gap-6 transform transition-all duration-1000 ease-out ${
//           visibleSections.metrics 
//             ? 'opacity-100 translate-y-0' 
//             : 'opacity-0 translate-y-8'
//         }`}
//       >
//         {[
//           {
//             icon: <Zap className="w-6 h-6 text-orange-600" />,
//             label: "Voltage",
//             value: latest.voltage,
//             unit: " V",
//             color: "orange",
//             percentage: ((latest.voltage - 210) / 40) * 100,
//             delay: 0
//           },
//           {
//             icon: <Activity className="w-6 h-6 text-red-600" />,
//             label: "Current",
//             value: latest.current,
//             unit: " A",
//             color: "red",
//             percentage: ((latest.current - 10) / 20) * 100,
//             delay: 200
//           },
//           {
//             icon: <Gauge className="w-6 h-6 text-amber-600" />,
//             label: "Power",
//             value: latest.power,
//             unit: " W",
//             color: "amber",
//             percentage: ((latest.power - 3000) / 1000) * 100,
//             delay: 400
//           }
//         ].map((metric, index) => (
//           <div
//             key={metric.label}
//             className={`transform transition-all duration-700 ease-out hover:scale-105 hover:-translate-y-1 ${
//               visibleSections.metrics 
//                 ? 'opacity-100 translate-y-0' 
//                 : 'opacity-0 translate-y-8'
//             }`}
//             style={{ 
//               transitionDelay: visibleSections.metrics ? `${metric.delay}ms` : '0ms' 
//             }}
//           >
//             <div className="group relative">
//               <MetricsCard
//                 icon={metric.icon}
//                 label={metric.label}
//                 value={metric.value}
//                 unit={metric.unit}
//                 color={metric.color}
//                 percentage={metric.percentage}
//               />
//               {/* Pulse effect for critical values */}
//               {((metric.label === "Voltage" && (metric.value < 220 || metric.value > 240)) ||
//                 (metric.label === "Current" && metric.value > 25) ||
//                 (metric.label === "Power" && metric.value > 3500)) && (
//                 <div className="absolute inset-0 rounded-2xl bg-red-400 opacity-20 animate-pulse pointer-events-none" />
//               )}
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* Power Line Distance Monitor Section */}
//       <div 
//         className={`transform transition-all duration-1000 ease-out ${
//           visibleSections.powerLine 
//             ? 'opacity-100 translate-y-0' 
//             : 'opacity-0 translate-y-8'
//         }`}
//       >
//         <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-3xl p-8 border border-slate-700 shadow-2xl">
//           <div className="flex items-center gap-4 mb-6">
//             <div className="p-3 bg-orange-600 rounded-xl">
//               <MapPin className="w-8 h-8 text-white" />
//             </div>
//             <div>
//               <h2 className="text-2xl font-bold text-white">Power Line Monitor</h2>
//               <p className="text-slate-400">Real-time line integrity and distance tracking</p>
//             </div>
//           </div>

//           <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
//             {/* Distance Display */}
//             <div className="space-y-6">
//               <div className={`p-6 rounded-2xl border-2 transition-all duration-500 ${
//                 lineIssue.hasIssue 
//                   ? lineIssue.severity === 'critical' 
//                     ? 'bg-orange-950 border-orange-500 shadow-orange-500/20 shadow-lg' 
//                     : 'bg-amber-950 border-amber-500 shadow-amber-500/20 shadow-lg'
//                   : 'bg-slate-950 border-slate-500 shadow-slate-500/20 shadow-lg'
//               }`}>
//                 <div className="flex items-center justify-between mb-4">
//                   <span className="text-lg font-semibold text-white">Line Status</span>
//                   <div className={`px-3 py-1 rounded-full text-sm font-medium ${
//                     lineIssue.hasIssue 
//                       ? lineIssue.severity === 'critical' 
//                         ? 'bg-orange-500 text-white' 
//                         : 'bg-amber-500 text-black'
//                       : 'bg-slate-500 text-white'
//                   }`}>
//                     {lineIssue.hasIssue 
//                       ? lineIssue.severity === 'critical' ? 'CRITICAL' : 'WARNING'
//                       : 'NORMAL'
//                     }
//                   </div>
//                 </div>
                
//                 <div className="text-center">
//                   <div className="text-4xl font-bold text-white mb-2">
//                     {lineIssue.hasIssue ? `${lineIssue.distance.toFixed(1)} km` : 'All Clear'}
//                   </div>
//                   <p className="text-slate-300">
//                     {lineIssue.hasIssue 
//                       ? 'Estimated distance to issue location' 
//                       : 'No line issues detected'
//                     }
//                   </p>
//                 </div>

//                 {lineIssue.hasIssue && (
//                   <div className="mt-4 p-4 bg-black/30 rounded-xl">
//                     <div className="flex items-center gap-2 text-white">
//                       <AlertTriangle className="w-5 h-5 animate-pulse text-orange-400" />
//                       <span className="font-medium">Issue Details:</span>
//                     </div>
//                     <ul className="mt-2 text-sm text-slate-300 space-y-1">
//                       <li>• Voltage: {latest.voltage}V {latest.voltage < 220 ? '(Below normal)' : ''}</li>
//                       <li>• Current: {latest.current}A {latest.current < 1 ? '(Abnormally low)' : ''}</li>
//                       <li>• Detected at: {new Date().toLocaleTimeString()}</li>
//                     </ul>
//                   </div>
//                 )}
//               </div>
//             </div>

//             {/* Visual Line Representation */}
//             <div className="space-y-6">
//               <div className="p-6 bg-slate-800 rounded-2xl border border-slate-600">
//                 <h3 className="text-lg font-semibold text-white mb-4">Line Visualization</h3>
                
//                 <div className="relative h-32 bg-slate-900 rounded-xl overflow-hidden">
//                   {/* Power line representation */}
//                   <div className="absolute top-1/2 left-0 w-full h-2 bg-gradient-to-r from-orange-500 to-amber-500 transform -translate-y-1/2">
//                     {/* Normal flow animation */}
//                     {!lineIssue.hasIssue && (
//                       <div className="absolute top-0 left-0 w-8 h-full bg-white opacity-50 animate-pulse" 
//                            style={{ animation: 'slide 2s linear infinite' }} />
//                     )}
                    
//                     {/* Issue marker */}
//                     {lineIssue.hasIssue && (
//                       <div 
//                         className={`absolute top-1/2 w-4 h-8 transform -translate-y-1/2 ${
//                           lineIssue.severity === 'critical' ? 'bg-orange-500' : 'bg-amber-500'
//                         } rounded animate-bounce`}
//                         style={{ 
//                           left: `${Math.min(90, (lineIssue.distance / 50) * 100)}%`,
//                           boxShadow: '0 0 10px currentColor'
//                         }}
//                       />
//                     )}
//                   </div>
                  
//                   {/* Distance markers */}
//                   <div className="absolute bottom-2 left-0 w-full flex justify-between text-xs text-slate-400 px-2">
//                     <span>0 km</span>
//                     <span>25 km</span>
//                     <span>50+ km</span>
//                   </div>
//                 </div>
//               </div>

//               {/* Additional Info */}
//               <div className="grid grid-cols-2 gap-4">
//                 <div className="p-4 bg-slate-800 rounded-xl border border-slate-600 text-center">
//                   <div className="text-2xl font-bold text-orange-400">
//                     {sensorData.filter(d => d.voltage < 220).length}
//                   </div>
//                   <div className="text-sm text-slate-400">Voltage Drops</div>
//                 </div>
//                 <div className="p-4 bg-slate-800 rounded-xl border border-slate-600 text-center">
//                   <div className="text-2xl font-bold text-amber-400">
//                     {((Date.now() / 1000) % 24).toFixed(0)}h
//                   </div>
//                   <div className="text-sm text-slate-400">Monitoring</div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Charts + Alerts with slide-in from different directions */}
//       <div 
//         className={`grid grid-cols-1 lg:grid-cols-3 gap-6 ${
//           visibleSections.charts ? 'animate-fadeInUp' : 'opacity-0'
//         }`}
//       >
//         <div className={`lg:col-span-2 space-y-6 transform transition-all duration-1000 ease-out ${
//           visibleSections.charts 
//             ? 'opacity-100 translate-x-0' 
//             : 'opacity-0 -translate-x-12'
//         }`}>
//           <div className="group hover:scale-[1.01] transition-transform duration-300">
//             <VoltageChart data={sensorData} />
//           </div>
//           <div className="group hover:scale-[1.01] transition-transform duration-300">
//             <PerformanceChart data={sensorData} />
//           </div>
//         </div>
        
//         <div className={`transform transition-all duration-1000 ease-out ${
//           visibleSections.charts 
//             ? 'opacity-100 translate-x-0' 
//             : 'opacity-0 translate-x-12'
//         }`} style={{ transitionDelay: '200ms' }}>
//           <div className="group hover:scale-[1.02] hover:-translate-y-1 transition-all duration-300 relative">
//             <AlertsList alerts={alerts} setCurrentScreen={setCurrentScreen} />
//             {/* Alert notification pulse */}
//             {(alerts.some(alert => alert.severity === 'high') || lineIssue.hasIssue) && (
//               <div className="absolute -top-2 -right-2 w-4 h-4 bg-orange-500 rounded-full animate-ping" />
//             )}
//           </div>
//         </div>
//       </div>

//       {/* Table with fade-in animation */}
//       <div 
//         className={`transform transition-all duration-1000 ease-out ${
//           visibleSections.table 
//             ? 'opacity-100 translate-y-0' 
//             : 'opacity-0 translate-y-8'
//         }`}
//       >
//         <div className="group hover:scale-[1.005] transition-transform duration-300">
//           <DataTable sensorData={sensorData} />
//         </div>
//       </div>

//       {/* Floating electrical particles animation */}
//       <div className="fixed inset-0 pointer-events-none overflow-hidden">
//         {[...Array(6)].map((_, i) => (
//           <div
//             key={i}
//             className={`absolute w-2 h-2 bg-gradient-to-r from-orange-400 to-amber-500 rounded-full opacity-20 animate-float ${
//               isLoaded ? 'animate-pulse' : ''
//             }`}
//             style={{
//               left: `${Math.random() * 100}%`,
//               top: `${Math.random() * 100}%`,
//               animationDelay: `${Math.random() * 3}s`,
//               animationDuration: `${3 + Math.random() * 2}s`
//             }}
//           />
//         ))}
//       </div>

//       {/* Power grid lines animation */}
//       <div className="fixed inset-0 pointer-events-none opacity-5">
//         <svg className="w-full h-full">
//           <defs>
//             <pattern id="grid" width="100" height="100" patternUnits="userSpaceOnUse">
//               <path 
//                 d="M 100 0 L 0 0 0 100" 
//                 fill="none" 
//                 stroke="currentColor" 
//                 strokeWidth="1"
//                 className="text-orange-500"
//               />
//             </pattern>
//           </defs>
//           <rect width="100%" height="100%" fill="url(#grid)" />
//         </svg>
//       </div>

//       <style jsx>{`
//         @keyframes fadeInUp {
//           from {
//             opacity: 0;
//             transform: translateY(30px);
//           }
//           to {
//             opacity: 1;
//             transform: translateY(0);
//           }
//         }

//         @keyframes float {
//           0%, 100% {
//             transform: translateY(0px) rotate(0deg);
//           }
//           50% {
//             transform: translateY(-20px) rotate(180deg);
//           }
//         }

//         @keyframes slide {
//           0% { transform: translateX(-100%); }
//           100% { transform: translateX(400%); }
//         }

//         @keyframes slideToBreak {
//           0% { transform: translateX(-100%); opacity: 1; }
//           80% { opacity: 1; }
//           100% { transform: translateX(95%); opacity: 0; }
//         }

//         @keyframes weakFlow {
//           0% { transform: translateX(-100%); opacity: 0.3; }
//           100% { transform: translateX(200%); opacity: 0; }
//         }

//         .animate-fadeInUp {
//           animation: fadeInUp 1s ease-out forwards;
//         }

//         .animate-float {
//           animation: float 4s ease-in-out infinite;
//         }

//         /* Hover glow effects */
//         .group:hover .glow {
//           box-shadow: 0 0 20px rgba(249, 115, 22, 0.3);
//         }

//         /* Electrical current animation */
//         @keyframes current-flow {
//           0% { transform: translateX(-100%); }
//           100% { transform: translateX(100vw); }
//         }

//         .current-line {
//           position: absolute;
//           top: 50%;
//           left: 0;
//           width: 2px;
//           height: 2px;
//           background: linear-gradient(90deg, transparent, #f97316, transparent);
//           animation: current-flow 3s linear infinite;
//         }
//       `}</style>
//     </div>
//   );
// };

// export default HomeScreen;