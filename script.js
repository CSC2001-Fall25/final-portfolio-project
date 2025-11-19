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

// Scroll reveal using IntersectionObserver
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
  // Fallback: just show everything
  reveals.forEach(el => el.classList.add("show"));
}

// Quote API widget
const quoteBtn = document.getElementById("quote-btn");
const quoteText = document.getElementById("quote-text");
const quoteAuthor = document.getElementById("quote-author");

if (quoteBtn && quoteText && quoteAuthor) {
  quoteBtn.addEventListener("click", async () => {
    quoteBtn.disabled = true;
    quoteBtn.textContent = "Loading…";

    try {
      const response = await fetch("https://api.quotable.io/random?tags=technology|inspirational");
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      quoteText.textContent = `"${data.content}"`;
      quoteAuthor.textContent = data.author ? `— ${data.author}` : "";
    } catch (err) {
      quoteText.textContent = "Could not load a quote right now. Try again in a moment.";
      quoteAuthor.textContent = "";
      console.log(err);
    } finally {
      quoteBtn.disabled = false;
      quoteBtn.textContent = "Get a quote";
    }
  });
}
