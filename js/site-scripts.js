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
const scrollProgressFill = document.querySelector(
	".scroll-progress__fill",
);
const themeToggleButton = document.getElementById(
	"theme-toggle-btn",
);
const themeToggleLabel = document.querySelector(
	".theme-toggle__label",
);
const logoImage = document.querySelector(
	".navbar-brand.logo img",
);
const backToTopIconImage = document.querySelector(
	".back-to-top__icon img",
);
const logoDefaultSrc = "/src/img/logo.svg";
const logoLightSrc = "/src/img/logo-light-bg.svg";
const backToTopDefaultSrc =
	"/src/icons/back-to-top-arrow.svg";
const backToTopLightSrc =
	"/src/icons/back-to-top-arrow-light-bg.svg";

const getStoredTheme = () => localStorage.getItem("theme");
const isLightMode = () =>
	document.body.classList.contains("light-mode");
const setTheme = (useLightMode) => {
	document.body.classList.toggle(
		"light-mode",
		useLightMode,
	);

	if (themeToggleButton) {
		themeToggleButton.setAttribute(
			"aria-pressed",
			useLightMode ? "true" : "false",
		);
		themeToggleButton.setAttribute(
			"aria-label",
			useLightMode
				? "Toggle dark mode"
				: "Toggle light mode",
		);
	}

	if (themeToggleLabel) {
		themeToggleLabel.textContent = useLightMode
			? "Light mode"
			: "Dark mode";
	}

	if (logoImage) {
		logoImage.src = useLightMode
			? logoLightSrc
			: logoDefaultSrc;
	}

	if (backToTopIconImage) {
		backToTopIconImage.src = useLightMode
			? backToTopLightSrc
			: backToTopDefaultSrc;
	}

	localStorage.setItem(
		"theme",
		useLightMode ? "light" : "dark",
	);
};

const initializeTheme = () => {
	const storedTheme = getStoredTheme();
	const prefersLight = window.matchMedia(
		"(prefers-color-scheme: light)",
	).matches;
	const useLightMode = storedTheme
		? storedTheme === "light"
		: prefersLight;

	// Force dark mode on initial page load regardless of any stored preference
	setTheme(false);
};

const toggleTheme = () => {
	setTheme(!isLightMode());
};

if (themeToggleButton) {
	themeToggleButton.addEventListener("click", toggleTheme);

	window
		.matchMedia("(prefers-color-scheme: light)")
		.addEventListener("change", (event) => {
			if (!getStoredTheme()) {
				setTheme(event.matches);
			}
		});
}

initializeTheme();

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

const updateScrollProgress = () => {
	if (!scrollProgressFill) {
		return;
	}

	const scrollTop =
		window.scrollY || document.documentElement.scrollTop;
	const maxScroll =
		document.documentElement.scrollHeight -
		window.innerHeight;
	const progress =
		maxScroll > 0 ? (scrollTop / maxScroll) * 100 : 0;

	scrollProgressFill.style.setProperty(
		"--progress",
		`${Math.min(100, Math.max(0, progress))}%`,
	);
};

window.addEventListener("scroll", updateScrollProgress, {
	passive: true,
});
window.addEventListener("resize", updateScrollProgress);
window.addEventListener("load", updateScrollProgress);
updateScrollProgress();

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

document.addEventListener("DOMContentLoaded", () => {
	const observerOptions = {
		root: null,
		rootMargin: "-8% 0px -8% 0px", // Creates a smooth trigger zone inside the viewport
		threshold: 0.1,
	};

	const observer = new IntersectionObserver((entries) => {
		entries.forEach((entry) => {
			const rect = entry.boundingClientRect;

			if (entry.isIntersecting) {
				// Element enters viewport -> Active Zoom In
				entry.target.classList.add("active");
				entry.target.classList.remove("past");
			} else if (rect.top < 0) {
				// Element moves above viewport -> Dim & Fade up
				entry.target.classList.remove("active");
				entry.target.classList.add("past");
			} else {
				// Element drops below viewport -> Complete reset when scrolling up
				entry.target.classList.remove("active", "past");
			}
		});
	}, observerOptions);

	// Dynamically target all items with your utility class
	document
		.querySelectorAll(".scroll-animate")
		.forEach((item) => observer.observe(item));
});
