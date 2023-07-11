interface Options {
    [key: string]: any
}

/**
 * Default plugin class on which every plugin will be build on
 */
export default abstract class Plugin {
    private _el: HTMLElement | undefined
    private _name: string
    // protected options: Options

    /**
     * Plugin constructor method
     */
    public constructor(name: string) {
        this._name = name

        // this.options = this._mergeOptions(options)
    }

    /**
     * Method to get plugin name
     */
    get name(): string {
        return this._name
    }

    /**
     * Method to get plugin element
     */
    get el(): HTMLElement {
        if (this._el === undefined) throw new Error('Element is not defined')

        return this._el
    }

    /**
     * Initialize plugin
     */
    initPlugin(htmlElement: HTMLElement): boolean {
        this._el = htmlElement

        return true
    }

    /**
     * Merge plugin options to one object
     */
    // _mergeOptions(options: object) {
    //     return { ...this.options, ...options }
    // }
}
