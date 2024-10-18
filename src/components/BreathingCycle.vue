<template>
	<div class="breathing-cycle">
		<div class="phase-display">
			<span class="phase-name">{{ currentPhaseName }}</span>
			<span class="timer">{{ formattedCurrentTime }}</span>
		</div>

		<RoundSettings @exercise-settings-updated="handleSettingsUpdated" />
		<div class="controls">
			<button @click="startExercise" :disabled="isRunning">Start</button>
			<button @click="pauseExercise" v-if="isRunning && !isPaused">
				Pause
			</button>
			<button @click="resumeExercise" v-if="isPaused">Resume</button>
			<button @click="resetExercise">Reset</button>
		</div>

		<RoundSettings @exercise-settings-updated="updateExerciseSettings" />
	</div>
</template>

<script>
import { mapState, mapActions, mapMutations } from "vuex";
//import TimerVisualization from "./TimerVisualization.vue";
import RoundSettings from "./RoundSettings.vue";

export default {
	name: "BreathingCycle",
	components: {
		RoundSettings,
	},
	mounted() {
		this.$root.$on("exercise-settings-updated", this.updateExerciseSettings);
	},
	beforeDestroy() {
		this.$root.$off("exercise-settings-updated", this.updateExerciseSettings);
	},
	computed: {
		...mapState("timer", ["currentTime", "isRunning", "isPaused"]),
		...mapState("exercise", [
			"phases",
			"currentPhase",
			"cycles",
			"currentCycle",
			"rounds",
			"currentRound",
		]),
		currentPhaseName() {
			return this.phases[this.currentPhase].name;
		},
		formattedCurrentTime() {
			return this.currentTime.toString();
		},
	},
	methods: {
		...mapActions("timer", [
			"startTimer",
			"pauseTimer",
			"resumeTimer",
			"resetTimer",
		]),
		...mapMutations("exercise", [
			"SET_PHASE_DURATION",
			// ... other mutations to update exercise state
		]),
		startExercise() {
			// 1. Get exercise settings from RoundSettings component or store
			// 2. Initialize cycles and rounds in the store (using mutations)
			// 3. Dispatch startTimer()
		},
		pauseExercise() {
			// ... dispatch pauseTimer()
		},
		resumeExercise() {
			// ... dispatch resumeTimer()
		},
		resetExercise() {
			// ... dispatch resetTimer() and reset exercise state in the store
		},
		handleSettingsUpdated() {
      // This method will be called when the event is emitted
      console.log('Exercise settings updated!');

      // 1. Access the exercise settings from the Vuex store
      // 2. (Optional) Validate the settings if needed
      // 3. Generate the cycles array based on the settings
      // 4. Start the timer
    }
		updateExerciseSettings(exercise) {
			this.SET_PHASE_DURATION({
				phase: "inhale",
				duration: exercise.inhale,
			});
			this.SET_PHASE_DURATION({
				phase: "hold1",
				duration: exercise.hold1,
			});
			this.SET_PHASE_DURATION({
				phase: "exhale",
				duration: exercise.exhale,
			});
			this.SET_PHASE_DURATION({
				phase: "hold2",
				duration: exercise.hold2,
			});
			this.SET_CYCLES(exercise.cycles);
			this.SET_ROUNDS(exercise.rounds);
			this.startExercise();
		},
	},
};
</script>

<style>
/* ... styles for layout and presentation */
</style>
