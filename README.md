# Sachin Sagar - Developer Portfolio

A sleek, data-driven personal portfolio built with React and Vite. Focused on performance, responsive design, and showcasing professional and academic achievements within the embedded systems and ADAS domains.

## 🚀 Features
- **Dynamic Content:** Entire timeline, projects, skills, and education sections are rendered dynamically from a single `src/data.json` file.
- **Glassmorphism UI:** Custom frosted-glass panels with subtle hover micro-animations (`.glass-panel`).
- **Dark Mode Support:** A built-in user theme toggle with reactive CSS `--variables`.
- **Scroll Animations:** Native `IntersectionObserver` handles smooth fade-ins as elements enter the viewport.
- **Responsive Architecture:** Custom flexbox layout with dynamic margins ensures the layout remains cleanly centered across all breakpoints, from mobile viewing to ultrawide monitors.

## 🛠 Tech Stack
- React
- Vite
- Vanilla CSS (No heavy CSS frameworks)

## 🏃‍♂️ Running Locally

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Build for production:
```bash
npm run build
```

## 📂 Project Structure
- `/src/components/` - React components (`Experience.jsx`, `Projects.jsx`, `Sidebar.jsx`, etc.)
- `/src/assets/` - Media files and images.
- `/src/data.json` - Single truth file for all portfolio text content. Edit this file to instantly update the site without touching the JSX.
- `/src/index.css` & `/src/components/shared.css` - Global theme variables and component specific styles.
