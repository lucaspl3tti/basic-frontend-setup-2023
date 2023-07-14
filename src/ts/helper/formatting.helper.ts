/**
 * ##### Utility helper functions
 */
export default class Formatting {
  /**
   * Helper function to format a given date string
   */
  static formatDate(value: string | Date, options = {}) {
    if (value === null) throw new Error('Date value is null');

    console.log(value)
    const date = new Date(value)
    console.log(date)
    const langCode = navigator.language
    const defaultOptions = {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    }
    options = { ...defaultOptions, ...options, };

    const dateTimeFormatter = new Intl.DateTimeFormat(langCode, options);

    return dateTimeFormatter.format(date);
  }

  /**
   * Helper function to truncate string by a given amount of characters
   */
  static  truncateString(
    string: string,
    amountOfCharacters: number,
    useWordBoundary = true
  ): string {
    if (string.length <= amountOfCharacters) return string

    const subString = string.slice(0, amountOfCharacters - 1)

    return (useWordBoundary
        ? subString.slice(0, subString.lastIndexOf(' '))
        : subString) + '&hellip;'
  }
}


// // Helper function to format a given date string
// export function formatDate(value: string | Date, options = {}) {
//   if (value === null) throw new Error('Date value is null');

//   const date = new Date(value)
//   const langCode = navigator.language
//   const defaultOptions = {
//     day: '2-digit',
//     month: '2-digit',
//     year: 'numeric',
//   }
//   options = { ...defaultOptions, ...options, };

//   const dateTimeFormatter = new Intl.DateTimeFormat(langCode, options);

//   return dateTimeFormatter.format(date);
// }

// // Helper function to truncate string by a given amount of characters
// export function truncateString(
//   string: string,
//   amountOfCharacters: number,
//   useWordBoundary = true
// ): string {
//   if (string.length <= amountOfCharacters) return string

//   const subString = string.slice(0, amountOfCharacters - 1)

//   return (useWordBoundary
//       ? subString.slice(0, subString.lastIndexOf(' '))
//       : subString) + '&hellip;'
// }
