module.exports = {
  description: '',
  normalizeEntityName: function () {},

  /**
     Installs specified packages at the root level of the application.
     Triggered by 'ember install <addon name>'.

     @returns {Promise} package names and versions
   */
  afterInstall: function () {
    return this.addAddonsToProject({
      packages: [
        {name: 'ember-frost-core', target: '>=0.8.0 <2.0.0'},
        {name: 'ember-frost-bunsen', target: '^6.4.0'},
        {name: 'ember-frost-modal', target: '^2.2.1'},
        {name: 'ember-block-slots', target: '^0.12.2'},
        {name: 'ember-prop-types', target: '~2.0.0'},
        {name: 'ember-wormhole', target: '0.3.5'}
      ]
    })
  }
}
