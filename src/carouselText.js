let projectTitles = [
	"Vector Icons",
	"ProCabello Artwork",
	"Dynamark Booklet",
	"SSN Full Page Ad",
	"SSN Junior Page Ad",
	"Impressed Logo Design",
	"Storefront Abstract Image",
	"Dynamark Package Design",
	"Dynamark Brand Style Guide",
	"Shibuya Crossing",
];

let projectDescriptions = [
	"A series of icons I created in Adobe Illustrator and have used for multiple projects. Alternate versions are available with different stroke weights and fill colors, including no fill as shown.",
	//
	"A sample design I did in Adobe Photoshop for a cosmetics distribution company located in Florida. I was given their brand guidelines and asked to think outside the box - to create something they weren't expecting.",
	//
	"A leave-behind booklet I designed in Adobe CC with a soft-touch lamination finish to leave a lasting impression on prospects for the company, Dynamark Monitoring. The full booklet is available for viewing.",
	//
	"A full page printed advertisement (Dimensions 10.875 by 13.875 inches with bleed) I designed in Adobe CC on behalf of Dynamark Monitoring for publication in a newsletter popular to the alarm monitoring industry, Security System News (SSN).",
	//
	"A junior page printed advertisement (Dimensions 8.375 by 11.125 inches with bleed) I designed in Adobe CC on behalf of Dynamark Monitoring for publication in SSN.",
	//
	"A logo I created in Adobe Illustrator for a local business specializing in pressed flower art. The drawing on the left was provided by the business owner as a reference, with the right showing the final design. A light variation over a dark background is available.",
	//
	"I created this in Adobe Photoshop from an image I captured with my Nikon D3300 while visiting my great grandmother who lived in Cumberland, Maryland.",
	//
	"A package design I created in Adobe CC for nurturing high-value prospects through the sales process with personalized gifts on behalf of Dynamark Monitoring.",
	//
	"With no guidelines previously in place, I designed an easy-to-follow brand guide in Adobe CC to explain the correct usage of fonts, colors, logos, taglines, photogtaphy, messaging, and more for Dynamark Monitoring. The full guide is available for viewing.",
	//
	"A photo I captured on my Nikon D3300 and manipulated in Adobe Photoshop during a vacation in Japan.",
];

let projectTitle = document.querySelector(
	"#design-project-title"
);

let projectDescription = document.querySelector(
	"#design-project-description"
);

let projectTextWrapper = document.querySelector(
	".design-text-wrapper"
);

const textSlider = {
	title: projectTitle,
	description: projectDescription,
	currentTextWrapper: projectTextWrapper,
	handle: null,
	idle: true,
	activeIndex: -1,
	interval: 7000,
};

function displayProjectText() {
	projectTitles.forEach((title) => {
		projectTitle.innerHTML = title;
	});

	projectDescriptions.forEach((description) => {
		projectDescription.innerHTML = description;
	});
}

function loadingAnimation() {
	textSlider.title.classList.add("ready");
	textSlider.currentTextWrapper.addEventListener(
		"transitioned",
		start,
		{
			once: true,
		}
	);
}

function start() {
	autoplay(true);
	wheelControl();
	window.innerWidth <= 1024 && touchControl();
}

displayProjectText();
loadingAnimation();
