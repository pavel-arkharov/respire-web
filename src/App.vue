<template>
	<div id="app" :class="dark">
		<router-view />
	</div>
</template>

<script>
export default {
	name: "App",
	computed: {
		//...mapState("settings", ["colorScheme"]),
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
