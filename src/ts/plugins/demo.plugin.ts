import Plugin from '../plugin-system/plugin.class.ts'
import Formatting from '../helper/formatting.helper.ts'
import Utilities from '../helper/utilities.helper.ts'
import Element from '../helper/element.helper.ts'

/**
 * This is a demo ts plugin
 */
export default class DemoPlugin extends Plugin {
  // define global Variables
  private childTestText: HTMLElement | null

  // define plugin options
  static options = {
    selectors: {
      childTest: '.parent-demo-text',
      parent: '.parent',
      button: '.btn',
    },

    classes: {
      newElement: 'new-element',
    },

    settings: {
      waitingTimeMilliseconds: 2000
    }
  }

  constructor() {
    super()

    // set default values for all global variables
    this.childTestText = null
  }

  // Initialize plugin
  initPlugin() {
    console.log(this.el) // eslint-disable-line
    console.log(this.options) // eslint-disable-line

    this.queryInitialElements()
    this.registerEvents()
    this.examples()
  }

  // get initial elements for global scope
  queryInitialElements() {
    const { selectors } = this.options

    this.childTestText = this.el.querySelector(selectors.childTest) as HTMLElement
    console.log(this.childTestText)
  }

  // register all plugin events
  registerEvents() {
    document.addEventListener('DOMContentLoaded', () => {
      console.log('Dom content was loaded successfully')
    })
  }

  // example function to test helpers
  async examples() {
    const { selectors, classes, settings } = this.options

    // Exapmle for isTouchDevice helper function
    const isTouchDevice = Utilities.isTouchDevice()
    console.log('current device is touchd device: ', isTouchDevice) // eslint-disable-line

    // Example for formatDate helper function
    if (this.childTestText !== null) {
      const timestamp = this.childTestText.textContent || '2023-07-13'
      this.childTestText.textContent = Formatting.formatDate(timestamp)
    }

    // Example for isNode helper function
    const isNode = Element.isNode(this.childTestText)
    console.log('element is node: ', isNode) // eslint-disable-line

    // Example for findParent by selector helper function
    const parent = Element.findParent(this.childTestText, selectors.parent, 6);
    console.log('findParent parent element: ', parent) // eslint-disable-line

    // Example for getParent helper function
    const parent2 = Element.getParent(this.childTestText, 3);
    console.log('getParent parent element: ', parent2) // eslint-disable-line

    // Example for element create helper fucntion
    const newElement = Element.create('p', [classes.newElement])
    newElement.textContent = 'Child appended'
    parent?.appendChild(newElement) // eslint-disable-line

    // Example for element hide and show helper functions
    const button = this.el.querySelector(selectors.button) as HTMLElement
    console.log(button)
    Element.hide(button)

    await Utilities.sleep(settings.waitingTimeMilliseconds)

    Element.show(button)
  }
}
