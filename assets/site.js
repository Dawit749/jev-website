/* global document, window */
// Progressive enhancement only: the page is fully usable with this file absent.
// Handles the small-screen navigation toggle. No tracking, no network, no deps.
(function () {
  "use strict";

  var toggle = document.querySelector("[data-nav-toggle]");
  var nav = document.querySelector("[data-nav]");
  if (!toggle || !nav) {
    return;
  }

  function setOpen(open) {
    toggle.setAttribute("aria-expanded", open ? "true" : "false");
    nav.setAttribute("data-open", open ? "true" : "false");
  }

  setOpen(false);

  toggle.addEventListener("click", function () {
    setOpen(toggle.getAttribute("aria-expanded") !== "true");
  });

  // Close the menu after following an in-page link.
  nav.addEventListener("click", function (event) {
    var target = event.target;
    if (target && typeof target.closest === "function" && target.closest("a")) {
      setOpen(false);
    }
  });

  // Escape closes the menu and returns focus to the toggle.
  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape" && toggle.getAttribute("aria-expanded") === "true") {
      setOpen(false);
      toggle.focus();
    }
  });

  // Reset when the layout grows past the mobile breakpoint.
  var wide = window.matchMedia("(min-width: 721px)");
  wide.addEventListener("change", function (event) {
    if (event.matches) {
      setOpen(false);
    }
  });
})();
