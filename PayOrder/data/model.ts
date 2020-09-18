import domain from './domain';
import { getConditions } from './effects';
import { setPhoneMethodId, setPhone } from './events';
import { GetConditionsQuery } from '@client/types/gql';

export const $phoneMethodId = domain.createStore('4', { name: 'phoneMethodId' });
$phoneMethodId.on(setPhoneMethodId, (_, id) => id);

export const $phone = domain.createStore('', { name: 'phone' });
$phone.on(setPhone, (_, phone) => phone);

export const $orderConditions = domain.createStore<GetConditionsQuery | null>(null, { name: 'orderConditions' });
$orderConditions.on(getConditions.doneData, (_, data) => data.data);
