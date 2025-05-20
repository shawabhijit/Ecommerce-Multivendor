# 🛒 E-commerce Multi-Vendor Web Application

An advanced full-stack **multi-vendor e-commerce platform** built with **Spring Boot** (backend) and **React + Vite** (frontend). The app supports **Customers**, **Sellers**, and **Admin** roles with a wide range of features including product management, cart/wishlist functionality, order processing, and real-time analytics.

---

## 🚀 Live Demo

**Frontend**: https://hiakrihub.netlify.app/ 

> ⚠️ **Note**: The backend is hosted on [Render](https://render.com/) and may take **1–3 minutes** to start due to cold starts. Please be patient if the demo takes a little time to load.

---

## 🧠 Key Features

### 👥 Customer Features:
- Sign up / Log in
- Browse products
- Add to **Wishlist**
- Move items from **Wishlist to Cart**
- Checkout with **Razorpay Payment Gateway**
- View order history

### 🛍️ Seller Features:
- Register as a seller
- Add / update / delete products
- View and manage orders
- View earnings and sales analytics

### 🛠️ Admin Features:
- Admin dashboard overview
- View and manage all **customers**
- View and manage all **vendors**

---

## 🧰 Tech Stack

### 🖥️ Frontend:
- [React.js](https://reactjs.org/) (with [Vite](https://vitejs.dev/))
- [Redux Toolkit](https://redux-toolkit.js.org/) (Thunk, Store, Slices)
- [Tailwind CSS](https://tailwindcss.com/)
- [ShadCN UI](https://ui.shadcn.dev/)
- [React Router DOM](https://reactrouter.com/en/main)

### 🛠️ Backend:
- [Spring Boot](https://spring.io/projects/spring-boot)
- [JWT Authentication](https://jwt.io/)
- [PostgreSQL](https://www.postgresql.org/)
- [Docker](https://www.docker.com/)

### 💳 Payment:
- [Razorpay](https://razorpay.com/)

### ☁️ Deployment:
- Frontend: **Netlify**
- Backend: **Render (Docker image)**

---

## 🛠️ How to Run Locally

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/ecommerce-multivendor.git
cd ecommerce-multivendor
```
### 2. Setup Backend (Spring Boot + PostgreSQL)

### With Docker 
```bash
cd backend
docker build -t ecommerce-backend .
docker run -p 8080:8080 ecommerce-backend

```
### With Maven
```bash
cd backend
./mvnw spring-boot:run

```
### Application.properties 

```bash
spring.application.name=ecommerce_multivendor

spring.datasource.url=${DATASOURCE_URL}
spring.datasource.username=${DATASOURCE_USERNAME}
spring.datasource.password=${DATASOURCE_PASSWORD}

# JPA & Hibernate Configuration
spring.jpa.database-platform=org.hibernate.dialect.PostgreSQLDialect
#spring.jpa.generate-ddl=true
spring.jpa.show-sql=true
spring.jpa.hibernate.ddl-auto=update
spring.jpa.properties.hibernate.globally_quoted_identifiers=true
spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.PostgreSQLDialect
spring.jpa.properties.hibernate.format_sql=true
spring.jpa.properties.hibernate.type.auto_detect_hbm_json_types=true

server.port=8081
server.error.path=/user/error
#server.error.whitelabel.enabled=false
server.servlet.context-path=/

# mail service configuration
spring.mail.host=smtp.gmail.com
spring.mail.port=587
spring.mail.username=${SPRING_MAIL_USERNAME}
spring.mail.password=${SPRING_MAIL_PASSWORD}
spring.mail.properties.mail.smtp.auth=true
spring.mail.properties.mail.smtp.starttls.enable=true
#spring.mail.properties.mail.smtp.starttls.required=true
spring.mail.properties.mail.smtp.connectiontimeout=5000
spring.mail.properties.mail.smtp.timeout=5000
spring.mail.properties.mail.smtp.writetimeout=5000


stripe.api.key= ${STRIPE_API_KEY}
razorpay.api.key=${RAZORPAY_API_KEY}
razorpay.api.secret=${RAZORPAY_API_SECRET}

```
### 3. Setup Frontend (React + Vite)

```bash
cd ecomerce-multivendor-fronend
npm install
npm run dev

```
---

### ✅ Final Tips:
- Replace all placeholders like `your-username`, Netlify/Render links, LinkedIn/Portfolio links with actual ones.
- Optionally, include screenshots or a `/screenshots` folder for better visual appeal.

Let me know if you want a dark-mode GitHub banner or badges (e.g., `Made with Spring Boot`, `Live on Netlify`)!

