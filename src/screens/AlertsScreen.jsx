import React, { useEffect, useState } from "react";
import { Clock, Bell, AlertTriangle, Info, CheckCircle } from "lucide-react";

const getAlertColor = (severity) => {
  switch (severity) {
    case "high":
      return "bg-red-50 border-red-300 text-red-800";
    case "medium":
      return "bg-amber-50 border-amber-300 text-amber-800";
    case "low":
      return "bg-orange-50 border-orange-300 text-orange-800";
    default:
      return "bg-stone-50 border-stone-300 text-stone-800";
  }
};

const getAlertIcon = (severity) => {
  switch (severity) {
    case "high":
      return <AlertTriangle className="w-5 h-5 text-red-600" />;
    case "medium":
      return <Bell className="w-5 h-5 text-amber-600" />;
    case "low":
      return <Info className="w-5 h-5 text-orange-600" />;
    default:
      return <CheckCircle className="w-5 h-5 text-stone-600" />;
  }
};

const AlertsScreen = ({ alerts }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [visibleSections, setVisibleSections] = useState({
    header: false,
    container: false,
    alerts: false
  });

  const alertCounts = alerts.reduce((acc, alert) => {
    acc[alert.severity] = (acc[alert.severity] || 0) + 1;
    return acc;
  }, {});

  const criticalAlerts = alerts.filter(alert => alert.severity === 'high');

  useEffect(() => {
    setIsLoaded(true);
    
    // Staggered animations
    const timeouts = [
      setTimeout(() => setVisibleSections(prev => ({ ...prev, header: true })), 100),
      setTimeout(() => setVisibleSections(prev => ({ ...prev, container: true })), 300),
      setTimeout(() => setVisibleSections(prev => ({ ...prev, alerts: true })), 500)
    ];

    return () => timeouts.forEach(clearTimeout);
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-6 py-10 relative">
      {/* Animated Header */}
      <div 
        className={`flex items-center justify-between mb-8 transform transition-all duration-1000 ease-out ${
          visibleSections.header 
            ? 'opacity-100 translate-y-0' 
            : 'opacity-0 translate-y-8'
        }`}
      >
        <div className="flex items-center space-x-4">
          <Bell className="w-8 h-8 text-orange-600 animate-pulse" />
          <h2 className="text-3xl font-bold text-stone-900">All Alerts</h2>
          {criticalAlerts.length > 0 && (
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-red-500 rounded-full animate-ping"></div>
              <span className="text-sm text-red-600 font-medium">
                {criticalAlerts.length} Critical
              </span>
            </div>
          )}
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold text-stone-900">{alerts.length}</div>
          <div className="text-sm text-stone-600">Total Alerts</div>
        </div>
      </div>

      {/* Alerts Container with slide-in animation */}
      <div 
        className={`bg-white/90 backdrop-blur-xl border border-stone-200 rounded-2xl shadow-lg overflow-hidden transform transition-all duration-1000 ease-out ${
          visibleSections.container 
            ? 'opacity-100 translate-y-0' 
            : 'opacity-0 translate-y-8'
        }`}
      >
        <div className="bg-gradient-to-r from-stone-50 to-orange-50 px-6 py-4 border-b border-stone-200 relative overflow-hidden">
          <h3 className="text-lg font-semibold text-stone-900">Recent Activity</h3>
          <p className="text-sm text-stone-600 mt-1">All system alerts and notifications</p>
          
          {/* Alert severity indicator wave */}
          {criticalAlerts.length > 0 && (
            <div className="absolute right-0 top-0 bottom-0 w-32 opacity-10">
              <div className="w-full h-full bg-gradient-to-l from-red-500 to-transparent animate-pulse"></div>
            </div>
          )}
        </div>
        
        <div className="p-6">
          {alerts.length === 0 ? (
            <div 
              className={`text-center py-12 transform transition-all duration-1000 ease-out ${
                visibleSections.alerts 
                  ? 'opacity-100 scale-100' 
                  : 'opacity-0 scale-95'
              }`}
            >
              <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4 animate-bounce" />
              <h3 className="text-xl font-semibold text-stone-900 mb-2">No Alerts</h3>
              <p className="text-stone-600">All systems are running smoothly</p>
            </div>
          ) : (
            <div className="space-y-4">
              {alerts.map((alert, index) => (
                <div 
                  key={alert.id}
                  className={`relative overflow-hidden rounded-xl border ${getAlertColor(alert.severity)} shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1 hover:scale-[1.02] transform ${
                    visibleSections.alerts 
                      ? 'opacity-100 translate-x-0' 
                      : 'opacity-0 translate-x-8'
                  }`}
                  style={{ 
                    transitionDelay: visibleSections.alerts ? `${index * 100}ms` : '0ms',
                    animationDelay: `${index * 100}ms`
                  }}
                >
                  <div className="p-5 relative">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-4 flex-1">
                        <div className="flex-shrink-0 mt-1 transform hover:scale-110 transition-transform duration-200">
                          {getAlertIcon(alert.severity)}
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold text-base mb-2 hover:text-opacity-80 transition-colors">
                            {alert.message}
                          </h4>
                          <div className="flex items-center text-sm opacity-80 hover:opacity-100 transition-opacity">
                            <Clock className="w-4 h-4 mr-2 animate-pulse" />
                            <span>{alert.timestamp}</span>
                          </div>
                          {alert.description && (
                            <p className="text-sm opacity-75 mt-2 hover:opacity-90 transition-opacity">
                              {alert.description}
                            </p>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium uppercase tracking-wide transition-all duration-200 hover:scale-105 ${
                            alert.severity === "high"
                              ? "bg-red-100 text-red-800 border border-red-200 hover:bg-red-200"
                              : alert.severity === "medium"
                              ? "bg-amber-100 text-amber-800 border border-amber-200 hover:bg-amber-200"
                              : "bg-orange-100 text-orange-800 border border-orange-200 hover:bg-orange-200"
                          }`}
                        >
                          {alert.severity}
                        </span>
                      </div>
                    </div>

                    {/* Ripple effect for high priority alerts */}
                    {alert.severity === 'high' && (
                      <div className="absolute inset-0 bg-red-400 opacity-5 animate-ping pointer-events-none rounded-xl"></div>
                    )}
                  </div>
                  
                  {/* Animated severity indicator line */}
                  <div 
                    className={`absolute left-0 top-0 bottom-0 w-1 transition-all duration-300 ${
                      alert.severity === "high" 
                        ? "bg-red-500 hover:w-2" 
                        : alert.severity === "medium" 
                        ? "bg-amber-500 hover:w-2" 
                        : "bg-orange-500 hover:w-2"
                    }`}
                  />

                  {/* Hover glow effect */}
                  <div className="absolute inset-0 opacity-0 hover:opacity-20 transition-opacity duration-300 pointer-events-none rounded-xl bg-gradient-to-r from-orange-400 to-amber-500"></div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Floating alert particles for critical alerts */}
      {criticalAlerts.length > 0 && (
        <div className="fixed inset-0 pointer-events-none overflow-hidden">
          {[...Array(criticalAlerts.length)].map((_, i) => (
            <div
              key={i}
              className={`absolute w-2 h-2 bg-red-500 rounded-full opacity-40 ${
                isLoaded ? 'animate-alertFloat' : ''
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
      )}

      <style jsx>{`
        @keyframes alertFloat {
          0%, 100% {
            transform: translateY(0px) scale(1);
            opacity: 0.4;
          }
          50% {
            transform: translateY(-15px) scale(1.2);
            opacity: 0.8;
          }
        }

        .animate-alertFloat {
          animation: alertFloat 4s ease-in-out infinite;
        }

        /* Critical alert pulse effect */
        @keyframes criticalPulse {
          0%, 100% {
            box-shadow: 0 0 0 0 rgba(239, 68, 68, 0.4);
          }
          50% {
            box-shadow: 0 0 0 10px rgba(239, 68, 68, 0);
          }
        }

        .critical-alert {
          animation: criticalPulse 2s infinite;
        }
      `}</style>
    </div>
  );
};

export default AlertsScreen;