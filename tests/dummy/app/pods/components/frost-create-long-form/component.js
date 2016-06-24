import Ember from 'ember'
import layout from './template'

const {Component, Logger} = Ember

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
      'firstName'
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

    open () {
      Logger.log('modal opened')
    },

    save () {
      if (this.get('isValid')) {
        this.get('onConfirm')(this.get('formValue'))
      } else {
        this.set('showAllErrors', true)
      }
    }
  }
})
