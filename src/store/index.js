import Vuex from "vuex";
import timer from "./modules/timer";
import exercise from "./modules/exercise";

export default new Vuex.Store({
	modules: {
		timer,
		exercise,
	},
	// getters: {
	// 	getCurrentTime: (state) => {
	// 		return state.timer.currentTime;
	// 	},
	// 	getIsRunning: (state) => {
	// 		return state.timer.isRunning;
	// 	},
	// 	getIsPaused: (state) => {
	// 		return state.timer.isPaused;
	// 	},
	// 	getCurrentPhase: (state) => {
	// 		return state.exercise.currentPhase;
	// 	},
	// },
});
