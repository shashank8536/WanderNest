/* WanderNest AI Travel Assistant JS */

document.addEventListener("DOMContentLoaded", () => {
  initPills();
  initChecklist();
});

/**
 * Handle selection of Travel Type pills
 */
function initPills() {
  const pills = document.querySelectorAll(".pill-btn");
  const hiddenInput = document.getElementById("travelTypeInput");

  pills.forEach((pill) => {
    pill.addEventListener("click", () => {
      // Remove active class from all pills
      pills.forEach((p) => p.classList.remove("active"));
      
      // Add active class to clicked pill
      pill.classList.add("active");
      
      // Update hidden input value
      if (hiddenInput) {
        hiddenInput.value = pill.getAttribute("data-value");
      }
    });
  });
}

/**
 * Handle packing list item interactions and progress tracking
 */
function initChecklist() {
  const packingCards = document.querySelectorAll(".packing-item-card");
  const progressBadge = document.querySelector(".pack-progress-badge");

  function updateProgress() {
    const totalItems = packingCards.length;
    const checkedItems = document.querySelectorAll(".packing-item-card.checked").length;
    
    if (progressBadge) {
      progressBadge.textContent = `${checkedItems}/${totalItems} Packed`;
    }
  }

  packingCards.forEach((card) => {
    const checkbox = card.querySelector('input[type="checkbox"]');
    
    // Set initial class state based on HTML checked attribute
    if (checkbox && checkbox.checked) {
      card.classList.add("checked");
    }

    card.addEventListener("click", (e) => {
      // If clicking directly on the checkbox, don't double trigger
      if (e.target === checkbox) {
        card.classList.toggle("checked", checkbox.checked);
        updateProgress();
        return;
      }
      
      if (checkbox) {
        checkbox.checked = !checkbox.checked;
        card.classList.toggle("checked", checkbox.checked);
        updateProgress();
      }
    });
  });

  // Run initial progress check
  updateProgress();
}
