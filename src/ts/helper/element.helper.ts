/**
 * Helper function to create a new element in the dom
 */
export function createElement(
  elementTag: string,
  classes: Array<string> = []
): HTMLElement {
  if (elementTag === '') throw new Error('elementTag for c')

  const element = document.createElement(elementTag)
  if (classes.length > 0) element.classList.add(...classes)

  return element
}

/**
 * Helper function to hide an element in the dom
 */
export function hideElement(
  element: HTMLElement | null,
  hiddenClass = ''
): any {
  if (element === null) throw new Error('element to hide must not be null')
  if (hiddenClass === '') return element.style.display === 'none'

  element.classList.add(hiddenClass)
}

/**
 * Helper function to show an element in the dom
 */
export function showElement(
  element: HTMLElement | null,
  showClass = '',
  displayStyle = 'block'
): any {
  if (element === null) throw new Error('element to hide must not be null')
  if (showClass === '') return element.style.display === displayStyle

  element.classList.add(showClass)
}

/**
 * Helper function to find parent of given element by class name
 */
export function findParent(
  childElement: Element | null,
  searchedClassName: string,
  iterationLimit = 5,
  currentIterationCount = 0
): HTMLElement | null {
  if (childElement === null) throw new Error('Child element could not be found')
  if (iterationLimit <= currentIterationCount++) return null

  const parentElement = childElement.parentElement
  const isSearchedElement = parentElement?.classList.contains(searchedClassName)

  if (isSearchedElement || !parentElement) return parentElement

  return findParent(
    parentElement,
    searchedClassName,
    iterationLimit,
    currentIterationCount
  )
}

/**
 * Helper to get a parent by going up in the document by a given number
 */
export function getParent(
  childElement: Element | null,
  iterationLimit = 5
): HTMLElement | null {
  if (childElement === null) throw new Error('Child element could not be found')
  const currentIterationCount = 0
  let parentElement = null

  while (currentIterationCount < iterationLimit) {
    if (!childElement.parentElement) break
    parentElement = childElement.parentElement
  }

  return parentElement
}
