import { PluginQueue } from '@ts/interfaces/plugin.interface.ts'
import Plugin from './plugin.class.ts'

/**
 * ##### Plugin Manager used to easily register and initialize plugins
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

    document.addEventListener('DOMContentLoaded', () => {
      this.initializePlugins()
    })
  }

  /**
   * Function to register a given plugin
   */
  registerPlugin(
    PluginCallback: new (element: HTMLElement, name: string) => Plugin,
    pluginName: string,
    selector: string,
  ): void {
    if (this.documentLoaded) {
      return
    }

    if (this.pluginQueue[pluginName] === undefined) {
      this.pluginQueue[pluginName] = {}
    }

    this.pluginQueue[pluginName][selector] = PluginCallback
  }

  /**
   * Function to initialize all registered plugins
   */
  public initializePlugins(): void {
    if (this.documentLoaded) {
      return
    }

    this.documentLoaded = true

    for (const pluginName in this.pluginQueue) {
      const pluginQueueItem = this.pluginQueue[pluginName]

      for (const pluginSelector in pluginQueueItem) {
        this.initializePlugin(
          pluginSelector,
          pluginName,
          pluginQueueItem[pluginSelector],
        )
      }
    }
  }

  /**
   * Function to initialize one plugin
   */
  public initializePlugin(
    pluginSelector: string,
    pluginName: string,
    PluginCallback: new (element: HTMLElement, name: string) => Plugin,
  ): void {
    const elements = document.querySelectorAll(pluginSelector)

    elements.forEach((element: Element) => {
      const pluginEl = element as HTMLElement
      const plugin = new PluginCallback(pluginEl, pluginName)

      plugin.initialize()
    })
  }
}
