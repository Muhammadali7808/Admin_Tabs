import { useQuery } from "react-query";  // Assuming you're using react-query for data fetching
import axios from "axios";

export const useGetCategories = () => {
  return useQuery("categories", async () => {
    const response = await axios.get("/api/categories"); // Modify this API endpoint as needed
    return response.data;
  });
};
