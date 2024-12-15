// src/demo/tests/appointment.spec.ts
import { test, expect } from '@playwright/test';
import { AppointmentPage } from '../pages/AppointmentPage';

test('Should validate appointment details in the response', async () => {
  const apiUrl = 'https://staging.services.leadconnectorhq.com/calendars/events/appointments/p91do4AneJyXHd8P2zxp';

  // Expected appointment details
  const expectedAppointment = {
    id: 'p91do4AneJyXHd8P2zxp',
    startTime: '2024-12-24T09:00:00+05:30',
    endTime: '2024-12-24T10:00:00+05:30',
    contactId: 'P12CkzcCd5hBy32nJVn1',
    locationId: 'Z5EKPzmxcXwegeDKmYS6',
    email: 'vteja@gmail.com',
    timezone: 'Asia/Calcutta',
    first_name: 'vteja',
    last_name: 'trigulla',
    phone: '+919292929292'
  };

  const headers = {
    Authorization: 'Bearer pit-8aa8bb15-e1f1-4132-8f6e-9c34963f27cf',
    Version: '2021-04-15',
  };

  try {
    // Fetch appointment details using the AppointmentPage class
    const responseBody = await AppointmentPage.getAppointmentDetails(apiUrl, headers);

    // Assert response status
    expect(responseBody.status()).toBe(200);

    // Extract the appointment object from the response
    const actualAppointment = responseBody?.appointment;

    if (!actualAppointment) {
      console.error('Appointment object is missing in the response.');
      throw new Error('Appointment object not found.');
    }

    // Validate each field in the appointment
    expect(actualAppointment.id).toBe(expectedAppointment.id);
    expect(actualAppointment.startTime).toBe(expectedAppointment.startTime);
    expect(actualAppointment.endTime).toBe(expectedAppointment.endTime);
    expect(actualAppointment.contactId).toBe(expectedAppointment.contactId);
    expect(actualAppointment.locationId).toBe(expectedAppointment.locationId);
    expect(actualAppointment.email).toBe(expectedAppointment.email);
    expect(actualAppointment.timezone).toBe(expectedAppointment.timezone);
    expect(actualAppointment.first_name).toBe(expectedAppointment.first_name);
    expect(actualAppointment.last_name).toBe(expectedAppointment.last_name);
    expect(actualAppointment.phone).toBe(expectedAppointment.phone);

    console.log('Appointment details validated successfully.');

  } catch (error) {
    console.error('Error occurred during the appointment API test:', error);
    throw error;
  }
});

