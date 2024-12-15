import { test } from '@playwright/test';
import { CalendarPage } from '../pages/CalendarPage';

test('Calendar appointment booking automation', async ({ page }) => {
  const calendarPage = new CalendarPage(page);

  const calendarURL =
    'https://funnel-preview-dot-highlevel-staging.uc.r.appspot.com/widget/bookings/mycalassignment?widget_type=classic';

  // Step 1: Navigate to the calendar page
  await calendarPage.navigateToPage(calendarURL);

  // Step 2: Wait for the calendar to load
  await calendarPage.waitForCalendarToLoad();

  // Step 3: Navigate to a random month in 2025
  const targetYear = 2025;
  await calendarPage.navigateToRandomMonth(targetYear);

  // Step 4: Select a random day
  await calendarPage.selectRandomDay();

  // Step 5: Confirm date selection
  await calendarPage.confirmDateSelection();
});
