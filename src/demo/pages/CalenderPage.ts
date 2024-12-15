import { Page, Locator } from '@playwright/test';
import { CalendarLocators } from '../locators/locators';

export class CalendarPage {
  private page: Page;
  private calendar: Locator;
  private monthButton: Locator;
  private yearButton: Locator;
  private nextMonthButton: Locator;
  private selectableDays: Locator;
  private selectDateButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.calendar = page.locator(CalendarLocators.calendarWrapper);
    this.monthButton = page.locator(CalendarLocators.monthButton);
    this.yearButton = page.locator(CalendarLocators.yearButton);
    this.nextMonthButton = page.locator(CalendarLocators.nextMonthButton);
    this.selectableDays = page.locator(CalendarLocators.selectableDays);
    this.selectDateButton = page.locator(CalendarLocators.selectDateButton);
  }

  async navigateToPage(url: string) {
    await this.page.goto(url);
    console.log('Navigated to the calendar page.');
  }

  async waitForCalendarToLoad() {
    await this.calendar.waitFor();
    console.log('Calendar loaded successfully.');
  }

  async getCurrentMonthAndYear(): Promise<{ month: string; year: string }> {
    const month = await this.monthButton.innerText();
    const year = await this.yearButton.innerText();
    return { month, year };
  }

  async navigateToYear(targetYear: number) {
    let { year } = await this.getCurrentMonthAndYear();
    while (parseInt(year) < targetYear) {
      await this.nextMonthButton.click();
      year = (await this.getCurrentMonthAndYear()).year;
    }
  }

  async navigateToRandomMonth(targetYear: number) {
    const months = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December',
    ];
    const randomMonth = months[Math.floor(Math.random() * months.length)];

    await this.navigateToYear(targetYear);

    let { month } = await this.getCurrentMonthAndYear();
    while (month !== randomMonth) {
      await this.nextMonthButton.click();
      month = (await this.getCurrentMonthAndYear()).month;
    }

    console.log(`Navigated to random month: ${randomMonth}`);
  }

  async selectRandomDay() {
    const dayCount = await this.selectableDays.count();
    const randomDayIndex = Math.floor(Math.random() * dayCount);
    const randomDay = this.selectableDays.nth(randomDayIndex);

    await randomDay.click();
    console.log('Random day selected: ' + await randomDay.innerText());
  }

  async confirmDateSelection() {
    await this.selectDateButton.click();
    console.log('Date selection confirmed.');
  }
}
