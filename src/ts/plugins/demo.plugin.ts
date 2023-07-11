import Plugin from '../plugin-system/plugin.class.ts'

/**
 * This is a demo ts plugin
 */
export default class DemoPlugin extends Plugin {
  constructor() {
    // call constructor of Plugin class with the plugin name
    super('DemoPlugin')
  }

  initPlugin(htmlElement: HTMLElement): boolean {
    // call the initialize function of Plugin class with the element
    super.initPlugin(htmlElement)

    console.log(this.el) // eslint-disable-line

    return true
  }
}
