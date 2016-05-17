import Ember from 'ember';

export default Ember.Controller.extend({
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
