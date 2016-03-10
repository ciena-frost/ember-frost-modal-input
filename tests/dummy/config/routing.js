module.exports = [
  {
    id: 'demo',
    alias: 'Demo',
    type: 'route',
    route: 'demo',
    path: {
      path: '/'
    },
    modalName: 'frost-create-form',
    modal: {
      withParams: 'showModalForm',
      dialogClass: 'frost-bunsen-form-dialog',
      actions: {
        save: 'save'
      }
    }
  }
]
