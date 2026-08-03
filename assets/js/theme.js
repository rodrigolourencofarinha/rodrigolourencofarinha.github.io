(function () {
  "use strict";

  function preferredTheme() {
    try {
      var stored = localStorage.getItem("theme");
      if (stored === "light" || stored === "dark") return stored;
    } catch (error) {}

    return window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  }

  function syncGiscus(theme) {
    var iframe = document.querySelector("iframe.giscus-frame");
    if (!iframe || !iframe.contentWindow) return false;

    iframe.contentWindow.postMessage(
      { giscus: { setConfig: { theme: theme } } },
      "https://giscus.app"
    );
    return true;
  }

  function updateThemeButton(theme) {
    var button = document.getElementById("theme-toggle");
    if (!button) return;

    var isDark = theme === "dark";
    button.textContent = isDark ? "☀️" : "🌙";
    button.setAttribute("aria-label", isDark ? "Switch to light mode" : "Switch to dark mode");
    button.setAttribute("title", isDark ? "Switch to light mode" : "Switch to dark mode");
  }

  function applyTheme(theme) {
    document.documentElement.classList.toggle("dark", theme === "dark");
    try {
      localStorage.setItem("theme", theme);
    } catch (error) {}
    updateThemeButton(theme);
    syncGiscus(theme);
  }

  document.addEventListener("DOMContentLoaded", function () {
    var theme = preferredTheme();
    var themeButton = document.getElementById("theme-toggle");
    var navigationButton = document.querySelector(".nav-icon");
    var menu = document.getElementById("menu");
    var overlay = document.getElementById("blackover-nav");

    updateThemeButton(theme);

    if (themeButton) {
      themeButton.addEventListener("click", function () {
        applyTheme(document.documentElement.classList.contains("dark") ? "light" : "dark");
      });
    }

    if (navigationButton && menu && overlay) {
      var setNavigationOpen = function (open, returnFocus) {
        navigationButton.classList.toggle("active", open);
        menu.classList.toggle("active", open);
        overlay.classList.toggle("active", open);
        document.body.classList.toggle("active-side", open);
        navigationButton.setAttribute("aria-expanded", String(open));
        navigationButton.setAttribute("aria-label", open ? "Close navigation" : "Open navigation");
        menu.setAttribute("aria-hidden", String(!open));

        if (open) {
          menu.removeAttribute("inert");
          window.requestAnimationFrame(function () {
            var firstLink = menu.querySelector("a");
            if (firstLink) firstLink.focus();
          });
        } else {
          menu.setAttribute("inert", "");
          if (returnFocus) navigationButton.focus();
        }
      };

      navigationButton.addEventListener("click", function () {
        setNavigationOpen(navigationButton.getAttribute("aria-expanded") !== "true", false);
      });

      overlay.addEventListener("click", function () {
        setNavigationOpen(false, true);
      });

      menu.addEventListener("click", function (event) {
        if (event.target.closest("a")) setNavigationOpen(false, false);
      });

      document.addEventListener("keydown", function (event) {
        var navigationOpen = navigationButton.getAttribute("aria-expanded") === "true";

        if (event.key === "Escape" && navigationOpen) {
          setNavigationOpen(false, true);
          return;
        }

        if (event.key === "Tab" && navigationOpen) {
          var focusable = Array.prototype.slice.call(
            menu.querySelectorAll('a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])')
          );
          if (!focusable.length) return;

          var firstFocusable = focusable[0];
          var lastFocusable = focusable[focusable.length - 1];

          if (event.shiftKey && document.activeElement === firstFocusable) {
            event.preventDefault();
            lastFocusable.focus();
          } else if (!event.shiftKey && document.activeElement === lastFocusable) {
            event.preventDefault();
            firstFocusable.focus();
          } else if (!menu.contains(document.activeElement)) {
            event.preventDefault();
            firstFocusable.focus();
          }
        }
      });
    }

    document.addEventListener("click", function (event) {
      var spoiler = event.target.closest(".spoiler");
      if (spoiler) spoiler.classList.remove("spoiler");
    });

    if (document.querySelector(".giscus") && !syncGiscus(theme)) {
      var observer = new MutationObserver(function () {
        if (syncGiscus(preferredTheme())) observer.disconnect();
      });
      observer.observe(document.documentElement, { childList: true, subtree: true });
    }
  });
})();
