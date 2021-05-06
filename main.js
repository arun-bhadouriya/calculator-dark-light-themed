const numbers = document.getElementsByClassName("number");

const lowerValue = document.getElementById("lower-value");
const upperValue = document.getElementById("upper-value");
const operator = document.getElementsByClassName("operator");
let checkbox = document.querySelector('input[name="theme"]');
let toggleTheme = document.querySelector(".fas.fa-moon");
let expand = document.querySelector(
	"body > div > div.heading > span:nth-child(1) > i"
);
let expEl = document.querySelector("body > div > div.expand");

//array to capture history records
let records = localStorage.getItem("record")
	? JSON.parse(localStorage.getItem("record"))
	: [];

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
			const leftPart = parseFloat(upperValue.innerText);
			const rightPart = parseFloat(lowerValue.innerText);
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
	let record = { firstParam: x, lastParam: y, operator: operator };

	if (operator == "*") {
		upperValue.innerText = "";
		lowerValue.innerText = x * y;
		record.answer = x * y;
	} else if (operator == "/") {
		upperValue.innerText = "";
		lowerValue.innerText = x / y;
		record.answer = x / y;
	} else if (operator == "+") {
		upperValue.innerText = "";
		lowerValue.innerText = x + y;
		record.answer = x + y;
	} else if (operator == "-") {
		upperValue.innerText = "";
		lowerValue.innerText = x - y;
		record.answer = x - y;
	} else if (operator == "%") {
		upperValue.innerText = "";
		lowerValue.innerText = x % y;
		record.answer = x % y;
	}

	records.push(record);

	let expandData = "";
	records.forEach((e) => {
		expandData += `<div class="record">
					
					<span class="query">${
						e.firstParam + e.operator + e.lastParam
					}<span><i class="fas fa-trash-alt"></i></span></span>
					<span class="ans">= ${e.answer}</span>
				</div>`;
	});
	expEl.innerHTML = expandData;

	localStorage.setItem("record", JSON.stringify(records));

	const removeEl = document.querySelectorAll(
		"body > div > div.expand > div.record > span.query > span"
	);
	removeEl.forEach((element) => {
		element.addEventListener("click", (e) => {
			console.log("clicked removeEl");
			element.parentElement.parentElement.remove();
		});
	});
	console.log(removeEl);
}

//expand
let count = 0;
expand.addEventListener("click", () => {
	console.log("click");
	const d = JSON.parse(localStorage.getItem("record"));
	console.log(d);
	let expandData = "";
	d.forEach((e) => {
		expandData += `<div class="record">
					
					<span class="query">${
						e.firstParam + e.operator + e.lastParam
					}<span><i class="fas fa-trash-alt"></i></span></span>
					<span class="ans">= ${e.answer}</span>
				</div>`;
	});
	expEl.innerHTML = expandData;
	const removeEl = document.querySelectorAll(
		"body > div > div.expand > div.record > span.query > span"
	);
	removeEl.forEach((element) => {
		element.addEventListener("click", (e) => {
			console.log("clicked removeEl");
			element.parentElement.parentElement.remove();
		});
	});
	if (records.length) {
		expEl.classList.toggle("show");
	}
});
