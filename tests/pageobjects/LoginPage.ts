import { Locator, Page } from '@playwright/test'

export class LoginPage{

    private readonly usernameTextbox : Locator
    private readonly passwordTextbox : Locator
    private readonly loginButton : Locator

    //Localización de los elementos
    constructor(page : Page){
        this.usernameTextbox = page.getByRole('textbox', {name: 'Username'}) // Localizar el campo de usuario 🙆
        this.passwordTextbox = page.getByRole('textbox', {name: 'Password'}) // Localizar el campo de contraseña 🔒
        this.loginButton = page.getByRole('button', {name: 'Login'}) // Localizar el botón de login 🚀
    }

    //Métodos para interactuar con los elementos
    async fillUsername(username : string ){ await this.usernameTextbox.fill(username) }
    async fillPassword(password : string ){ await this.passwordTextbox.fill(password) }
    async clickOnLogin(){ await this.loginButton.click() }

    async loginWithCredentials(username : string, password : string){
        await this.fillUsername(username)
        await this.fillPassword(password)
        await this.clickOnLogin()
    }
}