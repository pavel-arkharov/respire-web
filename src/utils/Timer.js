// src/utils/Timer.js
export default class Timer {
	constructor() {
		this.currentTime = 0;
		this.isRunning = false;
		this.isPaused = false;
		this.intervalId = null;
		this.startTime = 0; // To keep track of when the timer started
		this.elapsedTime = 0; // To track elapsed time when paused
	}

	start(duration) {
		if (this.isRunning) return;

		this.isRunning = true;
		this.startTime = Date.now() - this.elapsedTime;

		this.intervalId = setInterval(() => {
			if (!this.isPaused) {
				this.currentTime = duration - (Date.now() - this.startTime) / 1000;
				if (this.currentTime <= 0) {
					this.stop();
					this.currentTime = 0; // Ensure it doesn't go negative
				}
				this.onTimeUpdate(this.currentTime);
			}
		}, 10); // Update every 10 milliseconds for smoother updates
	}

	pause() {
		if (!this.isRunning || this.isPaused) return;
		this.isPaused = true;
		this.elapsedTime = Date.now() - this.startTime;
		clearInterval(this.intervalId);
	}

	resume() {
		if (!this.isRunning || !this.isPaused) return;
		this.isPaused = false;
		this.startTime = Date.now() - this.elapsedTime;
		this.start();
	}

	stop() {
		clearInterval(this.intervalId);
		this.isRunning = false;
		this.isPaused = false;
		this.elapsedTime = 0;
	}

	onTimeUpdate(callback) {
		if (typeof callback === "function") {
			callback(this.currentTime); // Call the callback with the current time
		}
	}
}
