Key Features: Product Listing & Details:

Data fetched from FakeStoreAPI

Clicking a product redirects to a dynamic product detail page.

Cart Functionality:

Users can add products to the cart.

Quantity updates dynamically on the cart page.

Cart icon displays item count in the navbar.

User Authentication:

Users can register and log in.

On successful login, users are redirected to the home page.

The logged-in user's name is displayed in the header/profile section.

Auth state is persisted using localStorage.

Routing:

Next.js App Router for dynamic routes (/product-details/[productId], /cart, /profile, etc.)

🛠️ Technology Stack: Frontend:

Next.js (App Router)

React.js

Tailwind CSS for styling

React Icons for UI icons

Authentication & State:

React Context API for global state (cart & auth)

localStorage for session persistence

API & Data:

FakeStoreAPI for product data

Other Tools:

Vercel for frontend deployment (optional)

MongoDB & Express for backend (if used in user auth)
