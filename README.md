Create env files in frontend , backend and admin folder as below :

## .env for frontend

VITE_BACKEND_URL = 'YOUR_LOCAL_HOST'
VITE_RAZORPAY_KEY_ID = "YOUR_RAZORPAY_KEY_ID"

## .env for backend 

# Server Configuration
PORT=4000

# MongoDB Configuration
MONGODB_URI=mongodb://localhost:27017

# Cloudinary Configuration
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# JWT Configuration
JWT_SECRET=your_jwt_secret_key

# Stripe Configuration
STRIPE_SECRET_KEY=your_stripe_secret_key
STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key

## .env for admin

VITE_BACKEND_URL = 'http://localhost:4000'
