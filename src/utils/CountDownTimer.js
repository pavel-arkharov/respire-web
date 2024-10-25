export default function CountDownTimer(duration, granularity = 100) {
	this.duration = duration;
	this.granularity = granularity;
	this.tickFtns = [];
	this.running = false;
}

CountDownTimer.prototype.start = function () {
	if (this.running) {
		return;
	}
	this.running = true;
	var start = performance.now(),
		that = this,
		diff,
		obj;
	obj = CountDownTimer.parse(this.duration);

	(function timer() {
		diff = that.duration - (performance.now() - start) / 1000;

		if (diff > 0) {
			setTimeout(timer, that.granularity);
		} else {
			diff = 0;
			that.running = false;

			if (that.onFinish) {
				that.onFinish();
			}
		}

		obj = CountDownTimer.parse(diff);
		console.log(obj);
		that.tickFtns.forEach(function (ftn) {
			ftn.call(this, obj.minutes, obj.seconds, obj.milliseconds);
		}, that);
	})();
};

CountDownTimer.prototype.onTick = function (ftn) {
	if (typeof ftn === "function") {
		this.tickFtns.push(ftn);
	}
	return this;
};

CountDownTimer.prototype.onFinish = function (ftn) {
	if (typeof ftn === "function") {
		this.onFinish = ftn;
	}
	return this;
};

CountDownTimer.prototype.expired = function () {
	return !this.running;
};

CountDownTimer.parse = function (seconds) {
	const minutes = Math.floor(seconds / 60);
	const remainingSeconds = Math.floor(seconds % 60);
	const milliseconds = Math.floor((seconds % 1) * 1000);
	return {
		minutes: minutes,
		seconds: remainingSeconds,
		milliseconds: milliseconds,
	};
};
