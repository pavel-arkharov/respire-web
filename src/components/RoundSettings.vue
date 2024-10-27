<template>
	<div class="round-settings">
		<h2>Round Settings</h2>
		<form @submit.prevent="updateExerciseSettings">
			<div>
				<label for="inhale">Inhale Duration (seconds):</label>
				<input
					type="number"
					v-model="inhale"
					id="inhale"
					required
					min="0"
					max="60"
					step="1"
				/>
			</div>
			<div>
				<label for="hold1">Hold Duration (seconds):</label>
				<input
					type="number"
					v-model="hold1"
					id="hold1"
					required
					min="0"
					max="60"
					step="1"
				/>
			</div>
			<div>
				<label for="exhale">Exhale Duration (seconds):</label>
				<input
					type="number"
					v-model="exhale"
					id="exhale"
					required
					min="0"
					max="60"
					step="1"
				/>
			</div>
			<!-- <div>
				<label for="hold2">Hold 2 Duration (seconds):</label>
				<input
					type="number"
					v-model="hold2"
					id="hold2"
					required
					min="0"
					max="60"
					step="1"
				/>
			</div> -->
			<!-- <div>
				<label for="cycles">Number of Cycles:</label>
				<input
					type="number"
					v-model="cycles"
					id="cycles"
					required
					min="1"
					max="5"
					step="1"
				/>
			</div> -->
			<!-- <div>
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
			</div> -->
			<button type="submit">Add breath-cycle</button>
		</form>
	</div>
</template>

<script>
import { mapMutations, mapState } from "vuex";

export default {
	name: "RoundSettings",
	components: {},
	data() {
		return {
			inhale: 4,
			hold1: 4,
			exhale: 4,
			hold2: 4,
			cycles: 1,
			rounds: 1,
		};
	},
	watch: {
		hold1(newVal) {
			this.hold2 = newVal;
		},
	},
	methods: {
		...mapMutations("exercise", [
			"SET_PHASE_DURATION",
			// "SET_CYCLES",
			// "SET_ROUNDS",
		]),
		...mapState("exercise", ["phases"]),
		updateExerciseSettings() {
			console.log("updateExerciseSettings with", {
				inhale: this.inhale,
				hold1: this.hold1,
				exhale: this.exhale,
				hold2: this.hold2,
				// cycles: this.cycles,
				// rounds: this.rounds,
			});
			this.SET_PHASE_DURATION({ phase: "inhale", duration: this.inhale });
			this.SET_PHASE_DURATION({ phase: "hold1", duration: this.hold1 });
			this.SET_PHASE_DURATION({ phase: "exhale", duration: this.exhale });
			this.SET_PHASE_DURATION({ phase: "hold2", duration: this.hold2 });

			this.$emit("exercise-settings-updated");
		},
	},
};
</script>

<style scoped>
.round-settings {
	max-width: 400px;
	margin: 0 auto;
	padding: 20px;
	border: 1px solid #ccc;
	border-radius: 8px;
}

.round-settings h2 {
	text-align: center;
}

.round-settings form div {
	margin-bottom: 10px;
}

.round-settings label {
	display: block;
	margin-bottom: 5px;
}

.round-settings input {
	width: 100%;
	padding: 8px;
	box-sizing: border-box;
}

.round-settings button {
	width: 100%;
	padding: 10px;
	background-color: #007bff;
	color: white;
	border: none;
	border-radius: 4px;
	cursor: pointer;
}

.round-settings button:hover {
	background-color: #0056b3;
}
</style>
