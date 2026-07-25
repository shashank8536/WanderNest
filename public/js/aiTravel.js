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

      //  ADD THIS HERE (Travel Advisory)
      const advisoryText = document.getElementById("travelAdvisoryText");

      advisoryText.innerHTML = result.travelAdvisory
        .map(item => `• ${item}`)
        .join("<br>");

      // Update Itinerary
      const timelineContainer = document.getElementById("timelineContainer");

      timelineContainer.innerHTML = "";

      result.itinerary.forEach(day => {
        timelineContainer.innerHTML += `
    <div class="timeline-day">

      <div class="timeline-dot"></div>

      <div class="timeline-day-header">
        <h3>
          <span class="day-tag">Day ${day.day}</span>
        </h3>
      </div>

      <div class="timeline-day-card">

        <div class="timeline-event">
          <div class="event-icon-box">
            <i class="fa-solid fa-sun"></i>
          </div>

          <div class="event-details">
            <h4>Morning</h4>
            <p class="desc">${day.morning}</p>
          </div>
        </div>

        <div class="timeline-event">
          <div class="event-icon-box">
            <i class="fa-solid fa-cloud-sun"></i>
          </div>

          <div class="event-details">
            <h4>Afternoon</h4>
            <p class="desc">${day.afternoon}</p>
          </div>
        </div>

        <div class="timeline-event">
          <div class="event-icon-box">
            <i class="fa-solid fa-moon"></i>
          </div>

          <div class="event-details">
            <h4>Evening</h4>
            <p class="desc">${day.evening}</p>
          </div>
        </div>

      </div>

    </div>
  `;
      });
      // For stay recommendation from your mongodb
      const staysGrid = document.getElementById("recommendedStaysGrid");

      staysGrid.innerHTML = "";

      if (result.recommendedStays.length === 0) {

        staysGrid.innerHTML = `
        <div class="col-12 text-center py-5">
            <h5>No WanderNest stays found.</h5>
            <p class="text-muted">
                Try another nearby destination.
            </p>
        </div>
    `;

      } else {

        result.recommendedStays.forEach((listing) => {

          staysGrid.innerHTML += `
        
        <div class="col position-relative">

            <a href="/listings/${listing._id}" class="listing-link">

                <div class="card listing-card">

                    <img
                        src="${listing.image.url}"
                        class="card-img-top"
                        alt="${listing.title}"
                        style="height:20rem;">

                    <div class="card-img-overlay"></div>

                    <div class="card-body mt-2">

                        <p class="card-text">

                            <b>${listing.title}</b>

                            <br>

                            ₹${listing.price.toLocaleString("en-IN")} / night

                            <br>

                            <small>${listing.location}</small>

                        </p>

                    </div>

                </div>

            </a>

        </div>

        `;

        });

      }
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

