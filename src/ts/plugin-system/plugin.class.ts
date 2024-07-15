import { PluginOptions } from '@ts/interfaces/plugin.interface.ts'

type PluginConstructor = Function & { options: { [key: string]: any } } // eslint-disable-line

/**
 * ##### Default plugin class on which every plugin will be build on
 */
export default abstract class Plugin {
  public _el: HTMLElement | undefined
  private _name: string
  public _options: PluginOptions

  /**
   * Plugin constructor method
   */
  public constructor(element: HTMLElement, name: string) {
    const pluginConstructor = this.constructor as PluginConstructor

    this._name = name
    this._el = element

    const options = pluginConstructor.options || {}
    this._options = this._mergeOptions(options)
  }

  _mergeOptions(options: PluginOptions): PluginOptions {
    const dashedPluginName = Formatting.toDashCase(this._name)
    const dataAttributeOptions =
      this.el.getAttribute(`data-${dashedPluginName}-options`) || '{}'

    const merge = {
      ...options,
      ...JSON.parse(dataAttributeOptions),
    }

    return merge
  }

  /**
   * Method to get plugin name
   */
  get name(): string {
    return this._name
  }

  /**
   * Method to get plugin element
   */
  get el(): HTMLElement {
    if (this._el === undefined) {
      throw new Error('Element is not defined')
    }

    return this._el
  }

  /**
   * Method to get plugin options
   */
  get options(): PluginOptions {
    if (this._options === undefined) {
      throw new Error(`Options for the plugin "${this._name}" are not defined`)
    }

    return this._options
  }

  /**
   * Method to initialize plugin
   */
  initialize() {
    throw new Error(
      `The "initialize" method for the plugin "${this._name}" is not defined.` // eslint-disable-line
    )
  }
}
