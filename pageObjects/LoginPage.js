class LoginPage{
    constructor(page){
//when someone creates a class object these locators get initialized
//page here has no life and comes from test case so needs to be passed from test to here
this.page=page;
this.url="https://rahulshettyacademy.com/client";
this.userName=page.locator("#userEmail");
this.password=page.locator("#userPassword");
this.loginButton=page.locator("#login");
 }

 async validLogin(username,password){
    await this.userName.fill(username);
    await this.password.type(password);
    await this.loginButton.click();

    // wait until network calls are made
    await this.page.waitForLoadState('networkidle');
 }

async gotoLogin()
{
    await this.page.goto("https://rahulshettyacademy.com/client");

}

}

module.exports={LoginPage};