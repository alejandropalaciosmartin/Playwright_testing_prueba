import {test, expect} from '@playwright/test';

test('purchase an item', async ({page}) => {

    await page.goto('https://www.saucedemo.com/') // Ir a la página de Saucedemo 🌐

    await page.getByRole('textbox', {name: 'Username'}).fill('standard_user') // Rellenar el campo de usuario 🙆
    await page.getByRole('textbox', {name: 'Password'}).fill('secret_sauce') // Rellenar el campo de contraseña 🔒
    await page.getByRole('button', {name: 'Login'}).click() // Hacer click en el botón de login 🚀


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