class OrdersHistoryPage{
    constructor(page){
        this.ordersTable=page.locator("tbody");
        this.rows=  page.locator("tbody tr");
        this.OrderIDdetails= page.locator(".col-text");
    }

    async searchOrderAndSelect(orderID){
        await this.ordersTable.first().waitFor();
        const rowcount=await this.rows.count();
        // console.log(rowcount);

        for(let i=0;i<rowcount;i++)
        {   
        const rowOrderId=await this.rows.nth(i).locator("th").textContent();
        // console.log(rowOrderId);
        if(orderID.includes(rowOrderId))
        {
        await this.rows.nth(i).locator("button").first().click();
        break;
        }
        }
    }

    async getOrderID(){
        // console.log( await this.OrderIDdetails.textContent());
        return await this.OrderIDdetails.textContent();
    }

}
module.exports={OrdersHistoryPage};