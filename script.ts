const dialog = document.getElementById("settings")!;

const buttons: NodeListOf<HTMLElement> = document.querySelectorAll("[aria-pressed]");
for (const button of buttons) {
	button.addEventListener("click", function (e) {
		e.preventDefault();

		const targetID = this.getAttribute("aria-controls")!;
		for (const tab of document.querySelectorAll("main > div")) {
			tab.setAttribute("style", tab.id == targetID ? "display: block flex" : "");
		}

		buttons.forEach((button) => (button.ariaPressed = "false"));
		this.ariaPressed = "true";
	});
}

for (const slider of document.querySelectorAll(
	'input[type="range"]',
) as NodeListOf<HTMLInputElement>) {
	const update = function (this: HTMLInputElement) {
		this.nextSibling!.textContent = this.value;
	};
	update.call(slider);
	slider.addEventListener("input", update, { passive: true });
}

const helpButton = document.getElementById("helpButton")!;
const helpPopup = document.getElementById("helpPopup")!;
document.addEventListener(
	"click",
	function (e) {
		if (helpPopup.style.display === "block") {
			e.preventDefault();
			e.stopImmediatePropagation();
			helpPopup.style.display = "none";
		} else if (dialog.classList.contains("help")) {
			e.preventDefault();
			e.stopImmediatePropagation();
			dialog.classList.remove("help");

			let help =
				'To obtain some help on a setting (if it has some), press the "?" button, then click the setting.';
			for (let helpEl = e.target as Element; helpEl !== dialog; helpEl = helpEl.parentElement!) {
				const thisHelp = helpEl.getAttribute("data-help");
				if (thisHelp !== null) {
					help = thisHelp;
					break;
				}
			}
			helpPopup.innerHTML = help;
			helpPopup.style.display = "block";
			helpPopup.style.left = e.pageX + "px";
			helpPopup.style.top = e.pageY + "px";
		}
	},
	{ capture: true },
);
helpButton.addEventListener("click", function (e) {
	e.preventDefault();
	e.stopImmediatePropagation();
	dialog.classList.add("help");
});
helpButton.removeAttribute("disabled");
