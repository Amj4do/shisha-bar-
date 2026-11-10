# Stendal Lounge Bar

A responsive React website for Stendal Lounge Bar, built with Vite and React Router. The real lounge photos and hero video are stored locally in `public/media`.

## Start locally

Install Node.js 18 or later, then run:

```bash
npm install
npm run dev
```

Open the local URL printed by Vite. To create a production build, run `npm run build`.

## Editable content

- Business details, hours, experience cards and gallery: `src/content.js`
- Main sections, reservation flow and legal pages: `src/App.jsx`
- Theme, layout and responsive styles: `src/styles.css`
- Local photos and muted hero video: `public/media`

Reservation requests are assembled in the browser and opened in WhatsApp. No reservation details are sent to or stored by this website. Google Maps loads only after a visitor chooses to load it.

## GitHub Pages

The workflow in `.github/workflows/deploy.yml` builds and deploys the site whenever changes are pushed to `main`. In the repository settings, open **Pages** and set **Build and deployment → Source** to **GitHub Actions**. The project URL will be `https://amj4do.github.io/shisha-bar-/`.

## Before publishing

Complete the marked operator, responsible-person, email and hosting-provider details in the Impressum and privacy page. Confirm these legal texts with a qualified adviser before publication.
