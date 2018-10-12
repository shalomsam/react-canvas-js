import Particle from './Particle';
import { hasProperty } from '../../utils';

export default class Particles {
    /**
     * @param canvas The html canvas element
     *
     * Example Particle Options:
     * @param options = {
     *   maxParticles: 0,
     *   colors: ['red', 'green', '#ff1000'],
     *   shapes: ['square', 'circle', 'rectangle', { type: 'image', src: '/path/to/image' }],
     *   size: 0.00,
     *   minSize: 0.00,
     *   maxSize: 0.00,
     *   velocity: 0.00,
     *   minSpeed: 0.00,
     *   maxSpeed: 0.00,
     *   alpha: 0.7
     * }
     *
     */
    constructor(canvas, options) {
        const {
            maxParticles,
            backgroundColor,
            colors,
            shapes,
            size,
            minSize,
            maxSize,
            minSpeed,
            maxSpeed,
            alpha,
            frameRate,
            duration,
            precision,
            debugOptions
        } = options;

        this.particles = [];
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.precision = precision || 2;
        this.canvas.style.backgroundColor = backgroundColor || '#f1f1f1';

        this.maxParticles = maxParticles === null || maxParticles === undefined ? 50 : maxParticles;
        this.colors = Array.isArray(colors) ? colors : [colors] || ['red', 'green', 'yellow'];
        this.shapes = Array.isArray(shapes) ? shapes : [shapes] || ['circle', 'square', 'rectangle'];
        this.size = size;
        this.maxSize = +parseFloat(maxSize).toFixed(this.precision) || 20;
        this.minSize = +parseFloat(minSize).toFixed(this.precision) || 10;
        this.maxSpeed = +parseFloat(maxSpeed).toFixed(this.precision) || 0.09;
        this.minSpeed = +parseFloat(minSpeed).toFixed(this.precision) || 0.05;
        this.alpha = alpha || 0.5;
        this.frameRate = frameRate || 0;
        this.frameInterval = 1000 / this.frameRate;
        this.duration = duration || 0;
        this.debugOptions = debugOptions || { showFrameRate: false };
        this.debug = {
            frames: 0,
            start: null,
            frameRate: null
        };
        this.particleOptions = options;
        this.createParticles();
    }

    createParticles = () => {
        let _particles = [...Array(this.maxParticles)];
        if (this.maxParticles === 0 && typeof this.shapes[0] === 'object') {
            _particles = this.shapes;
        }

        /**
         * @param {string|null|object} item - Shape object or string or null.
         */
        for (const [i, item] of _particles.entries()) {
            const particleOptions = Object.assign(this.particleOptions, this.buildParticleOptions(item));
            const particle = new Particle(this.canvas, particleOptions);
            this.attachParticleAnimationConfig(particle, item);
            this.positionCorrection(particle, i);

            this.particles = !Array.isArray(this.particles) ? [] : this.particles;
            this.particles.push(particle);
        }
    }

    buildParticleOptions = (item = null) => {
        let particleOptions = {};
        if (item !== null && typeof item === 'object') {
            particleOptions = Object.assign({}, item);
            if (hasProperty('type', item) && item.type !== 'image') {
                particleOptions.shape = item.type;
            } else if (hasProperty('type', item) && item.type === 'image') {
                particleOptions.shape = 'square';

                if (hasProperty('src', item)) {
                    particleOptions.image = {
                        src: item.src
                    };
                } else {
                    throw new Error('Shape of type `image` must have property `src`.');
                }
            } else {
                particleOptions.shape = typeof item === 'string' ? item : this.getRandomShape();
            }
        }

        particleOptions.shape = particleOptions.shape || this.shape || this.getRandomShape();
        particleOptions.size = particleOptions.size || this.size || this.genRandomSize(particleOptions.shape);

        if (typeof particleOptions.size !== 'object') {
            particleOptions.size = this.parseSize(particleOptions.size, particleOptions);
        }

        particleOptions.color = particleOptions.color || this.getRandomColor();
        particleOptions.x = particleOptions.x || this.getRandomCoordinate('x', undefined, undefined, undefined, particleOptions);
        particleOptions.y = particleOptions.y || this.getRandomCoordinate('y', undefined, undefined, undefined, particleOptions);
        return particleOptions;
    }

    attachParticleAnimationConfig = (particle, item) => {
        if (hasProperty('animate', particle)) {
            return particle;
        }

        particle.animate = {};
        particle.animate.bounds = {};
        if (particle.shape === 'circle') {
            particle.animate.bounds.minX = particle.getSize('x');
            particle.animate.bounds.minY = particle.getSize('y');
        } else {
            particle.animate.bounds.minX = particle.animate.bounds.minY = 0;
        }

        particle.animate.bounds.maxX = this.canvas.width - particle.getSize('x');
        particle.animate.bounds.maxY = this.canvas.height - particle.getSize('y');
        particle.animate.xSpace = particle.x + particle.animate.bounds.minX;
        particle.animate.ySpace = particle.y + particle.animate.bounds.minY;

        particle.animate.xSpace = this.getDistance(particle, 'x');
        particle.animate.ySpace = this.getDistance(particle, 'y');

        if (hasProperty('from', item)) {
            particle.animate.to = {x: particle.x, y: particle.y, size: particle.size, duration: item.to.duration};
            particle.x = item.from.x;
            particle.y = item.from.y;
            particle.size = hasProperty('size', item.from) ? item.from.size : particle.size;
        }
        if (hasProperty('to', item)) {
            particle.animate.to = item.to;
        }

        if (hasProperty('to', particle.animate)) {
            let duration = hasProperty('duration', particle.animate.to) ? particle.animate.to.duration : this.duration;
            particle.animate.speed.x = (particle.animate.to.x - particle.x) / duration;
            particle.animate.speed.y = (particle.animate.to.y - particle.y) / duration;
            particle.animate.direction = {
                x: (particle.animate.to.x - particle.x) > 0 ? -1 : 1,
                y: (particle.animate.to.y - particle.y) > 0 ? -1 : 1
            };
        } else {
            const direction = [1, -1];
            particle.animate.speed = {};
            particle.animate.speed.x = particle.animate.speed.y = this.getRandomFloat(this.minSpeed, this.maxSpeed);
            particle.animate.direction = {
                x: direction[this.getRandomInt(0, 1)],
                y: direction[this.getRandomInt(0, 1)]
            };
        }
    }

