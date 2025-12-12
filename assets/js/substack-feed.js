// Pull Substack RSS via rss2json.com and render it with the existing card layout
(function () {
  const stripHtml = (html) => {
    const temp = document.createElement('div');
    temp.innerHTML = html || '';
    return temp.textContent || temp.innerText || '';
  };

  const truncateWords = (text, limit = 30) => {
    const words = (text || '').trim().split(/\s+/);
    if (!words[0]) return '';
    if (words.length <= limit) return words.join(' ');
    return `${words.slice(0, limit).join(' ')}…`;
  };

  const formatDate = (input) => {
    if (!input) return '';
    const normalized = input.includes('T') ? input : input.replace(' ', 'T');
    const date = new Date(normalized.endsWith('Z') ? normalized : `${normalized}Z`);
    if (Number.isNaN(date.getTime())) return '';
    return date.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
  };

  const pickImage = (item) => item?.thumbnail || (item.enclosure && item.enclosure.link) || '';

  const buildCard = (item, opts) => {
    const image = pickImage(item);
    const cardWrapper = document.createElement('div');
    cardWrapper.className = 'blog-grid-item';

    const card = document.createElement('div');
    card.className = 'card h-100';
    cardWrapper.appendChild(card);

    const thumb = document.createElement('div');
    thumb.className = 'maxthumb';
    if (image) {
      const link = document.createElement('a');
      link.href = item.link;
      link.target = '_blank';
      link.rel = 'noopener noreferrer';

      const img = document.createElement('img');
      img.className = 'img-thumb';
      img.src = image;
      img.loading = 'lazy';
      img.alt = item.title || 'Substack post';

      link.appendChild(img);
      thumb.appendChild(link);
    }
    card.appendChild(thumb);

    const body = document.createElement('div');
    body.className = 'card-body';

    const title = document.createElement('h2');
    title.className = 'card-title';

    const titleLink = document.createElement('a');
    titleLink.className = 'text-dark';
    titleLink.href = item.link;
    titleLink.target = '_blank';
    titleLink.rel = 'noopener noreferrer';
    titleLink.textContent = item.title || 'Untitled';

    title.appendChild(titleLink);
    body.appendChild(title);

    const excerptText = truncateWords(stripHtml(item.description || item.content || ''), 30);
    if (excerptText) {
      const excerpt = document.createElement('h4');
      excerpt.className = 'card-text';
      excerpt.textContent = excerptText;
      body.appendChild(excerpt);
    }

    card.appendChild(body);

    const footer = document.createElement('div');
    footer.className = 'card-footer bg-white';

    const wrap = document.createElement('div');
    wrap.className = 'wrapfooter';

    if (opts.authorAvatar) {
      const avatarWrap = document.createElement('span');
      avatarWrap.className = 'meta-footer-thumb';

      const avatar = document.createElement('img');
      avatar.className = 'author-thumb';
      avatar.src = opts.authorAvatar;
      avatar.alt = opts.authorName || 'Author';

      avatarWrap.appendChild(avatar);
      wrap.appendChild(avatarWrap);
    }

    const authorMeta = document.createElement('span');
    authorMeta.className = 'author-meta';

    if (opts.authorName) {
      const name = document.createElement('span');
      name.className = 'post-name font-weight-bold';
      name.textContent = opts.authorName;
      authorMeta.appendChild(name);
      authorMeta.appendChild(document.createTextNode(' '));
    }

    const date = document.createElement('span');
    date.className = 'post-date';
    date.textContent = formatDate(item.pubDate);
    authorMeta.appendChild(date);

    wrap.appendChild(authorMeta);
    wrap.appendChild(Object.assign(document.createElement('div'), { className: 'clearfix' }));

    footer.appendChild(wrap);
    card.appendChild(footer);

    return cardWrapper;
  };

  const renderError = (container, substackHome) => {
    const link = substackHome || '#';
    container.innerHTML = `<p class="text-muted">Can't load Substack right now. <a href="${link}" target="_blank" rel="noopener">Open on Substack</a>.</p>`;
  };

  document.addEventListener('DOMContentLoaded', () => {
    const containers = document.querySelectorAll('[data-substack-feed]');
    if (!containers.length) return;

    containers.forEach((container) => {
      const feedUrl = container.dataset.substackFeed;
      if (!feedUrl) return;

      const maxPosts = parseInt(container.dataset.maxPosts || '6', 10);
      const authorName = container.dataset.authorName || '';
      const authorAvatar = container.dataset.authorAvatar || '';
      const substackHome = container.dataset.substackHome || feedUrl.replace(/\/feed\/?$/, '');

      container.innerHTML = '<p class="text-muted">Loading Substack posts...</p>';

      // Add a light cache-buster so rss2json picks up recent Substack changes (rolls every 10 minutes)
      const cacheKey = Math.floor(Date.now() / 600000); // 10-minute bucket
      const apiUrl = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(feedUrl)}&_=${cacheKey}`;

      fetch(apiUrl)
        .then((response) => {
          if (!response.ok) throw new Error(`HTTP ${response.status}`);
          return response.json();
        })
        .then((data) => {
          if (!data || !Array.isArray(data.items) || !data.items.length) {
            throw new Error('No posts found in feed');
          }

          container.innerHTML = '';
          data.items.slice(0, maxPosts).forEach((item) => {
            container.appendChild(buildCard(item, { authorName, authorAvatar }));
          });
        })
        .catch((error) => {
          console.error('Substack feed error:', error);
          renderError(container, substackHome);
        });
    });
  });
})();
