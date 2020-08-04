(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.TinyGaEventsHelper = factory());
}(this, (function () { 'use strict';

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
  }

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
   * @property {Map<Element,Function>} handlers
   */

  /**
   * @typedef TinyGaEventsHelper
   * @property {TinyGaEventsHelperOptions} options
   * @property {TinyGaEventsHelperEvent[]} events;
   */

  /** @type {string[]} */
  var mandatoryKeys = ['domEvent', 'el', 'eventCategory', 'eventAction'];
  /** @type {string[]} */

  var availableKeysForEvent = ['eventCategory', 'eventAction', 'eventLabel', 'eventValue'];
  /**
   * @type {TinyGaEventsHelper}
   */

  var TinyGaEventsHelper = /*#__PURE__*/function () {
    /**
     * @param {TinyGaEventsHelperEvent[]} events
     * @param {TinyGaEventsHelperOptions} options
     * @throws
     * @constructor
     */
    function TinyGaEventsHelper(events) {
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {
        debug: false
      };

      _classCallCheck(this, TinyGaEventsHelper);

      if (!ga) throw 'Google Analytics not included or blocked by the browser.';
      this.events = events;
      this.options = options;
      /* istanbul ignore if  */

      if (this.options.debug) {
        console.group('Received events: ');
        console.log(this.events);
        console.groupEnd();
      }

      if (TinyGaEventsHelper.isValidConfig(this.events)) {
        this.addEvents(this.events);
      } else {
        throw 'Invalid configuration exception.';
      }
    }
    /**
     * Adds a single event to Google Analytics
     * @param {TinyGaEventsHelperEvent} event
     */


    _createClass(TinyGaEventsHelper, [{
      key: "addEvent",
      value: function addEvent(event) {
        var self = this;
        var elements = document.querySelectorAll(event.el);

        for (var i = 0; i < elements.length; i++) {
          var element = elements[i];

          var handler = function handler() {
            ga && ga('send', Object.assign({
              hitType: 'event'
            }, TinyGaEventsHelper.extractValuesFromEvent(event, this, self.options.debug)));
          };

          element.addEventListener(event.domEvent, handler);
          event.handlers = event.handlers || new Map();
          event.handlers.set(element, handler);
        }
      }
      /**
       * Adds a collection of events
       * @param {TinyGaEventsHelperEvent[]} events
       */

    }, {
      key: "addEvents",
      value: function addEvents() {
        var events = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
        events.length > 0 && events.map(this.addEvent.bind(this));
      }
      /**
       * Validates the instance config
       * @param {TinyGaEventsHelperEvent[]}
       * @return {boolean}
       * @throws
       * @static
       */

    }, {
      key: "destroy",

      /**
       * Removes all the configured event listeners
       */
      value: function destroy() {
        for (var i = 0; i < this.events.length; i++) {
          /** @type {TinyGaEventsHelperEvent} */
          var event = this.events[i];
          var elements = document.querySelectorAll(event.el);

          for (var j = 0; j < elements.length; j++) {
            /** @type {Element} */
            var el = elements[j];
            el.removeEventListener(event.domEvent, event.handlers.get(el));
            event.handlers["delete"](el);
          }
        }
      }
    }], [{
      key: "isValidConfig",
      value: function isValidConfig(events) {
        if (!Array.isArray(events) || events.length === 0) return false;

        for (var i = 0; i < events.length; i++) {
          var currentEvent = events[i];

          for (var j = 0; j < mandatoryKeys.length; j++) {
            var currentMandatoryKey = mandatoryKeys[j];

            if (!currentEvent.hasOwnProperty(currentMandatoryKey) || currentEvent[currentMandatoryKey] === null) {
              console.warn("The configuration at position \"".concat(j, "\" doesn't have the mandatory key \"").concat(currentMandatoryKey, "\" or it's null."));
              return false;
            }
          }
        }

        return true;
      }
      /**
       * @param {TinyGaEventsHelperEvent} event
       * @param {HTMLElement} el
       * @param {?boolean} [showDebugInfo=false]
       * @static
       * @return {{}}
       */

    }, {
      key: "extractValuesFromEvent",
      value: function extractValuesFromEvent(event, el) {
        var showDebugInfo = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
        var keys = Object.keys(event);
        var values = {};
        showDebugInfo && console.group("Extracting values from event:");

        for (var i = 0; i < keys.length; i++) {
          var key = keys[i];

          if (!availableKeysForEvent.includes(key)) {
            showDebugInfo && console.log("Invalid key for GA event:\"' + key + '\".");
            continue;
          }

          var value = event[key];

          if (typeof value === 'function') {
            showDebugInfo && console.info("Return type of the event key \"".concat(key, "\" is a function."));
            values[key] = value.apply(el);
          } else {
            showDebugInfo && console.info("Return type of the event key \"".concat(key, "\" is a literal \"").concat(value, "\"."));
            values[key] = value;
          }
        }
        /* istanbul ignore if  */


        if (showDebugInfo) {
          console.group('Values:');
          console.log(values);
          console.groupEnd();
          console.groupEnd();
        }

        return values;
      }
    }]);

    return TinyGaEventsHelper;
  }();

  return TinyGaEventsHelper;

})));
//# sourceMappingURL=tiny-ga-events-helper.umd.dev.js.map
