import Ember from 'ember'

const {Controller} = Ember

export default Controller.extend({
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
