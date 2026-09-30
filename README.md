# WHEAT Foundation Website

Website for **WHEAT** — the Watchung Hills Education and Technology
Foundation, a 501(c)(3)-eligible nonprofit supporting STEM, robotics, and
technology education programs (including the Wheat Robotics team).

## Structure

Static HTML/CSS/JS site, no build step required.

```
index.html          Home
about.html           Mission, vision, history, board
programs.html        Programs WHEAT supports
get-involved.html    Donate, volunteer, sponsor
contact.html         Contact form and details
css/styles.css       Shared stylesheet
js/main.js           Nav toggle, footer year, placeholder form handling
assets/favicon.svg   Site icon (also used as the inline logo mark)
```

## Running locally

No build tools needed — just serve the folder, e.g.:

```bash
python3 -m http.server 8000
```

Then open `http://localhost:8000`.

## Content still needed

This is a first draft with placeholder copy throughout (marked with
`<em>(placeholder...)</em>` in the HTML and `[bracketed]` fields). Before
launch, replace:

- Real mission/vision statement and history in [about.html](about.html)
- Actual board member names/roles
- Real program names, schedules, and eligibility in [programs.html](programs.html)
- Confirmed 501(c)(3) determination status, EIN, and donation-receipt language
- Donation platform link (e.g. Zeffy, PayPal Giving Fund, Stripe) in [get-involved.html](get-involved.html)
- Contact email, phone, mailing address, and social links (footer on every page, and [contact.html](contact.html))
- Contact/volunteer form backend (currently placeholder — wire up a service like Formspree or Google Forms, see `data-placeholder-form` in [js/main.js](js/main.js))
- Impact stats on the homepage (student counts, program counts, mentor counts)
