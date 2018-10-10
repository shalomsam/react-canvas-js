# react-canvas-js

> Awesome HTML Canvas Particle animation in React!

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

## Author

#### Shalom Sam
+ Checkout my <a href="https://shalomsam.com" title="Full Stack Web Developer, UI/UX Javascript Specialist" target="_blank">Full Stack Web Developer Website</a>
+ You can checkout this <a href="http://react.shalomsam.com" title="Full Stack Developer, Angular Portfolio" target="_blank">React Portfolio here</a>
+ A scope of my work @ <a title="Web Software Developer Portfolio" target="_blank" href="https://react.shalomsam.com/portfolio">React Portfolio</a>


## License

MIT. Copyright (c) 2018 Shalom Sam.

## License

MIT © [shalomsam](https://github.com/shalomsam)
