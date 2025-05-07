source "https://rubygems.org"

# Modern Jekyll compatible with Ruby 3.x
gem "jekyll", "~> 4.3.3"

# Required for Ruby 3.x (was separated from standard library)
gem "webrick", "~> 1.7"

# Windows file watcher
gem "wdm", ">= 0.1.0" if Gem.win_platform?

group :jekyll_plugins do
  gem "jekyll-feed"
  gem "jekyll-sitemap"
  gem "jekyll-paginate"
  gem "jekyll-seo-tag"
  gem "jekyll-archives"
  gem "jekyll-figure"

  # Upgrade Bootstrap to latest (v5+)
  gem "bootstrap", "~> 5.3.0"

  # Updated for compatibility with Ruby 3.x and Bootstrap 5
  gem "sassc", "~> 2.4"

  # Recommended for Markdown + syntax highlighting
  gem "kramdown-parser-gfm"
  gem "rouge"
end
