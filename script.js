import driverData from "./f1_stat.js";
import {Driver} from "./drivers.js";
import {
	ChooseTeam,
	ChooseDrivers,
	myTeam,
	budget,
	firstDriverStats,
	secondDriverStats,
} from "./my_team.js";
// import {ChooseTeam} from "./my_team.js";
const drivers = Driver.LoadData(driverData);
export default drivers;

async function main() {
	await ChooseTeam();
	await ChooseDrivers();
	console.log(myTeam);
	console.log(firstDriverStats);
	console.log(secondDriverStats);
	console.log(budget);

	findReplacement(firstDriverStats, secondDriverStats);
	console.log(drivers);

	const weekendOl = document.getElementById("weekend-ol");
	const weekend = GetRaceResult();
	const standingOl = document.getElementById("standing-ol");
	const constructorWC = document.getElementById("constructor-standing");

	drivers.sort(ComparePoints);
	for (let index = 0; index < drivers.length; index++) {
		let WCLi = document.createElement("li");
		let weekendLi = document.createElement("li");
		for (const [key, value] of Object.entries(weekend[index])) {
			weekendLi.innerHTML = `${key}: ${value}`;
		}
		weekendOl.appendChild(weekendLi);
		WCLi.innerHTML = `${drivers[index].name} &nbsp &nbsp ${drivers[index].points} point`;
		standingOl.appendChild(WCLi);
	}
	console.log(firstDriverStats);
	console.log(secondDriverStats);
	// HIBA A firstDriverStats és secondDriverStats valamiert konstans ezért értéküket nem lehet változtatni
}

main();

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
	if (i == 0) firstDriverStats = oldDriver; // HIBA MIVEL KONSTANSKENT ERZEKELI
	if (i == 1) secondDriverStats = oldDriver; // HIBA MIVEL KONSTANSKENT ERZEKELI
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
