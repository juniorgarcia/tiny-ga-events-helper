# Google Analytics Events Helper
### A simple organizer for your [Google Analytics events](https://developers.google.com/analytics/devguides/collection/analyticsjs/).

**Long story short**: `index.html` contains an example.

## How to use it:
1. Include the file `dist/gaEvHelper.min.js`;
2. In your web page file, create an array with objects like this:

```
var events = [{
    el: '.button', // Your selector
    domEvent: 'click', // The DOM event to trigger
    // These other keys are used as Google Analytics explains.
    // See: https://developers.google.com/analytics/devguides/collection/analyticsjs/
    eventCategory: 'test!',
    eventAction: 'myAction',
    eventLabel: 'myLabel',
    eventValue: 'myValue'
}];
```

The values for the `events` keys can be callbacks. This is useful when the event data changes according to
the element that triggers it. Inside those callbacks, `this` refers to the **individual**
DOM element. By now, only four keys for the events are allowed, they are the same as Google Analytics uses:
**eventCategory**, **eventAction**, **eventLabel** and **eventValue**.
See [index.html](https://github.com/juniorgarcia/google-analytics-event-helper/blob/master/index.html#L30) to check how
it works. Remember to check the HTML to understand this example.

3. Create a `AnalyticsEventHelper` object passing the array of events:

```
(new AnalyticsEventHelper(events))
```

That's it. Working :)

## Adding more events separately:

You can add more events with the method `addEvent(event)`, or `addEvents(events)`. The only difference between them
is that `addEvent(event)` receives an object, not an array, as `addEvents(events)` receives an array exactly like the
one used to initialize the `AnalyticsEventHelper` object.

## Simple serving the index.html for test.
To serve the index.html, open your terminal and install the dependencies like so:

```
$ npm install; npm install -g gulp-cli; gulp serve;
```