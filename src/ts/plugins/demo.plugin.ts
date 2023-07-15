import Plugin from '../plugin-system/plugin.class.ts'
import Formatting from '../helper/formatting.helper.ts'
import Utilities from '../helper/utilities.helper.ts'
import Element from '../helper/element.helper.ts'

/**
 * This is a demo ts plugin
 */
export default class DemoPlugin extends Plugin {
  // define global variables
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

    this.childTestText =
      this.el.querySelector(selectors.childTest) as HTMLElement

    console.log(this.childTestText)
  }

  // register all plugin events
  registerEvents() {
    window.onload = () => console.log('window loaded')
  }

  /* eslint-disable */
  // example function to test helpers
  async examples() {
    this.isTouchDeviceExample()
    this.formatDateExample()
    this.isNodeExample()
    const parent = this.findParentExample() as HTMLElement
    this.getParentExample()
    this.createElementExample(parent)
    this.hideAndShowElementExample()
  }

  // Exapmle for isTouchDevice helper function
  isTouchDeviceExample() {
    const isTouchDevice = Utilities.isTouchDevice()
    console.log('current device is touch device: ', isTouchDevice)
  }

  // Example for formatDate helper function
  formatDateExample() {
    if (this.childTestText !== null) {
      const dateText = this.childTestText.textContent?.trim()
      console.log(dateText)

      const timestamp = dateText || '2023/07/13'
      this.childTestText.textContent = Formatting.formatDate(timestamp)

      console.log(this.childTestText.textContent)
    }
  }

  // Example for isNode helper function
  isNodeExample() {
    const isNode = Element.isNode(this.childTestText)
    console.log('element is node: ', isNode)
  }

  // Example for findParent by selector helper function
  findParentExample(): HTMLElement|null {
    const { selectors } = this.options

    const parent = Element.findParent(this.childTestText, selectors.parent, 6);
    console.log('findParent parent element: ', parent)

    return parent
  }

  // Example for getParent helper function
  getParentExample() {
    const parent2 = Element.getParent(this.childTestText, 3);
    console.log('getParent parent element: ', parent2)
  }

  // Example for element create helper fucntion
  createElementExample(parent: HTMLElement) {
    const { classes } = this.options

    const newElement = Element.create('p', [classes.newElement])
    newElement.textContent = 'Child appended'
    parent?.appendChild(newElement)
  }

  // Example for element hide and show helper functions
  async hideAndShowElementExample() {
    const { selectors, settings } = this.options

    const button = this.el.querySelector(selectors.button) as HTMLElement
    console.log(button)
    Element.hide(button)

    await Utilities.sleep(settings.waitingTimeMilliseconds)

    Element.show(button)
  }
  /* eslint-enable */
}
