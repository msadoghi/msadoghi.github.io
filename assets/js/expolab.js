(function () {
  'use strict';

  var NAV_SECTIONS = ['intro', 'book', 'press', 'news', 'people', 'pub', 'teach', 'service', 'bio', 'apply', 'sponsors'];
  var FEATURED_NEWS_COUNT = 4;

  function buildAccordionSummary(label, countText) {
    var summary = document.createElement('summary');
    summary.innerHTML =
      '<span class="xl-acc-marker" aria-hidden="true"></span>' +
      '<span class="xl-acc-label">' + label + '</span>' +
      (countText ? '<span class="xl-acc-count">' + countText + '</span>' : '') +
      '<span class="xl-acc-chevron" aria-hidden="true"></span>';
    return summary;
  }

  function wrapAccordionPanel(details) {
    if (details.querySelector('.xl-details-panel')) return;
    var summary = details.querySelector('summary');
    if (!summary) return;
    var children = Array.from(details.children).filter(function (c) {
      return c !== summary;
    });
    if (!children.length) return;
    var panel = document.createElement('div');
    panel.className = 'xl-details-panel';
    var inner = document.createElement('div');
    inner.className = 'xl-details-inner';
    children.forEach(function (c) { inner.appendChild(c); });
    panel.appendChild(inner);
    details.appendChild(panel);
  }

  function initAccordions() {
    document.querySelectorAll('.xl-details, .xl-pub-card').forEach(wrapAccordionPanel);
  }

  /* ── Hero entrance animation ── */
  function initHero() {
    var hero = document.getElementById('top');
    if (!hero || !hero.classList.contains('xl-hero')) return;
    requestAnimationFrame(function () {
      hero.classList.add('is-loaded');
    });
  }

  /* ── Sticky nav visibility ── */
  function initStickyNav() {
    var nav = document.querySelector('.xl-nav');
    var hero = document.querySelector('.xl-hero');
    if (!nav || !hero) return;

    var observer = new IntersectionObserver(
      function (entries) {
        nav.classList.toggle('is-visible', !entries[0].isIntersecting);
      },
      { threshold: 0, rootMargin: '-10% 0px 0px 0px' }
    );
    observer.observe(hero);

    var toggle = nav.querySelector('.xl-nav-toggle');
    var links = nav.querySelector('.xl-nav-links');
    if (toggle && links) {
      toggle.addEventListener('click', function () {
        var open = links.classList.toggle('is-open');
        toggle.setAttribute('aria-expanded', open);
      });
      links.querySelectorAll('a').forEach(function (a) {
        a.addEventListener('click', function () {
          links.classList.remove('is-open');
          toggle.setAttribute('aria-expanded', 'false');
        });
      });
    }
  }

  /* ── Smooth scroll + active nav ── */
  function initNavScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(function (link) {
      link.addEventListener('click', function (e) {
        var id = link.getAttribute('href').slice(1);
        var target = document.getElementById(id);
        if (!target) return;
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        history.replaceState(null, '', '#' + id);
      });
    });

    var navLinks = document.querySelectorAll('.xl-nav-links a');
    if (!navLinks.length) return;

    var sections = NAV_SECTIONS.map(function (id) {
      return document.getElementById(id);
    }).filter(Boolean);

    function setActive() {
      var scrollY = window.scrollY + 120;
      var current = sections[0];
      sections.forEach(function (sec) {
        if (sec.offsetTop <= scrollY) current = sec;
      });
      if (!current) return;
      navLinks.forEach(function (a) {
        a.classList.toggle('is-active', a.getAttribute('href') === '#' + current.id);
      });
    }

    window.addEventListener('scroll', setActive, { passive: true });
    setActive();
  }

  function isWideNewsItem(li) {
    return !!li.querySelector('blockquote, iframe, img, table, .github-button, div[align="center"]');
  }

  function isNewsHighlight(el) {
    var text = el.textContent || '';
    if (el.hasAttribute('data-show')) return true;
    if (el.querySelector('font[color="#3399ff"], font[color="#2471A3"]')) return true;
    if (/Best (Paper|Artifact)|Outstanding Paper|Honorable Mention/i.test(text)) return true;
    if (isWideNewsItem(el)) return true;
    if (/new book|Apache.*Incubat|NSF Award|DOE Award/i.test(text)) return true;
    return false;
  }

  function partitionYearItems(items, featuredSource) {
    var available = items.filter(function (entry) {
      return !featuredSource.has(entry.sourceLi);
    });
    var highlights = available.filter(function (entry) {
      return isNewsHighlight(entry.el);
    });
    var highlightSet = new Set(highlights);
    var rest = available.filter(function (entry) {
      return !highlightSet.has(entry);
    });
    if (!highlights.length && available.length) {
      highlights = [available[0]];
      rest = available.slice(1);
    }
    return { highlights: highlights, rest: rest };
  }

  function stripNewsDatePrefix(html) {
    return html
      .replace(/^(\s|<br\s*\/?>|\s*<br\s*\/?>\s*)*/gi, '')
      .replace(/^\[[A-Za-z]+ \d{1,2}, \d{4}\]\s*/i, '')
      .replace(/^(\s|<br\s*\/?>)*/gi, '');
  }

  function buildNewsCard(item, extraClass) {
    var card = document.createElement('article');
    card.className = 'xl-news-card' + (extraClass ? ' ' + extraClass : '');

    if (item.date) {
      var header = document.createElement('header');
      header.className = 'xl-news-card-header';
      var dateEl = document.createElement('time');
      dateEl.className = 'xl-news-date';
      dateEl.setAttribute('datetime', item.date);
      dateEl.textContent = item.date;
      header.appendChild(dateEl);
      card.appendChild(header);
    }

    var body = document.createElement('div');
    body.className = 'xl-news-card-body xl-prose';
    body.innerHTML = stripNewsDatePrefix(item.el.innerHTML);
    card.appendChild(body);
    return card;
  }

  /* ── News: group by year + featured strip ── */
  function initNews() {
    var section = document.getElementById('news');
    if (!section || section.dataset.xlProcessed) return;

    var sourceList = section.querySelector('.xl-news-source');
    if (!sourceList) return;

    var items = Array.from(sourceList.children).filter(function (n) {
      return n.tagName === 'LI';
    });
    if (!items.length) return;

    var featured = [];
    var featuredSource = new Set();
    var byYear = {};

    items.forEach(function (li) {
      var text = li.textContent || '';
      var match = text.match(/\[([A-Za-z]+ \d{1,2}, (\d{4}))\]/);
      var year = match ? match[2] : 'Other';
      var dateStr = match ? match[1] : '';
      var entry = { el: li.cloneNode(true), date: dateStr, year: year, sourceLi: li };

      if (li.hasAttribute('data-show') && featured.length < FEATURED_NEWS_COUNT) {
        featured.push(entry);
        featuredSource.add(li);
      }

      if (!byYear[year]) byYear[year] = [];
      byYear[year].push(entry);
    });

    var container = document.createElement('div');
    container.className = 'xl-news-transformed';

    if (featured.length) {
      var featLabel = document.createElement('div');
      featLabel.className = 'xl-news-featured-label';
      featLabel.textContent = 'Latest';
      container.appendChild(featLabel);

      var featWrap = document.createElement('div');
      featWrap.className = 'xl-news-featured';
      featured.forEach(function (item) {
        var wide = isWideNewsItem(item.el);
        var cls = 'xl-news-card--featured' + (wide ? ' xl-news-card--wide' : '');
        featWrap.appendChild(buildNewsCard(item, cls));
      });
      container.appendChild(featWrap);
    }

    var years = Object.keys(byYear).sort(function (a, b) {
      if (a === 'Other') return 1;
      if (b === 'Other') return -1;
      return parseInt(b, 10) - parseInt(a, 10);
    });

    var timelineLabel = document.createElement('div');
    timelineLabel.className = 'xl-news-timeline-label';
    timelineLabel.textContent = 'Timeline';

    var timeline = document.createElement('div');
    timeline.className = 'xl-news-timeline';

    years.forEach(function (year) {
      var partitioned = partitionYearItems(byYear[year], featuredSource);
      if (!partitioned.highlights.length && !partitioned.rest.length) return;

      var block = document.createElement('div');
      block.className = 'xl-year-block';
      block.setAttribute('data-year', year);

      var yearHeading = document.createElement('h3');
      yearHeading.className = 'xl-year-label';
      yearHeading.textContent = year === 'Other' ? 'Archive' : year;
      block.appendChild(yearHeading);

      if (partitioned.highlights.length) {
        var highlightsWrap = document.createElement('div');
        highlightsWrap.className = 'xl-year-highlights';
        partitioned.highlights.forEach(function (item) {
          highlightsWrap.appendChild(buildNewsCard(item, 'xl-news-card--highlight'));
        });
        block.appendChild(highlightsWrap);
      }

      if (partitioned.rest.length) {
        var details = document.createElement('details');
        details.className = 'xl-details xl-acc xl-year-more';
        var yearName = year === 'Other' ? 'archive' : year;
        var moreLabel = partitioned.rest.length + (partitioned.rest.length === 1 ? ' more update' : ' more updates') +
          ' from ' + yearName;
        details.appendChild(buildAccordionSummary(moreLabel, null));

        var body = document.createElement('div');
        body.className = 'xl-details-body';
        partitioned.rest.forEach(function (item) {
          var card = buildNewsCard(item);
          card.style.marginBottom = '0.75rem';
          body.appendChild(card);
        });
        details.appendChild(body);
        block.appendChild(details);
      }

      timeline.appendChild(block);
    });

    if (timeline.children.length) {
      container.appendChild(timelineLabel);
      container.appendChild(timeline);
    }

    sourceList.parentElement.replaceChild(container, sourceList);
    section.dataset.xlProcessed = 'true';
  }

  /* ── Publications → full citation cards (preserve authors, links, awards) ── */
  function initPublications() {
    var section = document.getElementById('pub');
    if (!section || section.dataset.xlProcessed) return;

    var sourceList = section.querySelector('.xl-pub-source');
    if (!sourceList) return;

    var items = Array.from(sourceList.children).filter(function (n) {
      return n.tagName === 'LI';
    });
    if (!items.length) return;

    var wrap = document.createElement('div');
    wrap.className = 'xl-pub-list';

    var hidden = [];

    items.forEach(function (li) {
      var entry = document.createElement('article');
      entry.className = 'xl-pub-entry xl-prose';
      entry.innerHTML = li.innerHTML;

      if (!li.hasAttribute('data-show')) {
        entry.classList.add('xl-pub-hidden');
        hidden.push(entry);
      }

      wrap.appendChild(entry);
    });

    if (hidden.length) {
      var toggle = document.createElement('button');
      toggle.type = 'button';
      toggle.className = 'xl-pub-toggle';
      toggle.textContent = 'Show ' + hidden.length + ' more \u25be';
      var open = false;
      toggle.addEventListener('click', function () {
        open = !open;
        hidden.forEach(function (entry) {
          entry.classList.toggle('xl-pub-hidden', !open);
        });
        toggle.textContent = open
          ? 'Show less \u25b4'
          : 'Show ' + hidden.length + ' more \u25be';
      });
      wrap.appendChild(toggle);
    }

    sourceList.parentElement.replaceChild(wrap, sourceList);
    section.dataset.xlProcessed = 'true';
  }

  /* ── Publications page → full citation cards per category ── */
  function initPubPage() {
    if (document.getElementById('pub')) return;

    document.querySelectorAll('.xl-pub-category').forEach(function (category) {
      if (category.dataset.xlProcessed) return;

      var cards = Array.from(category.querySelectorAll(':scope > details.xl-pub-card'));
      if (!cards.length) return;

      var list = document.createElement('div');
      list.className = 'xl-pub-list';

      cards.forEach(function (card) {
        var links = card.querySelector('.xl-pub-links');
        var entry = document.createElement('article');
        entry.className = 'xl-pub-entry xl-prose';
        entry.innerHTML = links ? links.innerHTML : '';
        list.appendChild(entry);
        card.remove();
      });

      category.appendChild(list);

      var heading = category.querySelector('h2');
      if (heading && !heading.querySelector('.xl-pub-count')) {
        var count = document.createElement('span');
        count.className = 'xl-pub-count';
        count.textContent = cards.length + (cards.length === 1 ? ' publication' : ' publications');
        heading.appendChild(count);
      }

      category.dataset.xlProcessed = 'true';
    });
  }

  /* ── Press: open editorial entries + archive accordion ── */
  function buildPressEntry(li) {
    var article = document.createElement('article');
    article.className = 'xl-press-entry';
    var body = document.createElement('div');
    body.className = 'xl-press-entry-content xl-prose';
    body.innerHTML = li.innerHTML;
    article.appendChild(body);
    return article;
  }

  function initPress() {
    var section = document.getElementById('press');
    if (!section || section.dataset.xlProcessed) return;

    var sourceList = section.querySelector('.xl-press-source');
    if (!sourceList) return;

    var items = Array.from(sourceList.children).filter(function (n) {
      return n.tagName === 'LI';
    });
    if (!items.length) return;

    var featured = [];
    var archive = [];

    items.forEach(function (li) {
      if (li.hasAttribute('data-show')) {
        featured.push(li);
      } else {
        archive.push(li);
      }
    });

    var wrap = document.createElement('div');
    wrap.className = 'xl-press-transformed';

    if (featured.length) {
      var featWrap = document.createElement('div');
      featWrap.className = 'xl-press-featured';
      featured.forEach(function (li) {
        featWrap.appendChild(buildPressEntry(li));
      });
      wrap.appendChild(featWrap);
    }

    if (archive.length) {
      var details = document.createElement('details');
      details.className = 'xl-details xl-acc xl-press-archive';
      var countText = archive.length + (archive.length === 1 ? ' item' : ' items');
      details.appendChild(buildAccordionSummary('Earlier Press Coverage', countText));

      var body = document.createElement('div');
      body.className = 'xl-details-body xl-press-archive-body';

      archive.forEach(function (li) {
        body.appendChild(buildPressEntry(li));
      });

      details.appendChild(body);
      wrap.appendChild(details);
    }

    sourceList.parentElement.replaceChild(wrap, sourceList);
    section.dataset.xlProcessed = 'true';
  }

  function parseMemberLi(li) {
    var html = li.innerHTML;
    var text = li.textContent || '';
    var link = li.querySelector('a');
    var rawName = link ? link.textContent.trim() : text.split(':')[0].trim();
    var name = rawName.replace(/\s*\([^)]*\)\s*$/, '').trim();
    var roleMatch = html.match(/\((Ph\.D\. Candidate|M\.Sc\. Candidate|B\.Sc\. Candidate)([^)]*)\)/i);
    var role = roleMatch ? roleMatch[1] : 'Member';
    var extraMeta = roleMatch && roleMatch[2] ? roleMatch[2].replace(/^,\s*/, '').trim() : '';
    var projectMatch = html.match(/Candidate[^)]*\):\s*([^<]+)/i) ||
      html.match(/\):\s*([^<]+)/);
    var project = projectMatch ? projectMatch[1].trim() : '';
    return { link: link, name: name, role: role, extraMeta: extraMeta, project: project };
  }

  function buildPersonCard(parsed) {
    var card = document.createElement('article');
    card.className = 'xl-person-card';

    var nameEl = document.createElement('h4');
    nameEl.className = 'xl-person-name';
    if (parsed.link) {
      var anchor = document.createElement('a');
      anchor.href = parsed.link.href;
      anchor.target = '_blank';
      anchor.rel = 'noopener';
      anchor.textContent = parsed.name;
      nameEl.appendChild(anchor);
    } else {
      nameEl.textContent = parsed.name;
    }
    card.appendChild(nameEl);

    var roleEl = document.createElement('span');
    roleEl.className = 'xl-person-role';
    roleEl.textContent = parsed.role;
    card.appendChild(roleEl);

    if (parsed.project) {
      var projectEl = document.createElement('p');
      projectEl.className = 'xl-person-project';
      projectEl.textContent = parsed.project;
      card.appendChild(projectEl);
    }

    if (parsed.extraMeta) {
      var details = document.createElement('details');
      details.className = 'xl-person-more';
      var summary = document.createElement('summary');
      summary.textContent = 'Details';
      details.appendChild(summary);
      var body = document.createElement('div');
      body.className = 'xl-prose';
      body.innerHTML = parsed.extraMeta;
      details.appendChild(body);
      card.appendChild(details);
    }

    return card;
  }

  function buildAlumniListItem(li) {
    var item = document.createElement('li');
    item.className = 'xl-alumni-entry xl-prose';
    item.innerHTML = li.innerHTML;
    return item;
  }

  function buildAlumniCard(group) {
    var title = group.dataset.groupTitle || 'Alumni';
    var items = Array.from(group.querySelectorAll('li')).filter(function (li) {
      return li.textContent.trim();
    });
    var previewItems = items.slice(0, 2);
    var moreItems = items.slice(2);

    var card = document.createElement('article');
    card.className = 'xl-alumni-card';

    var header = document.createElement('header');
    header.className = 'xl-alumni-card-header';
    var titleEl = document.createElement('h4');
    titleEl.className = 'xl-alumni-card-title';
    titleEl.textContent = title;
    var countEl = document.createElement('span');
    countEl.className = 'xl-alumni-card-count';
    countEl.textContent = items.length + (items.length === 1 ? ' person' : ' people');
    header.appendChild(titleEl);
    header.appendChild(countEl);
    card.appendChild(header);

    if (previewItems.length) {
      var preview = document.createElement('ul');
      preview.className = 'xl-alumni-entries xl-alumni-entries--preview';
      previewItems.forEach(function (li) {
        preview.appendChild(buildAlumniListItem(li));
      });
      card.appendChild(preview);
    }

    if (moreItems.length) {
      var details = document.createElement('details');
      details.className = 'xl-details xl-acc xl-acc--people xl-alumni-more';
      var moreLabel = moreItems.length + (moreItems.length === 1 ? ' more person' : ' more people');
      details.appendChild(buildAccordionSummary(moreLabel, null));

      var body = document.createElement('div');
      body.className = 'xl-details-body';
      var list = document.createElement('ul');
      list.className = 'xl-alumni-entries';
      moreItems.forEach(function (li) {
        list.appendChild(buildAlumniListItem(li));
      });
      body.appendChild(list);
      details.appendChild(body);
      card.appendChild(details);
    }

    return card;
  }

  /* ── People: member cards + alumni accordions ── */
  function initPeople() {
    var section = document.getElementById('people');
    if (!section || section.dataset.xlProcessed) return;

    var members = section.querySelector('.xl-members-source');
    var alumniGroups = section.querySelectorAll('.xl-alumni-group');

    if (members) {
      var grid = document.createElement('div');
      grid.className = 'xl-people-grid';

      Array.from(members.querySelectorAll(':scope > li')).forEach(function (li) {
        if (!li.textContent.trim()) return;
        grid.appendChild(buildPersonCard(parseMemberLi(li)));
      });

      var membersHeading = members.previousElementSibling;
      if (membersHeading && membersHeading.tagName === 'H4') {
        membersHeading.remove();
      }
      members.parentElement.replaceChild(grid, members);
    }

    if (alumniGroups.length) {
      var alumniWrap = document.createElement('div');
      alumniWrap.className = 'xl-alumni-section';
      var anchor = alumniGroups[0];

      alumniGroups.forEach(function (group) {
        alumniWrap.appendChild(buildAlumniCard(group));
      });

      anchor.parentElement.insertBefore(alumniWrap, anchor);
      alumniGroups.forEach(function (group) {
        group.remove();
      });
    }

    section.dataset.xlProcessed = 'true';
  }

  /* ── Teaching: structured course cards ── */
  function normalizeCourseOfferings(container) {
    var html = container.innerHTML.replace(/^(\s*<br\s*\/?>\s*)+/i, '');
    var blocks = html.split(/<br\s*\/?>\s*(?=<b[^>]*>(?:ECS|First-year))/i);

    container.innerHTML = '';
    blocks.forEach(function (blockHtml) {
      blockHtml = blockHtml.trim();
      if (!blockHtml) return;

      var labelMatch = blockHtml.match(/^<b[^>]*>([\s\S]*?)<\/b>\s*:\s*/i);
      if (!labelMatch) return;

      var labelText = labelMatch[1].replace(/<[^>]+>/g, '').trim();
      var restHtml = blockHtml.slice(labelMatch[0].length).trim();

      var block = document.createElement('div');
      block.className = 'xl-course-offering-block';

      var label = document.createElement('div');
      label.className = 'xl-course-offering-label';
      label.textContent = labelText + ':';
      block.appendChild(label);

      var links = document.createElement('div');
      links.className = 'xl-course-offering-links';
      links.innerHTML = restHtml.replace(/>\s*,\s*/g, '>');

      var toggle = links.querySelector('.inline-more-toggle');
      var moreContent = links.querySelector('.inline-more-content');
      if (toggle) {
        toggle.remove();
        links.appendChild(toggle);

        // Moving the toggle to the end breaks its original inline onclick,
        // which relied on previousElementSibling being the hidden content.
        // Rewire it to toggle the .inline-more-content in this block.
        toggle.removeAttribute('onclick');
        toggle.addEventListener('click', function (e) {
          e.preventDefault();
          if (!moreContent) return;
          var willShow = moreContent.style.display !== 'inline';
          moreContent.style.display = willShow ? 'inline' : 'none';
          toggle.textContent = willShow ? ' show less \u25b4' : ' show more \u25be';
        });
      }

      block.appendChild(links);
      container.appendChild(block);
    });
  }

  function buildCourseCard(li) {
    var card = document.createElement('article');
    card.className = 'xl-course-card';
    if (!li.hasAttribute('data-show')) {
      card.classList.add('xl-course-hidden');
    }

    var h3 = li.querySelector('h3');
    var p = li.querySelector('p');
    var btn = li.querySelector('a.button, a.xl-btn');
    var bottom = document.createElement('div');
    bottom.className = 'xl-course-bottom';

    var h3Text = h3.innerHTML;
    var termMatch = h3Text.match(/^([^<]+)<br\s*\/?>/i);
    var term = termMatch ? termMatch[1].trim() : '';
    var titleHtml = termMatch
      ? h3Text.replace(/^[^<]+<br\s*\/?>\s*/i, '').trim()
      : h3Text.trim();

    if (term) {
      var termEl = document.createElement('div');
      termEl.className = 'xl-course-term';
      termEl.textContent = term;
      card.appendChild(termEl);
    }

    var titleEl = document.createElement('h3');
    titleEl.className = 'xl-course-title';
    titleEl.innerHTML = titleHtml;
    card.appendChild(titleEl);

    if (p) {
      var pHtml = p.innerHTML;
      var pastIdx = pHtml.search(/\[Past offerings:/i);

      if (pastIdx !== -1) {
        var descHtml = pHtml.slice(0, pastIdx).trim();
        var archiveMatch = pHtml.slice(pastIdx).match(/\[Past offerings:\s*([\s\S]*?)\]/i);

        if (descHtml) {
          var desc = document.createElement('div');
          desc.className = 'xl-course-desc xl-prose';
          desc.innerHTML = descHtml;
          card.appendChild(desc);
        }

        if (archiveMatch) {
          var archiveHtml = archiveMatch[1].trim().replace(/>\s*,\s*/g, '>');
          var archive = document.createElement('div');
          archive.className = 'xl-course-archive';
          archive.innerHTML =
            '<span class="xl-course-archive-label">Past offerings</span>' +
            '<div class="xl-course-archive-links">' + archiveHtml + '</div>';
          bottom.appendChild(archive);
        }
      } else {
        var offeringsMatch = pHtml.match(
          /^([\s\S]*?)(<br>\s*<b[^>]*>(?:ECS|First-year)[\s\S]*)$/i
        );

        if (offeringsMatch) {
          var descBlock = offeringsMatch[1].trim();
          if (descBlock) {
            var descEl = document.createElement('div');
            descEl.className = 'xl-course-desc xl-prose';
            descEl.innerHTML = descBlock;
            card.appendChild(descEl);
          }

          var offerings = document.createElement('div');
          offerings.className = 'xl-course-offerings xl-prose';
          offerings.innerHTML = offeringsMatch[2];
          normalizeCourseOfferings(offerings);
          bottom.appendChild(offerings);
        } else {
          var fullDesc = document.createElement('div');
          fullDesc.className = 'xl-course-desc xl-prose';
          fullDesc.innerHTML = pHtml;
          card.appendChild(fullDesc);
        }
      }
    }

    if (btn) {
      var footer = document.createElement('div');
      footer.className = 'xl-course-footer';
      var newBtn = document.createElement('a');
      newBtn.className = 'xl-btn';
      newBtn.href = btn.href;
      newBtn.target = btn.target || '_blank';
      newBtn.textContent = btn.textContent.trim() || 'Course Website';
      footer.appendChild(newBtn);
      bottom.appendChild(footer);
    }

    if (bottom.childNodes.length) {
      card.appendChild(bottom);
    }

    return card;
  }

  function initTeaching() {
    var section = document.getElementById('teach');
    if (!section || section.dataset.xlProcessed) return;

    section.querySelectorAll('.xl-course-source').forEach(function (ul) {
      var grid = document.createElement('div');
      grid.className = 'xl-course-grid';
      var hidden = [];

      Array.from(ul.querySelectorAll(':scope > li')).forEach(function (li) {
        if (!li.querySelector('h3')) return;
        var card = buildCourseCard(li);
        if (card.classList.contains('xl-course-hidden')) {
          hidden.push(card);
        }
        grid.appendChild(card);
      });

      if (hidden.length) {
        var toggle = document.createElement('button');
        toggle.type = 'button';
        toggle.className = 'xl-course-toggle';
        toggle.textContent = 'Show ' + hidden.length + ' more \u25be';
        var open = false;
        toggle.addEventListener('click', function () {
          open = !open;
          hidden.forEach(function (c) {
            c.classList.toggle('xl-course-hidden', !open);
          });
          toggle.textContent = open
            ? 'Show less \u25b4'
            : 'Show ' + hidden.length + ' more \u25be';
        });
        grid.appendChild(toggle);
      }

      ul.parentElement.replaceChild(grid, ul);
    });

    section.dataset.xlProcessed = 'true';
  }

  /* ── Service: wrap h3 groups in accordions ── */
  function initService() {
    var section = document.getElementById('service');
    if (!section || section.dataset.xlProcessed) return;

    var row = section.querySelector('.xl-service-source');
    if (!row) {
      row = section.querySelector('.xl-container > .xl-prose');
    }
    if (!row) return;

    var h3s = row.querySelectorAll(':scope > h3');
    if (!h3s.length) return;

    var wrap = document.createElement('div');

    h3s.forEach(function (h3) {
      var details = document.createElement('details');
      details.className = 'xl-details xl-acc xl-acc--service';
      if (h3.textContent.indexOf('Organizing') >= 0) details.open = true;

      details.appendChild(buildAccordionSummary(h3.textContent, null));

      var body = document.createElement('div');
      body.className = 'xl-details-body xl-prose';

      var el = h3.nextElementSibling;
      while (el && el.tagName !== 'H3') {
        body.appendChild(el.cloneNode(true));
        el = el.nextElementSibling;
      }

      details.appendChild(body);
      wrap.appendChild(details);
    });

    row.innerHTML = '';
    row.appendChild(wrap);
    section.dataset.xlProcessed = 'true';
  }

  /* ── Legacy list show-more (fallback for unmigrated lists) ── */
  function initListToggle() {
    var LIMIT = 5;
    document.querySelectorAll('.xl-prose ul, section ul').forEach(function (ul) {
      if (ul.classList.contains('xl-nav-links') || ul.classList.contains('xl-alumni-entries')) return;
      if (ul.closest('.xl-news-transformed, .xl-pub-list, .xl-person-card')) return;

      var items = Array.from(ul.children).filter(function (n) {
        return n.tagName === 'LI';
      });
      if (items.length === 0) return;

      var hasPinned = items.some(function (li) {
        return li.hasAttribute('data-show');
      });

      var hidden;
      if (hasPinned) {
        hidden = items.filter(function (li) { return !li.hasAttribute('data-show'); });
      } else {
        if (items.length <= LIMIT) return;
        hidden = items.slice(LIMIT);
      }

      if (hidden.length === 0) return;
      hidden.forEach(function (li) { li.classList.add('collapsed-item'); });

      var toggle = document.createElement('li');
      toggle.className = 'list-toggle';
      var link = document.createElement('a');
      link.href = '#';
      link.className = 'list-toggle-link';
      link.textContent = 'Show ' + hidden.length + ' more \u25be';
      var open = false;
      link.addEventListener('click', function (e) {
        e.preventDefault();
        open = !open;
        hidden.forEach(function (li) { li.classList.toggle('collapsed-item', !open); });
        link.textContent = open ? 'Show less \u25b4' : 'Show ' + hidden.length + ' more \u25be';
      });
      toggle.appendChild(link);
      ul.appendChild(toggle);
    });
  }

  /* ── Publications page filter nav ── */
  function initPubPageNav() {
    var nav = document.querySelector('.xl-pub-page-nav');
    if (!nav) return;

    var links = nav.querySelectorAll('a');
    var sections = Array.from(links).map(function (a) {
      var id = a.getAttribute('href').slice(1);
      return { link: a, el: document.getElementById(id) };
    }).filter(function (s) { return s.el; });

    function highlight() {
      var scrollY = window.scrollY + 140;
      var current = sections[0];
      sections.forEach(function (s) {
        if (s.el.offsetTop <= scrollY) current = s;
      });
      sections.forEach(function (s) {
        s.link.classList.toggle('is-active', s === current);
      });
    }

    window.addEventListener('scroll', highlight, { passive: true });
    highlight();
  }

  function init() {
    initHero();
    initStickyNav();
    initNavScroll();
    initNews();
    initPublications();
    initPubPage();
    initPress();
    initPeople();
    initTeaching();
    initService();
    initListToggle();
    initPubPageNav();
    initAccordions();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
