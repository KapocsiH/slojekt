class Driver {
	constructor(row) {
		// nev + szam;csapat;ertek;rating;csapat rating;pont
		const splitted = row.split(";");
		this.name = splitted[0];
		this.team = splitted[1];
		this.price = Number(splitted[2]);
		this.rating = Number(splitted[3]);
		this.teamRating = Number(splitted[4]);
		this.points = Number(splitted[5]);
		this.teamPrice = Number(splitted[6]);
		this.driverPicture = splitted[7];
		this.teamPicture = splitted[8];
	}

	static LoadData(driverData) {
		let drivers = [];
		driverData.forEach((driver) => {
			drivers.push(new Driver(driver));
		});
		return drivers;
	}
}
export {Driver};
