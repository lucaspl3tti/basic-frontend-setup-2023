import {
  isIdSelector,
  isClassSelector,
  removeTrailingHashSign,
  removeTrailingDot,
} from './class.helper.ts'

// define error messages
const errorMessages = {
  createElement: {
    elementTagNotValid: 'Element tag for creating the element is not valid',
  },
  hideElement: {
    elementIsNull: 'Element to hide must not be null',
  },
  showElement: {
    elementIsNull: 'Element to show must not be null',
  },
  findParent: {
    elementIsNull: 'Child element could not be found',
    selectorNotValid: 'The given selector is not valid, please check if it is an id or class selector', // eslint-disable-line
  },
  getParent: {
    elementIsNull: 'Child element in getParent could not be found',
  },
}

// Helper function to create a new element in the dom
export function createElement(
  elementTag: string,
  classes: Array<string> = []
): HTMLElement {
  if (elementTag === '')
    throw new Error(errorMessages.createElement.elementTagNotValid)

  const element = document.createElement(elementTag)
  if (classes.length > 0) element.classList.add(...classes)

  return element
}

// Helper function to hide an element in the dom
export function hideElement(
  element: HTMLElement | null,
  hiddenClass = ''
) {
  if (element === null) throw new Error(errorMessages.hideElement.elementIsNull)
  if (hiddenClass === '') return element.style.display === 'none'

  element.classList.add(hiddenClass)
}

// Helper function to show an element in the dom
export function showElement(
  element: HTMLElement | null,
  showClass = '',
  displayStyle = 'block'
) {
  if (element === null) throw new Error(errorMessages.showElement.elementIsNull)
  if (showClass === '') return element.style.display === displayStyle

  element.classList.add(showClass)
}

/**
 * Helper function to find parent of an element by a given selector
 * (either id or class)
 */
export function findParent(
  childElement: Element | null,
  searchedSelector: string,
  iterationLimit = 5,
  currentIterationCount = 0
): HTMLElement | null {
  if (childElement === null) throw new Error(
    errorMessages.findParent.elementIsNull
  )

  if (iterationLimit <= ++currentIterationCount) return null

  const parentElement = childElement.parentElement
  let isSearchedElement: boolean|undefined = false

  if (!isClassSelector(searchedSelector) && !isIdSelector(searchedSelector))
    throw new Error(errorMessages.findParent.selectorNotValid)

  if (isClassSelector(searchedSelector)) {
    const searchedClassName = removeTrailingDot(searchedSelector)
    isSearchedElement = parentElement?.classList.contains(searchedClassName)
  } else if (isIdSelector(searchedSelector)) {
    const searchedIdName = removeTrailingHashSign(searchedSelector)
    isSearchedElement = parentElement?.id === searchedIdName
  }

  if (isSearchedElement || !parentElement) return parentElement

  return findParent(
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
export function getParent(
  childElement: Element | null,
  iterationLimit = 5,
  currentIterationCount = 0
): HTMLElement | null {
  if (childElement === null) throw new Error(
    errorMessages.getParent.elementIsNull
  )

  const parentElement = childElement.parentElement
  if (currentIterationCount === iterationLimit - 1) return parentElement
  ++currentIterationCount

  return getParent(
    parentElement,
    iterationLimit,
    currentIterationCount
  )
}
