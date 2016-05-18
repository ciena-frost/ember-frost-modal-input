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
      }
    }, {
      id: 'perfect-scroll',
      alias: 'Perfect Scroll',
      type: 'route',
      route: 'demo.perfect-scroll',
      path: {
        path: '/perfect-scroll'
      }
    }]
  }
]
