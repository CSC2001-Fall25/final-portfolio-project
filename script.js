// Quote API widget (fixed version)
const quoteBtn = document.getElementById("quote-btn");
const quoteText = document.getElementById("quote-text");
const quoteAuthor = document.getElementById("quote-author");

quoteBtn.addEventListener("click", async () => {
  quoteBtn.disabled = true;
  quoteBtn.textContent = "Loading…";

  try {
    const response = await fetch("https://api.quotable.io/random?tags=tech|inspirational", {
      method: "GET",
      headers: {
        "Accept": "application/json"
      }
    });

    if (!response.ok) throw new Error("API error");

    const data = await response.json();

    quoteText.textContent = `"${data.content}"`;
    quoteAuthor.textContent = `— ${data.author}`;
  } catch (err) {
    quoteText.textContent = "Couldn't load a quote. Try again later.";
    quoteAuthor.textContent = "";
    console.error("Quote API error:", err);
  } finally {
    quoteBtn.disabled = false;
    quoteBtn.textContent = "Get Quote";
  }
});
