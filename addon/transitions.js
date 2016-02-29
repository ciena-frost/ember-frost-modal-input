export default function () {
  this.transition(
    this.inHelper('liquid-modal'),
    this.toModal(/(?:-edit|-create)/),
    this.use('explode', {
      pick: '.lf-overlay',
      use: ['cross-fade', {
        maxOpacity: 0.5
      }]
    }, {
      pick: '.lm-container',
      use: ['toDown']
    })
  )

  this.transition(
    this.inHelper('liquid-modal'),
    this.fromModal(/(?:-edit|-create)/),
    this.use('explode', {
      pick: '.lf-overlay',
      use: ['cross-fade']
    }, {
      pick: '.lm-container',
      use: ['toUp']
    })
  )
}
