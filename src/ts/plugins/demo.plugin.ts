import Plugin from '../plugin-system/plugin.class.ts'
import formatDate from '../helper/date.helper.ts'
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
    const childTestText = this.el.querySelector('.parent-demo-text')

    if (childTestText !== null) {
      const timestamp = childTestText.textContent || '2023-07-13'
      childTestText.textContent = formatDate(timestamp)
    }

    const parent = findParent(childTestText, '.parent', 6);
    console.log(parent) // eslint-disable-line

    const parent2 = getParent(childTestText, 3);
    console.log(parent2) // eslint-disable-line

    const newElement = createElement('p', ['new-element'])
    newElement.textContent = 'Child appended'
    parent?.appendChild(newElement) // eslint-disable-line
  }
}
