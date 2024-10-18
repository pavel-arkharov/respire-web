<template>
	<div class="breathing-cycle">
		<RoundSettings @submit="updateExerciseSettings" />

		<TimerVisualization />
	</div>
</template>

<script>
import { mapMutations } from "vuex";
import CountDownTimer from "../utils/CountDownTimer";
import RoundSettings from "./RoundSettings.vue";
import TimerVisualization from "./TimerVisualization.vue";

export default {
	name: "BreathingCycle",
	components: {
		RoundSettings,
		TimerVisualization,
	},
	methods: {
		...mapMutations("timer", ["SET_CURRENT_TIME"]),
		updateExerciseSettings() {
			console.log("Exercise settings updated, starting timer");
			this.startTimer();
		},
		startTimer() {
			const timer = new CountDownTimer(
				this.$store.state.exercise.phases.inhale
			);
			timer.onTick((minutes, seconds) => {
				// Update the store with the current time
				console.log("seconds", seconds);
				this.SET_CURRENT_TIME(minutes * 60 + seconds);
			});
			timer.start();
		},
	},
};
</script>

<style>
/* ... styles for layout and presentation */
</style>
