A food pick-up ordering app built for a restaurant as a midterm project at Lighthouse Labs with a team of 3.
The app allows a customer (user) to place an order on the restaurant’s web page. Placing an order notifies 
the restaurant with order details and confirms the order with the customer by text message. The restaurant can 
reply to the incoming order with a expected wait time, as well as an additional text when the order is ready for pickup.

- Front-end built using HTML/CSS/SASS, Bootstrap, Javascript, AJAX
- Backend was built using Node.js, Express, and PostreSQL
- Twilio API (modern telecomm API service) was used to allow text messaging between the customer and restaurant

## Team Members
- Cathleen Melendez
- Sarah Hermsen
- Kenny Brown

## Getting Started
- Create the .env by using .env.example as a reference: cp .env.example .env
- Update the .env file with your correct local information
- Install all dependencies (using the `npm install` command).
- Run `knex migrate:latest` to migrate the database.
- Run `knex seed:run` to seed the database.
- Run the development web server using the `node server.js` command.
- Visit http://localhost:8080/

## Dependencies

- Node 5.10.x or above
- NPM 3.8.x or above
- body-parser 1.15.2
- cookie-session 2.0.0-beta.3
- dotenv 2.0.0
- ejs 2.4.1
- express 4.13.4
- helmet 3.13.0
- js-cookie 2.2.0
- knex 0.11.7
- knex-logger 0.1.0
- morgan 1.7.0
- node-sass-middleware 0.9.8
- pg 6.0.2
- twilio 3.18.0

## Screenshots

![Home page](https://github.com/hellocathleen/Food-Pickup-Ordering-App/blob/master/images/Home.png?raw=true)

![Add an item to your cart](https://github.com/hellocathleen/Food-Pickup-Ordering-App/blob/master/images/addtocart.jpeg?raw=true)

![View items in your cart](https://github.com/hellocathleen/Food-Pickup-Ordering-App/blob/master/images/cart.png?raw=true)

![Thank-you after sending order](https://github.com/hellocathleen/Food-Pickup-Ordering-App/blob/master/images/Thank-you.png?raw=true)