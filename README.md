# Job Tracker - Student Internship Directory

A beginner-friendly React mini project for exploring sample internship listings and keeping track of applications in one place.

## Live Website

https://webvibe711-cyber.github.io/studentJobtracker/

## Features

- Browse 10 sample opportunities across Electronics, Embedded Systems, IoT, Web Development, and Software.
- Search by job title or company and combine the search with category and location filters.
- Open an opportunity link or start a prefilled application record from a job card.
- Add applications with required-field and email validation.
- Filter saved applications by status and delete entries with confirmation.
- Keep application records in browser `localStorage`, including after a page refresh.
- Use the responsive navigation and layouts on desktop and mobile.

> **Sample data:** The job listings are examples for this project. They are not verified live vacancies. Check an employer's official careers site for current opportunities.

## Requirements

- Node.js LTS with npm
- A modern web browser

## Run Locally

```bash
npm install
npm run dev
```

Open the local URL printed by Vite in the terminal.

To create and preview a production build:

```bash
npm run build
npm run preview
```

## Project Structure

```text
src/
  components/
    Navbar.jsx          Responsive navigation and active-page indicator
    JobCard.jsx         Reusable internship listing
    SearchBar.jsx       Search and directory filters
    Footer.jsx          Shared footer
  pages/
    Home.jsx            Welcome page and summary counts
    Jobs.jsx            Sample listings and combined filters
    AddApplication.jsx  Application form and validation
    Applications.jsx    Saved records, status filter, and deletion
  App.jsx               Routes and shared application state
  main.jsx              React entry point
  index.css             Global styles and responsive layouts
index.html              HTML document loaded by Vite
package.json            Dependencies and npm scripts
```

## How It Works

- `App.jsx` stores the application list in React state and reads/writes it to `localStorage` under `student-job-tracker-applications`.
- `Jobs.jsx` keeps the sample job data in a JavaScript array. Search, category, and location conditions are applied together with `filter()`; matching cards are rendered with `map()`.
- `AddApplication.jsx` checks required fields and email format before adding a record. Selecting **Track application** on a job card pre-fills the job title and company.
- `Applications.jsx` filters the saved records by status and asks for confirmation before deleting one.
- React Router handles navigation between pages without reloading the app.

Application data is stored only in this browser on this device. Clearing browser storage removes the saved records; the sample job directory is not persisted.

## Presentation Walkthrough

1. Start on Home and point out the opportunity and application totals.
2. Open Jobs, search for a company or title, and combine the search with category or location filters.
3. Choose **Track application** on a sample listing to see its title and company filled into the form.
4. Submit the application and show it in Applications. Change its status filter or delete it after confirming.
5. Refresh the page to demonstrate that the application record remains saved.

## Technology

React functional components and hooks, React Router, JavaScript ES6+, HTML5, CSS3, and Vite. The app does not use a backend API or a UI framework.