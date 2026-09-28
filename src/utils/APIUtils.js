class APIUtils {

    constructor(apiContext) {
        this.apiContext = apiContext;
    }

    async getToken(email, password) {
        const loginResponse = await this.apiContext.post('https://rahulshettyacademy.com/api/ecom/auth/login',
            {
                data: {
                    userEmail: email,
                    userPassword: password
                }
            }
        );
        const loginResponseJSON = await loginResponse.json();
        return loginResponseJSON.token;
    }

    async createOrder(token, country, productId) {
        const orderResponse = await this.apiContext.post('https://rahulshettyacademy.com/api/ecom/order/create-order/',
            {
                data: {
                    'orders': [{
                        'country': country,
                        'productOrderedId': productId
                    }]
                },
                headers: {
                    'Authorization': token,
                    'Content-Type': 'application/json'
                },
            }
        );
        const orderResponseJson = await orderResponse.json();
        return orderResponseJson.orders[0]
    }
}

module.exports = {APIUtils};