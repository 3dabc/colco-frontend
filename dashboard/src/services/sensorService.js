import axios from "axios";

export const fetchSensorData = async (token) => {
  try {
    const response = await axios.get(`http://localhost:5000/api/v1/sensor/1`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    // Safely process sensor data
    const sensorData = {
      avg: {
        soilMoisture: response.data.avg?.soilMoisture
          ? `${response.data.avg.soilMoisture} %`
          : "N/A",
        temperature: response.data.avg?.temperature
          ? `${response.data.avg.temperature} °C`
          : "N/A",
        lightIntensity: response.data.avg?.lightIntensity
          ? `${response.data.avg.lightIntensity} lx`
          : "N/A",
        soilPH: response.data.avg?.soilPH
          ? `${response.data.avg.soilPH}`
          : "N/A",
      },
      data: response.data.data || [],
    };

    // Extract GPS coordinates from the first row of the data array
    const gpsCoordinates =
      sensorData.data.length > 0
        ? sensorData.data[0].gps_coordinates || {
            latitude: 5.0669,
            longitude: -75.5174, // Manizales, Colombia
          }
        : {
            latitude: 5.0669,
            longitude: -75.5174, // Fallback if data array is empty
          };

    return { sensorData, gpsCoordinates };
  } catch (err) {
    console.error("Error fetching sensor data:", err);
    throw new Error("Failed to fetch sensor data.");
  }
};