const numbers = document.getElementsByClassName("number");

const lowerValue = document.getElementById("lower-value");
const upperValue = document.getElementById("upper-value");
const operator = document.getElementsByClassName("operator");
let checkbox = document.querySelector('input[name="theme"]');
let toggleTheme = document.querySelector(".fas.fa-moon");
let expand = document.querySelector(
	"body > div.calculator > div.heading > span:nth-child(1)"
);
let expEl = document.querySelector("body > div.expand");

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
			console.log(operator);
			if (
				operator == "+" ||
				operator == "-" ||
				operator == "*" ||
				operator == "/"
			) {
				evaluate(leftPart, rightPart, operator);
			} else {
				lowerValue.innerText = `${power(leftPart, rightPart)}`;
			}
		} else if (e.target.innerText == "sqrt") {
			if (lowerValue.innerText)
				lowerValue.innerText = `${sqrt(parseFloat(lowerValue.innerText))}`;
		} else if (e.target.innerText == "log2") {
			if (lowerValue.innerText)
				lowerValue.innerText = `${logbase2(parseFloat(lowerValue.innerText))}`;
		} else if (e.target.innerText == "logE") {
			if (lowerValue.innerText)
				lowerValue.innerText = `${logbaseE(parseFloat(lowerValue.innerText))}`;
		} else if (e.target.innerText == "log10") {
			if (lowerValue.innerText)
				lowerValue.innerText = `${logbase10(parseFloat(lowerValue.innerText))}`;
		} else if (e.target.innerText == "pow") {
			upperValue.innerText = lowerValue.innerText;
			lowerValue.innerText = "";
		} else if (data) {
			data += e.target.innerText;
			lowerValue.innerText = "";
			upperValue.innerText = data;
		}
	});
}

function evaluate(x, y, operator) {
	let record = { firstParam: x, lastParam: y, operator: operator };

	upperValue.innerText = "";
	lowerValue.innerText = BasicOperations(x, y, operator);
	record.answer = lowerValue.innerText;
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
		"body > div.expand > div.record > span.query > span"
	);
	removeEl.forEach((element) => {
		element.addEventListener("click", (e) => {
			console.log("clicked removeEl");
			e.parentElement.parentElement.remove();
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
		"body > div.expand.show > div:nth-child(1) > span.query > span > i"
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

//calculation functions
//add function

function BasicOperations(x, y, operator) {
	if (operator == "*") {
		return x * y;
	} else if (operator == "/") {
		return x / y;
	} else if (operator == "+") {
		return x + y;
	} else if (operator == "-") {
		return x - y;
	} else if (operator == "%") {
		return x % y;
	} else {
		return 0;
	}
}

//square Root
function sqrt(num) {
	return Math.sqrt(num);
}

//Log base 2
function logbase2(num) {
	return Math.log2(num);
}
//Log base 10
function logbase10(num) {
	return Math.log10(num);
}

//Log Base E
function logbaseE(num) {
	return Math.log(num);
}

//power
function power(x, y) {
	return Math.pow(x, y);
}
