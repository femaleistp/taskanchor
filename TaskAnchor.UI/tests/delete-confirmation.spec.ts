import { test, expect } from '@playwright/test';

test('delete confirmation cancel keeps the task visible', async ({ page }) => {
  const timestamp = Date.now();
  const uniqueTitle = `Playwright Delete Cancel Task ${timestamp}`;

  await page.goto('http://localhost:63093/tasks');

  await page.locator('input[name="title"]').fill(uniqueTitle);
  await page.locator('textarea[name="description"]').fill(`Delete cancel description ${timestamp}`);
  await page.locator('select[name="priorityLevel"]').selectOption('Medium');
  await page.locator('input[name="nextAction"]').fill(`Cancel delete ${timestamp}`);

  await page.getByRole('button', { name: 'Create Task' }).click();

  await expect(page.getByText(uniqueTitle)).toBeVisible({ timeout: 15000 });

  const taskItem = page.locator('li').filter({ hasText: uniqueTitle }).first();

  await expect(taskItem).toBeVisible({ timeout: 15000 });

  page.once('dialog', async dialog => {
    expect(dialog.message()).toBe(
      `Delete task "${uniqueTitle}"? This action cannot be undone.`
    );
    await dialog.dismiss();
  });

  await taskItem.getByRole('button', { name: 'Delete' }).click();

  await expect(taskItem).toBeVisible();
});

test('delete confirmation accept removes the task', async ({ page }) => {
  const timestamp = Date.now();
  const uniqueTitle = `Playwright Delete Accept Task ${timestamp}`;

  await page.goto('http://localhost:63093/tasks');

  await page.locator('input[name="title"]').fill(uniqueTitle);
  await page.locator('textarea[name="description"]').fill(`Delete accept description ${timestamp}`);
  await page.locator('select[name="priorityLevel"]').selectOption('Medium');
  await page.locator('input[name="nextAction"]').fill(`Accept delete ${timestamp}`);

  await page.getByRole('button', { name: 'Create Task' }).click();

  await expect(page.getByText(uniqueTitle)).toBeVisible({ timeout: 15000 });

  const taskItem = page.locator('li').filter({ hasText: uniqueTitle }).first();

  await expect(taskItem).toBeVisible({ timeout: 15000 });

  page.once('dialog', async dialog => {
    expect(dialog.message()).toBe(
      `Delete task "${uniqueTitle}"? This action cannot be undone.`
    );
    await dialog.accept();
  });

  await taskItem.getByRole('button', { name: 'Delete' }).click();

  await expect(taskItem).toBeHidden({ timeout: 15000 });
});
