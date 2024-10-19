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
		...mapActions("exercise", ["GENERATE_CYCLE", "CLEAR_CYCLE"]),
		updateExerciseSettings() {
			console.log("Exercise settings updated, adding cycle");
			this.GENERATE_CYCLE();
			console.log("Current phaseName", this.getCurrentPhase);
			console.log("Current phase duration", this.getCurrentPhaseDuration);
			this.startTimer(this.getCurrentPhaseDuration);
		},

		startTimer(duration) {
			const timer = new CountDownTimer(duration);
			timer.onTick((minutes, seconds) => {
				// Update the store with the current time
				console.log("seconds", seconds);
				this.SET_CURRENT_TIME(minutes * 60 + seconds);
			});
			timer.onFinish(() => {
				console.log("Timer finished");
			});
			timer.start();
		},
	},
};
</script>

<style>
/* ... styles for layout and presentation */
</style>
