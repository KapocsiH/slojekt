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
	// drivers.forEach((driver) => {
	// 	let obj = {};
	// 	obj.name = driver.team;
	// 	obj.rating = driver.teamRating;
	// 	obj.price = driver.teamPrice;
	// 	teams.push(obj);
	// 	// if (!teams.includes(driver.team)) teams.push(driver.team);
	// });
	for (let index = 0; index < drivers.length; index = index + 2) {
		const element = drivers[index];
		let obj = {};
		obj.name = element.team;
		obj.rating = element.teamRating;
		obj.price = element.teamPrice;
		obj.picture = element.teamPicture;
		teams.push(obj);
	}

	for (let index = 0; index < teams.length; index++) {
		const team = teams[index];
		let teamLi = document.createElement("li");
		let teamImg = document.createElement("img");
		teamImg.src = `img/teams/${team.picture}.png`;
		teamImg.classList = "team-img margin";
		teamLi.appendChild(teamImg);
		teamLi.innerHTML += `${team.name}, &nbsp RATING: ${team.rating}, &nbsp PRICE: ${team.price}`;
		teamOl.appendChild(teamLi);
	}
	await waitForButtonClick(teamButton);

	const choice = Number(teamInput.value);
	for (let index = 0; index < teams.length; index++) {
		const team = teams[index].name;
		if (choice - 1 == index) {
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
		for (let index = 0; index < driversList.length; index++) {
			let driverImg = document.createElement("img");
			const driver = driversList[index];
			driverImg.src = `img/drivers/${driver.picture}.png`;
			driverImg.classList = "driver-img margin";
			let driverLi = document.createElement("li");
			driverLi.appendChild(driverImg);
			driverLi.innerHTML += `${driver.name}, &nbsp RATING: ${driver.rating}, &nbsp PRICE: ${driver.price}`;
			driversOl.appendChild(driverLi);
		}
		driversChoice.style.display = "block";
		await waitForButtonClick(driverButton);
		const choice = Number(driverInput.value);
		driverInput.value = "";

		for (let index = 0; index < driversList.length; index++) {
			const driver = driversList[index];
			if (choice - 1 == index && round == 0) {
				firstDriver = driver.name;
				drivers.forEach((element) => {
					if (element.name == firstDriver) {
						budget -= element.price;
						firstDriverStats = element;
					}

					// if (element.team == myTeam){
					// 	const changedSeat = element;
					// 	element.name = firstDriver;
					// 	ele
					// }
				});
			} else if (choice - 1 == index && round == 1) {
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
