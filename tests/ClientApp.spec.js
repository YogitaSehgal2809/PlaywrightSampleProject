const{test, expect}=require('@playwright/test')

test('Browser context test',async ({page})=>
{


//registration

// await page.goto("https://rahulshettyacademy.com/client/auth/register");
// await page.locator("#firstName").fill("Yogita");
// await page.locator("#lastName").fill("Gogia");
// await page.locator("#userEmail").fill("yogitagogia9050@gmail.com");
// await page.locator("#userMobile").fill("9897265162");
// await page.locator("#userPassword").fill("");
// await page.locator("#confirmPassword").fill("");

const products = page.locator(".card-body");
const email="anshika@gmail.com";
//we will visit the url
await page.goto("https://rahulshettyacademy.com/client");
await page.locator("#userEmail").fill(email);
await page.locator("#userPassword").type("Iamking@000");
await page.locator("#login").click();

// wait until network calls are made
// await page.waitForLoadState('networkidle');

//wait until the first element is loaded, waitFor works for only 1 element not a list of elements
// await page.locator(".card-body b").first().waitFor();
//const titles=await page.locator(".card-body b").allTextContents();
//get titles and print it
// console.log(titles);


//code to search for a product and add to cart
const productname="zara coat 3";
await products.first().waitFor();
const productcount=await products.count();
// console.log(productcount);

for(let i=0;i<productcount;++i)
{
    //locator's sub scope will be inside the element
    if(await products.nth(i).locator("b").textContent() ==productname)
    {

    //add to cart
    await products.nth(i).locator("text= Add To Cart").click();
    break;
    }
    
}
// await page.pause();

const cart =  page.locator("[routerlink*='cart']");
await cart.click();
await page.locator("div li").first().waitFor();
const IsproductinCart= page.locator("h3:has-text('zara coat 3')").isVisible();
expect(IsproductinCart).toBeTruthy();
const CheckOutButton= page.locator("text=Checkout");
CheckOutButton.click();

//code to enter other details


//code to handle auto suggestive dropdown in playwright
const Countrydropdown= page.locator("[placeholder*='Country']").type("ind",{delay:100});
const optionsDropdown=page.locator(".ta-results");
await optionsDropdown.waitFor();
const optionCount=await optionsDropdown.locator("button").count();
for(let i=0;i<optionCount;++i)
{
    const text = await optionsDropdown.locator("button").nth(i).textContent();
    if(text.trim()==="India")
    {
        await optionsDropdown.locator("button").nth(i).click();
        break;
    }
}
// await page.pause();


//assertions in place order page
await expect(page.locator(".user__name label[type='text']")).toHaveText(email);
await page.locator(".action__submit").click();

await expect(page.locator(".hero-primary")).toHaveText(" Thankyou for the order. ");

const orderID=await page.locator(".em-spacer-1 .ng-star-inserted").textContent();
console.log(orderID);

//go to orders page and view order
const OrdersTab=page.locator("button[routerlink*='myorders']");
await OrdersTab.click();

await page.locator("tbody").first().waitFor();

const rows=  page.locator("tbody tr");
const rowcount=await rows.count();
console.log(rowcount);

for(let i=0;i<rowcount;i++)
{
    const rowOrderId=await rows.nth(i).locator("th").textContent();
    console.log(rowOrderId);
    if(orderID.includes(rowOrderId))
    {
        await rows.nth(i).locator("button").first().click();
        break;
    }
}

//OrderIDdetails page
const OrderIDdetails=await page.locator(".col-text").textContent();
expect(orderID.includes(OrderIDdetails)).toBeTruthy();

});


