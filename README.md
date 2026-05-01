# Rodrigo Farinha Website

Public source for Rodrigo Farinha's personal website: <https://rodrigofarinha.com>.

This is a Jekyll static site based on the Memoirs theme, customized for academic, teaching, practice, projects, and blog content.

## Public repository note

This repository is public. Keep all committed content public-ready.

Do not commit:

- API keys, tokens, credentials, or private config files
- private notes, personal documents, or unpublished working material
- sensitive project details, confidential client information, or private datasets
- PDFs, images, or metadata that should not be public

Before committing content changes, review the rendered page and any linked files as if they were already live on the public internet.

## Local setup

The macOS system Ruby is too old for this repository's locked Bundler version. Use Homebrew Ruby 3.4 when running local commands:

```bash
export PATH="/opt/homebrew/opt/ruby@3.4/bin:/opt/homebrew/lib/ruby/gems/3.4.0/bin:$PATH"
```

Install dependencies:

```bash
bundle install
```

If Bundler is missing:

```bash
gem install bundler -v 2.5.22
```

## Common commands

```bash
# Build the site
npm run build

# Serve locally with live reload
npm run serve

# Clean generated files
npm run clean
```

For validation without touching the checked-in `_site/` directory, build to a temporary path:

```bash
bundle exec jekyll build --destination /tmp/rodrigo-site-build
```

## Structure

| Path | Purpose |
| --- | --- |
| `_config.yml` | Site metadata, domain, plugins, author data, comments, and feed settings |
| `index.html` | Home page content and section links |
| `_pages/` | Main pages such as Research, Practice, Teaching, Projects, About, and Contact |
| `_posts/` | Blog posts using Jekyll frontmatter |
| `_layouts/` | Page, post, archive, and default layout templates |
| `_includes/` | Reusable HTML fragments such as head, comments, post cards, and search |
| `_sass/` | Theme and Bootstrap Sass partials |
| `assets/` | Images, logos, PDFs, JavaScript, fonts, and CSS entrypoint |
| `_site/` | Generated build output; do not edit directly |
| `_Backup/` | Archived site copies; do not edit unless intentionally restoring something |

## Content workflow

- Main page copy: edit files in `_pages/`.
- Homepage copy and buttons: edit `index.html`.
- Blog posts: add Markdown files under `_posts/YYYY-MM-DD-slug.md`.
- Post images: store under `assets/images/` or `assets/images/<post-slug>/`.
- Theme/layout changes: inspect `_layouts/`, `_includes/`, `_sass/theme.scss`, and `assets/js/theme.js` together.

## Deployment

The repository is configured for the custom domain in `CNAME` and `_config.yml`. Deployment is expected to happen through the GitHub Pages / repository hosting flow tied to this public repository.
