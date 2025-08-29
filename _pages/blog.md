---
layout: default
title: Blog
permalink: /blog/
---

<!-- Posts Index -->
<div class="blog-grid-container">
  {% for post in site.posts %}
    {% include postbox.html %}
  {% endfor %}
  {% if site.posts == empty %}
    <p>No posts yet.</p>
  {% endif %}
</div>
