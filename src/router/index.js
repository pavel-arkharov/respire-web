import { createRouter, createWebHistory } from "vue-router";
import BreathingCycle from "@/components/BreathingCycle.vue";

const routes = [
	{
		path: "/",
		name: "BreathingCycle",
		component: BreathingCycle,
	},
];

const router = createRouter({
	history: createWebHistory(),
	routes,
});

export default router;
