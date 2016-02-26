export default function () {
  this.transition(
    this.inHelper('liquid-modal'),
    this.toModal(/(?:edit-|create-)/),
    this.use('explode', {
      pick: '.lf-overlay',
      use: ['cross-fade', {
        maxOpacity: 0.1,
        duration: 200
      }]
    }, {
      pick: '.lm-container',
      use: ['toDown']
    })
  )

  this.transition(
    this.inHelper('liquid-modal'),
    this.fromModal(/(?:edit-|create-)/),
    this.use('explode', {
      pick: '.lf-overlay',
      use: ['cross-fade', {
        maxOpacity: 0.1,
        duration: 200
      }]
    }, {
      pick: '.lm-container',
      use: ['toUp']
    })
  )
}
