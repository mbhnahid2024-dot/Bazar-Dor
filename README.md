# 🛒 বাজার দর (Bazar-Dor)

**বাংলাদেশের নিত্যপ্রয়োজনীয় পণ্যের দৈনিক বাজারদর জানুন এক জায়গায়।**

Bazar-Dor is a Bengali-language web application designed to help people in Bangladesh track and compare the daily prices of essential goods, including rice, lentils, cooking oil, vegetables, fish, meat, eggs, dairy products, and spices.

## 🌐 Live Website & Repository

- **Live Website:** https://bazar-dor-inpt.vercel.app
- **GitHub Repository:** https://github.com/mbhnahid2024-dot/Bazar-Dor

## ✨ Features

1. **Infinite Price Ticker** – Continuously displays product prices with percentage changes and ▲/▼ indicators.
2. **Top Price Changes** – Highlights the top 6 products with the biggest price increases and decreases on the homepage.
3. **Product Categories** – Browse products by category with numeric price sorting, including support for Bengali digits.
4. **Product Details & Market Comparison** – Protected product detail pages with minimum, maximum, and average price comparisons across markets.
5. **Authentication System** – Secure email/password, Google, and GitHub sign-in using Better Auth.
6. **User Profile** – View and update personal profile information.
7. **Responsive Design** – Optimized for desktop, tablet, and mobile devices.
8. **Loading States** – Skeleton loaders for a smoother browsing experience.
9. **Bengali Notifications** – User-friendly toast notifications in Bengali.
10. **Custom 404 Page** – A custom page for unavailable routes.

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| Next.js (App Router) | Full-stack React framework |
| React | User interface |
| TypeScript | Type safety |
| Tailwind CSS | Styling and responsive design |
| Better Auth | Authentication |
| MongoDB Atlas | Database |
| react-hot-toast | Notifications |
| lucide-react | Icons |

## 🚀 Getting Started

### Prerequisites

- Node.js (LTS recommended)
- npm
- MongoDB Atlas account

### 1. Clone the Repository

```bash
git clone https://github.com/mbhnahid2024-dot/Bazar-Dor.git
```

### 2. Navigate to the Project

```bash
cd Bazar-Dor
```

### 3. Install Dependencies

```bash
npm install
```

### 4. Configure Environment Variables

Create a `.env.local` file in the project root and add the following variables:

```env
MONGODB_URI=your_mongodb_connection_string
BETTER_AUTH_SECRET=your_secure_secret
BETTER_AUTH_URL=http://localhost:3000

GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=

GITHUB_CLIENT_ID=
GITHUB_CLIENT_SECRET=
```

**Important:** Never commit `.env.local` or expose your database credentials, authentication secret, or OAuth secrets publicly.

### 5. Start the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🗄️ MongoDB Atlas Setup

1. Create a free MongoDB Atlas account.
2. Create a cluster.
3. Go to **Database Access** and create a database user.
4. Go to **Network Access** and configure IP access for your application.
5. Select **Connect → Drivers**.
6. Copy the MongoDB connection string.
7. Replace the username and password with your database credentials.
8. Add `/bazardor` as the database name in the connection string.
9. Save the connection string in `MONGODB_URI`.

For Vercel deployment, configure Atlas network access appropriately. The `0.0.0.0/0` rule allows connections from anywhere, but use it only with a strong database password and appropriately restricted database permissions.

## 🔐 Authentication Setup

Bazar-Dor uses Better Auth for authentication.

### Better Auth Environment Variables

- `BETTER_AUTH_SECRET`: A strong random secret of at least 32 characters.
- `BETTER_AUTH_URL`: Your application base URL.

Local development:

```env
BETTER_AUTH_URL=http://localhost:3000
```

Production:

```env
BETTER_AUTH_URL=https://bazar-dor-inpt.vercel.app
```

Generate a secure secret using:

```bash
openssl rand -base64 32
```

### Google OAuth Setup

1. Open [Google Cloud Console](https://console.cloud.google.com/).
2. Configure the OAuth consent screen.
3. Create an OAuth Client ID with application type **Web application**.
4. Add the authorized redirect URI:

```text
http://localhost:3000/api/auth/callback/google
```

For production, also add:

```text
https://bazar-dor-inpt.vercel.app/api/auth/callback/google
```

5. Copy the Client ID and Client Secret into your environment variables.

### GitHub OAuth Setup

1. Open [GitHub Developer Settings](https://github.com/settings/developers).
2. Select **OAuth Apps → New OAuth App**.
3. Set the application homepage URL:

```text
https://bazar-dor-inpt.vercel.app
```

4. Set the Authorization callback URL:

```text
https://bazar-dor-inpt.vercel.app/api/auth/callback/github
```

5. Generate a Client Secret.
6. Add the Client ID and Client Secret to your environment variables.

For local OAuth testing, configure a separate local OAuth app or update the provider settings as appropriate.

## 📡 Product Data API

Bazar-Dor uses the Programming Hero Bazar-Dor API as its primary product data source.

**Primary API:**

```text
https://openapi.programming-hero.com/api/bazardor
```

**Fallback API sources:**

```text
https://api.api-store.workers.dev
https://api.abcz.workers.dev
```

### Available Endpoints

| Endpoint | Description |
|---|---|
| `/products` | Retrieve all products |
| `/products?category=chal` | Retrieve products by category |
| `/products/:id` | Retrieve a specific product |
| `/categories` | Retrieve product categories |

## ☁️ Deployment

Bazar-Dor is deployed using **Vercel**.

### Production Website

https://bazar-dor-inpt.vercel.app

### Deployment Steps

1. Push your latest code to GitHub.
2. Open [Vercel](https://vercel.com/).
3. Import the `Bazar-Dor` GitHub repository.
4. Configure the required environment variables in **Project Settings → Environment Variables**.
5. Set `BETTER_AUTH_URL` to:

```text
https://bazar-dor-inpt.vercel.app
```

6. Add the production Google and GitHub OAuth callback URLs to their respective developer consoles.
7. Deploy or redeploy the project.
8. Test authentication and application functionality on the production website.

**Note:** Use the main production domain for normal website access. Vercel preview deployment URLs have different origins and may need additional Better Auth trusted-origin configuration.

## 📁 Project Repository

GitHub: https://github.com/mbhnahid2024-dot/Bazar-Dor

## 👨‍💻 Author

**Nahid**

GitHub: https://github.com/mbhnahid2024-dot

---

*Bazar-Dor – বাংলাদেশের নিত্যপ্রয়োজনীয় পণ্যের বাজারদর জানুন সহজেই।* 🛒