import { test, expect } from '@playwright/test';

test('register page loads', async ({ page }) => {
  await page.goto('http://localhost:63093');

  await expect(page.getByRole('heading', { name: 'Register' })).toBeVisible();
  await expect(page.locator('input[name="email"]')).toBeVisible();
  await expect(page.locator('input[name="password"]')).toBeVisible();
  await expect(page.getByRole('button', { name: 'Register' })).toBeVisible();
});
