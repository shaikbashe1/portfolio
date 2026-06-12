# Shaik Bashe | Cybersecurity & AI Product Engineer Portfolio

An interactive, premium, high-performance developer portfolio website designed for **Shaik Bashe**, showcasing capabilities in **Cybersecurity**, **AI Product Engineering**, and **Full-Stack Development**.

Built using **React (v19)**, **Vite**, and **Vanilla CSS** with a focus on dark-mode-first glassmorphic styling, smooth scroll interactions, zero external bloat, and search-engine optimization.

---

## 🌟 Key Features

1. **Dark & Light Mode Switcher**: Premium dark/light themes that persist locally using `localStorage`.
2. **Interactive Projects Filter**: Dynamically filter project cards based on domains (*Cybersecurity*, *AI/ML*, *IoT & Web*).
3. **Smooth Scroll Transitions**: Custom scroll observation script that reveals sections (fade-in-up) as recruiters scroll.
4. **Automated Typing Loop**: Highlights core competencies dynamically in the Hero section.
5. **Recruiter & ATS Optimization**: High keyword density targeting engineering frameworks, security patterns, and programming interfaces.
6. **Built-in GitHub Integration**: Displays your live GitHub contribution activity graph, stats, and languages.
7. **Production SEO**:
   - `sitemap.xml` mapping the custom domains.
   - `robots.txt` indexing configuration.
   - Complete OpenGraph (OG) and Twitter meta-tags in `index.html`.
8. **Interactive Contact Form**: Connected to Formspree (`https://formspree.io/f/xjkyjqkd`) with visual loaders and completion alerts.

---

## 🛠️ Local Installation & Development

To run this portfolio locally on your machine:

1. Clone or navigate to the directory:
   ```bash
   cd C:\Users\dell\Desktop\shaik-bashe-portfolio
   ```

2. Install the project dependencies:
   ```bash
   npm install
   ```

3. Launch the local development server:
   ```bash
   npm run dev
   ```

4. Build the project for production:
   ```bash
   npm run build
   ```

5. Preview the production build locally:
   ```bash
   npm run preview
   ```

---

## 📋 Pre-Deployment & Verification Checklist

Before deploying, ensure you check the following details:

- [x] **Resume File**: The resume PDF has been copied to [public/resume_shaik_bashe.pdf](file:///C:/Users/dell/Desktop/shaik-bashe-portfolio/public/resume_shaik_bashe.pdf) and is linked in the Hero CTA.
- [x] **Favicon**: A custom favicon has been set up at [public/favicon.png](file:///C:/Users/dell/Desktop/shaik-bashe-portfolio/public/favicon.png).
- [x] **SEO Sitemap**: The sitemap is configured inside [public/sitemap.xml](file:///C:/Users/dell/Desktop/shaik-bashe-portfolio/public/sitemap.xml).
- [x] **Crawl Rules**: Search indexing instructions are configured in [public/robots.txt](file:///C:/Users/dell/Desktop/shaik-bashe-portfolio/public/robots.txt).
- [x] **GitHub Actions Workflow**: The deploy runner is configured inside [.github/workflows/deploy.yml](file:///C:/Users/dell/Desktop/shaik-bashe-portfolio/.github/workflows/deploy.yml).

---

## 🚀 GitHub Pages Deployment Steps

This project contains a GitHub Actions workflow that automates deployment:

1. Push your repository to GitHub. Make sure the repository name is set (if it is a user page named `<username>.github.io`, the base configuration `/` is perfect).
2. Go to your GitHub repository settings:
   - Click on **Settings** -> **Pages**.
   - Under **Build and deployment**, set the **Source** to **GitHub Actions**.
3. Push any changes to the `main` branch:
   - This will trigger the **Deploy Portfolio to GitHub Pages** workflow under the **Actions** tab.
   - In 1–2 minutes, your website will be live at `https://shaikbashe1.github.io` (or your custom domain `https://shaikbashe.dev`).

---

## 📝 TODO: Missing Information Action Items

Please update the following items in the source code as they become available:

- [ ] **Certificate Links**: Currently, NPTEL, Deloitte Forage, Cisco Operating Systems, and Google Kaggle credentials use decorative span badges. As soon as you have the direct verification URLs, replace the `<span>` tags with `<a>` tags targeting the credentials inside `src/App.jsx` (under the **Certifications & Hackathons** section block).
- [ ] **Custom Domain CNAME**: If deploying to your custom domain `shaikbashe.dev` on GitHub Pages, remember to create a `CNAME` file containing `shaikbashe.dev` inside the [public](file:///C:/Users/dell/Desktop/shaik-bashe-portfolio/public) folder, or set it directly in your GitHub Repository settings.
- [ ] **Contact Formspree Endpoint**: If you want to change the target email for messages, generate a new endpoint ID on [Formspree](https://formspree.io) and replace the URL in [src/App.jsx](file:///C:/Users/dell/Desktop/shaik-bashe-portfolio/src/App.jsx#L101):
  ```javascript
  const response = await fetch('https://formspree.io/f/YOUR_NEW_ID', { ... })
  ```
