import Vuex from "vuex";

export default new Vuex.Store({
	state: {
		inhaleDuration: 4,
		exhaleDuration: 6,
		holdDuration: 2,
		// ... other state properties
	},
	mutations: {
		SET_INHALE_DURATION(state, duration) {
			state.inhaleDuration = duration;
		},
		// ... other mutations
	},
	actions: {
		// ... actions if needed
	},
});
