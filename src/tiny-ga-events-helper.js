/**
 * @typedef TinyGaEventsHelperOptions
 * @property {boolean?} debug
 */

/**
 * @typedef TinyGaEventsHelperEvent
 * @property {string} el
 * @property {string} domEvent
 * @property {string} eventCategory
 * @property {string} eventAction
 * @property {(?string|?Function)} eventLabel
 * @property {(?string|?Function)} eventValue
 */

/**
 * @typedef TinyGaEventsHelper
 * @property {TinyGaEventsHelperOptions} options
 * @property {TinyGaEventsHelperEvent[]} events;
 */

/** @type {string[]} */
const mandatoryKeys = ['domEvent', 'el', 'eventCategory', 'eventAction']

/** @type {string[]} */
const availableKeysForEvent = [
  'eventCategory',
  'eventAction',
  'eventLabel',
  'eventValue',
]

/**
 * @type {TinyGaEventsHelper}
 */
export default class TinyGaEventsHelper {
  /**
   * @param {TinyGaEventsHelperEvent[]} events
   * @param {TinyGaEventsHelperOptions} options
   * @throws
   * @constructor
   */
  constructor(events, options = { debug: false }) {
    if (!ga) throw 'Google Analytics not included or blocked by the browser.'

    this.events = events
    this.options = options

    /* istanbul ignore if  */
    if (this.options.debug) {
      console.group('Received events: ')
      console.log(this.events)
      console.groupEnd()
    }

    if (TinyGaEventsHelper.isValidConfig(this.events)) {
      this.addEvents(this.events)
    } else {
      throw 'Invalid configuration exception.'
    }
  }

  /**
   * Adds a single event to Google Analytics
   * @param {TinyGaEventsHelperEvent} event
   */
  addEvent(event) {
    const self = this
    let el = document.querySelectorAll(event.el)
    for (let i = 0; i < el.length; i++) {
      el[i].addEventListener(event.domEvent, function () {
        ga &&
          ga(
            'send',
            Object.assign(
              { hitType: 'event' },
              TinyGaEventsHelper.extractValuesFromEvent(
                event,
                this,
                self.options.debug
              )
            )
          )
      })
    }
  }

  /**
   * Adds a collection of events
   * @param {TinyGaEventsHelperEvent[]} events
   */
  addEvents(events = []) {
    events.length > 0 && events.map(this.addEvent.bind(this))
  }

  /**
   * Validates the instance config
   * @param {TinyGaEventsHelperEvent[]}
   * @return {boolean}
   * @throws
   * @static
   */
  static isValidConfig(events) {
    if (!Array.isArray(events) || events.length === 0) return false

    for (let i = 0; i < events.length; i++) {
      let currentEvent = events[i]
      for (let j = 0; j < mandatoryKeys.length; j++) {
        let currentMandatoryKey = mandatoryKeys[j]
        if (
          !currentEvent.hasOwnProperty(currentMandatoryKey) ||
          currentEvent[currentMandatoryKey] === null
        ) {
          console.warn(
            `The configuration at position "${j}" doesn't have the mandatory key "${currentMandatoryKey}" or it's null.`
          )
          return false
        }
      }
    }

    return true
  }

  /**
   * @param {TinyGaEventsHelperEvent} event
   * @param {HTMLElement} el
   * @param {?boolean} [showDebugInfo=false]
   * @static
   * @return {{}}
   */
  static extractValuesFromEvent(event, el, showDebugInfo = false) {
    let keys = Object.keys(event)
    let values = {}
    showDebugInfo && console.group(`Extracting values from event:`)
    for (let i = 0; i < keys.length; i++) {
      let key = keys[i]
      if (!availableKeysForEvent.includes(key)) {
        showDebugInfo && console.log(`Invalid key for GA event:"' + key + '".`)
        continue
      }

      let value = event[key]
      if (typeof value === 'function') {
        showDebugInfo &&
          console.info(`Return type of the event key "${key}" is a function.`)
        values[key] = value.apply(el)
      } else {
        showDebugInfo &&
          console.info(
            `Return type of the event key "${key}" is a literal "${value}".`
          )
        values[key] = value
      }
    }

    /* istanbul ignore if  */
    if (showDebugInfo) {
      console.group('Values:')
      console.log(values)
      console.groupEnd()
      console.groupEnd()
    }
    return values
  }
}
