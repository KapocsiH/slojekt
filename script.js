import driverData from "./f1_stat.js";
import {Driver} from "./drivers.js";
import {tracks} from "./tracks.js";
import {
	ChooseTeam,
	ChooseDrivers,
	myTeam,
	firstDriverStats,
	setDriver,
	secondDriverStats,
	budget,
} from "./my_team.js";
// import {ChooseTeam} from "./my_team.js";
const drivers = Driver.LoadData(driverData);
export default drivers;

async function main() {
	await ChooseTeam();
	await ChooseDrivers();
	console.log(myTeam);
	findReplacement(firstDriverStats, secondDriverStats);
	console.log(firstDriverStats);
	console.log(secondDriverStats);
	console.log(budget);
	console.log(drivers);
	let budgetForUpgrades = budget;
	const standingOl = document.getElementById("standing-ol");
	const nextRace = document.getElementById("next-race");
	const upgrade = document.getElementById("upgrade");
	const budgetH1 = document.getElementById("budget");
	nextRace.style.display = "block";
	let trackIndex = 0;
	let teams = [];

	for (let index = 0; index < drivers.length; index++) {
		const driver = drivers[index];
		let hasTeam = false;
		let obj = {};
		obj.name = driver.team;
		teams.forEach((object) => {
			if (object.name == driver.team) {
				hasTeam = true;
			}
		});
		if (!hasTeam) {
			obj.points = 0;
			teams.push(obj);
		}
	}

	upgrade.addEventListener("click", () => {
		if (budgetForUpgrades >= 15) {
			drivers.forEach((driver) => {
				if (myTeam == driver.team) {
					driver.teamRating += 5;
				}
			});
			budgetForUpgrades -= 15;
			budgetH1.innerHTML = `Budget: ${budgetForUpgrades}`;
		}
		console.log(drivers);
	});

	nextRace.addEventListener("click", () => {
		upgrade.style.display = "block";

		teams.forEach((team) => {
			team.points = 0;
		});
		const weekend = GetRaceResult();
		const weekendOl = document.getElementById("weekend-ol");
		const standingH1 = document.getElementById("standing-h1");
		const weekendH1 = document.getElementById("weekend-h1");
		const constructorH1 = document.getElementById("constructor-standing-h1");
		const constructorOl = document.getElementById("constructor-standing-ol");
		constructorOl.innerHTML = "";
		weekendOl.innerText = "";
		standingOl.innerText = "";
		weekendH1.innerText = `${tracks[trackIndex]} GP:`;
		drivers.sort(ComparePoints);
		for (let index = 0; index < drivers.length; index++) {
			let WCLi = document.createElement("li");
			let weekendLi = document.createElement("li");
			for (const [key, value] of Object.entries(weekend[index])) {
				weekendLi.innerHTML = `${key}: ${value}`;
				weekendOl.appendChild(weekendLi);
			}
			// logRaceResult(weekendLi, index);
			standingH1.innerText = "Championship Standing:";
			WCLi.innerHTML = `${drivers[index].name} &nbsp &nbsp ${drivers[index].points} points`;
			standingOl.appendChild(WCLi);

			// constructor points
			const driver = drivers[index];

			teams.forEach((team) => {
				if (team.name == driver.team) team.points += driver.points;
			});
		}

		constructorH1.innerText = "Constructor Championship Standing:";
		teams.sort(ComparePoints);
		teams.forEach((teams) => {
			let constructorLi = document.createElement("li");
			constructorLi.innerHTML = `${teams.name} &nbsp &nbsp ${teams.points} points`;
			constructorOl.appendChild(constructorLi);
		});
		trackIndex++;
		if (trackIndex == tracks.length) nextRace.style.display = "none";
		budgetForUpgrades += 5;
		budgetH1.innerText = `Budget: ${budgetForUpgrades}`;
	});

	console.log(firstDriverStats);
	console.log(secondDriverStats);
	console.log(drivers);
}

main();

// function logRaceResult(liElement, index) {
// 	const weekend = GetRaceResult();

// 	for (const [key, value] of Object.entries(weekend[index])) {
// 		console.log(key);
// 		console.log(value);
// 		liElement.innerHTML = `${key}: ${value}`;
// 	}
// }

// function getConstructorStanding() {
// 	let teams = [];
// 	drivers.forEach((element) => {
// 		let obj = {};
// 		obj[element.team] = 0;

// 		if (!teams.includes()) teams.push(obj);
// 	});
// 	console.log(teams);
// }

function findReplacement(first, second) {
	let i = 0;
	drivers.forEach((driver) => {
		if (i < 1 && myTeam == driver.team) {
			changeDrivers(first, driver, ["name", "price", "rating"], 0);
			i++;
		} else if (myTeam == driver.team)
			changeDrivers(second, driver, ["name", "price", "rating"], 1);
	});
}

function changeDrivers(newDriver, oldDriver, keys, i) {
	// Végigmegyünk a kulcsokon
	keys.forEach((key) => {
		// Ellenőrizzük, hogy mindkét objektumban létezik-e ez a kulcs
		if (newDriver.hasOwnProperty(key) && oldDriver.hasOwnProperty(key)) {
			// Felcseréljük az értékeket
			const temp = newDriver[key];
			newDriver[key] = oldDriver[key];
			oldDriver[key] = temp;
		}
	});
	if (i == 0) setDriver(oldDriver, i);
	if (i == 1) setDriver(oldDriver, i);
}

function GetRandomPoints(driverRating, teamRating) {
	const randomNumber = Math.floor(Math.random() * 30 + 1);
	if (randomNumber < 3) return 0;
	const point = driverRating + teamRating + randomNumber;
	return point;
}

function ComparePoints(a, b) {
	return b.points - a.points;
}

function GetRaceResult() {
	let result = [];
	drivers.forEach((driver) => {
		let key = driver.name;
		let obj = {};
		const point = GetRandomPoints(driver.rating, driver.teamRating);
		obj[key] = point;
		obj.points = point;
		result.push(obj);
	});
	result = result.sort(ComparePoints);
	result.forEach((result) => {
		delete result.points;
	});
	console.log(result);
	GetStanding(result);
	return result;
}

function GetStanding(resultList) {
	for (let index = 0; index < 10; index++) {
		const element = resultList[index];
		const driver = Object.keys(element);
		switch (index) {
			case 0:
				drivers.forEach((element) => {
					if (element.name == driver) element.points += 25;
				});
				break;
			case 1:
				drivers.forEach((element) => {
					if (element.name == driver) element.points += 18;
				});
				break;
			case 2:
				drivers.forEach((element) => {
					if (element.name == driver) element.points += 15;
				});
				break;
			case 3:
				drivers.forEach((element) => {
					if (element.name == driver) element.points += 12;
				});
				break;
			case 4:
				drivers.forEach((element) => {
					if (element.name == driver) element.points += 10;
				});
				break;
			case 5:
				drivers.forEach((element) => {
					if (element.name == driver) element.points += 8;
				});
				break;
			case 6:
				drivers.forEach((element) => {
					if (element.name == driver) element.points += 6;
				});
				break;
			case 7:
				drivers.forEach((element) => {
					if (element.name == driver) element.points += 4;
				});
				break;
			case 8:
				drivers.forEach((element) => {
					if (element.name == driver) element.points += 2;
				});
				break;
			case 9:
				drivers.forEach((element) => {
					if (element.name == driver) element.points += 1;
				});
				break;
		}
	}
}
