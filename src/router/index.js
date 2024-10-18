import { createRouter, createWebHistory } from "vue-router";
import BreathingCycle from "@/components/BreathingCycle.vue";
import SettingsScreen from "@/components/SettingsScreen.vue";

const routes = [
	{
		path: "/",
		name: "BreathingCycle",
		component: BreathingCycle,
	},
	{
		path: "/settings",
		name: "SettingsScreen",
		component: SettingsScreen,
	},
];

const router = createRouter({
	history: createWebHistory(),
	routes,
});

export default router;
