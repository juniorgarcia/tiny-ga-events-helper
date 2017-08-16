"use strict";

function AnalyticsEventHelper(events) {
    this.events = events;
    this._mandatoryKeys = ["domEvent", "el", "eventCategory", "eventAction"];

    console.group("Received events: ");
    console.log(this.events);
    console.groupEnd();

    if (this._isValidConfig()) {
        this.addEvents(this.events);
    } else {
        throw "Invalid configuration exception.";
    }
}

AnalyticsEventHelper.prototype._isValidConfig = function() {
    if (this.events instanceof Array &&
        this.events.length > 0) {
        console.info('Configuration is Array and bigger than zero.');
        for(var i = 0; i <= this.events.length - 1; i++) {
            var currentEvent = this.events[i];
            for(var j = 0; j <= this._mandatoryKeys.length - 1; j++) {
                var currentMandatoryKey = this._mandatoryKeys[j];
                console.info('Checking if configuration has mandatory key "' + currentMandatoryKey + '"');
                if (
                    ! currentEvent.hasOwnProperty(currentMandatoryKey) ||
                    currentEvent[currentMandatoryKey] === null
                ) {
                    console.error('The configuration at position ' + j + ' doesn\'t have the mandatory key "' +
                        currentMandatoryKey + '" or it\'s null.');
                    return false
                }
            }
        }
        return true;
    }

    return false;
};

AnalyticsEventHelper.prototype.addEvents = function(events) {
    for(var i = 0; i < events.length; i++) {
        console.info('Adding event "' + events[i].eventCategory + '".');
        this.addEvent(events[i]);
    }
};

AnalyticsEventHelper.prototype.addEvent = function(event) {
    document.addEventListener('DOMContentLoaded', function() {
        var el = document.querySelectorAll(event.el);
        for(var i = 0; i < el.length; i++) {
            el[i].addEventListener(event.domEvent, function() {
                ga('send', {
                    hitType: 'event',
                    eventCategory: event.eventCategory,
                    eventAction: event.eventAction,
                    eventLabel: event.eventLabel,
                    eventValue: event.eventValue
                });
            });
        }
    });
};