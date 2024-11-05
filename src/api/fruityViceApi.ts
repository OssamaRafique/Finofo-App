import axios from "axios";
import { IFruit } from "../interfaces/fruit.interface";

const BASE_URL = import.meta.env.VITE_BASE_API_URL;

export const fetchFruits = async (): Promise<IFruit[]> => {
  try {
    const response = await axios.get(`${BASE_URL}/`);
    return response.data;
  } catch (error) {
    console.error("Error fetching fruits:", error);
    throw new Error("Failed to fetch fruits");
  }
};
