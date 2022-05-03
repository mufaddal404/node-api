# node-api

Database: test

Table: products

(Edit Config.js for user credentials)


Fields:
![Screenshot (13)](https://user-images.githubusercontent.com/72680240/166395538-afa5dca6-ba5e-45c2-b1e9-20890961d650.png)


Routes:


1)primary route(GET): hostname/api/products

It can be used with any query parameter for filtering data.

Such as,

hostname/api/products?id=12&cost=5



2)For posting data(POST): hostname/api/products



3) for UPDATE and DELETE: hostname/api/products/id/{id}
