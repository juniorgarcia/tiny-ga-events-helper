import TinyGaEventsHelper from './tiny-ga-events-helper'

let instance, ga

beforeEach(() => {
  ga = jest.fn()
  window.ga = ga

  instance = new TinyGaEventsHelper([
    {
      el: '.button',
      domEvent: 'click',
      eventCategory: 'test!',
      eventAction: 'myAction',
      eventLabel: function () {
        return this.dataset.label
      },
      eventValue: function () {
        return this.dataset.value
      },
    },
  ])
})

it('correctly instantiates when options are valid', () => {
  expect(instance).not.toBeFalsy()
})

describe('events validation', () => {
  it('throws when configuration is invalid', () => {
    const consoleSpy = jest.spyOn(console, 'warn').mockImplementation(() => {})
    expect(() => {
      new TinyGaEventsHelper([
        {
          domEvent: 'click',
          el: 'foo',
          eventCategory: 'category',
        },
      ])
    }).toThrow('Invalid configuration exception.')
    consoleSpy.mockRestore()
  })
})

describe('events triggering', () => {
  /** @type {HTMLButtonElement} */
  let button

  beforeEach(() => {
    button = document.createElement('button')
    button.id = 'btn'
    button.dataset.eventLabel = '42'
    document.body.appendChild(button)
  })

  it('calls the ga function correctly with basic values', () => {
    const event = {
      el: '#btn',
      domEvent: 'click',
      eventCategory: 'category',
      eventAction: 'action',
      eventLabel: 'label',
      eventValue: 'value',
    }
    const expectedEventValue = { ...event, hitType: 'event' }

    delete expectedEventValue.el
    delete expectedEventValue.domEvent

    instance = new TinyGaEventsHelper([event])

    expect(ga).not.toHaveBeenCalled()

    button.dispatchEvent(new MouseEvent('click'))
    expect(ga).toHaveBeenCalledTimes(1)
    expect(ga.mock.calls[0][0]).toBe('send')
    expect(ga.mock.calls[0][1]).toMatchObject(expectedEventValue)
  })

  it('calls the ga function correctly when some values are callbacks', () => {
    const event = {
      el: '#btn',
      domEvent: 'click',
      eventCategory: 'category',
      eventAction: 'action',
      eventLabel: function () {
        return this.dataset.eventLabel
      },
      eventValue: function () {
        return this.id
      },
    }
    const expectedEventValue = {
      ...event,
      hitType: 'event',
      eventLabel: '42',
      eventValue: 'btn',
    }

    delete expectedEventValue.el
    delete expectedEventValue.domEvent

    instance = new TinyGaEventsHelper([event])

    expect(ga).not.toHaveBeenCalled()

    button.dispatchEvent(new MouseEvent('click'))
    expect(ga).toHaveBeenCalledTimes(1)
    expect(ga.mock.calls[0][0]).toBe('send')
    expect(ga.mock.calls[0][1]).toMatchObject(expectedEventValue)
  })
})

it('throws when there is no Google Analytics on the page', () => {
  window.ga = undefined

  expect(() => {
    new TinyGaEventsHelper([
      {
        el: '.button',
        domEvent: 'click',
        eventCategory: 'test!',
        eventAction: 'myAction',
      },
    ])
  }).toThrow('Google Analytics not included or blocked by the browser.')
})

describe('destroying the helper', () => {
  /** @type {HTMLButtonElement} */
  let button

  beforeEach(() => {
    button = document.createElement('button')
    button.id = 'btn'
    document.body.appendChild(button)
  })

  it('correctly destroys the instance and removes the event listeners', () => {
    const event = {
      el: '#btn',
      domEvent: 'click',
      eventCategory: 'category',
      eventAction: 'action',
    }
    instance = new TinyGaEventsHelper([event])
    expect(ga).not.toHaveBeenCalled()
    button.dispatchEvent(new MouseEvent('click'))
    expect(ga).toHaveBeenCalledTimes(1)

    instance.destroy()

    button.dispatchEvent(new MouseEvent('click'))
    expect(ga).toHaveBeenCalledTimes(1)
  })
})
