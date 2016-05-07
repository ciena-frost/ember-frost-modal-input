import Ember from 'ember'
import layout from './template'
const {inject, Component} = Ember

export default Component.extend({
  layout,
  modalForms: inject.service('modal-forms'),
  userModel: {
    'type': 'object',
    'properties': {
      'username': {
        'type': 'string'
      },
      'description': {
        'type': 'string'
      },
      'password': {
        'type': 'string'
      }
    },
    'required': [
      'username', 'password'
    ]
  },

  /* Ember.Component method */
  willInsertElement () {
    this.get('modalForms').setModalActive(true)
  },

  /* Ember.Component method */
  willDestroyElement () {
    this.get('modalForms').setModalActive(false)
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
