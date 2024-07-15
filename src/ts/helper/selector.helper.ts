/**
 * ##### Selector helper functions
 */
export class Selector {
  /**
   * ## Helper function to check if a given selector is an Id
   */
  static isIdSelector(string: string): boolean {
    return string.charAt(0) === '#'
  }

  /**
   * ## Helper function to check if a given selector is a class
   */
  static isClassSelector(string: string) {
    return string.charAt(0) === '.'
  }

  /**
   * ## Remove the trailing hash sign from an id selector
   */
  static removeIdTrailingSymbol(string: string) {
    if (!this.isIdSelector(string)) {
      return string
    }

    return string.substring(1)
  }

  /**
   * ## Remove the trailing dot from a class selector
   */
  static removeClassTrailingSymbol(string: string) {
    if (!this.isClassSelector(string)) {
      return string
    }

    return string.substring(1)
  }
}
