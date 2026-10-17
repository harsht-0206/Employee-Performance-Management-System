# Performly — Employee Performance Management System

A responsive employee performance dashboard built with HTML, CSS and vanilla JavaScript. Designed as a classroom project that can be hosted for free with GitHub Pages.

## Features
- Dashboard with KPI cards and interactive Chart.js charts
- Employee directory with search, department filter and sorting
- Add, edit and remove employees
- Performance scores and goal completion progress
- Review tracker with completion actions
- Goals & OKRs page with add-goal interaction
- Reports page with CSV export
- Responsive sidebar and mobile layout
- Browser localStorage persistence
- Resettable sample data

## Run locally
1. Download or clone this repository.
2. Open `index.html` in your browser, or use the VS Code **Live Server** extension.
3. Internet access is needed for Google Fonts, Lucide icons and Chart.js CDN.

## Host with GitHub Pages
1. Create a GitHub repository, for example `employee-performance-management-system`.
2. Upload `index.html`, `style.css`, `script.js` and this README to the repository root.
3. Open **Settings → Pages**.
4. Under **Build and deployment**, select **Deploy from a branch**.
5. Select branch `main` and folder `/ (root)`, then click **Save**.
6. Wait for GitHub to publish the site. The URL will look like `https://YOUR-USERNAME.github.io/REPOSITORY-NAME/`.

## Important project note
This is a front-end demo. Employee data is stored in the current browser using localStorage. It is not shared between different users/devices and does not include secure login or a backend database. Do not enter real employee personal data. A production version would need a backend API, database, authentication and authorization.

## Suggested viva explanation
- **HTML:** structure of dashboard, forms, tables and pages.
- **CSS:** responsive layout, sidebar, cards, colors and mobile breakpoints.
- **JavaScript:** navigation, filtering, employee CRUD operations, charts and CSV export.
- **localStorage:** saves demo changes in the same browser.
- **Chart.js:** visualizes performance trends and distribution.
