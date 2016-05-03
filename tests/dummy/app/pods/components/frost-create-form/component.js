import Ember from 'ember'
import layout from './template'
import $ from 'jquery'

const { Component, inject } = Ember
/**
* frost-bunsen-form component event handler for scroll event
* Checks scroll position within form to add/remove scroll styling to form
*
* @ctx {JQuery object}
*/
function formUpdateHandler () {
  const $formEl = this.get('$formEl')
  const $headerEl = this.get('$headerEl')
  const $footerEl = this.get('$footerEl')
  const scrollTop = $formEl.scrollTop()
  const innerHeight = $formEl.innerHeight()
  const scrollHeight = $formEl.get(0) && $formEl.get(0).scrollHeight

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
function componentDidUpdateAttrsForForm () {
  // select the target node

  const $formEl = this.get('$formEl')

  const setFormMutationObserver = () => {
    // create an observer instance
    this.set('formObserver', new window.MutationObserver((mutations) => {
      mutations.forEach(function (mutation) {
        const $formEl = $(mutation.target).parents('.ps-container')

        if ($formEl) {
          formUpdateHandler.apply(this)
        } else {
          console.error('Error observing frost-bunsen-form DOM node mutations')
        }
      })
    }))

    // configuration of the observer
    const config = { attributes: true, childList: true, characterData: false, subtree: true }

    // pass in the target DOM node, as well as the observer options

    this.get('formObserver').observe($formEl.get(0), config)
  }

  // make sure we only bind the form element once during component lifetime
  if (!this.get('formBindingsSet') && $formEl.length > 0) {
    setFormMutationObserver()
    $(document).on('ps-scroll-up', () => $('.actions').addClass('footer-scrolled'))
    $(document).on('ps-scroll-down', () => $('.input-header').addClass('header-scrolled'))
    $(document).on('ps-y-reach-start', () => $('.input-header').removeClass('header-scrolled'))
    $(document).on('ps-y-reach-end', () => $('.actions').removeClass('footer-scrolled'))
  }

  $(window).resize(() => formUpdateHandler.apply(this))

  // update scroll styles if content already hidden
  formUpdateHandler.apply(this)

  this.set('formBindingsSet', true)
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
  formBindingsSet: false,
  formObserver: null,  // @type {MutationObserver}
  userView: {},
  $formEl: null,
  $headerEl: null,
  $footerEl: null,

  /* Ember.Component method */
  willInsertElement () {
    this.get('modalForms').setModalActive(true)
  },

  /* Ember.Component method */
  willDestroyElement () {
    this.get('modalForms').setModalActive(false)

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

    this.set('$formEl', this.$('.ps-container'))
    this.set('$headerEl', this.$('.input-header'))
    this.set('$footerEl', this.$('.actions'))

    componentDidUpdateAttrsForForm.apply(this)
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
