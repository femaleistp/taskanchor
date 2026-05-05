import { test, expect } from '@playwright/test';

test('task status can be updated from Active to InProgress', async ({ page }) => {
  const timestamp = Date.now();
  const uniqueTitle = `Playwright Status Task ${timestamp}`;

  await page.goto('http://localhost:63093/tasks');

  await page.locator('input[name="title"]').fill(uniqueTitle);
  await page.locator('textarea[name="description"]').fill(`Status flow description ${timestamp}`);
  await page.locator('select[name="priorityLevel"]').selectOption('Medium');
  await page.locator('input[name="nextAction"]').fill(`Advance status ${timestamp}`);

  await page.getByRole('button', { name: 'Create Task' }).click();

  await expect(page.getByText(uniqueTitle)).toBeVisible({ timeout: 15000 });

  const taskCard = page.locator('li').filter({ hasText: uniqueTitle }).first();

  await expect(taskCard).toBeVisible({ timeout: 15000 });
  await expect(taskCard.getByText('Status: Active')).toBeVisible({ timeout: 15000 });


  await taskCard.getByRole('button', { name: /Click.*InProgress/ }).click();

  await expect(taskCard.getByText('Status: InProgress')).toBeVisible();
});
