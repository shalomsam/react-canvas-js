import React, { Component } from 'react';

import { Canvas, importAll } from 'react-canvas-js';
import Prism from 'prismjs';
import * as Normalizer from 'prismjs/plugins/normalize-whitespace/prism-normalize-whitespace';
import './prism.css';

let icons = importAll(require.context('./assets/images/icons', false, /\.(jpg|jpeg|png|svg)$/));

icons = icons.map((icon) => {
  return {
    type: 'image',
    src: icon
  }
});


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
  },
  {
    "maxParticles": 50,
    "colors": ["#2E1D62", "#513D91", "#487EEF", "#11A887"],
    "shapes": ["circle"],
    "size": 10,
    "minSpeed": 0.05,
    "maxSpeed": 0.20,
    "alpha": 0.70,
    'backgroundColor': '#f1f1f1'
  },
  {
    "maxParticles": 0,
    "shapes": icons,
    "size": 100,
    "minSpeed": 0.10,
    "maxSpeed": 0.30,
    "alpha": 0.90,
    'backgroundColor': '#f1f1f1'
  }
]

const headers = [
  'Simple Random Particle Animation',
  'Single Shape Only',
  'Image Particles'
]

export default class App extends Component {

  componentDidMount() {

  }

  render() {
    this.normalizer = new Normalizer({
      'remove-trailing': true,
      'remove-indent': true,
      'left-trim': true,
      'right-trim': true,
    });

    const examples = particleOptions.map((option, i) => {

      let code = 'const sample'+ (i+1) + ' = ' + JSON.stringify(option, null, 2) + ';';

      let appCode = `
        import React, { Component } from 'react';
import { Canvas } from 'react-particles';

${code}

export default class App extends Component {
  render() {
    return (
      <Canvas options={sample${i+1}} />
    )
  }
}
      `;

      appCode = this.normalizer.normalize(appCode.toString(), {indent: 1});
      const html = Prism.highlight(appCode, Prism.languages.javascript);

      return (
        <div className='exampleWrp' key={'Sample' + (i+1)} style={{
          border: '1px solid #f1f1f1',
          padding: '10px',
          margin: '10px auto'
          }}>
          <h3>{headers[i]}</h3>
          <div className='canvasWrp'>
            <Canvas options={option} style={{height: '460px'}} />
          </div>
          <p><strong>Options used for above output:</strong></p>
          <div className='codeWrp'>
            <pre className='language-javascript'>
              <code dangerouslySetInnerHTML={{__html: html}}></code>
            </pre>
          </div>
        </div>
      );
    })

    return (
      <div className='container-fluid py-5'>
        <div className='row'>
          <div className='col'>
            <h1 className='text-center pb-3'>Awesome React Canvas Particle Animation</h1>
            {examples}
          </div>
        </div>
      </div>
    )
  }
}
