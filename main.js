const numbers = document.getElementsByClassName("number");
const lowerValue = document.getElementById("lower-value");
const upperValue = document.getElementById("upper-value");
const operator = document.getElementsByClassName("operator");
let checkbox = document.querySelector('input[name="theme"]');
let toggleTheme = document.querySelector(".fas.fa-moon");

toggleTheme.addEventListener("click", () => {
	checkbox.checked = !checkbox.checked;
	if (checkbox.checked) {
		document.documentElement.setAttribute("data-theme", "dark");
	} else {
		document.documentElement.setAttribute("data-theme", "light");
	}
	console.log("click");
});

checkbox.addEventListener("change", function () {});

//adding event listener on numbers
for (let i = 0; i < numbers.length; i++) {
	numbers[i].addEventListener("click", (e) => {
		lowerValue.innerText += e.target.innerText;
	});
}

//adding eventlistener on operators
for (let i = 0; i < operator.length; i++) {
	operator[i].addEventListener("click", (e) => {
		let data = lowerValue.innerText;
		if (e.target.innerText == "C") {
			lowerValue.innerText = "";
			upperValue.innerText = "";
		} else if (!e.target.innerText) {
			lowerValue.innerText = lowerValue.innerText.slice(
				0,
				lowerValue.innerText.length - 1
			);
		} else if (e.target.innerText == "=") {
			const leftPart = parseInt(upperValue.innerText);
			const rightPart = parseInt(lowerValue.innerText);
			const operator = upperValue.innerText.slice(
				-1,
				upperValue.innerText.length
			);
			//evalute the result and update helper function
			evaluate(leftPart, rightPart, operator);
		} else if (data) {
			data += e.target.innerText;
			lowerValue.innerText = "";
			upperValue.innerText = data;
		}
	});
}

function evaluate(x, y, operator) {
	if (operator == "*") {
		upperValue.innerText = "";
		lowerValue.innerText = x * y;
	} else if (operator == "/") {
		upperValue.innerText = "";
		lowerValue.innerText = x / y;
	} else if (operator == "+") {
		upperValue.innerText = "";
		lowerValue.innerText = x + y;
	} else if (operator == "-") {
		upperValue.innerText = "";
		lowerValue.innerText = x - y;
	} else if (operator == "%") {
		upperValue.innerText = "";
		lowerValue.innerText = x % y;
	}
}
