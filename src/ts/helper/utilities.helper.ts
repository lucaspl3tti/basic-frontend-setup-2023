/**
 * ##### Utility helper functions
 */
export default class Utilities {
    /**
     * Helper function to block scope for a given amount of time in ms
     */
    static sleep(milliseconds: number): Promise<unknown> {
        return new Promise(resolve => setTimeout(resolve, milliseconds))
    }

    /**
     * Helper function to decode strings
     */
    static decodeString(string: string): string {
        const textarea = document.createElement('textarea')

        textarea.innerHTML = string
        const decodedString = textarea.value
        textarea.remove()

        return decodedString
    }

    /**
     * Helper function to detect if the current device is a touch device
     */
    static isTouchDevice(): boolean {
        return 'ontouchstart' in window || navigator.maxTouchPoints > 0
    }
}
