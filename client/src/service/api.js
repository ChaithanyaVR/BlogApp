import axios from "axios";

import { API_NOTIFICATION_MESSAGES, SERVICE_URLS } from "../constants/config";
import {
  getAccessToken,
  getRefreshToken,
  setAccessToken,
  getType,
} from "../utils/common-utils";

const API_URL = "http://localhost:8000";

const api = axios.create({
  baseURL: API_URL,
});

const API = {
  userLogin: async (data) => {
    try {
      const token = getAccessToken();
      const headers = {
        Authorization: token,
        "Content-Type": "application/json",
      };
      const response = await api.post("/login", data, { headers });
      console.log("User logged in: ", response.data);
      return response.data;
    } catch (error) {
      console.error("Login failed:", error.message);
      throw error;
    }
  },

  userSignup: async (data) => {
    try {
      const headers = {
        "Content-Type": "application/json",
      };
      const response = await api.post("/signup", data, { headers });
      console.log("User signed up:", response.data);
      return response.data;
    } catch (error) {
      console.error("signup failed:", error.message);
      throw error;
    }
  },



getUploadImage: async (img) => {
    try {
  
      const response = await api.get("/get-upload-url");
  
      // ✅ Use the correct key from the response
      const uploadUrl = response?.data?.uploadURL;
      // console.log('uploadurl',uploadUrl)
      
      if (!uploadUrl) {
        console.error("Upload URL is undefined");
        return null;
      }
  
      // Upload the image using PUT request
      await axios.put(uploadUrl, img, {
        headers: {
          "Content-Type": 'multipart/form-data',
        },
      });
  
      // Strip the query string to get the direct image URL
      const imageUrl = uploadUrl.split("?")[0];
      return imageUrl;
  
    } catch (error) {
      console.error("Image upload failed:", error.message);
      return null;
    }
  },

  createBlog: async (blogData) => {
    try {
      const token = getAccessToken(); // reuse your utility
      if (!token) {
        throw new Error("No access token found. Please log in.");
      }

      // Check if necessary blog data is provided
      if (!blogData?.title || !blogData?.content || !blogData?.tags) {
        throw new Error("Blog title, content, and tags are required.");
      }

      const headers = {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      };

      const response = await api.post("/create-blog", blogData, { headers });

      // Handle successful creation
      console.log("Blog created successfully:", response.data);
      return response.data;
    } catch (error) {
      // Provide clear error messages
      const errorMessage =
        error?.response?.data?.error || error.message || "Blog publish failed";
      console.error(errorMessage);
      throw new Error(errorMessage);
    }
  },


}



export default API;
