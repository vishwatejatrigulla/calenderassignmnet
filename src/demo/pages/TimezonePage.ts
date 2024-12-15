// src/demo/pages/TimezonePage.ts
import { request } from '@playwright/test';

export class TimezonePage {
  static async getTimezoneDetails(apiUrl: string, headers: Record<string, string>) {
    try {
      // Sending a GET request to the API with the provided URL and headers
      const response = await request.get(apiUrl, { headers });
      
      // Returning the response body (assumes it's JSON data)
      return await response.json();
    } catch (error) {
      // If an error occurs, log and throw the error
      console.error('Error occurred while fetching timezone details:', error);
      throw error;
    }
  }
}
