import { test, expect } from "@playwright/test";
import { initializeMCP } from "../utils/mcpClient.js";
test('AI login validation', async ({ page }) => {
    const client = await initializeMCP();
    await page.goto('https://www.saucedemo.com');
    await page.locator('#user-name').fill('standard_user');
    await page.locator('#password').fill('secret_sauce');
    await page.locator('#login-button').click();
    const pageText = await page.locator('body').innerText();
    const result = await client.callTool({
        name: 'validate-login',
        arguments: {
            pageText
        }
    });
    console.log(result);
    const content = result.content;
    expect(content[0].text).toBe('LOGIN_SUCCESS');
});
