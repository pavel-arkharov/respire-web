<template>
	<div class="timer-visualization">
		<p>Phase: {{ currentPhase }}</p>
		<svg viewBox="0 0 100 100">
			<circle
				cx="50"
				cy="50"
				r="45"
				fill="none"
				stroke="#ccc"
				stroke-width="10"
			/>
			<circle
				cx="50"
				cy="50"
				r="45"
				fill="none"
				stroke="#4CAF50"
				stroke-width="10"
				:stroke-dasharray="circumference"
				:stroke-dashoffset="strokeDashoffset"
			/>
		</svg>
		<span class="timer-text">{{ formattedCurrentTime }}</span>
	</div>
</template>

<script>
import { mapState, mapGetters } from "vuex";

export default {
	computed: {
		...mapState("exercise", ["currentPhase"]),
		...mapState("timer", ["currentTime"]),
		...mapGetters("exercise", ["getCurrentPhaseDuration"]),
		circumference() {
			const radius = 45;
			return 2 * Math.PI * radius;
		},
		strokeDashoffset() {
			const phaseDuration = this.getCurrentPhaseDuration;
			if (!phaseDuration) return 0; // Handle case where phase duration is not yet available

			const elapsedPhaseTime = this.currentTime; // Assuming currentTime is relative to the current phase
			const progress = elapsedPhaseTime / phaseDuration;
			return this.circumference * (1 - progress);
		},
		totalDuration() {
			let total = 0;
			const phases = this.$store.state.exercise.phases;
			for (const phase in phases) {
				total += phases[phase];
			}
			return total;
		},
		formattedCurrentTime() {
			const seconds = Math.floor(this.currentTime);
			const milliseconds = Math.floor((this.currentTime - seconds) * 1000);
			return `${seconds.toString().padStart(2, "0")}:${milliseconds
				.toString()
				.padStart(3, "0")}`;
		},
	},
};
</script>

<style scoped>
.timer-visualization {
	display: flex;
	flex-direction: column;
	align-items: center;
	margin-top: 20px; /* Adjust as needed */
}

.timer-visualization svg {
	width: 200px; /* Adjust as needed */
	height: 200px; /* Adjust as needed */
	transform: rotate(-90deg); /* Start the circle from the top */
}

.timer-text {
	font-size: 24px; /* Adjust as needed */
	margin-top: 10px; /* Adjust as needed */
}
</style>
