---
layout: default
title: Blog
permalink: /blog/
---

<!-- Posts Index -->
{% if site.substack_feed_url and site.substack_feed_url != '' %}
<div id="substack-feed"
     class="blog-grid-container"
     data-substack-feed="{{ site.substack_feed_url }}"
     data-substack-home="{{ site.substack_publication_url | default: site.substack_feed_url | replace:'/feed','' }}"
     data-max-posts="30"
     data-author-name="{{ site.authors.rodrigo.display_name | default: site.name }}"
     data-author-avatar="{% if site.authors.rodrigo.avatar %}{{ site.baseurl }}/{{ site.authors.rodrigo.avatar }}{% endif %}">
</div>
<p class="text-muted small mt-3">Pulling latest posts from <a href="https://rodrigofarinha.substack.com/" target="_blank" rel="noopener">my Substack</a>. <noscript>Enable JavaScript or visit <a href="{{ site.substack_publication_url | default: site.substack_feed_url | replace:'/feed','' }}">Substack</a>.</noscript></p>
{% else %}
  <div class="blog-grid-container">
    {% for post in site.posts %}
      {% include postbox.html %}
    {% endfor %}
    {% if site.posts == empty %}
      <p>No posts yet.</p>
    {% endif %}
  </div>
{% endif %}
