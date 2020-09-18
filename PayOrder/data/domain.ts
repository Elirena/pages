import { createDomain } from 'effector';

const domain = createDomain('payOrder');

if (process.env.NODE_ENV === 'development') {
    import('effector-logger/attach').then(module => module.attachLogger(domain));
}

export default domain;
