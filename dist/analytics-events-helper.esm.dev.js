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

var AnalyticsEventsHelper = /*#__PURE__*/function () {
  function AnalyticsEventsHelper(events) {
    _classCallCheck(this, AnalyticsEventsHelper);

    this.events = events;
    this._mandatoryKeys = ['domEvent', 'el', 'eventCategory', 'eventAction'];
    this._availableKeysForEvent = ['eventCategory', 'eventAction', 'eventLabel', 'eventValue'];
    console.group('Received events: ');
    console.log(this.events);
    console.groupEnd();

    if (this._isValidConfig()) {
      this.addEvents(this.events);
    } else {
      throw 'Invalid configuration exception.';
    }
  }

  _createClass(AnalyticsEventsHelper, [{
    key: "addEvent",
    value: function addEvent(event) {
      var instance = this;
      var el = document.querySelectorAll(event.el);

      for (var i = 0; i < el.length; i++) {
        el[i].addEventListener(event.domEvent, function () {
          if (ga !== undefined) {
            ga('send', Object.assign({
              hitType: 'event'
            }, instance._extractValuesFromEvent(event, this)));
          } else {
            console.error('Google Analytics not included or blocked by the browser.');
          }
        });
      }
    }
  }, {
    key: "addEvents",
    value: function addEvents(events) {
      var self = this;
      events.forEach(function (event) {
        console.info("Adding event \"".concat(event.eventCategory, "\"."));
        self.addEvent(event);
      });
    }
  }, {
    key: "_isValidConfig",
    value: function _isValidConfig() {
      if (this.events instanceof Array && this.events.length > 0) {
        console.info('Configuration is Array and bigger than zero.');

        for (var i = 0; i < this.events.length; i++) {
          var currentEvent = this.events[i];

          for (var j = 0; j < this._mandatoryKeys.length; j++) {
            var currentMandatoryKey = this._mandatoryKeys[j];
            console.info("Checking if configuration has mandatory key \"".concat(currentMandatoryKey, "\""));

            if (!currentEvent.hasOwnProperty(currentMandatoryKey) || currentEvent[currentMandatoryKey] === null) {
              console.error("The configuration at position \"".concat(j, "\" doesn't have the mandatory key \"").concat(currentMandatoryKey, "\" or it's null."));
              return false;
            }
          }
        }

        return true;
      }

      return false;
    }
  }, {
    key: "_extractValuesFromEvent",
    value: function _extractValuesFromEvent(event, el) {
      var keys = Object.keys(event);
      var values = {};
      console.group("Extracting values from event:");

      for (var i = 0; i < keys.length; i++) {
        var key = keys[i];

        if (this._availableKeysForEvent.indexOf(key) === -1) {
          console.log("Invalid key for GA event:\"' + key + '\".");
          continue;
        }

        var value = event[key];

        if (typeof value === 'function') {
          console.info("Return type of the event key \"".concat(key, "\" is a function."));
          values[key] = value.apply(el);
        } else {
          console.info("Return type of the event key \"".concat(key, "\" is a literal \"").concat(value, "\"."));
          values[key] = value;
        }
      }

      console.group('Values:');
      console.log(values);
      console.groupEnd();
      console.groupEnd();
      return values;
    }
  }]);

  return AnalyticsEventsHelper;
}();

export default AnalyticsEventsHelper;
//# sourceMappingURL=analytics-events-helper.esm.dev.js.map
