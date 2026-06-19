document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("feedbackForm");
  const formContainer = document.getElementById("formContainer");
  const usernameInput = document.getElementById("username");
  const emailInput = document.getElementById("email");
  const commentsInput = document.getElementById("comments");
  const charCountDisplay = document.getElementById("charCount");
  const feedbackDisplay = document.getElementById("feedback-display");
  const maxChars = 200;

  commentsInput.addEventListener("input", () => {
    const remaining = maxChars - commentsInput.value.length;
    charCountDisplay.textContent = remaining;
    charCountDisplay.style.color = remaining < 0 ? "red" : "#666";
  });

  form.addEventListener("mouseover", (event) => {
    const tooltipId = event.target.getAttribute("data-tooltip");
    if (tooltipId) {
      document.getElementById(tooltipId).style.display = "block";
    }
  });

  form.addEventListener("mouseout", (event) => {
    const tooltipId = event.target.getAttribute("data-tooltip");
    if (tooltipId) {
      document.getElementById(tooltipId).style.display = "none";
    }
  });

  formContainer.addEventListener("click", (event) => {
    event.stopPropagation();
  });

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    let hasErrors = false;

    document.querySelectorAll(".error-msg").forEach(el => el.textContent = "");

    if (!usernameInput.value.trim()) {
      document.getElementById("usernameError").textContent = "Username cannot be empty.";
      hasErrors = true;
    }
    if (!emailInput.value.trim()) {
      document.getElementById("emailError").textContent = "Email cannot be empty.";
      hasErrors = true;
    }
    if (!commentsInput.value.trim()) {
      document.getElementById("commentsError").textContent = "Comments cannot be empty.";
      hasErrors = true;
    } else if (commentsInput.value.length > maxChars) {
      document.getElementById("commentsError").textContent = "Comments cannot exceed 200 characters.";
      hasErrors = true;
    }

    if (!hasErrors) {
      const feedbackCard = document.createElement("div");
      feedbackCard.classList.add("feedback-card");

      feedbackCard.innerHTML = `
          <strong>@${escapeHTML(usernameInput.value.trim())}</strong> (${escapeHTML(emailInput.value.trim())})
          <p>${escapeHTML(commentsInput.value.trim())}</p>
      `;

      feedbackDisplay.appendChild(feedbackCard);
      form.reset();
      charCountDisplay.textContent = maxChars;
    }

  function escapeHTML(str) {
    return str.replace(/[&<>'"]/g,
        tag => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;'}[tag] || tag)
    );
  }
});
});

 
