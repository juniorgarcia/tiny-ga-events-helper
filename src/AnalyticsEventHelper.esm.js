export default class AnalyticsEventHelper {
  constructor(events) {
    this.events = events
    this._mandatoryKeys = ['domEvent', 'el', 'eventCategory', 'eventAction']
    this._availableKeysForEvent = [
      'eventCategory',
      'eventAction',
      'eventLabel',
      'eventValue',
    ]

    console.group('Received events: ')
    console.log(this.events)
    console.groupEnd()

    if (this._isValidConfig()) {
      this.addEvents(this.events)
    } else {
      throw 'Invalid configuration exception.'
    }
  }

  addEvent(event) {
    let instance = this

    let el = document.querySelectorAll(event.el)
    for (let i = 0; i < el.length; i++) {
      el[i].addEventListener(event.domEvent, function () {
        if (ga !== undefined) {
          ga(
            'send',
            Object.assign(
              { hitType: 'event' },
              instance._extractValuesFromEvent(event, this)
            )
          )
        } else {
          console.error(
            'Google Analytics not included or blocked by the browser.'
          )
        }
      })
    }
  }

  addEvents(events) {
    const self = this
    events.forEach((event) => {
      console.info(`Adding event "${event.eventCategory}".`)
      self.addEvent(event)
    })
  }

  _isValidConfig() {
    if (this.events instanceof Array && this.events.length > 0) {
      console.info('Configuration is Array and bigger than zero.')
      for (let i = 0; i < this.events.length; i++) {
        let currentEvent = this.events[i]
        for (let j = 0; j < this._mandatoryKeys.length; j++) {
          let currentMandatoryKey = this._mandatoryKeys[j]
          console.info(
            `Checking if configuration has mandatory key "${currentMandatoryKey}"`
          )
          if (
            !currentEvent.hasOwnProperty(currentMandatoryKey) ||
            currentEvent[currentMandatoryKey] === null
          ) {
            console.error(
              `The configuration at position "${j}" doesn't have the mandatory key "${currentMandatoryKey}" or it's null.`
            )
            return false
          }
        }
      }
      return true
    }

    return false
  }

  _extractValuesFromEvent(event, el) {
    let keys = Object.keys(event)
    let values = {}
    console.group(`Extracting values from event:`)
    for (let i = 0; i < keys.length; i++) {
      let key = keys[i]
      if (this._availableKeysForEvent.indexOf(key) === -1) {
        console.log(`Invalid key for GA event:"' + key + '".`)
        continue
      }

      let value = event[key]
      if (typeof value === 'function') {
        console.info(`Return type of the event key "${key}" is a function.`)
        values[key] = value.apply(el)
      } else {
        console.info(
          `Return type of the event key "${key}" is a literal "${value}".`
        )
        values[key] = value
      }
    }
    console.group('Values:')
    console.log(values)
    console.groupEnd()
    console.groupEnd()
    return values
  }
}
