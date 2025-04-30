import React, { createContext, useContext, useEffect, useState } from "react";
import { auth } from "config/firebaseConfig";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import axios from "axios";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);

  // Sensor data state
  const [sensorData, setSensorData] = useState({
    avg: {
      soilMoisture: "TEST 50",
      relativeHumidity: "TEST 70",
      temperature: "TEST 35",
      lightIntensity: "TEST 3000",
      soilPH: "TEST 7.5",
    },
    data: [],
  });
  const [gpsCoordinates, setGpsCoordinates] = useState({
    latitude: 5.0669,
    longitude: -75.5174, // Manizales, Colombia
  });
  const [sensorLoading, setSensorLoading] = useState(true);
  const [sensorError, setSensorError] =useState(null);

  // Track authentication state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setAuthLoading(false);
    });

    return unsubscribe; // Cleanup the listener on unmount
  }, []);

  // Fetch sensor data
  useEffect(() => {
    const fetchSensorData = async () => {
      try {
        const token = await currentUser.getIdToken();
        const response = await axios.get(`http://localhost:5000/api/v1/sensor/1`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        // Safely update sensorData with fallback values for missing fields
        const updatedSensorData = {
          avg: {
            soilMoisture: response.data.avg?.soilMoisture || "N/A",
            relativeHumidity: response.data.avg?.relativeHumidity || "N/A",
            temperature: response.data.avg?.temperature || "N/A",
            lightIntensity: response.data.avg?.lightIntensity || "N/A",
            soilPH: response.data.avg?.soilPH || "N/A",
          },
          data: response.data.data || [],
        };

        setSensorData(updatedSensorData);

        // Extract GPS coordinates from the first row of the data array
        if (updatedSensorData.data.length > 0) {
          const firstRow = updatedSensorData.data[0];
          const gps = firstRow.gps_coordinates || {
            latitude: 5.0669,
            longitude: -75.5174, // Manizales, Colombia
          };
          setGpsCoordinates(gps);
        } else {
          setGpsCoordinates({
            latitude: 5.0669,
            longitude: -75.5174, // Manizales, Colombia
          }); // Fallback if data array is empty
        }
      } catch (err) {
        console.error("Error fetching sensor data:", err);
        setSensorError("Failed to fetch sensor data.");
        setGpsCoordinates({
          latitude: 5.0669,
          longitude: -75.5174, // Manizales, Colombia
        }); // Fallback in case of an error
      } finally {
        setSensorLoading(false);
      }
    };

    if (currentUser) {
      fetchSensorData();
    }
  }, [currentUser]);

  const signup = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const login = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const logout = () => {
    return signOut(auth);
  };

  const value = {
    currentUser,
    signup,
    login,
    logout,
    sensorData,
    gpsCoordinates,
    sensorLoading,
    sensorError,
  };

  return (
    <AuthContext.Provider value={value}>
      {!authLoading && children}
    </AuthContext.Provider>
  );
};