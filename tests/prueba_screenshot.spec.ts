import {test, expect} from '@playwright/test';

test('purchase an item', async ({page}) => {

    await page.goto('https://www.saucedemo.com/')

    await page.screenshot({path: 'screenshot/login.png', fullPage: true })

})