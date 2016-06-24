import Ember from 'ember'
import layout from './template'
const {Component, Logger} = Ember

export default Component.extend({
  layout,
  modalName: 'my-awesome-modal',
  showAllErrors: false,
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

  clearForm () {
    this.set('formValue', {})
  },

  actions: {
    clearForm () {
      this.clearForm()
      this.set('showAllErrors', false)
    },

    open () {
      Logger.log('modal opened')
    },

    save () {
      // this.set('attemptedSave', true)
      if (this.get('isValid')) {
        this.get('onConfirm')(this.get('formValue'))
      } else {
        this.set('showAllErrors', true)
      }
    },

    myCustomAction () {
      Logger.log('Custom action triggered')
    }
  }
})
