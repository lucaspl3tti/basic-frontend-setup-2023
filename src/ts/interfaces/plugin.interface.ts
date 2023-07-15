import Plugin from '../plugin-system/plugin.class.ts'

export interface Options {
  [key: string]: any;
}

export interface PluginQueueItem {
  [index: string]: new () => Plugin;
}

export interface PluginQueue {
  [index: string]: PluginQueueItem;
}
