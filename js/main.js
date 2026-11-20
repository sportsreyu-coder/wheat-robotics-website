// WHEAT Foundation site scripts

document.addEventListener("DOMContentLoaded", function () {
  // Mobile nav toggle
  var toggle = document.querySelector(".nav-toggle");
  var nav = document.getElementById("main-nav");

  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      var isOpen = nav.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
    });
  }

  // Footer year
  var yearEls = document.querySelectorAll("[data-current-year]");
  yearEls.forEach(function (el) {
    el.textContent = new Date().getFullYear();
  });

  // "Other" choice: show a text box (and require it) when a select's
  // "Other" option is picked. The select names the wrapper to toggle.
  var otherSelects = document.querySelectorAll("select[data-other-toggle]");
  otherSelects.forEach(function (select) {
    var wrap = document.getElementById(select.getAttribute("data-other-toggle"));
    if (!wrap) return;
    var input = wrap.querySelector("input, textarea");
    function sync(focus) {
      var isOther = select.value === "Other";
      wrap.hidden = !isOther;
      if (input) {
        input.required = isOther;
        input.disabled = !isOther;
        if (isOther && focus) input.focus();
      }
    }
    select.addEventListener("change", function () { sync(true); });
    sync(false);
  });

  // Placeholder form handling: prevent real submission until a backend/
  // form service (e.g. Formspree, Google Forms) is wired up.
  var placeholderForms = document.querySelectorAll("form[data-placeholder-form]");
  placeholderForms.forEach(function (form) {
    form.addEventListener("submit", function (event) {
      event.preventDefault();
      var note = form.querySelector(".form-submit-note");
      if (note) {
        note.hidden = false;
      }
    });
  });
});
