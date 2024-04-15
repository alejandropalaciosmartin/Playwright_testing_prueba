import { Locator, Page, expect } from '@playwright/test'

export class LoginPage{

    private readonly usernameTextbox : Locator
    private readonly passwordTextbox : Locator
    private readonly loginButton : Locator

    private readonly shoppingCartLink : Locator

    //Localización de los elementos
    constructor(page : Page){
        this.usernameTextbox = page.getByRole('textbox', {name: 'Username'}) // Localizar el campo de usuario 🙆
        this.passwordTextbox = page.getByRole('textbox', {name: 'Password'}) // Localizar el campo de contraseña 🔒
        this.loginButton = page.getByRole('button', {name: 'Login'}) // Localizar el botón de login 🚀
        this.shoppingCartLink = page.locator('a.shopping_cart_link') // Localizar el icono del carrito de compras 🛒
    }

    //Métodos para interactuar con los elementos
    async fillUsername(username : string ){ await this.usernameTextbox.fill(username) }
    async fillPassword(password : string ){ await this.passwordTextbox.fill(password) }
    async clickOnLogin(){ await this.loginButton.click() }
    async checkSucessfulLogin(){ await expect(this.shoppingCartLink).toBeVisible() }

    //Método para hacer login con credenciales
    async loginWithCredentials(username : string, password : string){
        await this.fillUsername(username)
        await this.fillPassword(password)
        await this.clickOnLogin()
        await this.checkSucessfulLogin()
    }

    
}