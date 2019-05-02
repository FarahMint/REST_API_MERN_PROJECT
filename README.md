# REST_API_MERN_PROJECT

<!-- https://medium.com/the-node-js-collection/making-your-node-js-work-everywhere-with-environment-variables-2da8cdf6e786 -->

Project Description:

Create a JSON-based API for a fictional  potluck website.

- JavaScript

- Technologies:   
    - Node v10.15.3 
    - Async / Await
    - Express.JS
    - MongoDB
        - Mongoose 

- Models:  
    - two models : USER & ITEM

    - User schema will contain the following fields: name, email, password, items array of items.

    - Item schema will contain the following fields: name, quantity, date and creator.

- API EndPoints -USER MODEL:
GET     /users              - list all users
POST    /users              - create new user
GET     /users/:id          - list particular user
PUT     /users/:id          - update particular user (replacing all fields)
PATCH   /users/:id          - update particular user (patching all fields)

GET     /users/:id /items   - list all items created by particular user
GET     /users/:id /items   - creates a new item by particular user

- API EndPoints -ITEM MODEL:
GET     /items              - list all items
POST    /items              - create new item
GET     /items/:id          - list particular item
PATCH   /items/:id          - update particular item (patching all fields)
DELETE  /items/:id          - delete particular item created by a user
 

- Goal:
- no authentificatication / authorization yet
- understand better mongoose and API design in general