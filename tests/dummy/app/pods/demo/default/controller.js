import Ember from 'ember';

const {Controller, inject, computed} = Ember

export default Controller.extend({
  modalForms: inject.service('modal-forms'),

  isModalActive: computed.readOnly('modalForms.isModalActive'),
  actions: {
    save (attrs) {
      debugger
      this.notifications.addNotification({
        message: 'Submission success',
        type: 'success',
        autoClear: true,
        duration: 1500
      })
      console.log(attrs)
    }
  }
});
