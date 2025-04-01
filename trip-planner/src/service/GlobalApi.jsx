import axios from "axios";

// Load API Key from environment variables
const API_KEY = import.meta.env.VITE_GOOGLE_PLACE_API_KEY;

const BASE_URL = `https://places.googleapis.com/v1/places:searchText`;

const config = {
  headers: {
    "Content-Type": "application/json",
    "X-Goog-Api-Key": API_KEY, // ✅ Use API Key from env
    "X-Goog-FieldMask": "places.photos,places.displayName,places.id", // ✅ Use a comma-separated string
  },
};

// Function to get place details
export const GetPlaceDetails = (data) => axios.post(BASE_URL, data, config);
