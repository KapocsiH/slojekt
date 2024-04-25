import drivers from "./script.js";
let budget = 100;
let myTeam;
let firstDriver;
let secondDriver;
let firstDriverStats;
let secondDriverStats;
async function ChooseTeam() {
	let teams = [];
	const teamChoice = document.getElementById("team-choice");
	const teamInput = document.getElementById("team-choice-input");
	const teamOl = document.getElementById("team-choice-ol");
	const teamButton = document.getElementById("team-choice-button");

	for (let index = 0; index < drivers.length; index = index + 2) {
		const element = drivers[index];
		let obj = {};
		obj.name = element.team;
		obj.rating = element.teamRating;
		obj.price = element.teamPrice;
		obj.picture = element.teamPicture;
		teams.push(obj);
	}

	let selectedTeamIndex = 0;
	let leftArrowButton;
	let rightArrowButton;
	leftArrowButton = document.createElement("button");
	rightArrowButton = document.createElement("button");
	let div = document.createElement("div");
	let leftArrow = document.createElement("img");
	leftArrow.classList = "arrow-img";
	leftArrow.src = "img/other/arrow_left.png";
	leftArrowButton.appendChild(leftArrow);
	let rightArrow = document.createElement("img");
	rightArrow.classList = "arrow-img";
	rightArrow.src = "img/other/arrow_right.png";
	rightArrowButton.appendChild(rightArrow);
	let teamImg = document.createElement("img");
	const team = teams[selectedTeamIndex];
	teamImg.src = `img/teams/${team.picture}.png`;
	teamImg.classList = "team-img margin";
	div.appendChild(teamImg);
	div.innerHTML += `<span>RATING: ${team.rating} &nbsp PRICE: ${team.price}</span>`;
	let teamLi = document.createElement("li");
	teamLi.classList = "active";
	teamLi.appendChild(leftArrowButton);
	teamLi.appendChild(div);
	teamLi.appendChild(rightArrowButton);
	teamOl.appendChild(teamLi);

	rightArrowButton.addEventListener("click", () => {
		teamOl.innerHTML = "";
		selectedTeamIndex++;
		if (selectedTeamIndex == teams.length) selectedTeamIndex = 0;
		console.log(selectedTeamIndex);
		console.log(teams[selectedTeamIndex]);
		let div = document.createElement("div");
		let teamImg = document.createElement("img");
		const team = teams[selectedTeamIndex];
		teamImg.src = `img/teams/${team.picture}.png`;
		teamImg.classList = "team-img margin";
		div.appendChild(teamImg);
		div.innerHTML += `<span>RATING: ${team.rating} &nbsp PRICE: ${team.price}</span>`;
		let teamLi = document.createElement("li");
		teamLi.classList = "active";
		teamLi.appendChild(leftArrowButton);
		teamLi.appendChild(div);
		teamLi.appendChild(rightArrowButton);
		teamOl.appendChild(teamLi);
		console.log(rightArrowButton);
		console.log(selectedTeamIndex);
	});

	leftArrowButton.addEventListener("click", () => {
		teamOl.innerHTML = "";
		selectedTeamIndex--;
		if (selectedTeamIndex < 0) selectedTeamIndex = teams.length - 1;
		let div = document.createElement("div");
		let teamImg = document.createElement("img");
		const team = teams[selectedTeamIndex];
		teamImg.src = `img/teams/${team.picture}.png`;
		teamImg.classList = "team-img margin";
		div.appendChild(teamImg);
		div.innerHTML += `<span>RATING: ${team.rating} &nbsp PRICE: ${team.price}</span>`;
		let teamLi = document.createElement("li");
		teamLi.classList = "active";
		teamLi.appendChild(leftArrowButton);
		teamLi.appendChild(div);
		teamLi.appendChild(rightArrowButton);
		teamOl.appendChild(teamLi);
		console.log(selectedTeamIndex);
	});

	let confirmButton = document.createElement("button");
	confirmButton.innerText = `Choose`;
	confirmButton.classList = "confirm-button";
	teamChoice.appendChild(confirmButton);

	await waitForButtonClick(confirmButton);

	const choice = selectedTeamIndex;
	for (let index = 0; index < teams.length; index++) {
		const team = teams[index].name;
		if (choice == index) {
			myTeam = team;
			drivers.forEach((element) => {
				if (element.team == myTeam) budget -= element.teamPrice / 2;
			});
		}
	}
	teamChoice.style.display = "none";

	localStorage.setItem("myTeam", myTeam);
	return myTeam;
}

