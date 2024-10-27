<template>
	<div class="breathing-cycle">
		<RoundSettings v-if="!isRunning" @submit="updateExerciseSettings" />
		<div>
			<label for="rounds">Number of Rounds:</label>
			<input
				type="number"
				v-model="rounds"
				id="rounds"
				required
				min="1"
				max="5"
				step="1"
			/>
		</div>
		<button v-if="cyclesReady" @click="startExercise">Start</button>

		<CyclesPreview v-if="showPreview" />
		<TimerVisualization v-if="isRunning" />
	</div>
</template>

<script>
import { mapActions, mapGetters, mapMutations, mapState } from "vuex";
import CountDownTimer from "../utils/CountDownTimer";
import RoundSettings from "./RoundSettings.vue";
import TimerVisualization from "./TimerVisualization.vue";
import CyclesPreview from "./CyclesPreview.vue";

export default {
	name: "BreathingCycle",
	components: {
		RoundSettings,
		TimerVisualization,
		CyclesPreview,
	},
	computed: {
		...mapGetters("exercise", [
			"getCurrentPhase",
			"getCurrentPhaseDuration",
			"getCyclesLength",
		]),
		...mapState("timer", ["isRunning"]),
		...mapState("exercise", ["rounds"]),
		cyclesReady() {
			return this.getCyclesLength > 0;
		},
		showPreview() {
			return this.cyclesReady && !this.isRunning;
		},
		rounds: {
			get() {
				return this.$store.state.exercise.rounds;
			},
			set(value) {
				this.$store.commit("exercise/SET_ROUNDS", value);
			},
		},
	},
	onMounted() {
		console.log("BreathingCycle mounted");
	},
	methods: {
		...mapMutations("timer", ["SET_CURRENT_TIME"]),
		...mapActions("timer", ["resetTimer", "startCountdown"]),
		...mapActions("exercise", ["generateCycle", "shiftCycle", "clearCycles"]),
		updateExerciseSettings() {
			console.log("Exercise settings updated, adding cycle");
			this.generateCycle();
		},
		startExercise() {
			console.log("Starting exercise");
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
				this.clearCycles();
			}
		},

		startTimer(duration) {
			this.SET_CURRENT_TIME(duration);
			const timer = new CountDownTimer(duration);
			timer.onTick((minutes, seconds, milliseconds) => {
				this.SET_CURRENT_TIME(minutes * 60 + seconds + milliseconds / 1000);
			});
			timer.onFinish(() => {
				console.log("EMitting timer-finished");
				this.shiftCycle();
				this.startNextCycle();
			});
			this.startCountdown();
			timer.start();
		},
	},
};
</script>

<style scoped>
.breathing-cycle {
	max-width: 600px;
	margin: 0 auto;
	padding: 20px;
	border: 1px solid #ccc;
	border-radius: 8px;
}

.breathing-cycle button {
	display: block;
	width: 100%;
	padding: 10px;
	margin-top: 20px;
	background-color: #007bff;
	color: white;
	border: none;
	border-radius: 4px;
	cursor: pointer;
	font-size: 16px;
}

.breathing-cycle button:hover {
	background-color: #0056b3;
}

.breathing-cycle input {
	width: 80%;
	padding: 8px;
	box-sizing: border-box;
}
</style>
