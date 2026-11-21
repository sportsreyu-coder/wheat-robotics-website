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

  // Hero photo slideshow: native horizontal scroll with snap points, so
  // touch swipe and trackpads work; buttons, dots and arrow keys move it too.
  document.querySelectorAll("[data-carousel]").forEach(function (carousel) {
    var track = carousel.querySelector(".carousel-track");
    var slides = track ? track.children : [];
    var dotsWrap = carousel.querySelector(".carousel-dots");
    if (!track || slides.length < 2) return;
    var dots = [];

    function current() {
      return Math.round(track.scrollLeft / track.clientWidth);
    }
    function go(i) {
      var n = slides.length;
      i = (i + n) % n;
      track.scrollTo({ left: i * track.clientWidth });
    }
    function sync() {
      var i = current();
      dots.forEach(function (d, k) {
        d.setAttribute("aria-current", k === i ? "true" : "false");
      });
    }

    Array.prototype.forEach.call(slides, function (slide, i) {
      var dot = document.createElement("button");
      dot.type = "button";
      dot.setAttribute("aria-label", "Show photo " + (i + 1));
      dot.addEventListener("click", function () { go(i); });
      dotsWrap.appendChild(dot);
      dots.push(dot);
    });

    carousel.querySelector(".carousel-prev").addEventListener("click", function () { go(current() - 1); });
    carousel.querySelector(".carousel-next").addEventListener("click", function () { go(current() + 1); });
    carousel.addEventListener("keydown", function (e) {
      if (e.key === "ArrowLeft") { e.preventDefault(); go(current() - 1); }
      if (e.key === "ArrowRight") { e.preventDefault(); go(current() + 1); }
    });

    var raf;
    track.addEventListener("scroll", function () {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(sync);
    }, { passive: true });
    window.addEventListener("resize", function () { go(current()); });
    sync();
  });

  // Web3Forms: the contact form posts straight to Web3Forms, which emails
  // the message to the inbox tied to the access key in the form. Only that
  // public key lives in the page; no passwords or SMTP details.
  var web3Forms = document.querySelectorAll("form[data-web3form]");
  web3Forms.forEach(function (form) {
    var button = form.querySelector('button[type="submit"]');
    var status = form.querySelector(".form-status");
    var buttonLabel = button ? button.textContent : "";

    function showStatus(text, kind) {
      if (!status) return;
      status.textContent = text;
      status.className = "form-status" + (kind ? " is-" + kind : "");
      status.hidden = false;
    }

    form.addEventListener("submit", function (event) {
      event.preventDefault();

      var data = new FormData(form);
      var topic = data.get("topic");
      var name = (data.get("name") || "").trim();
      data.set("subject", "Website contact" + (topic ? " — " + topic : "") + (name ? " from " + name : ""));

      if (button) { button.disabled = true; button.textContent = "Sending..."; }
      showStatus("Sending...", "");

      fetch(form.action, {
        method: "POST",
        headers: { Accept: "application/json" },
        body: data
      })
        .then(function (response) {
          return response.json().catch(function () { return {}; }).then(function (json) {
            if (!response.ok || !json.success) throw new Error(json.message || "Request failed");
          });
        })
        .then(function () {
          form.reset();
          showStatus("Message sent! Thanks for reaching out — we'll get back to you soon.", "success");
        })
        .catch(function (err) {
          if (window.console) console.error("Contact form error:", err && err.message);
          showStatus("Sorry, your message couldn't be sent. Please try again in a moment, or email us at board@wheatrobotics.org.", "error");
        })
        .then(function () {
          if (button) { button.disabled = false; button.textContent = buttonLabel; }
        });
    });
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
