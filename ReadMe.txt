Base URL = https://review-api-h3du.onrender.com

***** Registration *****

-> Routes {

    User registration:
        - method: post
        - route: /register 
        - schema*:
            {
                {
                    "name": "Adrian Cross",
                    "email": "across@mail.com",
                    "password": "examplepwd12345"
                }
            };
        - Responses:
            > 201 Created
                {
                    "email": "name@mail.com",
                    "name": "Name"
                }
            > 400 Bad Request
            > 500 Server eroor

    User verification:
        - method: get
        - /verify/:verificationCode
        - Responses: 
            > 200 Success
            > 401 Unauthorized (Email not found)

    Resend email verification:
        - method: post
        - /verify 
        - Responses: 
            > 200 Ok "Resend email: success"
            > 401 Unauthorized (Email not found)
            > Schema: 
                {
                    "email": "name@mail.com",
                    "password": 123456
                }
};


***** Login *****

-> Routes {

    User login: 
        - /login

    User get current:
        - /current

    User logout: 
        - /logout
}
    

