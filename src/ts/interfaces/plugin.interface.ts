import Plugin from '../plugin-system/plugin.class.ts'

/**
 * ##### Define default plugin interfaces
 */
// Interface for options Object
export interface Options {
  [key: string]: any;
}

// Interface for items in the plugin queue
export interface PluginQueueItem {
  [index: string]: new () => Plugin;
}

// Interface for plugin queue
export interface PluginQueue {
  [index: string]: PluginQueueItem;
}
