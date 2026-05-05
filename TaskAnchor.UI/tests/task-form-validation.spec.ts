import { test, expect } from '@playwright/test';

test('create task shows required-title validation when title is blank', async ({ page }) => {
  await page.goto('http://localhost:63093/tasks');

  await page.getByRole('button', { name: 'Create Task' }).click();

  await expect(page.locator('.task-form-error')).toBeVisible();
  await expect(page.locator('.task-form-error')).toContainText('Title is required.');
});

test('create task adds a valid task to the task list', async ({ page }) => {
  const timestamp = Date.now();
  const uniqueTitle = `Playwright Task ${timestamp}`;
  const uniqueDescription = `Created by Playwright valid task flow ${timestamp}`;
  const uniqueNextAction = `Confirm task appears in list ${timestamp}`;

  await page.goto('http://localhost:63093/tasks');

  await page.locator('input[name="title"]').fill(uniqueTitle);
  await page.locator('textarea[name="description"]').fill(uniqueDescription);
  await page.locator('select[name="priorityLevel"]').selectOption('High');
  await page.locator('input[name="dueDate"]').fill('2026-05-10');
  await page.locator('input[name="nextAction"]').fill(uniqueNextAction);

  await page.getByRole('button', { name: 'Create Task' }).click();

  await expect(page.getByText(uniqueTitle)).toBeVisible();
  await expect(page.getByText(uniqueDescription)).toBeVisible();
  await expect(page.getByText(uniqueNextAction)).toBeVisible();
});
