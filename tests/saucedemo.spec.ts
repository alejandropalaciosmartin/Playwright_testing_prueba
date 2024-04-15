import {test, expect} from '@playwright/test';
import { LoginPage } from './pageobjects/LoginPage';

test('purchase an item', async ({page}) => {

    await page.goto('https://www.saucedemo.com/') // Ir a la página de Saucedemo 🌐

    // --- Método antiguo ---
    // await page.getByRole('textbox', {name: 'Username'}).fill('standard_user') 🙆
    // await page.getByRole('textbox', {name: 'Password'}).fill('secret_sauce') 🔒
    // await page.getByRole('button', {name: 'Login'}).click() 🚀


    // --- Método nuevo 1.0 --- (no olvidar importar la clase LoginPage en la parte superior del archivo)
    // const login = new LoginPage(page)
    // await login.fillUsername('standard_user')
    // await login.fillPassword('secret_sauce')
    // await login.clickOnLogin()

    // --- Método nuevo 2.0 --- (no olvidar importar la clase LoginPage en la parte superior del archivo)
    const login = new LoginPage(page)
    await login.loginWithCredentials('standard_user', 'secret_sauce')


    const itemsContainer = await page.locator('#inventory_container .inventory_item').all() // Seleccionar productos 🛍️

    // Obtener un número aleatorio entre 0 y el número de productos 
    const randomIndex = Math.floor(Math.random() * itemsContainer.length)

    const randomItem = itemsContainer[randomIndex] // Seleccionar un producto aleatorio de la lista 🎲

    // Obtener el precio, nombre y descripción del producto
    const expectedDescription = await randomItem.locator('.inventory_item_desc').innerText()
    const expectedName = await randomItem.locator('.inventory_item_name').innerText()
    const expectedPrice = await randomItem.locator('.inventory_item_price').innerText()

    // Imprimir en consola el precio, nombre y descripción del producto
    console.log(`Price: ${expectedPrice} // Name: ${expectedName} // Description: ${expectedDescription}`)

    await randomItem.getByRole('button', {name: 'Add to cart'}).click() // Hacer click en el botón de "Add to cart" 🛒

    await page.locator('a.shopping_cart_link').click() // Hacer click en el icono del carrito de compras


    expect(page.getByRole('button', {name: 'Checkout'})).toBeVisible() // Verificar que el botón de "Checkout" esté visible

    const actualName = await page.locator('.inventory_item_name').innerText() // Obtener el nombre del producto en el carrito
    const actualDescription = await page.locator('.inventory_item_desc').innerText() // Obtener el nombre del producto en el carrito
    const actualPrice = await page.locator('.inventory_item_price').innerText() // Obtener el nombre del producto en el carrito

    // Comparar el nombre, descripción y precio del producto seleccionado con el producto en el carrito
    expect(actualName).toBe(expectedName)
    expect(actualDescription).toBe(expectedDescription)
    expect(actualPrice).toBe(expectedPrice)


    //AUTOMATIZANDO CARRITO DE COMPRAS

    await page.locator('#checkout').click() // Hacer click en el botón de "Checkout" 🛒

    await page.getByRole('textbox', {name: 'First Name'}).fill('Alejandro') // Rellenar el campo de nombre 
    await page.getByRole('textbox', {name: 'Last Name'}).fill('Palacios') // Rellenar el campo de apellido 
    await page.getByRole('textbox', {name: 'Zip/Postal Code'}).fill('12345') // Rellenar el campo de zip code
    
    await expect(page.getByRole('button', {name: 'Continue'})).toBeVisible() // Hacer click en el botón de "Continue"
    await page.getByRole('button', {name: 'Continue'}).click() // Hacer click en el botón de "Continue"
    await page.getByRole('button', {name: 'Finish'}).click() // Hacer click en el botón de "Finish"

    await expect(page.getByRole('heading', {name: 'Thank you for your order!'})).toBeVisible() // Verificar que el mensaje de "Thank you for your order!" esté visible 👁️

})