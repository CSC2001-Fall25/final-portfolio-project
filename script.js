// Simple Quote API
function generateQuote() {
  fetch("https://api.quotable.io/random")
    .then(response => response.json())
    .then(data => {
      document.getElementById("quote").innerText = `"${data.content}" – ${data.author}`;
    })
    .catch(() => {
      document.getElementById("quote").innerText = "Could not load a quote right now.";
    });
}
