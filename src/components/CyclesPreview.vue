<template>
	<div class="cycles-preview">
		<h2>Exercise Preview</h2>
		<div class="cycles-container">
			<div v-for="(cycle, index) in cycles" :key="index" class="cycle">
				<h3>Cycle {{ index + 1 }}</h3>
				<ul>
					<li
						v-for="(phase, phaseIndex) in cycle"
						:key="phaseIndex"
						class="phase"
					>
						<span class="phase-name">{{ phase.phase }}</span>
						<span class="phase-duration">{{ phase.duration }}s</span>
					</li>
				</ul>
			</div>
		</div>
	</div>
</template>

<script>
import { mapState } from "vuex";

export default {
	name: "CyclesPreview",
	computed: {
		...mapState("exercise", ["cycles"]),
	},
};
</script>

<style scoped>
.cycles-preview {
	text-align: center;
}

.cycles-container {
	display: flex;
	flex-direction: column; /* Arrange cycles vertically */
	align-items: center;
	gap: 10px; /* Spacing between cycles */
}

.cycle {
	background-color: #f5f5f5; /* Light background */
	border-radius: 8px;
	padding: 10px;
	width: 80%; /* Adjust width as needed */
}

.cycle h3 {
	margin: 0 0 10px 0; /* Reduce top margin */
}

.cycle ul {
	list-style-type: none;
	padding: 0;
	display: flex;
	flex-direction: column; /* Arrange phases vertically */
	gap: 5px;
}

.phase {
	display: flex;
	justify-content: space-between;
	align-items: center;
	border-bottom: 1px solid #ddd; /* Subtle separator */
	padding-bottom: 5px;
}

.phase-name {
	font-weight: bold;
}
</style>
