// src/demo/tests/timezones.spec.ts
import { test, expect } from '@playwright/test';
import { TimezonePage } from '../pages/TimezonePage';

test('Should validate timezone details in the response', async () => {
  const apiUrl = 'https://staging.services.leadconnectorhq.com/calendars/events/appointments/BvxzqT3Firbw1mZKYRbr'; 

  // Expected timezone details
  const expectedTimezone = {
    id: 'BvxzqT3Firbw1mZKYRbr',
    startTime: '2024-12-24T14:30:00+05:30',
    endTime: '2024-12-24T15:30:00+05:30',
  };

  const headers = {
    Authorization: 'Bearer pit-8aa8bb15-e1f1-4132-8f6e-9c34963f27cf',
    Version: '2021-04-15',
  };

  try {
    // Step 1: Fetch timezone details using the TimezonePage class
    const responseBody = await TimezonePage.getTimezoneDetails(apiUrl, headers);
    
    // Step 2: Validate response status
    expect(responseBody.status()).toBe(200);

    // Extract timezone object from the response
    const actualTimezone = responseBody?.timezone;

    // Validate that the timezone object exists
    if (!actualTimezone) {
      console.error('Timezone object is missing in the response.');
      throw new Error('Timezone object not found.');
    }

    // Step 3: Validate timezone fields
    expect(actualTimezone.id).toBe(expectedTimezone.id);
    expect(actualTimezone.startTime).toBe(expectedTimezone.startTime);
    expect(actualTimezone.endTime).toBe(expectedTimezone.endTime);

    console.log('Timezone details validated successfully.');

  } catch (error) {
    console.error('Error occurred during the API test:', error);
    throw error; 
  }
});
