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
        Fields: Id, AdminId, ProductsId, Qty, CreateAt

Features : 
1. Admin
    -   Admin Login
    -   Get Transaction List by Date Range
    -   Get Total Income by Month/Year

2. User
    - User Login
    -   Get Products List
    -   Create Transaction (Validate Qty, Qty Cant More Than Stock)
    -   Get History Transaction
