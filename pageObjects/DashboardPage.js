class DashboardPage{
    constructor(page)
    {
        this.products = page.locator(".card-body");
        this.productstitle=page.locator(".card-body b");
        this.cart=page.locator("[routerlink*='cart']");
        this.orders=page.locator("button[routerlink*='myorders']");
    }

    async searchProduct(productname){

// wait until the first element is loaded, waitFor works for only 1 element not a list of elements
await this.productstitle.first().waitFor();
const titles=await this.productstitle.allTextContents();
//get titles and print it
// console.log(titles);


await this.products.first().waitFor();
const productcount=await this.products.count();
// console.log(productcount);

for(let i=0;i<productcount;++i)
{
    //locator's sub scope will be inside the element
    if(await this.products.nth(i).locator("b").textContent() ==productname)
    {

    //add to cart
    await this.products.nth(i).locator("text= Add To Cart").click();
    break;
    }
    
}
    }

    async navigateToCart(){
        await this.cart.click();
    }

    async navigateToOrders(){
        await this.orders.click();
    }
}
module.exports={DashboardPage};