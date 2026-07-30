# C.Lab

The C.Lab website. Static HTML, CSS and JavaScript, no build step, served by
GitHub Pages at **[clab.iriscocreative.com](https://clab.iriscocreative.com)**.

Built by [Iris Cocreative](https://www.iriscocreative.com) for C.Lab.

---

## Start here

**[styleguide.html](https://clab.iriscocreative.com/styleguide.html)** is the
brand guidelines and the design system in one page: the logo, the palette with
every contrast ratio measured in both light and dark, the type scale, the
spacing steps, every component, and the rules that hold them together. Read it
before changing anything visual. It has its own light/dark switch so you can
check any part of it in either mode.

---

## Structure

| Path | What it is |
|---|---|
| `index.html` | Homepage, including the five movements module |
| `about.html` `offerings.html` `resources.html` `contribute.html` | Inner pages |
| `styleguide.html` | Brand guidelines, Level 1 |
| `404.html` | Not-found page |
| `system/tokens.css` | Every colour, size, space and duration, in both themes. The only file with raw values. |
| `system/base.css` | Elements and components, built entirely from tokens. |
| `assets/img/` | The two logo files and the science illustrations |
| `assets/js/site.js` | Theme switch, navigation, the five movements, the scroll reveal |
| `team-photos/` | Team headshots |
| `archive/` | The April 2026 prototype, kept for reference. Not linked, marked `noindex`. |

## Editing

Everything is plain HTML. Open a file, change the words, save, commit.

Five rules keep the site coherent:

1. **Values come from `system/tokens.css`.** If a page needs a colour, size or
   spacing value that is not there, add it to the tokens file and to the
   styleguide first, then use it. A new page should not need a single new value.
2. **Do not write dark-mode styles.** Every token flips between light and dark,
   so a page authored once works in both. If something looks wrong in dark mode,
   the fix is almost always that a raw value was used instead of a token.
3. **The deep band is the same navy in both themes.** `.band` re-points its
   own tokens so components drop into it unchanged, and it must never be given
   `overflow: hidden` — the movements module inside it relies on
   `position: sticky`, which an overflow-hidden ancestor silently breaks.
4. **The five movement colours are for the movements only.** They colour the
   rail, nodes, spokes, movement eyebrow and numeral. Everything else uses the
   single brass `--accent`. This is what keeps the mandala the only colourful
   thing on the page.
5. **The mandala is always an `<img>`, never an inline `<svg><use>`.** Inlined,
   the 76-path artwork re-rasterises on every scroll frame inside the sticky
   movements module and freezes the page. The styleguide explains this under
   Performance.

The navigation and footer are repeated in each page rather than pulled from a
shared file, which is normal for a site this size. If you change one, change all
of them.

## What is not in this repository

Brand source artwork, client documents, plans, meeting notes and working files
are kept out on purpose. This repo is public and is served as the live site.

Anything that should not be published goes in `_local/`, which is listed in
`.gitignore` and is never committed.

## Still to come

- Real photography and video throughout. Every image on the site today is either
  an illustration or a placeholder awaiting a real asset.
- The minimalist logo variant for small sizes.
- The transformation motif graphic asset.
- The offerings track filter, once the mapping of which offerings involve legal
  psychedelics is confirmed.

---

For the Love of Life.
