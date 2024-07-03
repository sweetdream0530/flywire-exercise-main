import axios from "axios";

const API_BASE_URL = "http://localhost:8080";

const employeeService = {
  getActiveEmployees: async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/employees/active`);
      return response.data;
    } catch (error) {
      handleAPIError(error);
    }
  },

  getEmployeeById: async (id) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/employees/${id}`);
      return response.data;
    } catch (error) {
      handleAPIError(error);
    }
  },

  getEmployeesByHireDateRange: async (startDate, endDate) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/employees/hired`, {
        params: { startDate, endDate },
      });
      return response.data;
    } catch (error) {
      handleAPIError(error);
    }
  },

  addEmployee: async (employeeData) => {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/employees/add`,
        employeeData
      );
      return response.data;
    } catch (error) {
      handleAPIError(error);
    }
  },

  deactivateEmployee: async (id) => {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/employees/deactivate/${id}`
      );
      return response.data;
    } catch (error) {
      handleAPIError(error);
    }
  },
};

const handleAPIError = (error) => {
  console.error("API Error:", error);
  throw error;
};

export default employeeService;
