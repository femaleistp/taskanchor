import { test, expect } from '@playwright/test';

test('login shows required-field validation when email and password are blank', async ({ page }) => {
  await page.goto('http://localhost:63093');

  await page.getByRole('button', { name: 'Login' }).click();

  await expect(page.locator('.login-error')).toBeVisible();
  await expect(page.locator('.login-error')).toContainText('Email and password are required.');
});
