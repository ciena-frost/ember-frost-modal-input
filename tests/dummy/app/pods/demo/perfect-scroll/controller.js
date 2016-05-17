import Ember from 'ember'

const { Controller, computed, inject } = Ember

export default Controller.extend({
  isModalActive: computed.readOnly('modalForms.isModalActive'),
  modalForms: inject.service('modal-forms'),
  actions: {
    save (attrs) {
      this.notifications.addNotification({
        message: 'Submission success',
        type: 'success',
        autoClear: true,
        duration: 1500
      })
      console.log(attrs)
    }
  }
})
