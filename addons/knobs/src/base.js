import deprecate from 'util-deprecate';
import KnobManager from './KnobManager';

export const manager = new KnobManager();

export function knob(name, options) {
  return manager.knob(name, options);
}

export function text(name, value) {
  return manager.knob(name, { type: 'text', value });
}

export function boolean(name, value) {
  return manager.knob(name, { type: 'boolean', value });
}

export function number(name, value, options = {}) {
  const rangeDefaults = {
    min: 0,
    max: 10,
    step: 1,
  };

  const mergedOptions = options.range
    ? {
        ...rangeDefaults,
        ...options,
      }
    : options;

  const finalOptions = {
    ...mergedOptions,
    type: 'number',
    value,
  };

  return manager.knob(name, finalOptions);
}

export function color(name, value) {
  return manager.knob(name, { type: 'color', value });
}

export function object(name, value) {
  return manager.knob(name, { type: 'object', value });
}

export const select = deprecate(
  (name, options, value) => manager.knob(name, { type: 'select', options, value }),
  'in v4 keys/values of the options argument are reversed'
);

export function selectV2(name, options, value) {
  return manager.knob(name, { type: 'select', selectV2: true, options, value });
}

export function array(name, value, separator = ',') {
  return manager.knob(name, { type: 'array', value, separator });
}

export function date(name, value = new Date()) {
  const proxyValue = value ? value.getTime() : null;
  return manager.knob(name, { type: 'date', value: proxyValue });
}

export function button(name, callback) {
  return manager.knob(name, { type: 'button', callback, hideLabel: true });
}
