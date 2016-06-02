import Ember from 'ember'
import layout from './template'
const {inject, Component, Logger} = Ember

export default Component.extend({
  remodal: inject.service(),

  layout,
  modalName: 'my-awesome-modal',
  userValue: {},
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
    this.set('userValue', {})
  },
  closeModal () {
    this.get('remodal').close(this.get('modalName'))
  },

  actions: {
    cancel () {
      this.clearForm()
      this.closeModal()
    },

    close () {
      Logger.log('modal closed')
    },

    formValueChanged (formState) {
      this.set('userValue', formState)
    },

    onValidation (e) {
      this.set('isValid', e.errors.length === 0)
    },

    open () {
      Logger.log('modal opened')
    },

    save () {
      this.get('onConfirm')(this.get('userValue'))
      this.clearForm()
      this.closeModal()
    }
  }
})
