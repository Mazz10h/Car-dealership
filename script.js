document.addEventListener("DOMContentLoaded", () => {
  const pages = document.querySelectorAll(".page");
  const navLinks = document.querySelectorAll(".navbar a");

  // Navigation between sections
  navLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const target = link.getAttribute("data-section");
      pages.forEach((p) => p.classList.remove("active"));
      document.getElementById(target).classList.add("active");
    });
  });

  // VEHICLES SECTION FUNCTIONALITY

  const carList = document.getElementById("car-list");
  let cars = [];

  fetch("http://localhost:3000/cars")
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

  // Vehicle Filters
  const brandFilter = document.getElementById("brand-filter");
  const fuelFilter = document.getElementById("fuel-filter");

  function applyFilters() {
    const brand = brandFilter.value;
    const fuel = fuelFilter.value;

    const filtered = cars.filter((car) => {
      const brandMatch = !brand || car.brand === brand;
      const fuelMatch = !fuel || car.fuel === fuel;
      return brandMatch && fuelMatch;
    });

    renderCars(filtered);
  }

  brandFilter.addEventListener("change", applyFilters);
  fuelFilter.addEventListener("change", applyFilters);
  
  // CONTACT FORM

  const contactForm = document.getElementById("contact-form");
  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();
    alert("Message sent! (Thank you:))");
    contactForm.reset();
  });

//review form functionality
  const reviewForm = document.getElementById("review-form");
  const reviewsList = document.getElementById("reviews-list");

  // Load saved reviews on page load
  fetch("http://localhost:3000/reviews")
    .then((res) => res.json())
    .then((reviews) => {
      reviews.forEach((review) => {
        const reviewElement = document.createElement("p");
        reviewElement.textContent = `"${review.text}" — ${review.name}`;
        reviewsList.appendChild(reviewElement);
      });
    });

  // Submit new review
  reviewForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = document.getElementById("reviewer-name").value.trim();
    const review = document.getElementById("review-text").value.trim();

    if (name && review) {
      const newReview = {
        name,
        text: review,
      };

      fetch("http://localhost:3000/reviews", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newReview),
      })
        .then((res) => res.json())
        .then((savedReview) => {
          const reviewElement = document.createElement("p");
          reviewElement.textContent = `"${savedReview.text}" — ${savedReview.name}`;
          reviewsList.appendChild(reviewElement);
          reviewForm.reset();
        })
        .catch((error) => {
          console.error("Error saving review:", error);
          alert("Something went wrong while saving your review.");
        });
    }
  });
});
