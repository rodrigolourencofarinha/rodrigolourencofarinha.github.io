---
layout: default
title: Blog
description: "Articles by Rodrigo Farinha on quantitative marketing, innovation, artificial intelligence, sales, and evidence-based management."
permalink: /blog/
---

<header class="section-intro">
  <h1>Blog</h1>
  <p>Essays on AI, marketing strategy, sales, and how firms make better decisions.</p>
</header>

<!-- Substack posts index -->
<div class="blog-grid-container">
  {% for post in site.data.substack_posts %}
    {% include substack-card.html post=post %}
  {% endfor %}
  {% if site.data.substack_posts == empty %}
    <p>No posts are listed yet. Visit <a href="{{ site.substack_publication_url }}" target="_blank" rel="noopener">Substack</a> for the latest writing.</p>
  {% endif %}
</div>
<p class="text-muted small mt-3">More essays and updates are available on <a href="{{ site.substack_publication_url }}" target="_blank" rel="noopener">Substack</a>.</p>
