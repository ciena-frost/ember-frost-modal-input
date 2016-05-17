module.exports = [
  {
    id: 'demo',
    alias: 'Demo',
    type: 'category',
    route: 'demo',
    path: {
      path: '/'
    },
    items: [{
      id: 'default',
      alias: 'Default',
      type: 'route',
      route: 'demo.default',
      path: {
        path: '/default'
      },
      modalName: 'frost-create-form',
      modal: {
        withParams: 'showModalForm',
        dialogClass: 'frost-bunsen-form-dialog',
        actions: {
          save: 'save'
        }
      }
    }, {
      id: 'perfect-scroll',
      alias: 'Perfect Scroll',
      type: 'route',
      route: 'demo.perfect-scroll',
      path: {
        path: '/perfect-scroll'
      },
      modalName: 'frost-create-form-with-scroll',
      modal: {
        withParams: 'showModalForm',
        dialogClass: 'frost-bunsen-form-dialog',
        actions: {
          save: 'save'
        }
      }
    },
    {
      id: 'remodal',
      alias: 'Using Remodal',
      type: 'route',
      route: 'demo.remodal',
      path: {
        path: '/remodal'
      }
    }]
  }
]
