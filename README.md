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
js/main.js           Nav toggle, footer year, mailto form handling
assets/favicon.svg   Site icon (also used as the inline logo mark)
```

## Running locally

No build tools needed — just serve the folder, e.g.:

```bash
python3 -m http.server 8000
```

Then open `http://localhost:8000`.

## Content

Real organizational details have been filled in from public sources
(WHEAT's IRS filings, GuideStar/CauseIQ, and Team 41's own site/socials):
EIN 26-3031711, mailing address (108 Stirling Rd, Warren, NJ 07059),
2010 incorporation, 1997 team founding, board president, and Team 41's
competition history, advisors, and sponsors.

## Content still needed

A few things remain placeholders (marked `<em>(placeholder...)</em>` in
the HTML) because they aren't publicly available or the real WHEAT
website (wheatrobotics.org) has expired and is now a parked domain:

- A WHEAT phone number
- Online donation platform link (e.g. Zeffy, PayPal Giving Fund, Stripe) in [get-involved.html](get-involved.html)
- Full board roster beyond the current president (Anuj Shah) and Bo Li (board member)
- Exact meeting days/times and sponsorship dollar tiers
- Contact/volunteer form backend. For now the forms open the visitor's email app (`data-mailto-form` in [js/main.js](js/main.js)): everything goes to board@wheatrobotics.org, except "Mentor / Coach a team" on the volunteer form, which goes to danwasserman@wheatrobotics.org
- More photos: the homepage hero and gallery use 2024-25 build season and 2025-26 Mount Olive shots from the team's Robotics Photos Drive folder; there are no banquet or parents-night photos there yet
