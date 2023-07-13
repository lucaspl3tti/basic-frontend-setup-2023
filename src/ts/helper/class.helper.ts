// Helper function to check if a given selector is an Id
export function isIdSelector(string: string): boolean {
  if (string.charAt(0) !== '#') return false
  return true
}

// Helper function to check if a given selector is a class
export function isClassSelector(string: string) {
  if (string.charAt(0) !== '.') return false
  return true
}

// Remove the trailing hash sign from an id selector
export function removeTrailingHashSign(string: string) {
  if (string.charAt(0) !== '#') return string
  return string.substring(1)
}

// Remove the trailing dot from a class selector
export function removeTrailingDot(string: string) {
  if (string.charAt(0) !== '.') return string
  return string.substring(1)
}
