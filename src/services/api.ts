
import axios from 'axios';

// Base API configuration
const API_BASE_URL = 'http://localhost:8080/api';

// Create axios instance with default config
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor to include auth token
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('safecity_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Auth Services
export const authService = {
  login: async (email: string, password: string) => {
    const response = await apiClient.post('/auth/login', { email, password });
    if (response.data.token) {
      localStorage.setItem('safecity_token', response.data.token);
    }
    return response.data;
  },
  
  register: async (name: string, email: string, password: string, role: string) => {
    const response = await apiClient.post('/auth/register', { name, email, password, role });
    return response.data;
  },
  
  logout: () => {
    localStorage.removeItem('safecity_token');
  },
  
  getCurrentUser: async () => {
    return await apiClient.get('/auth/user');
  }
};

// Case Services
export const caseService = {
  getAllCases: async (params?: any) => {
    return await apiClient.get('/cases', { params });
  },
  
  getCaseById: async (id: string) => {
    return await apiClient.get(`/cases/${id}`);
  },
  
  createCase: async (caseData: any) => {
    return await apiClient.post('/cases', caseData);
  },
  
  updateCase: async (id: string, caseData: any) => {
    return await apiClient.put(`/cases/${id}`, caseData);
  },
  
  deleteCase: async (id: string) => {
    return await apiClient.delete(`/cases/${id}`);
  },
  
  addCaseNote: async (id: string, noteData: any) => {
    return await apiClient.post(`/cases/${id}/notes`, noteData);
  }
};

// Report Services
export const reportService = {
  getAllReports: async (params?: any) => {
    return await apiClient.get('/reports', { params });
  },
  
  getReportById: async (id: string) => {
    return await apiClient.get(`/reports/${id}`);
  },
  
  createReport: async (reportData: any) => {
    return await apiClient.post('/reports', reportData);
  },
  
  approveReport: async (id: string) => {
    return await apiClient.put(`/reports/${id}/approve`);
  },
  
  rejectReport: async (id: string) => {
    return await apiClient.put(`/reports/${id}/reject`);
  }
};

// User Services
export const userService = {
  getAllUsers: async (params?: any) => {
    return await apiClient.get('/users', { params });
  },
  
  getUserById: async (id: string) => {
    return await apiClient.get(`/users/${id}`);
  },
  
  updateUser: async (id: string, userData: any) => {
    return await apiClient.put(`/users/${id}`, userData);
  },
  
  updateUserRole: async (id: string, role: string) => {
    return await apiClient.put(`/users/${id}/role`, { role });
  }
};

// Incident Services
export const incidentService = {
  getAllIncidents: async (params?: any) => {
    return await apiClient.get('/incidents', { params });
  },
  
  getIncidentById: async (id: string) => {
    return await apiClient.get(`/incidents/${id}`);
  },
  
  createIncident: async (incidentData: any) => {
    return await apiClient.post('/incidents', incidentData);
  },
  
  updateIncident: async (id: string, incidentData: any) => {
    return await apiClient.put(`/incidents/${id}`, incidentData);
  },
  
  deleteIncident: async (id: string) => {
    return await apiClient.delete(`/incidents/${id}`);
  }
};

export default {
  authService,
  caseService,
  reportService,
  userService,
  incidentService
};
