export function formatDate(value: string|Date, options = {}) {
    if (value === null) throw new Error('Date value is null')

    const date = new Date(value)
    const langCode = navigator.language
    const defaultOptions = {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
    }
    options = { ...defaultOptions, ...options }

    const dateTimeFormatter = new Intl.DateTimeFormat(langCode, options)

    return dateTimeFormatter.format(date)
}
