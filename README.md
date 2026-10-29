# Stefie's Hair Salon

A one-page website for Stefie's Hair Salon where customers can see services, view styles and book an appointment. The site is built with JavaScript (`app.js`), with `index.html` for the page structure and `style.css` for the styling. No libraries to install.

## Features
- Services list with prices in UGX; add services to "my visit" and see the total price and time
- Gallery of hairstyles drawn with JavaScript, with category filters and a larger view
- Stylist profiles
- Online booking: choose a stylist, date and time, with taken slots shown as unavailable
- "My bookings" list with cancel, saved in the browser
- "Open now" badge, opening hours, reviews and FAQs
- WhatsApp link, mobile friendly, light and dark mode

## Run it
Open `index.html` in any web browser. Keep `index.html`, `style.css` and `app.js` in the same folder. No server is needed.

## Publish it free with GitHub Pages
1. Upload `index.html` to a GitHub repository.
2. Go to **Settings → Pages**.
3. Under **Branch**, choose `main` and `/ (root)`, then save.
4. After a minute, your site is live at `https://YOUR-USERNAME.github.io/REPOSITORY-NAME/`.

## Customise
Open `app.js` and edit:
- `SERVICES`, `STYLISTS` and `LOOKS` near the top for services, prices, team and gallery
- `HOURS` for opening hours
- The address and phone number in the "Visit us" section of `index.html` (search for `256700000000`)

## Limitations
Bookings are saved only in each customer's own browser, so the salon does not receive them. To receive bookings, connect the form to a backend or an email or form service.

## Licence
MIT
