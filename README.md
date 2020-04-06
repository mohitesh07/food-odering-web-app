![Food-ordering-app-eats Logo](logo.jpg)

# Food Ordering Web App

![Version Details](https://img.shields.io/badge/version-1.0-brightgreen.svg)
![Download Details](https://img.shields.io/github/downloads/mohitesh07/food-odering-web-app/total.svg)
![GitHub contributors](https://img.shields.io/github/contributors/mohitesh07/food-odering-web-app.svg)
[![MIT licensed](https://img.shields.io/badge/license-MIT-blue.svg)](./LICENSE)

Online Food Ordering App (eats) is my attempt to solve the problem of food ordering in an lucid and efficient way. This is my Software Engineering CS791 project. MVC architecture is used over here. Model is NO-SQL MongoDB, View is AngularJS, and Controller is NodeJS. The data in the front end is fetched using a RESTful API at the controller. It used JWT authentication for login. Also there is two seperate login 1. ADMIN/master login and 2. user login
Contents like edit order and add menu item is not provided to user login. Also in user login the user can see the orders he placed. But in master login he can edit menu items, remove menu items, update menu items, also he can see all orders placed by all the users in the /ordes page; also the can delete orders. Delete orders is not provided user login.

### Live Demo

[Demo Here link](https://web-food-ordering.herokuapp.com/#!/)

### Usage Instructions

Make a MongoDb cluster and provide the URI String and the Password.

### Screenshots

![Menu-page img](screenshots/p1.png)
![img](screenshots/p2.png)
![img](screenshots/p3.png)

# License

[The MIT License (MIT)](LICENSE)
