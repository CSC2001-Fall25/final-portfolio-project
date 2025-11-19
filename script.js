// Mobile nav toggle
const navToggle = document.getElementById("nav-toggle");
const navMenu = document.getElementById("nav-menu");

if (navToggle && navMenu) {
  navToggle.addEventListener("click", () => {
    navMenu.classList.toggle("open");
  });

  // Close menu when clicking a link
  navMenu.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
      navMenu.classList.remove("open");
    });
  });
}

// Scroll reveal with IntersectionObserver
const reveals = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("show");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );

  reveals.forEach(el => observer.observe(el));
} else {
  // Fallback: if no IntersectionObserver support
  reveals.forEach(el => el.classList.add("show"));
}

// WORKING QUOTE GENERATOR (ZenQuotes API)
const quoteBtn = document.getElementById("quote-btn");
const quoteText = document.getElementById("quote-text");
const quoteAuthor = document.getElementById("quote-author");

if (quoteBtn && quoteText && quoteAuthor) {
  quoteBtn.addEventListener("click", async () => {
    quoteBtn.disabled = true;
    quoteBtn.textContent = "Loading…";

    try {
      const response = await fetch("https://zenquotes.io/api/random");
      const data = await response.json();

      quoteText.textContent = `"${data[0].q}"`;
      quoteAuthor.textContent = `— ${data[0].a}`;
    } catch (error) {
      console.error("Quote API error:", error);
      quoteText.textContent = "Could not load a quote right now.";
      quoteAuthor.textContent = "";
    } finally {
      quoteBtn.disabled = false;
      quoteBtn.textContent = "Get Quote";
    }
  });
}
