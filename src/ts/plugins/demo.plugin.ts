import Plugin from '../plugin-system/plugin.class.ts'
import { formatDate } from '../helper/date.helper.ts'
import { createElement, findParent, getParent } from '../helper/element.helper.ts'

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
    this.thisIsATest()

    return true
  }

  thisIsATest() {
    const parentTestText = this.el.querySelector('.parent-demo-text')
    console.log(parentTestText)

    const parent = findParent(parentTestText, 'parent', 6);
    console.log(parent)

    const parent2 = getParent(parentTestText, 5);
    console.log(parent2)

    const newElement = createElement('div', ['new-element'])
    parent?.appendChild(newElement)
  }
}
