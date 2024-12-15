// src/demo/pages/AppointmentPage.ts
import { request } from '@playwright/test';

export class AppointmentPage {
  // Static method to get appointment details from the API
  static async getAppointmentDetails(apiUrl: string, headers: Record<string, string>) {
    try {
      const response = await request.get(apiUrl, { headers });
      return await response.json();
    } catch (error) {
      console.error('Error occurred while fetching appointment details:', error);
      throw error;
    }
  }
}
