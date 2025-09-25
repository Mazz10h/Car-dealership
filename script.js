document.addEventListener("DOMContentLoaded", () => {
  const pages = document.querySelectorAll(".page");
  const navLinks = document.querySelectorAll(".navbar a");

  // Navigation
  navLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const target = link.getAttribute("data-section");
      pages.forEach((p) => p.classList.remove("active"));
      document.getElementById(target).classList.add("active");
    });
  });

  // Fetch and render cars
  const carList = document.getElementById("car-list");
  let cars = [];

  fetch("http://localhost:3000/cars") // json-server endpoint
    .then((res) => res.json())
    .then((data) => {
      cars = data;
      renderCars(cars);
    });

  function renderCars(carArray) {
    carList.innerHTML = "";
    carArray.forEach((car) => {
      const card = document.createElement("div");
      card.className = "car-card";
      card.innerHTML = `
        <img src="${car.image}" alt="${car.model}" />
        <h3>${car.brand} ${car.model}</h3>
        <p>Year: ${car.year}</p>
        <p>Price: $${car.price}</p>
        <p>Fuel: ${car.fuel}</p>
      `;
      carList.appendChild(card);
    });
  }

  // Filtering
  const brandFilter = document.getElementById("brand-filter");
  const fuelFilter = document.getElementById("fuel-filter");

  function applyFilters() {
    const brand = brandFilter.value;
    const fuel = fuelFilter.value;

    const filtered = cars.filter((car) => {
      const brandMatch = brand === "all" || car.brand === brand;
      const fuelMatch = fuel === "all" || car.fuel === fuel;
      return brandMatch && fuelMatch;
    });

    renderCars(filtered);
  }

  brandFilter.addEventListener("change", applyFilters);
  fuelFilter.addEventListener("change", applyFilters);

  // Contact form submit
  const contactForm = document.getElementById("contact-form");
  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();
    alert("Message sent! (Thank you:))");
    contactForm.reset();
  });
});
