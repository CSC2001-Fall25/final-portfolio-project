// -----------------------------
// Mobile Navigation Toggle
// -----------------------------
const navToggle = document.getElementById("nav-toggle");
const navMenu = document.getElementById("nav-menu");

if (navToggle && navMenu) {
  navToggle.addEventListener("click", () => {
    navMenu.classList.toggle("open");
  });

  navMenu.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
      navMenu.classList.remove("open");
    });
  });
}

// -----------------------------
// Reveal-on-Scroll Animation
// -----------------------------
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
  // Fallback if browser doesn't support IntersectionObserver
  reveals.forEach(el => el.classList.add("show"));
}

// -----------------------------
// Quote Generator (TypeFit API)
// -----------------------------
const quoteBtn = document.getElementById("quote-btn");
const quoteText = document.getElementById("quote-text");
const quoteAuthor = document.getElementById("quote-author");

if (quoteBtn && quoteText && quoteAuthor) {
  quoteBtn.addEventListener("click", async () => {
    quoteBtn.disabled = true;
    quoteBtn.textContent = "Loading…";

    try {
      const response = await fetch("https://type.fit/api/quotes");
      const data = await response.json();

      const randomQuote = data[Math.floor(Math.random() * data.length)];
      quoteText.textContent = `"${randomQuote.text}"`;
      quoteAuthor.textContent = randomQuote.author
        ? `— ${randomQuote.author}`
        : "— Unknown";
    } catch (error) {
      console.error("Quote API error:", error);
      quoteText.textContent = "Could not load a quote right now.";
      quoteAuthor.textContent = "";
    } finally {
      quoteBtn.disabled = false;
      quoteBtn.textContent = "Get Quote";
    }
  });
} else {
  console.warn("Quote elements not found in DOM.");
}
