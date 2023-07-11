import Plugin from './plugin.class'

interface PluginQueueItem {
    [index: string]: new() => Plugin
}

interface PluginQueue {
    [index: string]: PluginQueueItem
}

/**
 * Plugin Manager used to easily register and initialize plugins
 */
export default class PluginManager {
    private pluginQueue: PluginQueue
    private documentLoaded: boolean

    /**
     * Plugin manager constructor method
     */
    constructor() {
        this.pluginQueue = {}
        this.documentLoaded = false

        document.addEventListener('DOMContentLoaded', () => this.initPlugins())
    }

    /**
     * Function to register a given plugin
     */
    registerPlugin(pluginCallback: new() => Plugin, selector: string): void {
        if (this.documentLoaded) return

        if (this.pluginQueue[pluginCallback.name] === undefined)
            this.pluginQueue[pluginCallback.name] = {}

        this.pluginQueue[pluginCallback.name][selector] = pluginCallback
    }

    /**
     * Function to initialize all registered plugins
     */
    public initPlugins(): void {
        if (this.documentLoaded) return
        this.documentLoaded = true

        for (let pluginName in this.pluginQueue) {
            let pluginQueueItem = this.pluginQueue[pluginName]

            for (let pluginSelector in pluginQueueItem) {
                this.initPlugin(pluginSelector, pluginQueueItem[pluginSelector])
            }
        }
    }

    /**
     * Function to initialize one plugin
     */
    public initPlugin(pluginSelector: string, pluginCallback: new() => Plugin): void {
        let elements = document.querySelectorAll(pluginSelector)

        elements.forEach(element => {
            let plugin = new pluginCallback()
            plugin.initPlugin(element as HTMLElement)
        })
    }
}
