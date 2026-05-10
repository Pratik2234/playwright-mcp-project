
import test from "@playwright/test";
import { initializeMCP } from "../utils/mcpClient";

test('AI assisted validation' , async ({page})=>{

     const client = await initializeMCP()

     await page.goto('https://example.com')

     const title = await page.title()

     console.log('Page Title : ',title)

})