const base = require('@playwright/test');

exports.customTest = base.test.extend(
    {
        testDataForOrder: {
            "username": "lucasalexandre@gmail.com",
            "password": "Test@123",
            "productName": "ZARA COAT 3"
        },
    }
);