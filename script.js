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
	console.log(firstDriverStats);
	console.log(secondDriverStats);
	findReplacement(firstDriverStats, secondDriverStats);
	console.log(firstDriverStats);
	console.log(secondDriverStats);
	console.log(budget);
	console.log(drivers);
	let budgetForUpgrades = budget;
	const outerLineUp = document.getElementById("outer-lineup");
	const lineUp = document.getElementById("lineup");
	const lineUpFirst = document.getElementById("lineup-first");
	const lineUpTeam = document.getElementById("lineup-team");
	const lineUpSecond = document.getElementById("lineup-second");
	const standingOl = document.getElementById("standing-ol");
	const nextRace = document.getElementById("next-race");
	const startSeason = document.getElementById("start-season");
	const upgrade = document.getElementById("upgrade");
	const budgetH1 = document.getElementById("budget");

	let trackIndex = 0;
	let teams = [];

	for (let index = 0; index < drivers.length; index++) {
		const driver = drivers[index];
		let hasTeam = false;
		let obj = {};
		obj.name = driver.team;
		obj.picture = driver.teamPicture;
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

	startSeason.style.display = "block";
	outerLineUp.style.display = "flex";

	drivers.forEach((driver) => {
		if (driver.name == firstDriverStats.name) {
			const img = document.createElement("img");
			img.src = `img/drivers/${driver.driverPicture}.png`;
			lineUpFirst.appendChild(img);
		}
	});
	teams.forEach((team) => {
		if (team.name == myTeam) {
			const img = document.createElement("img");
			img.src = `img/teams/${team.picture}.png`;
			lineUpTeam.appendChild(img);
		}
	});
	drivers.forEach((driver) => {
		if (driver.name == secondDriverStats.name) {
			const img = document.createElement("img");
			img.src = `img/drivers/${driver.driverPicture}.png`;
			lineUpSecond.appendChild(img);
		}
	});

	upgrade.addEventListener("click", () => {
		if (budgetForUpgrades >= 15) {
			drivers.forEach((driver) => {
				if (myTeam == driver.team) {
					driver.teamRating += 6;
				}
			});
			budgetForUpgrades -= 15;
			budgetH1.innerHTML = `Budget: 15/${budgetForUpgrades}M`;
		}
		console.log(drivers);
	});

	startSeason.addEventListener("click", displayWeekend);
	nextRace.addEventListener("click", displayWeekend);

	console.log(firstDriverStats);
	console.log(secondDriverStats);
	console.log(drivers);
	function displayWeekend() {
		outerLineUp.style.display = "none";
		startSeason.style.display = "none";
		nextRace.style.display = "block";
		document.getElementById("weekend").style.display = "block";
		document.getElementById("standing").style.display = "block";
		document.getElementById("constructor-standing").style.display = "block";
		document.getElementById("container").classList = "";
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
			let driverImg = document.createElement("img");
			driverImg.src = `img/drivers/${drivers[index].driverPicture}.png`;
			driverImg.classList = "driver-result-img margin";
			let WCLi = document.createElement("li");
			let weekendLi = document.createElement("li");
			for (const [key, value] of Object.entries(weekend[index])) {
				let driverPicture;
				let driverTeam;
				drivers.forEach((driver) => {
					if (driver.name == key) {
						driverPicture = driver.driverPicture;
						driverTeam = driver.team;
					}
				});
				let driverImg = document.createElement("img");
				driverImg.src = `img/drivers/${driverPicture}.png`;
				driverImg.classList = "driver-result-img margin";
				weekendLi.appendChild(driverImg);
				weekendLi.innerHTML += `${key} &nbsp ${driverTeam}`;
				weekendOl.appendChild(weekendLi);
			}
			// logRaceResult(weekendLi, index);
			standingH1.innerText = "Championship Standing:";
			WCLi.appendChild(driverImg);
			WCLi.innerHTML += `${drivers[index].name} &nbsp &nbsp ${drivers[index].points} points`;
			standingOl.appendChild(WCLi);

			// constructor points
			const driver = drivers[index];

			teams.forEach((team) => {
				if (team.name == driver.team) team.points += driver.points;
			});
		}

		constructorH1.innerText = "Constructor Championship Standing:";
		teams.sort(ComparePoints);
		let i = 1;
		teams.forEach((team) => {
			let teamImg = document.createElement("img");
			teamImg.src = `img/teams/${team.picture}.png`;
			teamImg.classList = "team-result-img margin";
			let constructorLi = document.createElement("li");
			constructorLi.innerHTML += `${i}.`;
			constructorLi.appendChild(teamImg);
			constructorLi.innerHTML += `${team.name} &nbsp &nbsp ${team.points} points`;
			constructorOl.appendChild(constructorLi);
			i++;
		});
		trackIndex++;
		if (trackIndex == tracks.length) nextRace.style.display = "none";
		let upgradeCalculator = Math.floor(Math.random() * 30 + 1);
		if (upgradeCalculator >= 20) budgetForUpgrades += 7;
		else if (upgradeCalculator >= 10) budgetForUpgrades += 4;
		else if (upgradeCalculator >= 4) budgetForUpgrades += 2;
		budgetH1.innerText = `Budget: 15/${budgetForUpgrades}M`;
	}
}

main();

function findReplacement(first, second) {
	let i = 0;
	drivers.forEach((driver) => {
		if (i < 1 && myTeam == driver.team && second.name != driver.name) {
			changeDrivers(
				first,
				driver,
				["name", "price", "rating", "driverPicture"],
				0
			);
			i++;
		} else if (myTeam == driver.team)
			changeDrivers(
				second,
				driver,
				["name", "price", "rating", "driverPicture"],
				1
			);
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

document.getElementById("takemethere").addEventListener("click", function () {
	var wrapper = document.getElementById("wrapper");
	var dontdisplay = document.querySelector(".dontdisplay");
	if (wrapper) {
		wrapper.outerHTML = "<!-- " + wrapper.outerHTML + " -->";
		wrapper.classList.add("hidden");
		dontdisplay.classList = "dodisplay";
	}
});
