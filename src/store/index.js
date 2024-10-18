import Vuex from "vuex";
import timer from "./modules/timer";
import settings from "./modules/settings";
import exercise from "./modules/exercise";

export default new Vuex.Store({
	modules: {
		timer,
		settings,
		exercise,
	},
});
