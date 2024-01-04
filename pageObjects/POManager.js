const{LoginPage}=require('../pageObjects/LoginPage');
const{DashboardPage}=require('../pageObjects/DashboardPage');
const{CheckoutPage}=require('../pageObjects/CheckoutPage');
const{OrdersReviewPage}=require('../pageObjects/OrdersReviewPage')
const{OrdersHistoryPage}=require('../pageObjects/OrdersHistoryPage')

class POManager{
    constructor(page){
        this.page=page;
        this.loginPage=new LoginPage(this.page);
        this.dashboardPage=new DashboardPage(this.page);
        this.checkoutPage=new CheckoutPage(this.page);
        this.orderreviewPage=new OrdersReviewPage(this.page);
        this.orderhistoryPage=new OrdersHistoryPage(this.page);
    }

    getLoginPage(){
        return this.loginPage;
    }

    getDashboardPage(){
        return this.dashboardPage;
    }

    getcheckoutPage(){
        return this.checkoutPage;
    }
    
    getorderreviewPage(){
        return this.orderreviewPage;
    }

    getorderhistoryPage(){
        return this.orderhistoryPage;
    }
}
module.exports={POManager};