export default {
	namespaced: true,
	state: {
		colorScheme: "light", // or 'dark'
		soundGuidance: false,
		metronome: false,
		// ... other settings (volume, etc.)
	},
	mutations: {
		SET_COLOR_SCHEME(state, scheme) {
			state.colorScheme = scheme;
		},
		// ... other mutations for settings
	},
	actions: {
		// ... actions for settings (e.g., toggleSoundGuidance)
	},
};
