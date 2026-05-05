import { test, expect } from '@playwright/test';

test('progress log entry can be added and displayed for a task', async ({ page }) => {
  const timestamp = Date.now();
  const uniqueTitle = `Playwright Progress Task ${timestamp}`;
  const uniqueProgressLog = `Progress Log entry from Playwright ${timestamp}`;

  await page.goto('http://localhost:63093/tasks');

  await page.locator('input[name="title"]').fill(uniqueTitle);
  await page.locator('textarea[name="description"]').fill(`Progress flow description ${timestamp}`);
  await page.locator('select[name="priorityLevel"]').selectOption('Medium');
  await page.locator('input[name="nextAction"]').fill(`Add progress note ${timestamp}`);

  await page.getByRole('button', { name: 'Create Task' }).click();

  await expect(page.getByText(uniqueTitle)).toBeVisible({ timeout: 15000 });

  const taskItem = page.locator('li').filter({ hasText: uniqueTitle }).first();

  await expect(taskItem).toBeVisible({ timeout: 15000 });

  await taskItem.getByRole('button', { name: 'Add Progress Log' }).click();

  await taskItem.locator('input[name="progressLogInput"]').fill(uniqueProgressLog);
  await taskItem.locator('button[name="saveProgressLogButton"]').click();

  await expect(taskItem.getByText(uniqueProgressLog)).toBeVisible();
});
