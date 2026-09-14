# Gina Salma Sabilla — Personal Portfolio & Journal

A modern, aesthetic, and fully responsive personal portfolio and journal website designed for Gina Salma Sabilla, a UI/UX Designer, Graphic Designer, and Informatics Graduate. 

Built with React, Vite, and Tailwind CSS, this portfolio features a beautifully crafted frontend and a built-in **Admin CMS** for easy content management without a traditional backend (utilizing Local Storage).

## 🌟 Features

### Frontend (Visitor Facing)
- **Aesthetic UI/UX**: Warm beige and deep navy color scheme, premium typography (Cormorant Garamond, Playfair Display, Plus Jakarta Sans), and subtle glassmorphism effects.
- **Dynamic Routing**: Built with `react-router-dom` for seamless page transitions.
- **Portfolio Gallery**: Showcases case studies with dynamic template layouts and gallery views.
- **Journal / Blog**: Read articles, thoughts, and design processes.
- **Interactive Elements**: Custom aesthetic cursor, scroll-based animations, and responsive navigation.
- **SEO Optimized**: Dynamic meta tags and Open Graph cards powered by `react-helmet-async`.
- **Analytics tracking**: Integrated with Vercel Analytics.

### Admin CMS (Content Management System)
- **Authentication**: Protected admin route to securely manage portfolio data.
- **Local Storage Database**: All data (Settings, Projects, Blogs, Certificates, Experiences) is managed and persisted on the browser via Context API and Local Storage.
- **CRUD Capabilities**: Add, edit, reorder, and delete portfolio case studies, blog posts, work experiences, skills, certificates, and achievements directly from the UI.
- **Real-time Sync**: CMS changes reflect instantly across the application.

## 🛠️ Tech Stack

- **Framework**: [React 18](https://react.dev/) with [Vite](https://vitejs.dev/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Routing**: [React Router v6](https://reactrouter.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **SEO**: [React Helmet Async](https://github.com/staylor/react-helmet-async)
- **Analytics**: [@vercel/analytics](https://vercel.com/analytics)

## 🚀 Getting Started

Follow these steps to run the project locally on your machine.

### Prerequisites
- Node.js (v18 or higher recommended)
- npm or yarn

### Installation

1. **Clone the repository** (if applicable):
   ```bash
   git clone <repo-url>
   cd gina-portfolio
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Run the development server**:
   ```bash
   npm run dev
   ```

4. **Open your browser**:
   Navigate to `http://localhost:5173` to view the website.

## 🔒 Admin Access

To access the Admin CMS and modify the content of the portfolio:
1. Navigate to `/admin/login`.
2. Log in using your configured credentials. 
3. *Note: Data is currently stored in the browser's Local Storage. Clearing browser data will reset the portfolio to its initial seed data.*

## 📂 Folder Structure

```text
src/
├── assets/        # Static assets like images and custom fonts
├── components/    # Reusable UI components (Navbar, Footer, Layouts, Admin)
├── context/       # React Context (DataContext, AuthContext) for state management
├── pages/         # Page components (Home, Portfolio, Blog, Admin CMS pages)
├── services/      # Services (StorageService for Local Storage CRUD logic)
├── App.jsx        # Main application routing and context providers
└── main.jsx       # Entry point
```

## 🌐 Deployment

This project is optimized for deployment on [Vercel](https://vercel.com/). 
- Simply connect your repository to Vercel.
- Framework Preset: `Vite`
- Build Command: `npm run build`
- Output Directory: `dist`

---

*Designed and crafted with precision for Gina Salma Sabilla.*
