# C.Lab

The C.Lab website. Static HTML, CSS and JavaScript, no build step, served by
GitHub Pages at **[clab.iriscocreative.com](https://clab.iriscocreative.com)**.

Built by [Iris Cocreative](https://www.iriscocreative.com) for C.Lab.

---

## Start here

**[styleguide.html](https://clab.iriscocreative.com/styleguide.html)** is the
brand guidelines and the design system in one page: the logo, the palette with
every contrast ratio measured, the type scale, the spacing steps and every
component the site is assembled from. Read it before changing anything visual.

---

## Structure

| Path | What it is |
|---|---|
| `index.html` | Homepage |
| `about.html` | About |
| `offerings.html` | Offerings |
| `resources.html` | Resources |
| `contribute.html` | Contribute |
| `styleguide.html` | Brand guidelines, Level 1 |
| `system/tokens.css` | Every colour, size, space and duration on the site. The only file with raw values. |
| `system/base.css` | Elements and components, built entirely from tokens. |
| `assets/img/` | Logo variants and the science illustrations |
| `assets/js/site.js` | Mobile navigation, offerings filter, scroll reveal |
| `team-photos/` | Team headshots |
| `archive/` | The April 2026 prototype, kept for reference. Not linked from the site and marked `noindex`. |

## Editing

Everything is plain HTML. Open a file, change the words, save, commit.

Two rules keep the site coherent:

1. **Colour, size and spacing values come from `system/tokens.css`.** If a page
   needs a value that is not there, add it to the tokens file and to the
   styleguide first, then use it. A new page should not need a single new value.
2. **Text colour uses the `-deep` variants.** `--clay` and `--sage` are
   decorative and do not meet accessibility contrast as text. `--clay-deep` and
   `--sage-deep` do. The styleguide explains this in full.

The navigation and footer are repeated in each page rather than pulled from a
shared file, which is normal for a site this size. If you change one, change all
of them.

## What is not in this repository

Brand source artwork, client documents, plans, meeting notes and working files
are kept out on purpose. This repo is public and is served as the live site.

Anything that should not be published goes in `_local/`, which is listed in
`.gitignore` and is never committed. See `.gitignore` for the full list.

## Still to come

- Real photography and video throughout. Every image on the site today is either
  an illustration or a placeholder awaiting a real asset.
- The minimalist logo variant for small sizes.
- The transformation motif graphic asset.
- The offerings track filter, once the mapping of which offerings involve legal
  psychedelics is confirmed.

---

For the Love of Life.
