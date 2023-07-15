import Selector from "./selector.helper.ts"

/**
 * Element helper functions
 */
export default class Element {
  /**
   * Define error messages for helper functions
   */
  static errorMessages = {
    create: {
      elementTagNotValid: "Element tag for creating the element is not valid",
    },
    hide: {
      elementIsNull: "Element to hide must not be null",
    },
    show: {
      elementIsNull: "Element to show must not be null",
    },
    findParent: {
      elementIsNull: "Child element could not be found",
      selectorNotValid:
        "The given selector is not valid, please check if it is an id or class selector", // eslint-disable-line
    },
    getParent: {
      elementIsNull: "Child element in getParent could not be found",
    },
  }

  /**
   * Helper function to check if a given element is an HTML node
   */
  static isNode(element: HTMLElement | null) {
    if (!(element instanceof Object) || element === null) return false

    return element instanceof Node
  }

  /**
   * Helper function to create a new element in the dom
   */
  static create(elementTag: string, classes: Array<string> = []): HTMLElement {
    if (elementTag === '')
      throw new Error(this.errorMessages.create.elementTagNotValid)

    const element = document.createElement(elementTag)
    if (classes.length > 0) element.classList.add(...classes)

    return element
  }

  /**
   * Helper function to hide an element in the dom
   */
  static hide(element: HTMLElement | null, hiddenClass = '') {
    if (element === null) throw new Error(this.errorMessages.hide.elementIsNull)
    if (hiddenClass === '') return element.style.display = 'none'

    element.classList.add(hiddenClass)
  }

  /**
   * Helper function to show an element in the dom
   */
  static show(
    element: HTMLElement | null,
    showClass = '',
    displayStyle = 'block'
  ) {
    if (element === null) throw new Error(this.errorMessages.show.elementIsNull)
    if (showClass === '') return element.style.display = displayStyle

    element.classList.add(showClass)
  }

  /**
   * Helper function to find parent of an element by a given selector
   * (either id or class)
   */
  static findParent(
    childElement: HTMLElement | null,
    searchedSelector: string,
    iterationLimit = 5,
    currentIterationCount = 0
  ): HTMLElement | null {
    if (childElement === null)
      throw new Error(this.errorMessages.findParent.elementIsNull)

    if (iterationLimit <= ++currentIterationCount) return null

    const parentElement = childElement.parentElement
    let isSearchedElement: boolean | undefined = false

    if (
      !Selector.isClassSelector(searchedSelector) &&
      !Selector.isIdSelector(searchedSelector)
    ) throw new Error(this.errorMessages.findParent.selectorNotValid)

    if (Selector.isClassSelector(searchedSelector)) {
      const searchedClassName = Selector.removeTrailingDot(searchedSelector)
      isSearchedElement = parentElement?.classList.contains(searchedClassName)
    } else if (Selector.isIdSelector(searchedSelector)) {
      const searchedIdName = Selector.removeTrailingHashSign(searchedSelector)
      isSearchedElement = parentElement?.id === searchedIdName
    }

    if (isSearchedElement || !parentElement) return parentElement

    return this.findParent(
      parentElement,
      searchedSelector,
      iterationLimit,
      currentIterationCount
    )
  }

  /**
   * Helper function to get a parent by going up in the document by a
   * given number of iterations
   */
  static getParent(
    childElement: HTMLElement | null,
    iterationLimit = 5,
    currentIterationCount = 0
  ): HTMLElement | null {
    if (childElement === null)
      throw new Error(this.errorMessages.getParent.elementIsNull)

    const parentElement = childElement.parentElement
    if (currentIterationCount === iterationLimit - 1) return parentElement
    ++currentIterationCount

    return this.getParent(parentElement, iterationLimit, currentIterationCount)
  }
}
