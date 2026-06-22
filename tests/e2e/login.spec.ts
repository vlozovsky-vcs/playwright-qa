import { test, expect } from '@playwright/test';

const URL = 'https://the-internet.herokuapp.com/login';

test.describe('Login Flow', () => {

  test('successful login with valid credentials', async ({ page }) => {
    await page.goto(URL);

    // Verify page loaded
    await expect(page).toHaveTitle(/The Internet/);

    // Fill in login form
    await page.fill('#username', 'tomsmith');
    await page.fill('#password', 'SuperSecretPassword!');

    // Submit
    await page.click('button[type="submit"]');

    // Assert successful login
    await expect(page).toHaveURL(/secure/);
    await expect(page.locator('.flash.success')).toContainText('You logged into a secure area!');
  });

  test('failed login with wrong password', async ({ page }) => {
    await page.goto(URL);

    await page.fill('#username', 'tomsmith');
    await page.fill('#password', 'wrongpassword');
    await page.click('button[type="submit"]');

    // Assert error message
    await expect(page.locator('.flash.error')).toContainText('Your password is invalid!');
  });

  test('failed login with wrong username', async ({ page }) => {
    await page.goto(URL);

    await page.fill('#username', 'wronguser');
    await page.fill('#password', 'SuperSecretPassword!');
    await page.click('button[type="submit"]');

    // Assert error message
    await expect(page.locator('.flash.error')).toContainText('Your username is invalid!');
  });

  test('login fields are present on page load', async ({ page }) => {
    await page.goto(URL);

    await expect(page.locator('#username')).toBeVisible();
    await expect(page.locator('#password')).toBeVisible();
    await expect(page.locator('button[type="submit"]')).toBeVisible();
  });

  test('successful logout after login', async ({ page }) => {
    await page.goto(URL);

    await page.fill('#username', 'tomsmith');
    await page.fill('#password', 'SuperSecretPassword!');
    await page.click('button[type="submit"]');

    // Verify logged in
    await expect(page).toHaveURL(/secure/);

    // Log out
    await page.click('a[href="/logout"]');

    // Verify back on login page
    await expect(page).toHaveURL(/login/);
    await expect(page.locator('.flash.success')).toContainText('You logged out');
  });

});