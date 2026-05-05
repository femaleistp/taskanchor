import { test, expect } from '@playwright/test';

test('login navigates to task list after successful authentication', async ({ page }) => {
  const timestamp = Date.now();
  const email = `playwright-login-${timestamp}@example.com`;
  const password = `Password-${timestamp}`;

  await page.goto('http://localhost:63093/register');

  await page.locator('input[name="email"]').fill(email);
  await page.locator('input[name="password"]').fill(password);
  await page.getByRole('button', { name: 'Register' }).click();

  await expect(page).toHaveURL('http://localhost:63093/', { timeout: 15000 });
  await expect(page.getByRole('heading', { name: 'Login' })).toBeVisible({ timeout: 15000 });

  await page.locator('input[name="email"]').fill(email);
  await page.locator('input[name="password"]').fill(password);
  await page.getByRole('button', { name: 'Login' }).click();

  await expect(page).toHaveURL(/\/tasks$/);
  await expect(page.getByRole('heading', { name: 'Task List' })).toBeVisible();
});
