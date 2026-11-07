import { test, expect } from '@playwright/test';

test('all required viewport sizes fit in both themes', async ({ page }) => {
  const failures = [];
  page.on('pageerror', error => failures.push(error.message));
  await page.goto('/');
  await expect(page).toHaveTitle('Suprina Karki | Full Stack Developer');
  for (const theme of ['light', 'dark']) {
    await page.evaluate(t => { document.documentElement.dataset.theme = t; }, theme);
    for (const width of [320, 375, 768, 1024, 1440]) {
      await page.setViewportSize({ width, height: 900 });
      await expect.poll(() => page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), { message: `${theme} at ${width}px` }).toBe(true);
    }
  }
  expect(failures).toEqual([]);
});

test('theme persists and mobile navigation works with keyboard', async ({ page }) => {
  await page.emulateMedia({ colorScheme: 'light' });
  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto('/');
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'light');
  await page.getByRole('button', { name: 'Switch to dark theme' }).click();
  await page.reload();
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
  const menu = page.getByRole('button', { name: 'Open navigation' });
  await menu.click();
  await page.getByRole('navigation', { name: 'Mobile navigation' }).getByRole('link', { name: 'Projects' }).click();
  await expect(page).toHaveURL(/#projects$/);
  await expect(page.getByRole('navigation', { name: 'Mobile navigation' })).toHaveCount(0);
  await menu.click();
  await page.keyboard.press('Escape');
  await expect(menu).toBeFocused();
  await expect(menu).toHaveAttribute('aria-expanded', 'false');
});

test('contact validates and never claims delivery without configuration', async ({ page }) => {
  await page.goto('/#contact');
  await page.getByRole('button', { name: 'Send Message' }).click();
  await expect(page.getByText('Please enter your name.', { exact: true })).toBeVisible();
  await expect(page.getByText('Please enter your email.', { exact: true })).toBeVisible();
  await page.getByLabel('Your name').fill('Test Visitor');
  await page.getByLabel('Email address', { exact: true }).fill('test@example.com');
  await page.getByLabel('Your message').fill('This is a local validation test message.');
  await page.getByRole('button', { name: 'Send Message' }).click();
  await expect(page.getByText('Email delivery is not configured yet. Your message has not been sent.')).toBeVisible();
});
