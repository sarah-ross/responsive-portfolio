/* Interactive background glow effect in hero section - moves with cursor */
const container = document.getElementById("interactive-bg");
const blob = document.getElementById("glow-blob");
const backToTopButton = document.getElementById(
	"back-to-top-btn",
);
const contactForm = document.getElementById("contact-form");
const submitMessage = document.getElementById(
	"form-submit-message",
);
const emailInput = document.getElementById("email");

const isValidEmail = (value) => {
	const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	return emailPattern.test(value);
};

if (container && blob) {
	container.addEventListener("mousemove", (e) => {
		const rect = container.getBoundingClientRect();
		const x = e.clientX - rect.left;
		const y = e.clientY - rect.top;

		// Using transform3d forces hardware acceleration for smooth 60fps movement
		blob.style.transform = `translate3d(${x}px, ${y}px, 0)`;
	});
}

/* Back to top button functionality */
const toggleBackToTopButton = () => {
	if (!backToTopButton) {
		return;
	}

	/* Wrapping button content in a span allows for a smooth fade-in effect when the button appears */
	if (backToTopButton.innerHTML.trim() === "↑") {
		backToTopButton.innerHTML = `<span>${backToTopButton.innerHTML}</span>`;
	}

	backToTopButton.classList.toggle(
		"is-visible",
		window.scrollY > 200,
	);
};

window.addEventListener("scroll", toggleBackToTopButton);
window.addEventListener("load", toggleBackToTopButton);

if (backToTopButton) {
	backToTopButton.addEventListener("click", (e) => {
		e.preventDefault();
		window.scrollTo({ top: 0, behavior: "smooth" });
	});
}

if (contactForm && submitMessage && emailInput) {
	contactForm.addEventListener("submit", async (event) => {
		event.preventDefault();

		if (!isValidEmail(emailInput.value.trim())) {
			submitMessage.textContent =
				"Please enter a valid email address.";
			submitMessage.className = "mb-0 text-danger";
			emailInput.focus();
			return;
		}

		submitMessage.textContent = "Sending...";
		submitMessage.className = "mb-0 text-muted";

		try {
			const response = await fetch(contactForm.action, {
				method: contactForm.method,
				body: new FormData(contactForm),
				headers: {
					Accept: "application/json",
				},
			});

			if (response.ok) {
				submitMessage.textContent =
					"Your message has been sent!";
				submitMessage.className = "mb-0";
				contactForm.reset();
			} else {
				throw new Error("Unable to send message");
			}
		} catch (error) {
			submitMessage.textContent =
				"Sorry, there was a problem sending your message.";
			submitMessage.className = "mb-0 text-danger";
		}
	});
}
