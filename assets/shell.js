(function () {
  'use strict';

  const NAV_ITEMS = [
    {
      id: 'knowledge', href: '/knowledge.html', label: '知识管理',
      icon: '<path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>'
    },
    {
      id: 'tracing', href: '/tracing.html', label: '链路追踪',
      icon: '<polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline>'
    },
  ];

  function icon(inner) {
    return `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${inner}</svg>`;
  }

  function renderSidebar(pageId) {
    var mount = document.getElementById('sidebar-mount');
    if (!mount) return;

    var navHtml = NAV_ITEMS.map(function (item) {
      var cls = item.id === pageId ? 'nav-item active' : 'nav-item';
      return '<a class="' + cls + '" href="' + item.href + '">' + icon(item.icon) + item.label + '</a>';
    }).join('');

    mount.innerHTML =
      '<nav class="nav-sidebar">' +
        '<div class="nav-brand">RAG Console</div>' +
        '<div class="nav-items">' + navHtml + '</div>' +
        '<div class="nav-footer">' +
          '<a class="nav-back-link" href="/chat/index.html">' +
            icon('<polyline points="15 18 9 12 15 6"></polyline>') +
            '返回对话' +
          '</a>' +
          '<div class="nav-health">' +
            '<span class="nav-health-dot" id="nav-health-dot"></span>' +
            '<span id="nav-health-text">检查中...</span>' +
          '</div>' +
        '</div>' +
      '</nav>';

    checkHealth();
  }

  // Demo 模式：mock 健康检查
  function checkHealth() {
    var dot  = document.getElementById('nav-health-dot');
    var text = document.getElementById('nav-health-text');
    if (dot)  dot.className  = 'nav-health-dot ok';
    if (text) text.textContent = 'Demo 模式';
  }

  var _customSelectDocBound = false;

  function closeAllCustomSelects() {
    document.querySelectorAll('.custom-select.open').forEach(function (el) {
      el.classList.remove('open');
    });
  }

  function initCustomSelects() {
    document.querySelectorAll('select').forEach(function (select) {
      if (select.dataset.csInited === '1') return;
      if (select.closest('.custom-select')) return;

      var wrap = document.createElement('div');
      wrap.className = 'custom-select';

      var inlineStyle = select.getAttribute('style');
      if (inlineStyle) {
        wrap.setAttribute('style', inlineStyle);
      }

      var selectedOpt = select.options[select.selectedIndex];
      var trigger = document.createElement('div');
      trigger.className = 'cs-trigger';
      trigger.innerHTML =
        '<span class="cs-value">' + (selectedOpt ? selectedOpt.text : '') + '</span>' +
        '<svg width="10" height="10" viewBox="0 0 10 10" fill="none">' +
          '<path d="M2 3.5L5 6.5L8 3.5" stroke="currentColor" stroke-width="1.2" stroke-linecap="round"></path>' +
        '</svg>';

      var dropdown = document.createElement('div');
      dropdown.className = 'cs-dropdown';

      Array.from(select.options).forEach(function (opt) {
        if (opt.disabled) return;
        var item = document.createElement('div');
        item.className = 'cs-option' + (opt.selected ? ' selected' : '');
        item.textContent = opt.text;
        item.dataset.value = opt.value;
        item.onclick = function () {
          var valueEl = wrap.querySelector('.cs-value');
          if (valueEl) valueEl.textContent = opt.text;
          dropdown.querySelectorAll('.cs-option').forEach(function (o) {
            o.classList.toggle('selected', o.dataset.value === opt.value);
          });
          select.value = opt.value;
          select.dispatchEvent(new Event('change'));
          wrap.classList.remove('open');
        };
        dropdown.appendChild(item);
      });

      trigger.onclick = function (e) {
        e.stopPropagation();
        var isOpen = wrap.classList.contains('open');
        closeAllCustomSelects();
        if (!isOpen) wrap.classList.add('open');
      };

      select.addEventListener('change', function () {
        var current = select.options[select.selectedIndex];
        var valueEl = wrap.querySelector('.cs-value');
        if (valueEl) valueEl.textContent = current ? current.text : '';
        dropdown.querySelectorAll('.cs-option').forEach(function (o) {
          o.classList.toggle('selected', o.dataset.value === select.value);
        });
      });

      select.dataset.csInited = '1';
      select.style.display = 'none';

      wrap.appendChild(trigger);
      wrap.appendChild(dropdown);
      select.parentNode.insertBefore(wrap, select);
      wrap.appendChild(select);
    });

    if (!_customSelectDocBound) {
      document.addEventListener('click', function () {
        closeAllCustomSelects();
      });
      _customSelectDocBound = true;
    }
  }

  // Demo 模式：mock API Key 显示
  function renderApiBadge() {
    var el = document.getElementById('api-key-badge');
    if (el) el.textContent = 'API Key: Demo';
  }

  function bootstrap() {
    var pageId = document.body.getAttribute('data-page') || '';
    renderSidebar(pageId);
    renderApiBadge();
    initCustomSelects();
  }

  window.RagShell = {
    refreshApiBadge: renderApiBadge,
    initCustomSelects: initCustomSelects,
  };
  window.addEventListener('DOMContentLoaded', bootstrap);
})();
