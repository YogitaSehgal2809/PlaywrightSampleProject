const{test, expect}=require('@playwright/test')

test('Browser context test',async ({browser})=>
{

//new instance which does not carries any previous cookies/plugins and we can inject the cookies/proxy we need to use.
const context= await browser.newContext();
//new page is open on the fresh instance
const page =await context.newPage();
//we will visit the url
await page.goto("https://www.google.com/");
//get title and print it
console.log(await page.title());
//get title and assert if its correct
await expect(page).toHaveTitle("Google");


});


//for writing a normal automation test where no specific properties are required
test('Page test',async ({page})=>
{
const userName=page.locator('input#username');
const password=page.locator("[type='password']");
const signin=page.locator("#signInBtn");
const errormessage=page.locator("[style*='block']");
const cardTitles=page.locator(".card-body a");
//when we don't have any properties to pass to browser context, we can have the fixture page, to have the default browser opened with a fresh page
//we will visit the url
await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
console.log(await page.title());
await userName.type("rahulshetty");
await password.type("learning");
await signin.click();
// the locator method intelligently waits for dynamic elements to appear
console.log(await errormessage.textContent());
await expect(errormessage).toContainText("Incorrect");

await userName.fill("");
await userName.fill("rahulshettyacademy");
await signin.click();

console.log(await cardTitles.first().textContent());
console.log(await cardTitles.nth(0).textContent());
console.log(await cardTitles.last().textContent());
//playwright does not waits /provides synchronization
//takes all titles corresponding to current locator
const allTitles=await cardTitles.allTextContents();
console.log(allTitles);


});


//testing UI elements
test('UI Controls',async ({page})=>
{
const userName=page.locator('input#username');
const password=page.locator("[type='password']");
const signin=page.locator("#signInBtn");
const errormessage=page.locator("[style*='block']");
const cardTitles=page.locator(".card-body a");
const dropdown=page.locator("select.form-control")
const radioButton=page.locator(".customradio .radiotextsty");
const okayButton=page.locator("#okayBtn");


//when we don't have any properties to pass to browser context, we can have the fixture page, to have the default browser opened with a fresh page
//we will visit the url
await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
await dropdown.selectOption("consult");

await radioButton.last().click();
await okayButton.click();
await expect(radioButton.last()).toBeChecked();
console.log(await radioButton.last().isChecked());
await page.locator("#terms").click();
await expect(page.locator("#terms")).toBeChecked();
await page.locator("#terms").uncheck();
expect(await page.locator("#terms").isChecked()).toBeFalsy();

// await page.pause();
const doclink=page.locator("[href='https://rahulshettyacademy.com/documents-request']");
await expect(doclink).toHaveAttribute("class","blinkingText");

});

//testing Child window 
test('Child window handling',async ({browser})=>
{


//new instance which does not carries any previous cookies/plugins and we can inject the cookies/proxy we need to use.
const context= await browser.newContext();
//new page is open on the fresh instance
const page =await context.newPage();
// we will visit the url
await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
const doclink=page.locator("[href='https://rahulshettyacademy.com/documents-request']");

//race condition - give knowledge to playwright 
const [newPage]=await Promise.all([
context.waitForEvent('page') , await doclink.click(),
])

const text=await newPage.locator("p.red").textContent();
console.log(text);
const arrText=text.split("@");
const domain=arrText[1].split(" ")[0];

console.log(domain);
const userName=page.locator('input#username');
const password=page.locator("[type='password']");

await userName.type(domain);
// await page.pause();
console.log(await userName.textContent());
// password.fill

});