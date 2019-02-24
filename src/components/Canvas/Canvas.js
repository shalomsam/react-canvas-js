import React, { Component } from 'react';
import Particles from './Particles';
import PropTypes from 'prop-types';
import Aux from '../Aux/Aux';

const sizePropType = PropTypes.oneOf([
    {width: PropTypes.number.isRequired, height: PropTypes.number},
    {radius: PropTypes.number.isRequired},
    PropTypes.number
]);

const shapePropType = PropTypes.shape({
    type: PropTypes.oneOf(['image', 'rectangle', 'square', 'circle']).isRequired,
    src: PropTypes.string,
    size: sizePropType,
    color: PropTypes.string,
    to: PropTypes.shape({
        x: PropTypes.number,
        y: PropTypes.number,
        size: sizePropType,
        duration: PropTypes.number,
        speed: PropTypes.number
    })
});

export default class Canvas extends Component {
    static propTypes = {
        options: PropTypes.shape({
            maxParticles: PropTypes.number,
            color: PropTypes.string,
            colors: PropTypes.arrayOf(PropTypes.string),
            shape: PropTypes.oneOfType([shapePropType, PropTypes.string]),
            shapes: PropTypes.arrayOf(
                PropTypes.oneOfType([shapePropType, PropTypes.string])
            ),
            minSize: PropTypes.number,
            maxSize: PropTypes.number,
            size: PropTypes.number,
            minSpeed: PropTypes.number,
            maxSpeed: PropTypes.number,
            alpha: PropTypes.number,
            frameRate: PropTypes.number,
            duration: PropTypes.number,
            precision: PropTypes.number,
            debugOptions: PropTypes.shape({
                enabled: PropTypes.bool.isRequired,
                attachAllParticles: PropTypes.bool,
                attachSingleParticles: PropTypes.bool
            })
        }),
        handler: (props, propName, componentName) => {
            if (props.handler === null || props.handler === undefined) {
                return null;
            }

            if (!props.handler.hasOwnProperty('animate') && typeof props.handler.animate !== 'function') {
                return new Error(`${propName} must have an 'animate' method in ${componentName}.`);
            }
            if (!props.handler.hasOwnProperty('draw') && typeof props.handler.draw !== 'function') {
                return new Error(`${propName} must have an 'draw' method in ${componentName}.`);
            }

            return null;
        },
        className: PropTypes.string,
        style: PropTypes.object
    }

    state = {
        debug: null
    }
    handler = null;
    debugInterval = null;

    constructor(props) {
        super(props);
        this.handler = props.handler || Particles;
    }

    componentDidMount() {
        window.addEventListener('resize', () => {
            if (this.canvas) {
                this.canvasSizing(this.canvas);
            }
        });

        this.canvasSizing(this.canvas);
        if (this.particles !== null && typeof this.particles.debug === 'object') {
            this.debugInterval = setInterval(() => {
                window.test = this.particles.debug;
                const debug = Object.assign({}, this.particles.debug);
                this.setState({ debug: debug });
            }, 1000);
        }
    }

    componentWillUnmount() {
        window.removeEventListener('resize', () => {
            this.canvasSizing(this.canvas);
        });
    }

    canvasSizing = (canvas) => {
        window.can = canvas;
        const wWidth = canvas.parentElement.clientWidth;
        const wHeight = canvas.parentElement.clientHeight;

        const scale = window.devicePixelRatio;

        canvas.style.width = wWidth + 'px';
        canvas.style.height = wHeight + 'px';

        canvas.width = scale * wWidth;
        canvas.height = scale * wHeight;

        if (this.particles !== null && typeof this.particles === 'object') {
            this.particles.clear();
            delete this.particles;
        }

        this.animate();
    }

    animate = () => {
        let options = this.props.options;
        let Handler = this.handler;
        this.particles = new Handler(this.canvas, options);
        this.particles.animate();
    };

    render() {
        let debugElement = null;
        if (this.state.debug !== null && typeof this.state.debug === 'object' && this.state.debug.frameRate !== null) {
            this.canvas.parentElement.style.position = 'relative';
            debugElement = (<div style={{
                position: 'absolute',
                top: 0,
                right: 0,
                fontSize: '14px',
                padding: '10px',
                color: 'white',
                backgroundColor: 'rgba(0,0,0,0.7)'
            }}>{this.state.debug.frameRate} <i>fps</i></div>);
        }

        return (
            <Aux>
                <canvas className={this.props.className} style={this.props.style} ref={canvas => {
                    this.canvas = canvas;
                }} />
                {debugElement}
            </Aux>
        );
    }
}
