import React, { createContext, useContext, useEffect, useState } from "react";
import { auth } from "config/firebaseConfig";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { fetchSensorData } from "../services/sensorService";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [sensorData, setSensorData] = useState(null);
  const [gpsCoordinates, setGpsCoordinates] = useState(null);

  // Track authentication state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);
      setAuthLoading(false);

      if (user) {
        try {
          const token = await user.getIdToken();
          const { sensorData, gpsCoordinates } = await fetchSensorData(token);

          // Store sensor data in state and browser cache
          setSensorData(sensorData);
          setGpsCoordinates(gpsCoordinates);
          localStorage.setItem("sensorData", JSON.stringify(sensorData));
          localStorage.setItem("gpsCoordinates", JSON.stringify(gpsCoordinates));
        } catch (err) {
          console.error("Error fetching sensor data after login:", err);
        }
      }
    });

    return unsubscribe; // Cleanup the listener on unmount
  }, []);

  const signup = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const login = async (email, password) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      console.log("Login Successful:", userCredential.user); // Debugging
      return userCredential.user;
    } catch (error) {
      console.error("Login Failed:", error.message); // Debugging
      throw error;
    }
  };

  const logout = async () => {
    try {
      console.log("Logging out...");
      localStorage.clear(); // Clear all local storage
      sessionStorage.clear(); // Clear all session storage
      setSensorData(null);
      setGpsCoordinates(null);
      setCurrentUser(null); // Clear the currentUser state
      await signOut(auth); // Sign out from Firebase
      console.log("Logout successful");
    } catch (error) {
      console.error("Failed to log out:", error);
      throw error;
    }
  };

  const value = {
    currentUser,
    signup,
    login,
    logout,
    sensorData,
    gpsCoordinates,
  };

  return (
    <AuthContext.Provider value={value}>
      {!authLoading && children}
    </AuthContext.Provider>
  );
};