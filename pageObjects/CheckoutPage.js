const{test, expect}=require('@playwright/test');

class CheckoutPage{
    constructor(page)
    {
        this.page=page;
       this.cartproducts=page.locator("div li").first();
       this.CheckOutButton= page.locator("text=Checkout");
    }

   
    async verifyProductIsDisplayed(productName)
    {
    
    await this.cartproducts.waitFor();
    const IsproductinCart= await this.getProductLocator(productName).isVisible();
    // console.log(IsproductinCart);
     expect(IsproductinCart).toBeTruthy();
    }

    async Checkout(){
        await this.CheckOutButton.click();
    }

    getProductLocator(productName){
        
        return this.page.locator("h3:has-text('"+productName+"')");
    }

}
module.exports={CheckoutPage};