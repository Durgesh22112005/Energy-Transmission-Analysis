import React, { useState } from "react";
import Navigation from "./components/Navigation";
import Footer from "./components/Footer";
import HomeScreen from "./screens/HomeScreen";
import LogsScreen from "./screens/LogsScreen";
import AlertsScreen from "./screens/AlertsScreen";
import { generateDummyData } from "./utils/dataGenerator";
import { generateAlerts } from "./utils/alertGenerator";

import "./styles/global.css";

const App = () => {
  const [currentScreen, setCurrentScreen] = useState("home");
  const [sensorData] = useState(generateDummyData());
  const [alerts] = useState(generateAlerts());
  const [isOnline] = useState(true);
  const [systemStatus] = useState("Normal");

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-red-50 text-stone-900">
      <Navigation currentScreen={currentScreen} setCurrentScreen={setCurrentScreen} alerts={alerts} />

      {currentScreen === "home" && (
        <HomeScreen
          isOnline={isOnline}
          systemStatus={systemStatus}
          sensorData={sensorData}
          alerts={alerts}
          setCurrentScreen={setCurrentScreen}
        />
      )}
      {currentScreen === "logs" && <LogsScreen sensorData={sensorData} />}
      {currentScreen === "alerts" && <AlertsScreen alerts={alerts} />}

      <Footer />
    </div>
  );
};

export default App;
