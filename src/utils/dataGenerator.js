// Dummy sensor data generator
export const generateDummyData = () => {
  const data = [];
  const now = new Date();
  for (let i = 23; i >= 0; i--) {
    const time = new Date(now.getTime() - i * 60 * 60 * 1000);
    const baseVoltage = 230 + Math.sin(i * 0.5) * 20;
    const noise = (Math.random() - 0.5) * 10;
    data.push({
      time: time.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" }),
      voltage: Math.round((baseVoltage + noise) * 100) / 100,
      current: Math.round((15 + Math.sin(i * 0.3) * 3 + (Math.random() - 0.5) * 2) * 100) / 100,
      power: Math.round((3450 + Math.sin(i * 0.4) * 300 + (Math.random() - 0.5) * 100) * 100) / 100,
      timestamp: time.toISOString()
    });
  }
  return data;
};
