Base URL = https://review-api-h3du.onrender.com

***** Registration *****

-> Routes {

    User registration:
        - method: post
        - /register 
        - schema*
            {
                {
                    "name": "Adrian Cross",
                    "email": "across@mail.com",
                    "password": "examplepwd12345"
                }
            };
        -Responses:
            > 201 Created
            > 400 Bad Request
            > 500 Server eroor

    User verification:
        - /verify/:verificationCode

    Resend email verification:
        - /verify 
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
    

