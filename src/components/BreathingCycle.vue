<template>
	<div class="breathing-cycle">
		<RoundSettings @submit="updateExerciseSettings" />

		<TimerVisualization />
	</div>
</template>

<script>
import { mapActions, mapGetters, mapMutations, mapState } from "vuex";
import CountDownTimer from "../utils/CountDownTimer";
import RoundSettings from "./RoundSettings.vue";
import TimerVisualization from "./TimerVisualization.vue";

export default {
	name: "BreathingCycle",
	components: {
		RoundSettings,
		TimerVisualization,
	},
	computed: {
		...mapGetters("exercise", ["getCurrentPhase", "getCurrentPhaseDuration"]),
	},
	onMounted() {
		console.log("BreathingCycle mounted");
	},
	methods: {
		...mapMutations("timer", ["SET_CURRENT_TIME"]),
		...mapActions("timer", ["resetTimer"]),
		...mapActions("exercise", ["generateCycle", "shiftCycle", "CLEAR_CYCLE"]),
		updateExerciseSettings() {
			console.log("Exercise settings updated, adding cycle");
			this.generateCycle();
			this.startNextCycle();
		},
		startNextCycle() {
			console.log("Starting next cycle");
			const nextPhase = this.getCurrentPhaseDuration;
			if (nextPhase) {
				console.log("Starting next phase with duration", nextPhase);
				this.startTimer(nextPhase);
			} else {
				console.log("All cycles finished");
				this.resetTimer();
			}
		},

		startTimer(duration) {
			const timer = new CountDownTimer(duration);
			timer.onTick((minutes, seconds) => {
				// Update the store with the current time
				console.log("seconds", seconds);
				this.SET_CURRENT_TIME(minutes * 60 + seconds);
			});
			timer.onFinish(() => {
				console.log("EMitting timer-finished");
				this.shiftCycle();
				console.log("Timer finished, got Current phaseName");
				this.startNextCycle();
			});
			timer.start();
		},
	},
};
</script>

<style>
/* ... styles for layout and presentation */
</style>
