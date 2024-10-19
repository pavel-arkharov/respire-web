class Phase {
	constructor(name, duration) {
		this.name = name;
		this.duration = duration;
	}

	start() {
		console.log(`${this.name} phase started.`);
		// Add logic to handle the start of the phase
	}

	end() {
		console.log(`${this.name} phase ended.`);
		// Add logic to handle the end of the phase
	}

	getDuration() {
		return this.duration;
	}

	getName() {
		return this.name;
	}
}

export default Phase;
