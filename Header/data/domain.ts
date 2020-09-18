import { createDomain } from 'effector';

// это можно было бы сделать суб доменом, но есть проблема с логером
// https://github.com/sergeysova/effector-logger/issues/15
const domain = createDomain('orderHeader');

if (process.env.NODE_ENV === 'development') {
    import('effector-logger/attach').then(module => module.attachLogger(domain));
}

export default domain;
