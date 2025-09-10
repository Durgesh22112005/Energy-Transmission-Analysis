// Dummy alerts
export const generateAlerts = () => [
  {
    id: 1,
    type: "warning",
    message: "Voltage fluctuation detected on Line A",
    timestamp: "2025-09-10 14:32:15",
    severity: "medium"
  },
  {
    id: 2,
    type: "error",
    message: "Critical fault detected - Line B disconnected",
    timestamp: "2025-09-10 13:45:22",
    severity: "high"
  },
  {
    id: 3,
    type: "info",
    message: "Scheduled maintenance completed on Line C",
    timestamp: "2025-09-10 12:15:08",
    severity: "low"
  },
  {
    id: 4,
    type: "warning",
    message: "Temperature threshold exceeded in Transformer 2",
    timestamp: "2025-09-10 11:28:45",
    severity: "medium"
  }
];
