<template>
	<div class="cycles-preview">
		<h2>Exercise Preview</h2>
		<div v-for="(cycle, index) in cycles" :key="index" class="cycle">
			<h3>Cycle {{ index + 1 }}</h3>
			<ul>
				<li v-for="phase in cycle" :key="phase.phase">
					{{ phase.phase }}: {{ phase.duration }} seconds
				</li>
			</ul>
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
	/* Add your component styles here */
}

.cycle {
	margin-bottom: 20px;
}

.cycle h3 {
	margin: 0;
}

.cycle ul {
	list-style-type: none;
	padding: 0;
}

.cycle li {
	margin: 5px 0;
}
</style>
