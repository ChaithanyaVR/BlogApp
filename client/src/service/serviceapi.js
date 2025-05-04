import axios from "axios";
import { getAccessToken } from "../utils/common-utils";
import { API_NOTIFICATION_MESSAGES, SERVICE_URLS } from '../constants/config';

const API_URL = 'http://localhost:8000';


const axiosInstance = axios.create({
    baseURL: API_URL,
    timeout: 10000,
});


export const uploadFile = async (formData) => {
    const { url, method } = SERVICE_URLS.uploadFile;

    try {

        const response = await axiosInstance({
            method,
            url,
            data: formData,
            headers: {
               Authorization:getAccessToken(),
            },
            
        });

        return response.data; // Adjust based on your backend response
    } catch (error) {
        console.error("Error while uploading file:", error);
        throw error;
    }
};

const serviceAPI = {
    uploadFile,
    // Add other API methods here later if needed
};

export default serviceAPI;

