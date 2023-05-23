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

//---------------------------------------------------------------//

***** Login *****

-> Routes {

    User login: 
        - method: post
        - /api/auth/login
        - schema*: 
            {
                "email": "name@mail.com",
                "password": 123456
            };
        - Responses: 
            > 200 Ok:
                token: "token"
            > 401 Unauthorized
                "message": "Email or password invalid"

    User get current:
        - method: get
        - /api/auth/current
        - token*
        - Responces: 
            > 200 Ok
                {
                    "name": "Andrii",
                    "email": "kapustnikov@ukr.net"
                }
            > 401 Unauthorized

    User logout: 
        - method: post
        - /api/auth/logout
        - Responces: 
            > 200 Ok 
                {
                    "message": "logout success"
                }
            > 401 Unauthorized
}

//--------------------------------------------------------------//
    
***** Contacts *****

-> Routes {
    
    Contacts getAll:
        - method: get
        - /api/contacts
        - token* required!
        - Responces:
            > 200 Ok
                [
                    {
                        "_id": "646cde20a74f82552230235",
                        "name": "vacancy name",
                        "company": "company",
                        "date": "00.00.0000",
                        "link": "company-link",
                        "owner": "646cd6baa74f8242312363e1"
                    }
                ]
            > 401 Unauthorized
            > 404 Not found

    Contacts getById: 
        - method: get
        - api/contacts/:id
        - ?????????????????????????????

    Contacts addContact:
        - method: post
        - api/contacts
        - token* required!
        - schema: 
                {
                    "name": "name", 
                    "company": "company name",
                    "date": "00.00.0000",
                    "link": "company-link"
                };
        - Responces: 
            > 201 Created
                {
                    "name": "name",
                    "company": "company name",
                    "date": "00.00.0000",
                    "link": "company-link",
                    "owner": "646cd6baa74f8255642463e1",
                    "_id": "646cde20a74f82513257323f3",
                    "createdAt": "2023-05-23T15:39:12.127Z",
                    "updatedAt": "2023-05-23T15:39:12.127Z"
                }
            > 400 Bad Request
}
