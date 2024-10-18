import Timer from "@/utils/Timer"; // Assuming you create Timer.js in src/utils

const timer = new Timer();

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
		startTimer({ commit, state }) {
			timer.onTimeUpdate((time) => {
				commit("SET_CURRENT_TIME", time);
			});
			timer.start(state.duration);
			commit("SET_IS_RUNNING", true);
		},

		pauseTimer({ commit }) {
			timer.pause();
			commit("SET_IS_PAUSED", true);
		},
		resumeTimer({ commit }) {
			timer.resume();
			commit("SET_IS_PAUSED", false);
		},
		resetTimer({ commit }) {
			timer.stop();
			commit("SET_CURRENT_TIME", 0);
			commit("SET_IS_RUNNING", false);
			commit("SET_IS_PAUSED", false);
		},
	},
};
