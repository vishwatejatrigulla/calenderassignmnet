// src/demo/pages/ContactPage.ts
import { request } from '@playwright/test';

export class ContactPage {
  // Static method to get contact details from the API
  static async getContactDetails(apiUrl: string, headers: Record<string, string>) {
    try {
      const response = await request.get(apiUrl, { headers });
      return await response.json();
    } catch (error) {
      console.error('Error occurred while fetching contact details:', error);
      throw error;
    }
  }
}