async function ChooseDrivers() {
	const chosenTeam = document.getElementById("chosen-team");
	const remainingBudget = document.getElementById("remaining-budget");
	const driverButton = document.getElementById("driver-choice-button");
	const driverInput = document.getElementById("driver-choice-input");
	const driversChoice = document.getElementById("drivers-choice");
	const driversOl = document.getElementById("drivers-choice-ol");
	let minPriceDriver = drivers[0];
	chosenTeam.innerHTML += `&nbsp ${myTeam}`;
	drivers.forEach((element) => {
		if (element.price < minPriceDriver.price) minPriceDriver = element;
	});
	let confirmButton = document.createElement("button");
	confirmButton.innerText = `Choose`;
	confirmButton.classList = "confirm-button";
	driversChoice.appendChild(confirmButton);
	for (let round = 0; round < 2; round++) {
		let driversList = [];

		remainingBudget.innerHTML = `Budget: &nbsp ${budget}M`;
		drivers.forEach((driver) => {
			if (round == 0) {
				if (driver.price + minPriceDriver.price <= budget) {
					let obj = {};
					obj.name = driver.name;
					obj.rating = driver.rating;
					obj.price = driver.price;
					obj.picture = driver.driverPicture;
					driversList.push(obj);
				}
			} else if (driver.price <= budget && firstDriver != driver.name) {
				let obj = {};
				obj.name = driver.name;
				obj.rating = driver.rating;
				obj.price = driver.price;
				obj.picture = driver.driverPicture;
				driversList.push(obj);
			}
		});
		driversOl.innerHTML = "";

		let selectedDriverIndex = 0;
		let leftArrowButton;
		let rightArrowButton;
		leftArrowButton = document.createElement("button");
		rightArrowButton = document.createElement("button");
		let div = document.createElement("div");
		let leftArrow = document.createElement("img");
		leftArrow.classList = "arrow-img";
		leftArrow.src = "img/other/arrow_left.png";
		leftArrowButton.appendChild(leftArrow);
		let rightArrow = document.createElement("img");
		rightArrow.classList = "arrow-img";
		rightArrow.src = "img/other/arrow_right.png";
		rightArrowButton.appendChild(rightArrow);
		let driverImg = document.createElement("img");
		const driver = driversList[selectedDriverIndex];
		driverImg.src = `img/drivers/${driver.picture}.png`;
		driverImg.classList = "driver-img margin";
		div.appendChild(driverImg);
		div.innerHTML += `<span>${driver.name} &nbsp RATING: ${driver.rating} &nbsp PRICE: ${driver.price}</span>`;
		let driverLi = document.createElement("li");
		driverLi.classList = "active";
		driverLi.appendChild(leftArrowButton);
		driverLi.appendChild(div);
		driverLi.appendChild(rightArrowButton);
		driversOl.appendChild(driverLi);

		rightArrowButton.addEventListener("click", () => {
			driversOl.innerHTML = "";
			selectedDriverIndex++;
			if (selectedDriverIndex == driversList.length) selectedDriverIndex = 0;
			console.log(selectedDriverIndex);
			console.log(driversList[selectedDriverIndex]);
			let div = document.createElement("div");
			let driverImg = document.createElement("img");
			const driver = driversList[selectedDriverIndex];
			driverImg.src = `img/drivers/${driver.picture}.png`;
			driverImg.classList = "driver-img margin";
			div.appendChild(driverImg);
			div.innerHTML += `<span>${driver.name} &nbsp RATING: ${driver.rating} &nbsp PRICE: ${driver.price}</span>`;
			let driverLi = document.createElement("li");
			driverLi.classList = "active";
			driverLi.appendChild(leftArrowButton);
			driverLi.appendChild(div);
			driverLi.appendChild(rightArrowButton);
			driversOl.appendChild(driverLi);
			console.log(rightArrowButton);
			console.log(selectedDriverIndex);
		});

		leftArrowButton.addEventListener("click", () => {
			driversOl.innerHTML = "";
			selectedDriverIndex--;
			if (selectedDriverIndex < 0) selectedDriverIndex = driversList.length - 1;
			let div = document.createElement("div");
			let driverImg = document.createElement("img");
			const driver = driversList[selectedDriverIndex];
			driverImg.src = `img/drivers/${driver.picture}.png`;
			driverImg.classList = "driver-img margin";
			div.appendChild(driverImg);
			div.innerHTML += `<span>${driver.name} &nbsp RATING: ${driver.rating} &nbsp PRICE: ${driver.price}</span>`;
			let driverLi = document.createElement("li");
			driverLi.classList = "active";
			driverLi.appendChild(leftArrowButton);
			driverLi.appendChild(div);
			driverLi.appendChild(rightArrowButton);
			driversOl.appendChild(driverLi);
			console.log(selectedDriverIndex);
		});

		driversChoice.style.display = "block";

		await waitForButtonClick(confirmButton);
		const choice = selectedDriverIndex;
		for (let index = 0; index < driversList.length; index++) {
			const driver = driversList[index];
			if (choice == index && round == 0) {
				firstDriver = driver.name;
				drivers.forEach((element) => {
					if (element.name == firstDriver) {
						budget -= element.price;
						firstDriverStats = element;
					}
				});
			} else if (choice == index && round == 1) {
				secondDriver = driver.name;
				drivers.forEach((element) => {
					if (element.name == secondDriver) {
						budget -= element.price;
						secondDriverStats = element;
					}
				});
			}
		}
	}

	driversChoice.style.display = "none";
	document.getElementById("container").classList = "";
}

function waitForButtonClick(button) {
	return new Promise((resolve) => {
		button.addEventListener("click", () => {
			resolve(); // A gombnyomásra az ígéret teljesül
		});
	});
}
function setDriver(newDriver, i) {
	if (i == 0) firstDriverStats = newDriver;
	if (i == 1) secondDriverStats = newDriver;
}

export {
	ChooseTeam,
	ChooseDrivers,
	myTeam,
	budget,
	firstDriverStats,
	setDriver,
	secondDriverStats,
};
