import "../css/index.scss";

// Basic imports
import type { Api } from "reveal.js";
import type { Config } from "./config";
import { defaultConfig } from "./config.js";

// Helper imports
import { PluginBase, pluginDebug as debug, pluginCSS } from "reveal.js-plugintoolkit";

// Function imports
import { Verticator } from "./main";

const PLUGIN_ID = "verticator";

const init = async (plugin: PluginBase<Config>, deck: Api, config: Config): Promise<void> => {
	if (debug && config.debug) {
		debug.initialize(true, PLUGIN_ID);
	}

	await pluginCSS(plugin, config);
	await Verticator.create(deck, config);
};

export default () => {
	const plugin = new PluginBase(PLUGIN_ID, init, defaultConfig);
	return plugin.createInterface();
};

export type { Config } from "./config";
