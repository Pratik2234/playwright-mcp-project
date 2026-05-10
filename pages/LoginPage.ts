import { Page } from "@playwright/test";

export class LoginPage{

    constructor(private page:Page){}

    async goto(){
       await this.page.goto('https://www.saucedemo.com')  
    }

    async login(userName:String , password:string){
        await this.page.locator('#user-name').fill('standard_user')
        await this.page.locator('#password').fill('secret_sauce')
        await this.page.locator('#login-button').click()
    }
}