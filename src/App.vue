<template>
	<div id="app" :class="colorScheme">
		<router-view />
	</div>
</template>

<script>
import { mapState } from "vuex";

export default {
	computed: {
		...mapState("settings", ["colorScheme"]),
	},
};
</script>

<style>
#app {
	/* Basic app-wide styles */
	font-family: Avenir, Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	text-align: center;
	color: #2c3e50;
}

/* Example
  color scheme classes */
.light {
	background-color: #ffffff;
}

.dark {
	background-color: #222;
	color: #fff;
}
</style>
