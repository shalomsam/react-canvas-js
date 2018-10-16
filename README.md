# react-canvas-js ([demo](https://shalomsam.github.io/react-canvas-js/))

> :rocket: Awesome HTML Canvas animations in React!

[![NPM](https://img.shields.io/npm/v/react-canvas-js.svg)](https://www.npmjs.com/package/react-canvas-js) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save react-canvas-js
```


## Usage

```jsx
import React, { Component } from 'react'
import Canvas from 'react-canvas-js'

const particleOptions = [
  {
    'maxParticles': 50,
    'colors': ['#2E1D62', '#513D91', '#487EEF', '#11A887', '#fc5c65', '#fed330'],
    'shapes': ['circle', 'square'],
    'size': 10,
    'minSpeed': 0.05,
    'maxSpeed': 0.20,
    'alpha': 0.70,
    'backgroundColor': '#1E1F29'
  }
]

class Example extends Component {
  render () {
    return (
      <Canvas options={particleOptions} />
    )
  }
}
```


## Available Options

Option | Type | Required | Default | Description
------ | ---- | -------- | ------- | -----------
precision | `Number` | No | 2 | The precision to use for all float values in the component.
backgroundColor | `String` | No | `'#f1f1f1'` | The background color for the canvas.
maxParticles | `Number` | No | 50 | Maximum number of particles to include in Animation.
color | `String` | No | One of `['red', 'green', 'yellow']`  | The color for all Particles.
colors | `[String]` | No | `['red', 'green', 'yellow']` | The range of colors to randomly pick for each particle.
shape | `Object/String` | No | One of `['circle', 'square', 'rectangle']` | The Shape of the particle.
shape.type | `String` (One of `['image', 'rectangle', 'square', 'circle']`) | No | `null` | The shape type (supported shapes are `['image', 'rectangle', 'square', 'circle']`).
shape.src | `String` | No / Yes (`if type === 'image'`) | `null` | The image src, if type is set to image.
shape.size | `Number || Object` | No | Inherits Parent `size` property. | The size of the particle.
shape.size.width | `Number` | No | Inherits Parent `size` property. | The width of the particle.
shape.size.height | `Number` | No | Inherits Parent `size` property. | The height of the particle.
shape.size.radius | `Number` | No | Inherits Parent `size` property. | The radius of the particle if shape is 'circle'.
shape.color | `String` | No | Inherits Parent `color` property.
shapes | `[Object/String]` | No | `['circle', 'square', 'rectangle']` | The range of shapes to randomly pick for each particle.
minSize | `Number` | No | 10 | The minimum size (range) for the particle sizes, to be picked at random (if `size` not defined).
maxSize | `Number` | No | 10 | The maximum size (range) for the particle sizes, to be picked at random (if `size` not defined).
minSpeed | `Number` | No | 0.05 | The speed for each particle is taken at random in between the min(Speed) / max(Speed) range
maxSpeed | `Number` | No | 0.09 | The speed for each particle is taken at random in between the `min(Speed)` / `max(Speed)` range
alpha | `Number` | No | 0.5 | The alpha/transparency for the canvas particles/elements.
debugOptions | `Object` | No | `null` | Developer Debugging options
debugOptions.enabled | `boolean` | Yes | `false` | Enables debugging, and binds a Particle object to `window.Particle` to inspect.
debugOptions.attachAllParticles | `boolean` | No | `false` | Binds all the Particle objects to `window.Particles`.
debugOptions.showFrameRate | `boolean` | No | Shows a frame rate blurb over the canvas, indicating the frame rate achieved by that canvas.


## Planned Features (checklist)

- [ ] Add interaction support.
  - [ ] Add support for custom hover handler (#1).
  - [ ] Add support for custom click handler (#2).
  - [ ] Add support for custom Keyboard key(s) handler (#3).
- [ ] Add tests (#4).
- [ ] Identify possible Optimizations (#5).
- [ ] Particle/subject animation control, i.e. Support for controlling movement, scale and transform of Particle/subject from current given x,y coordinates to x<sub>n</sub>, y<sub>n</sub> coordinates over given `duration` or `speed` (#6).

*My goal is to progress to more than just Particle animation, by simplifying and adding support for all canvas animation use cases. Suggestions and feedback are welcome too.*


## Contributing

I could use some assistance in building and improving this component. I'll welcome pull requests for bug fixes, new features, improvements and writing test cases. If you are interested head on over to the [Issues](https://github.com/shalomsam/react-canvas-js/issues) section, and pick up any of the issue(s) that interest you. The issues with label `need help` could really do with some help (as the label suggests). Please create your pull requests to the `develop` branch. Top Contributors will be added here under the contributors section (if you'd like that).


## Author

#### Shalom Sam
+ Checkout my <a href="https://shalomsam.com" title="Full Stack Web Developer, UI/UX Javascript Specialist" target="_blank">Full Stack Web Developer Website</a>
+ You can checkout this <a href="http://react.shalomsam.com" title="Full Stack Developer, Angular Portfolio" target="_blank">React Portfolio here</a>
+ A scope of my work @ <a title="Web Software Developer Portfolio" target="_blank" href="https://react.shalomsam.com/portfolio">React Portfolio</a>


## License

MIT © [shalomsam](https://github.com/shalomsam)
