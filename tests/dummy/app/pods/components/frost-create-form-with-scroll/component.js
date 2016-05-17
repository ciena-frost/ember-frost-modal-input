import Ember from 'ember'
import layout from './template'
import {AbstractModal} from 'ember-frost-modal-input'
const {inject} = Ember

export default AbstractModal.extend({
  remodal: inject.service(),
  modalForms: inject.service('modal-forms'),

  layout,
  formValue: {},
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

  clearForm () {
    this.set('formValue', {})
  },
  closeModal() {
    this.get('remodal').close('my-ps-modal');
  },
  /* Ember.Component method */
  willInsertElement () {
    this.get('modalForms').setModalActive(true)
  },

  /* Ember.Component method */
  willDestroyElement () {
    this.get('modalForms').setModalActive(false)
  },

  actions: {
    cancel () {
      this.clearForm()
      this.closeModal()
    },

    formValueChanged (formState) {
      this.set('formValue', formState)
    },

    onValidation (e) {
      this.set('isValid', e.errors.length === 0)
    },

    save () {
      this.get('onConfirm')(this.get('formValue'))
      this.closeModal()
      this.clearForm()
    }
  }
})
