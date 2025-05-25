document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("listingContainer");
  const shortlistedToggle = document.getElementById("shortlisted-toggle");
  let designers = [];
  let shortlistedActive = false;

  // Load designers data
  fetch("https://emptycup-atk7.onrender.com/api/designers")
    .then(res => res.json())
    .then(data => {
      designers = data;
      renderDesigners(designers);
    });

  // Render designers
  function renderDesigners(data) {
    container.innerHTML = "";

    data.forEach((designer, index) => {
      const card = document.createElement("section");
      card.className = `card ${designer.shortlisted ? "light-bg" : ""}`;
      card.setAttribute("data-shortlisted", designer.shortlisted);

      const stars = "★★★★★".slice(0, designer.rating) + "☆☆☆☆☆".slice(designer.rating);

      card.innerHTML = `
        <div class="card-left">
          <h2>${designer.name}</h2>
          <div class="rating">${stars}</div>
          <p>${designer.description}</p>
          <div class="stats">
            <div><strong>${designer.projects}</strong><br/>Projects</div>
            <div><strong>${designer.years}</strong><br/>Years</div>
            <div><strong>${designer.price}</strong><br/>Price</div>
          </div>
          <div class="contact">
            ${designer.phone.map(p => `<p>${p}</p>`).join("")}
          </div>
        </div>
        <div class="card-right">
          <button class="icon"><img src="assets/arrow.png" class="card-icon"/><br/><span>Details</span></button>
          <button class="icon"><img src="assets/hide.png" class="card-icon"/><br/><span>Hide</span></button>
          <button class="icon shortlist-btn" data-index="${index}" data-shortlisted="${designer.shortlisted}">
            <img src="assets/${designer.shortlisted ? "ShortlistedY" : "ShortlistedN"}.png" class="card-icon"/><br/><span>Shortlist</span>
          </button>
          <button class="icon"><img src="assets/report.png" class="card-icon"/><br/><span>Report</span></button>
        </div>
      `;

      container.appendChild(card);
    });

    initShortlistListeners();
  }

  // Add event listeners to shortlist buttons
  function initShortlistListeners() {
    document.querySelectorAll(".shortlist-btn").forEach(button => {
      button.addEventListener("click", () => {
        const index = button.getAttribute("data-index");
        designers[index].shortlisted = !designers[index].shortlisted;
        renderDesigners(shortlistedActive ? designers.filter(d => d.shortlisted) : designers);
      });
    });
  }

  // Shortlisted toggle filter
  shortlistedToggle.addEventListener("click", () => {
    shortlistedActive = !shortlistedActive;
    shortlistedToggle.classList.toggle("active", shortlistedActive);
    const filtered = shortlistedActive ? designers.filter(d => d.shortlisted) : designers;
    renderDesigners(filtered);
  });
});
