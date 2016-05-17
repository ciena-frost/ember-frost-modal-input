export default function () {
  this.transition(
    this.inHelper('ember-remodal'),
    this.toModal(/(?:-edit|-create)/),
    this.use('explode', {
      pick: '.remodal-overlay',
      use: ['cross-fade', {
        maxOpacity: 0.5
      }]
    }, {
      pick: '.ember-remodal.window',
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
  this.transition(
    this.hasClass('remodal-overlay'),
    this.use('toDown'),
     this.debug()
    // this.use('explode', {
    //   pick: '.lf-overlay',
    //   use: ['cross-fade']
    // }, {
    //   pick: '.lm-container',
    //   use: ['toUp']
    // })
  )
}
