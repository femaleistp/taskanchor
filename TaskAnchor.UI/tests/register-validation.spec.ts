import { test, expect } from '@playwright/test';

test('register shows required-field validation when email and password are blank', async ({ page }) => {
  await page.goto('http://localhost:63093/register');

  await page.getByRole('button', { name: 'Register' }).click();

  await expect(page.locator('.register-error')).toBeVisible();
  await expect(page.locator('.register-error')).toContainText('Email and password are required.');
});
