
(function(l, r) { if (l.getElementById('livereloadscript')) return; r = l.createElement('script'); r.async = 1; r.src = '//' + (window.location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1'; r.id = 'livereloadscript'; l.getElementsByTagName('head')[0].appendChild(r) })(window.document);
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
     * @constructor
     */
    function TinyGaEventsHelper(events) {
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {
        debug: false
      };

      _classCallCheck(this, TinyGaEventsHelper);

      this.events = events;
      this.options = options;

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
        var el = document.querySelectorAll(event.el);

        for (var i = 0; i < el.length; i++) {
          el[i].addEventListener(event.domEvent, function () {
            if (ga) {
              ga('send', Object.assign({
                hitType: 'event'
              }, TinyGaEventsHelper.extractValuesFromEvent(event, this, self.options.debug)));
            } else {
              throw 'Google Analytics not included or blocked by the browser.';
            }
          });
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
       * @static
       */

    }], [{
      key: "isValidConfig",
      value: function isValidConfig(events) {
        if (Array.isArray(events) && events.length > 0) {
          for (var i = 0; i < events.length; i++) {
            var currentEvent = events[i];

            for (var j = 0; j < mandatoryKeys.length; j++) {
              var currentMandatoryKey = mandatoryKeys[j];

              if (!currentEvent.hasOwnProperty(currentMandatoryKey) || currentEvent[currentMandatoryKey] === null) {
                throw "The configuration at position \"".concat(j, "\" doesn't have the mandatory key \"").concat(currentMandatoryKey, "\" or it's null.");
              }
            }
          }

          return true;
        }

        return false;
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
