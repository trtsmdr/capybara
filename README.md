# Happy Birthday Puspa 🦫🌸

A tiny birthday world made just for Puspa — featuring capybara, flowers, a love letter, and a little gift.

## Tech Stack

- HTML5, CSS3, Vanilla JavaScript
- No build step — static files ready to deploy

## Project Structure

```
Tirta/
├── index.html
├── style.css
├── script.js
├── assets/
│   ├── capybara.svg
│   ├── favicon.svg
│   └── photo-placeholder.svg
├── robots.txt
├── sitemap.xml
├── .gitignore
├── .github/workflows/deploy.yml
└── README.md
```

## Local Development

Open `index.html` in a browser, or run a local server:

```bash
npx http-server .
```

## Deploy to GitHub Pages

### Option A — GitHub Actions (auto-deploy)

1. Create a new GitHub repository (e.g. `birthday-puspa`)
2. Push all files to the `main` branch:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/<username>/birthday-puspa.git
   git push -u origin main
   ```
3. Go to **Settings > Pages > Build and deployment**
4. Set **Source** to **GitHub Actions**
5. The workflow in `.github/workflows/deploy.yml` will auto-deploy on every push to `main`

### Option B — Deploy from branch

1. Push files to GitHub repo
2. Go to **Settings > Pages**
3. Set **Source** to **Deploy from a branch**
4. Select `main` branch and `/ (root)` folder
5. Save — site will be live at `https://<username>.github.io/birthday-puspa/`

## Customization

- **Countdown date**: Edit `targetDate` in `script.js`
- **Music**: Replace the `<audio>` src URL in `index.html`
- **Photos**: Add `photo1.jpg` — `photo4.jpg` in `assets/`
- **Letter text**: Edit `letterMessage` in `script.js`
- **Colors**: Edit CSS variables in `:root` in `style.css`

## License

- Code: MIT
- Music: "Love Romantic Piano" by michael lerm (Jamendo, CC license)
- Capybara SVG: Original artwork