    getDistance = (particle, axis) => {
        return particle[axis] + particle.getSize(axis);
    }

    positionCorrection = (particle, i) => {
        const padding = 5;
        let _particles = this.particles.splice(i);

        let _newParticles = _particles.map((_particle) => {
            if (_particle.x < particle.animate.xSpace || _particle.animate.xSpace > particle.x) {
                const totalXSpace = particle.animate.xSpace + padding + _particle.animate.xSpace;
                if (totalXSpace < this.canvas.width) {
                    _particle.x = particle.animate.xSpace + padding;
                } else {
                    _particle.x = particle.x - padding;
                }
            }

            if (_particle.y < particle.animate.ySpace || _particle.animate.ySpace > particle.y) {
                const totalYSpace = particle.animate.ySpace + padding + _particle.animate.ySpace;
                if (totalYSpace < this.canvas.height) {
                    _particle.y = particle.animate.ySpace + padding;
                } else {
                    _particle.y = particle.y - padding;
                }
            }

            return _particle;
        });

        this.particles.concat(_newParticles);
    }

    animate = () => {
        this.interval = window.requestAnimationFrame(this.animate);
        this.draw();

        // Debug
        if (this.debugOptions.showFrameRate) {
            this.debug.start = this.debug.start || performance.now();
            let now = performance.now();
            this.debug.frames++;
            const delta = now - this.debug.start;
            if (delta > 1000) {
                this.debug.frameRate = this.debug.frames;
                this.debug.frames = 0;
                this.debug.start = performance.now();
            }
        }
    }

    draw = () => {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.globalAlpha = this.alpha;

        this.particles.map((particle) => {
            if (hasProperty('to', particle.animate)) {
                this.incrementTo(particle);
            } else {
                this.incrementor(particle);
            }

            particle.draw();
            this.ctx.restore();

            return particle;
        });
    }

    stop = () => {
        window.cancelAnimationFrame(this.interval);
    }

    incrementTo = (particle) => {
        // TODO: add logic
    }

    incrementor = (particle) => {
        const directions = ['x', 'y', 'xy'];
        let direction = directions[this.getRandomInt(0, directions.length - 1)];

        switch (direction) {
            case 'x':
                this.safeIncrement(particle, 'x');
                break;

            case 'y':
                this.safeIncrement(particle, 'y');
                break;

            case 'xy':
                this.safeIncrement(particle, 'x');
                this.safeIncrement(particle, 'y');
                break;
        }
    }

    safeIncrement = (particle, axis) => {
        let projection = particle[axis] + (particle.animate.direction[axis] * particle.animate.speed[axis]);

        if (projection > particle.animate.bounds['max' + axis.toUpperCase()] || projection < particle.animate.bounds['min' + axis.toUpperCase()]) {
            particle.animate.direction[axis] = -1 * particle.animate.direction[axis];
            projection = particle[axis] + (particle.animate.direction[axis] * particle.animate.speed[axis]);
        }

        particle[axis] = projection;
    }

    getRandomShape = () => {
        return this.shapes[this.getRandomInt(0, this.shapes.length - 1)];
    }

    getRandomColor = () => {
        return this.colors[this.getRandomInt(0, this.colors.length - 1)];
    }

    getRandomCoordinate = (axis, from, to, fixed, ctx) => {
        from = from || 0;
        fixed = fixed || 2;

        if (axis === 'x') {
            // canvas width - size to keep particles within canvas boundary
            to = to || this.canvas.width - this.getSize('x', ctx);
        } else if (axis === 'y') {
            // canvas width - size to keep particles within canvas boundary
            to = to || this.canvas.height - this.getSize('y', ctx);
        } else {
            throw new Error('Illegal Axis!');
        }

        let x = this.getRandomInt(from, to);
        return x;
    }

    genRandomSize = (type = 'circle') => {
        let size;
        if (type === 'circle') {
            size = { radius: this.getRandomInt(this.minSize, this.maxSize) };
        } else {
            size = {
                width: this.getRandomInt(this.minSize, this.maxSize),
                height: this.getRandomInt(this.minSize, this.maxSize)
            };
            if (type === 'square') {
                size.width = size.height;
            }
        }

        return size;
    }

    getRandomFloat = (min, max) => {
        return Math.random() * (max - min) + min;
    }

    getRandomInt = (min, max) => {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

    getSize = (axis, particle) => {
        const object = typeof particle === 'object' ? particle : this;
        let dimension = axis === 'x' ? 'width' : 'height';
        if (particle.shape === 'circle') {
            dimension = 'radius';
        }
        return parseInt(object.size[dimension]);
    }

    parseSize = (size, ctx) => {
        let trueSize = size;
        const obj = ctx || this;
        if (typeof size !== 'object') {
            trueSize = obj.shape === 'circle' ? { radius: size } : { width: size, height: size };
        }
        return trueSize;
    }
}
