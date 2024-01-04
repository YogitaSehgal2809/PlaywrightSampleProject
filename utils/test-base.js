const base= require('@playwright/test');

// extend base object and give additional capabilities
// here in 
exports.customtest=base.test.extend({
    // define customised capabilities(fixtures) in form of key value pairs(JSON object)
    testDataForOrder: {
        username : "anshika@gmail.com",
        password: "Iamking@000",
        productname : "zara coat 3",
        countryCode : "Ind",
        country : "India"
    }

})