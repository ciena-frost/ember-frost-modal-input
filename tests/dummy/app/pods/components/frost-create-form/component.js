import Ember from 'ember'
import layout from './template'
import $ from 'jquery'

const { Component, inject } = Ember

/**
* Checks scroll position within container element to add/remove scroll styling to header/footer elements
 *  * @ctx {Ember.component}
 */
function updateScrollStyles () {
  const $containerEl = this.get('$containerEl')
  const $headerEl = this.get('$headerEl')
  const $footerEl = this.get('$footerEl')
  const scrollTop = $containerEl.scrollTop()
  const innerHeight = $containerEl.innerHeight()
  const scrollHeight = $containerEl.get(0) && $containerEl.get(0).scrollHeight

  // style top of form with box shadow if content overflow hidden underneath header
  if (scrollTop > 0) {
    $headerEl.addClass('header-scrolled')
  } else {
    $headerEl.removeClass('header-scrolled')
  }

  // style bottom of form with box shadow if content overflow hidden underneath footer
  if (scrollTop + innerHeight >= scrollHeight) {
    $footerEl.removeClass('footer-scrolled')
  } else {
    $footerEl.addClass('footer-scrolled')
  }
}

/**
 * didUpdateAttrs function for setting frost-bunsen-form bindings
 * sets bindings for 'scroll' as well as a window.MutationObserver.observe for mutating events
 * on DOM node .frost-bunsen-form
 *
 * @ctx {Ember.component}
 */
function scrollContainerUpdateAttrs () {
  const $containerEl = this.get('$containerEl')
  const $headerEl = this.get('$headerEl')
  const $footerEl = this.get('$footerEl')

  const setFormMutationObserver = () => {
    // create an observer instance
    this.set('formObserver', new window.MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        const $containerEl = $(mutation.target).parents('.ps-container')

        if ($containerEl) {
          updateScrollStyles.apply(this)
        } else {
          console.error('Error observing scroll container element mutations')
        }
      })
    }))

    // configuration of the observer
    const config = { attributes: true, childList: true, characterData: false, subtree: true }

    // pass in the target DOM node, as well as the observer options

    this.get('formObserver').observe($containerEl.get(0), config)
  }

  // make sure we only bind the scroll container element once during component lifetime
  if (!this.get('conatinerBindingsSet') && $containerEl.length > 0) {
    setFormMutationObserver()

    $(document).on('ps-scroll-up', () => $footerEl.addClass('footer-scrolled'))
    $(document).on('ps-y-reach-end', () => $footerEl.removeClass('footer-scrolled'))
    $(document).on('ps-scroll-down', () => $headerEl.addClass('header-scrolled'))
    $(document).on('ps-y-reach-start', () => $headerEl.removeClass('header-scrolled'))

    $(window).resize(() => updateScrollStyles.apply(this))

    // update scroll styles if content already hidden
    updateScrollStyles.apply(this)

    this.set('containerBindingsSet', true)
  }
}

export default Component.extend({
  layout,
  modalForms: inject.service('modal-forms'),
  userModel: {
    'type': 'object',
    'properties': {
      'username1': {
        'type': 'string'
      },
      'description1': {
        'type': 'string'
      },
      'password1': {
        'type': 'string'
      },
      'username2': {
        'type': 'string'
      },
      'description2': {
        'type': 'string'
      },
      'password2': {
        'type': 'string'
      },
      'username3': {
        'type': 'string'
      },
      'description3': {
        'type': 'string'
      },
      'password3': {
        'type': 'string'
      },
      'username4': {
        'type': 'string'
      },
      'description4': {
        'type': 'string'
      },
      'password4': {
        'type': 'string'
      },
      'username5': {
        'type': 'string'
      },
      'description5': {
        'type': 'string'
      },
      'password5': {
        'type': 'string'
      }
    },
    'required': [
      'username', 'password'
    ]
  },
  conatinerBindingsSet: false,
  formObserver: null,  // @type {MutationObserver}
  userView: {},
  $containerEl: null,
  $headerEl: null,
  $footerEl: null,
  containerElClassname: 'ps-container',
  headerElClassname: 'input-header',
  footerElClassname: 'actions',

  /* Ember.Component method */
  willInsertElement () {
    this.get('modalForms').setModalActive(true)
  },

  /* Ember.Component method */
  willDestroyElement () {
    this.get('modalForms').setModalActive(false)

    // perfect-scrollbar events
    $(document).off('ps-scroll-up')
    $(document).off('ps-scroll-down')
    $(document).off('ps-y-reach-start')
    $(document).off('ps-y-reach-end')

    $(window).off('resize')

    this.get('formObserver').disconnect()
  },

  /* Ember.Component method */
  didUpdateAttrs () {
    this._super(...arguments)

    this.set('$containerEl', this.$('.' + this.get('containerElClassname')))
    this.set('$headerEl', this.$('.' + this.get('headerElClassname')))
    this.set('$footerEl', this.$('.' + this.get('footerElClassname')))

    scrollContainerUpdateAttrs.apply(this)
  },

  formData: {
    state: {},
    isValid: false
  },

  clearForm () {
    this.set('formData', {
      state: {},
      isValid: false
    })
  },

  actions: {
    cancel () {
      this.clearForm()
      this.sendAction('dismiss')
    },

    formValueChanged (formState) {
      this.set('formData.state', formState)
    },

    onValidation (info) {
      this.set('formData.isValid', info.valid)
    },

    save () {
      if (this.get('formData.isValid')) {
        this.sendAction('save', this.get('formData.state'))
        this.sendAction('dismiss')
        this.clearForm()
      }
    }
  }
})
