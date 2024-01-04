const{test, expect}=require('@playwright/test');
//contains code for Order confirmation and order review page
class OrdersReviewPage{
    constructor(page){
        this.Countrydropdown= page.locator("[placeholder*='Country']");
        this.optionsDropdown=page.locator(".ta-results");
        this.userName=page.locator(".user__name label[type='text']");
        this.submit=page.locator(".action__submit");
        this.orderConfirm=page.locator(".hero-primary");
        this.orderId=page.locator(".em-spacer-1 .ng-star-inserted");
    }

    async selectCountry(CountryCode,CountryName){
        await this.Countrydropdown.type(CountryCode,{delay:100});
        await this.optionsDropdown.waitFor();
        const optionCount=await this.optionsDropdown.locator("button").count();
        for(let i=0;i<optionCount;++i)
        {
            const text = await this.optionsDropdown.locator("button").nth(i).textContent();
            if(text.trim()===CountryName)
            {
                await this.optionsDropdown.locator("button").nth(i).click();
                break;
            }
        }
    }

    async submitOrderGetOrderId(username){
        //assertions in place order page
    await expect(this.userName).toHaveText(username);
    await this.submit.click();
    await expect(this.orderConfirm).toHaveText(" Thankyou for the order. ");
    return await this.orderId.textContent();
    }
}

module.exports={OrdersReviewPage};