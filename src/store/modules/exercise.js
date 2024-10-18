// Define the enum (you can move this to a separate file if you prefer)
const PHASE = {
	INHALE: "inhale",
	HOLD1: "hold1",
	EXHALE: "exhale",
	HOLD2: "hold2",
};

export default {
	namespaced: true,
	state: {
		phases: {
			inhale: 4,
			hold1: 4,
			exhale: 4,
			hold2: 4,
		},
		currentPhase: PHASE.INHALE,
		cycles: [[4, 4, 4, 4]],
		currentCycle: 1,
		rounds: 1,
		currentRound: 1,
	},
	mutations: {
		SET_PHASE_DURATION(state, { phase, duration }) {
			console.log("SET_PHASE_DURATION", phase, duration);
			state.phases[phase] = duration;
		},
		SET_CYCLES(state, cycles) {
			console.log("SET_CYCLES", cycles);
			state.cycles = cycles;
		},
		SET_ROUNDS(state, rounds) {
			console.log("SET_ROUNDS", rounds);
			state.rounds = rounds;
		},
		NEXT_PHASE(state) {
			// ... logic to move to the next phase
		},
		NEXT_CYCLE(state) {
			// ... logic to move to the next cycle
		},
		NEXT_ROUND(state) {
			// ... logic to move to the next round
		},
	},
	actions: {
		GENERATE_CYCLES({ commit, state }) {
			const { inhale, hold1, exhale, hold2 } = state.phases;
			const cycles = [];
			for (let i = 0; i < state.cycles; i++) {
				cycles.push([
					{ phase: PHASE.INHALE, duration: inhale },
					{ phase: PHASE.HOLD1, duration: hold1 },
					{ phase: PHASE.EXHALE, duration: exhale },
					{ phase: PHASE.HOLD2, duration: hold2 },
				]);
			}
			commit("SET_CYCLES", cycles);
		},
	},
};
