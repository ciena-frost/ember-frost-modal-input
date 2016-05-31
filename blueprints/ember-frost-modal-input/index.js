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
        {name: 'ember-frost-core', target: '>=0.0.14 <2.0.0'},
        {name: 'ember-block-slots', target: '^0.12.2'},
        {name: 'ember-perfectscroll', target: '^0.1.2'}
        {name: 'ember-remodal', target: '^1.2.0'},
        {name: 'ember-wormhole', target: '0.3.5'}
      ]
    })
  }
}
