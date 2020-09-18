import domain from './domain';

export const setPhoneMethodId = domain.createEvent<string>('setPhoneMethodId');

export const setPhone = domain.createEvent<string>('setPhone');
