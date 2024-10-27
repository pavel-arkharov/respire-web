import { PHASE } from "@/constants";

const initialPhases = {
	inhale: 4,
	hold1: 4,
	exhale: 4,
	hold2: 4,
};

export default {
	namespaced: true,
	state: {
		phases: initialPhases,
		cycles: [],
		currentPhase: PHASE.INHALE,
		currentCycleIndex: 0,
		rounds: 1,
	},
	getters: {
		getCurrentPhase(state) {
			if (state.cycles.length === 0) {
				return null; // No cycles defined yet
			}
			const currentCycle = state.cycles[state.currentCycleIndex];
			if (currentCycle.length === 0) {
				return null; // Current cycle is empty
			}
			return currentCycle[0]; // Return the first item
		},
		getCurrentPhaseName(state) {
			if (state.cycles.length === 0) {
				return null; // No cycles defined yet
			}
			const currentCycle = state.cycles[state.currentCycleIndex];
			if (currentCycle.length === 0) {
				return null; // Current cycle is empty
			}
			return currentCycle[0].phase; // Return the phase of the first item
		},
		getCurrentPhaseDuration(state) {
			if (state.cycles.length === 0) {
				return null; // No cycles defined yet
			}
			const currentCycle = state.cycles[state.currentCycleIndex];
			if (currentCycle.length === 0) {
				return null; // Current cycle is empty
			}
			return currentCycle[0].duration; // Return the duration of the first item
		},
		getCyclesLength(state) {
			return state.cycles.length;
		},
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
		APPEND_CYCLE(state, cycle) {
			console.log("Cycles state before:", state.cycles);
			console.log("APPEND_CYCLE", cycle);
			state.cycles.push(cycle);
			console.log("Cycles state after:", state.cycles);
		},
		SHIFT_CYCLE(state) {
			// Remove the first item from the current cycle
			const currentCycle = state.cycles[state.currentCycleIndex];
			currentCycle.shift();

			// If the current cycle is empty, move to the next cycle
			if (
				currentCycle.length === 0 &&
				state.currentCycleIndex < state.cycles.length - 1
			) {
				state.currentCycleIndex++;
			}
		},
		CLEAR_CYCLES(state) {
			console.log("CLEAR_CYCLES");
			state.phases = initialPhases;
			if (state.cycles.length > 0) {
				console.log("Cycles length is greater than 0");
				state.cycles = [];
			} else {
				console.log("Cycles length is 0");
			}
			state.currentCycleIndex = 0;
		},
	},
	watch: {
		cycles: {
			handler(cycles) {
				console.log("Cycles updated:", cycles);
			},
			deep: true,
		},
	},
	actions: {
		generateCycle({ commit, state }) {
			const { inhale, hold1, exhale, hold2 } = state.phases;

			console.log("generateCycle", inhale, hold1, exhale, hold2);

			const cycle = [
				{ phase: PHASE.INHALE, duration: inhale },
				{ phase: PHASE.HOLD1, duration: hold1 },
				{ phase: PHASE.EXHALE, duration: exhale },
				{ phase: PHASE.HOLD2, duration: hold2 },
			];
			console.log("Generated cycle:", cycle);
			commit("APPEND_CYCLE", cycle);
		},
		shiftCycle({ commit }) {
			commit("SHIFT_CYCLE");
		},
		clearCycles({ commit }) {
			commit("CLEAR_CYCLES");
		},
	},
};
