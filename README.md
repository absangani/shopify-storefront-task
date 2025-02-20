# Shopify Product Listing App  

## Overview  
The Shopify Product Listing App is a storefront application that allows merchants to view, search, and sort products from their Shopify store. It is built using React.js for the frontend and Node.js with Express.js for the backend. The app integrates with Shopify’s GraphQL API to fetch product data dynamically.  

## Features  
- Search for products by title  
- Sort products by title and price (ascending/descending)  
- Display product details, including title, description, image, price, and availability  
- Paginated product listing for better performance  

## Live Demo  
**Deployed Link**: [Your Hosted App URL]  

## Installation & Setup  

### Clone the Repository  
```sh
git clone https://github.com/your-username/shopify-product-listing.git
cd shopify-product-listing
```

### Install Dependencies  
```sh
# Backend
cd backend
npm install

# Frontend
cd ../frontend
npm install
```

### Set Up Environment Variables  
Create a `.env` file in the backend directory and add the following:  

```
SHOPIFY_API_KEY=your_api_key
SHOPIFY_API_SECRET=your_api_secret
SHOPIFY_APP_URL=https://your-app-url.com
```

### Start the Application  
```sh
# Run Backend
cd backend
npm start

# Run Frontend
cd frontend
npm start
```

## Folder Structure  
```
/backend  # Node.js backend code
/frontend # React frontend code
/docs     # Documentation files (screenshots, API references)
```

## Technology Stack  
- **Frontend**: React.js, Polaris UI  
- **Backend**: Node.js, Express.js  
- **Hosting**: Vercel (Frontend), AWS/DigitalOcean (Backend)  
- **API**: Shopify GraphQL API  

## Screenshots  
Include screenshots of the Shopify store running with product listings, search functionality, and sorting features.  