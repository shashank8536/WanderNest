/* WanderNest AI Travel Assistant JS */

document.addEventListener("DOMContentLoaded", () => {
  initPills();
  initChecklist();
  initTravelForm();
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
//Handle Travel Form Submission (AJAX)
function initTravelForm() {
  const form = document.getElementById("travelForm");

  if (!form) return;

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const submitBtn = form.querySelector("button[type='submit']");

    submitBtn.disabled = true;
    submitBtn.innerHTML = `
        <i class="fa-solid fa-spinner fa-spin"></i>
        Generating...
    `;

    const formData = new FormData(form);
    const data = Object.fromEntries(formData);

    try {

      const response = await fetch("/travel-assistant/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!result.success) {
        alert(result.message);
        return;
      }

      const weather = result.weather;

      document.getElementById("weatherCity").textContent =
        `${weather.city}, ${weather.country}`;

      document.getElementById("weatherTemp").textContent =
        `${weather.temperature}°C`;

      document.getElementById("weatherCondition").textContent =
        weather.weather;

      document.getElementById("weatherDescription").textContent =
        weather.description;

      document.getElementById("weatherHumidity").textContent =
        `Humidity: ${weather.humidity}%`;

      document.getElementById("weatherWind").textContent =
        `Wind: ${weather.windSpeed} m/s`;

      // Update Packing Essentials
      const packingGrid = document.getElementById("packingGrid");

      packingGrid.innerHTML = "";

      const items = typeof result.packingList === "string"
        ? JSON.parse(result.packingList)
        : result.packingList;

      items.forEach((item, index) => {
        packingGrid.innerHTML += `
        <div class="packing-item-card">
            <input type="checkbox" id="pack${index}">
            <span>${item}</span>
        </div>
    `;
      });

      document.querySelector(".pack-progress-badge").textContent =
        `0/${items.length} Packed`;

      initChecklist();

    } catch (err) {
      console.error(err);
    } finally {

      submitBtn.disabled = false;
      submitBtn.innerHTML = `
            <i class="fa-solid fa-wand-magic-sparkles"></i>
            Generate Travel Plan
        `;
    }
  });
}

