// src/demo/tests/contact.spec.ts
import { test, expect } from '@playwright/test';
import { ContactPage } from '../pages/ContactPage';

test('Should validate contact object in the response', async () => {
  const apiUrl = 'https://staging.services.leadconnectorhq.com/contacts/SfEq0S8eZUiO7p5UipZS';

  // Expected contact details
  const expectedContact = {
    id: 'SfEq0S8eZUiO7p5UipZS',
    locationId: 'Z5EKPzmxcXwegeDKmYS6',
    firstName: 'elina',
    lastName: 'gilbert',
    email: 'elinag@gmail.com',
    emailLowerCase: 'elinag@gmail.com',
    timezone: 'Asia/Calcutta',
  };

  const headers = {
    Authorization: 'Bearer pit-8aa8bb15-e1f1-4132-8f6e-9c34963f27cf',
  };

  try {
    // Fetch contact details using the ContactPage class
    const responseBody = await ContactPage.getContactDetails(apiUrl, headers);

    // Assert response status
    expect(responseBody.status()).toBe(200);

    // Extract the contact object from the response
    const actualContact = responseBody?.contact;

    if (!actualContact) {
      console.error('Contact object is missing in the response.');
      throw new Error('Contact object not found.');
    }

    // Validate each field in the contact object
    expect(actualContact.id).toBe(expectedContact.id);
    expect(actualContact.locationId).toBe(expectedContact.locationId);
    expect(actualContact.firstName).toBe(expectedContact.firstName);
    expect(actualContact.lastName).toBe(expectedContact.lastName);
    expect(actualContact.email).toBe(expectedContact.email);
    expect(actualContact.emailLowerCase).toBe(expectedContact.emailLowerCase);
    expect(actualContact.timezone).toBe(expectedContact.timezone);

    console.log('Contact details validated successfully.');
  } catch (error) {
    console.error('Error occurred during the contact API test:', error);
    throw error;
  }
});
