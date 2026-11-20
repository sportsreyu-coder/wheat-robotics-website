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

  // Mailto forms: no backend yet, so submitting opens the visitor's email
  // app with the form contents. The recipient comes from the form's
  // data-mailto, or from the selected <option>'s data-mailto if it has one
  // (e.g. mentor applications go to a different inbox).
  var mailtoForms = document.querySelectorAll("form[data-mailto-form]");
  mailtoForms.forEach(function (form) {
    form.addEventListener("submit", function (event) {
      event.preventDefault();
      var to = form.getAttribute("data-mailto");
      var subject = form.getAttribute("data-subject") || "Website message";
      var lines = [];

      Array.prototype.forEach.call(form.elements, function (field) {
        if (!field.name || field.type === "submit" || field.disabled) return;
        var label = form.querySelector('label[for="' + field.id + '"]');
        var name = label ? label.textContent.trim() : field.name;
        var value = field.value.trim();
        if (field.tagName === "SELECT") {
          var opt = field.options[field.selectedIndex];
          if (opt) {
            if (opt.getAttribute("data-mailto")) to = opt.getAttribute("data-mailto");
            var otherWrap = document.getElementById(field.getAttribute("data-other-toggle"));
            var otherInput = otherWrap && otherWrap.querySelector("input, textarea");
            var choice = opt.text;
            if (field.value === "Other" && otherInput && otherInput.value.trim()) {
              choice = "Other: " + otherInput.value.trim();
            }
            if (opt.getAttribute("data-subject")) subject = opt.getAttribute("data-subject");
            else subject += " — " + choice;
          }
        }
        if (value) lines.push(name + ": " + value);
      });

      var nameField = form.querySelector('[name="name"]');
      if (nameField && nameField.value.trim()) subject += " from " + nameField.value.trim();

      window.location.href = "mailto:" + to +
        "?subject=" + encodeURIComponent(subject) +
        "&body=" + encodeURIComponent(lines.join("\n\n"));

      var note = form.querySelector(".form-submit-note");
      if (note) note.hidden = false;
    });
  });
});
