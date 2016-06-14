import Ember from 'ember'
import layout from './template'

const {Component, inject, Logger} = Ember

export default Component.extend({

  layout,
  formValue: {},
  renderers: {},
  showAllErrors: false,
  validators: [],
  modalName: 'my-ps-modal',
  userModel: {
    'type': 'object',
    'properties': {
      'firstName': {
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

  clearForm () {
    this.set('formValue', {})
  },

  actions: {
    clearForm () {
      this.clearForm()
      Logger.log('modal closed')
    },

    formValueChanged (formState) {
      this.set('formValue', formState)
    },

    onValidation (e) {
      this.set('isValid', e.errors.length === 0)
    },

    open () {
      Logger.log('modal opened')
    },

    save () {
      this.get('onConfirm')(this.get('formValue'))
      this.clearForm()
    }
  }
})
