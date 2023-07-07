Application Routes:

User
api/v1/users/create-user (POST)
api/v1/users/ (GET)
api/v1/users/649e5574ca33648b827d5dff (Single GET) 
api/v1/users/649c978f5bb8c0eec528209d (PATCH)
api/v1/users/649ca5aba0740f19f576311f (DELETE) 

Cows
api/v1/cows/create-cow (POST)
/api/v1/cows/ (GET)
api/v1/cows/64a55844e0d49ab72f4f1933 (Single GET)
api/v1/cows/649e374c1e985212a8970c5f (PATCH)
api/v1/cows/64941d4247d8d7542e640ae7 (DELETE)

Pagination and Filtering routes of Cows
api/v1/cows?page=1&limit=10
api/v1/cows?sortBy=price&sortOrder=asc
api/v1/cows?minPrice=20000&maxPrice=70000
api/v1/cows?location=Chattogram
api/v1/cows?searchTerm=Cha

Orders
api/v1/orders/create-orders (POST)
api/v1/orders/ (GET)