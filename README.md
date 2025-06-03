Environment Configuration Setup
To run this project locally, you need to set up environment variables for the frontend, backend, and admin directories. Follow the instructions below to create the .env files in the respective folders.

🔹 Frontend – .env
Create a .env file inside the frontend/ folder and add the following variables:

env
Copy
Edit
VITE_BACKEND_URL='YOUR_LOCAL_HOST'
VITE_RAZORPAY_KEY_ID='YOUR_RAZORPAY_KEY_ID'
Replace 'YOUR_LOCAL_HOST' with your backend URL (e.g., http://localhost:4000).
Replace 'YOUR_RAZORPAY_KEY_ID' with your actual Razorpay key.

🔹 Backend – .env
Create a .env file inside the backend/ folder and add the following variables:

env
Copy
Edit
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
Make sure to replace the placeholder values (your_cloud_name, your_api_key, etc.) with your actual credentials.

🔹 Admin – .env
Create a .env file inside the admin/ folder and add the following variable:


VITE_BACKEND_URL='http://localhost:4000'
Adjust the backend URL if your server runs on a different host or port.

🚀 Running the Project
After setting up the .env files:

Install dependencies in each folder:


cd frontend && npm install
cd ../backend && npm install
cd ../admin && npm install
Start the development servers:

cd backend && npm run dev
cd ../frontend && npm run dev
cd ../admin && npm run dev

Your application should now be up and running locally.
