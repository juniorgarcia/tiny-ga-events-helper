# Tiny Google Analytics Events Helper
### A simple and tiny organizer for your [Google Analytics events](https://developers.google.com/analytics/devguides/collection/analyticsjs/).

![](https://img.badgesize.io/juniorgarcia/tiny-ga-events-helper/master/dist/tiny-ga-events-helper.umd.prod.js.svg?compression=gzip)
![](https://img.badgesize.io/juniorgarcia/tiny-ga-events-helper/master/dist/tiny-ga-events-helper.umd.prod.js.svg?compression=brotli)

If you would like to check an example, see [index.html](https://github.com/juniorgarcia/tiny-ga-events-helper/blob/master/example/index.html#L30).

## How to use it:
1. Include the file `dist/tiny-ga-events-helper.umd.prod.js` in your HTML or import the
module like `import { TinyGaEventsHelper } from 'tiny-ga-events-helper`;
2. In your web page file, create an array with objects like this:

```
var events = [{
    el: '.button', // Your selector
    domEvent: 'click', // The DOM event to trigger
    // These other keys are used as Google Analytics explains.
    // See: https://developers.google.com/analytics/devguides/collection/analyticsjs/events#event_fields
    eventCategory: 'test!',
    eventAction: 'myAction',
    eventLabel: 'myLabel',
    eventValue: 'myValue'
}];
```

The values for the `events` keys may be callbacks. This is useful when the event data changes according to
the element related to it. **Attention**: Inside those callbacks, `this` refers to the **individual**
DOM element. By now, only four keys for the events are allowed, they are the same ones that Google Analytics uses:
**eventCategory**, **eventAction**, **eventLabel** and **eventValue**.
See [index.html](https://github.com/juniorgarcia/tiny-ga-events-helper/blob/master/example/index.html#L30) to check how
it works. Remember to check the HTML to understand this example.

3. Create a `TinyGaEventsHelper` object passing the array of events:

```
new TinyGaEventsHelper(events)
```

That's it. Working :)

## Adding more events separately:

You can add more events with the method `addEvent(event)`, or `addEvents(events)`. The only difference between them
is that `addEvent(event)` receives an object, not an array, as `addEvents(events)` receives an array exactly like the
one used to initialize the `TinyGaEventsHelper` object.

## Serving the example
To serve the repository's example, just run `npm run serve` and access [http://localhost:10001](http://localhost:10001).
