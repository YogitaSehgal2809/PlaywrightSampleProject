const{test, expect}=require('@playwright/test');
const{customtest}=require('../utils/test-base')
// const{LoginPage}=require('../pageObjects/LoginPage');
// const{DashboardPage}=require('../pageObjects/DashboardPage');

//use one POManager and import to get all the required objects
const{POManager}=require('../pageObjects/POManager');

//Best practice> Convert file to string, then to JSON
const dataSet=JSON.parse(JSON.stringify(require('../testData/placeOrderTestData.json')));

for(const data of dataSet){
test(`Client App Login using data from external test data file ${data.productname}`,async ({page})=>
{
//this object holds all objects of pages
const poManager=new POManager(page);
const loginPage=poManager.getLoginPage();
const dashboardPage=poManager.getDashboardPage();
const checkoutPage=poManager.getcheckoutPage();
const orderreviewPage=poManager.getorderreviewPage();
const orderhistoryPage=poManager.getorderhistoryPage();
//registration

// await page.goto("https://rahulshettyacademy.com/client/auth/register");
// await page.locator("#firstName").fill("Yogita");
// await page.locator("#lastName").fill("Gogia");
// await page.locator("#userEmail").fill("yogitagogia9050@gmail.com");
// await page.locator("#userMobile").fill("9897265162");
// await page.locator("#userPassword").fill("");
// await page.locator("#confirmPassword").fill("");

//login

await loginPage.gotoLogin();
await loginPage.validLogin(data.username,data.password);


//code to search for a product and add to cart and go to cart
await dashboardPage.searchProduct(data.productname);
// await page.pause();
await dashboardPage.navigateToCart();


//code to verify element is present in checkout page
await checkoutPage.verifyProductIsDisplayed(data.productname);
await checkoutPage.Checkout();

//code to enter other details in Order review page


//code to handle auto suggestive dropdown in playwright - search country and select
await orderreviewPage.selectCountry(data.countryCode,data.country);
// await page.pause();

const orderID=await orderreviewPage.submitOrderGetOrderId(data.username);


//go to orders page and view order

await dashboardPage.navigateToOrders();
await orderhistoryPage.searchOrderAndSelect(orderID);


//OrderIDdetails page
// console.log(orderID);
 expect(orderID.includes(await orderhistoryPage.getOrderID())).toBeTruthy();

});

}



customtest.only('Client App Login using data as fixture',async ({page,testDataForOrder})=>
{
//this object holds all objects of pages
const poManager=new POManager(page);
const loginPage=poManager.getLoginPage();
const dashboardPage=poManager.getDashboardPage();
const checkoutPage=poManager.getcheckoutPage();

//login

await loginPage.gotoLogin();
await loginPage.validLogin(testDataForOrder.username,testDataForOrder.password);


//code to search for a product and add to cart and go to cart
await dashboardPage.searchProduct(testDataForOrder.productname);
// await page.pause();
await dashboardPage.navigateToCart();


//code to verify element is present in checkout page
await checkoutPage.verifyProductIsDisplayed(testDataForOrder.productname);
await checkoutPage.Checkout();
});

