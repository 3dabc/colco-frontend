import axios from "axios";
import { auth } from "../config/firebaseConfig";
import { getFirestore, doc, deleteDoc, setDoc } from "firebase/firestore";

const API_BASE_URL = "http://localhost:5000/api/v1/account";
const db = getFirestore();

const getAuthToken = async () => {
  const currentUser = auth.currentUser;
  if (!currentUser) {
    throw new Error("User is not authenticated");
  }
  return await currentUser.getIdToken();
};

export const getAccount = async (userId) => {
    try {
      const token = await getAuthToken();
      const response = await axios.get(`${API_BASE_URL}/${userId}`, {
        withCredentials: true,
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log("Fetched account data:", response.data); // Log the response data
      return response.data;
    } catch (error) {
      console.error("Error fetching account details:", error);
      throw error;
    }
  };

export const deleteAccount = async (userId) => {
  try {
    const token = await getAuthToken();
    const docRef = doc(db, "accounts", userId);
    await deleteDoc(docRef);
    console.log("Account deleted successfully from Firestore.");
  } catch (error) {
    console.error("Error deleting account:", error);
    throw error;
  }
};

export const updateAccount = async (userId, updatedData) => {
  try {
    const token = await getAuthToken();
    console.log("Auth Token:", token);
    console.log("Updating account for userId:", userId);
    console.log("Updated Data:", updatedData);

    const docRef = doc(db, "users", userId);
    await setDoc(docRef, updatedData, { merge: true });
    console.log("Account updated successfully in Firestore.");
  } catch (error) {
    console.error("Error updating account:", error);
    throw error;
  }
};