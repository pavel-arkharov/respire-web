export default {
	namespaced: true, // Important for organization
	state: {
		currentTime: 0,
		isRunning: false,
		isPaused: false,
	},
	mutations: {
		SET_CURRENT_TIME(state, time) {
			state.currentTime = time;
		},
		SET_IS_RUNNING(state, isRunning) {
			state.isRunning = isRunning;
		},
		SET_IS_PAUSED(state, isPaused) {
			state.isPaused = isPaused;
		},
	},
	actions: {
		startCountdown({ commit }) {
			console.log("Starting timer");
			commit("SET_IS_RUNNING", true);
		},
		resetTimer({ commit }) {
			console.log("Resetting timer");
			commit("SET_CURRENT_TIME", 0);
			commit("SET_IS_RUNNING", false);
			commit("SET_IS_PAUSED", false);
		},
	},
};
