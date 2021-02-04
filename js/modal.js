var modal = document.querySelector(".focus-modal");
var modalButton = document.querySelector(".focus-modal-button");
var modalOverlay = document.querySelector(".focus-modal-overlay");
var cancelButton = document.querySelector(".focus-modal-cancel");

modalButton.addEventListener("click", open);
cancelButton.addEventListener("click", close);

// Get a list of tabbable elements here:
// https://github.com/jkup/focusable

function open() {
  var focusEls =
    'a[href], area[href], input:not([disabled]):not([type="hidden"]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), iframe, object, embed, [tabindex="0"], [contenteditable], audio[controls], video[controls], summary, [tabindex^="0"], [tabindex^="1"], [tabindex^="2"], [tabindex^="3"], [tabindex^="4"], [tabindex^="5"], [tabindex^="6"], [tabindex^="7"], [tabindex^="8"], [tabindex^="9"]';
  focusEls = Array.from(modal.querySelectorAll(focusEls));

  var firstEl = focusEls[0];
  var lastEl = focusEls[focusEls.length - 1];

  modal.addEventListener("keydown", trap);
  function trap(e) {
    let active = document.activeElement;
    switch (e.key) {
      case "Tab":
        if (e.shiftKey) {
          if (active == firstEl) {
            // Backwards
            e.preventDefault();
            lastEl.focus();
          }
        } else if (active == lastEl) {
          e.preventDefault();
          firstEl.focus();
        }
        break;
      case "Escape":
        e.preventDefault();
        close();
        break;
    }
  }

  // Show the modal and overlay
  modal.style.display = "block";
  modalOverlay.style.display = "block";
}

function close() {
  // Hide the modal and overlay
  modal.style.display = "none";
  modalOverlay.style.display = "none";
}
