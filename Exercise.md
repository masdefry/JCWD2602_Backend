Create REST API for Dashboard Management System of Minimarket.
Requirement : 
    - Use ExpressJS to create REST API
    - Use JSON file as a data source (get, create, update, delete data)
Data:
    -   Admin
        Fields: Id, Username, Password
    -   User
        Fields: Id, Email, Password
    -   Products
        Fields: Id, Name, Price, Stock
    -   Transaction
        Fields: Id, UserId, ProductsId, Qty, CreatedAt

Features : 
1. Admin
    -   Admin Login
    -   Get Transaction List by Date Range // /admin/transaction GET
    -   Get Total Income by Month/Year // /admin/income

2. User
    -   User Login // /users
    -   Get Products List // /products
    -   Create Transaction (Validate Qty, Qty Cant More Than Stock) // /transaction POST
    -   Get History Transaction // /transaction GET
