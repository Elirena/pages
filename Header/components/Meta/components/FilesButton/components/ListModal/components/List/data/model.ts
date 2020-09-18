import { createDomain } from 'effector';
import { $files } from '@client/pages/Order/components/Header/data/model';
import { Files } from '@client/types/gql';

const domain = createDomain('fileList');

if (process.env.NODE_ENV === 'development') {
    import('effector-logger/attach').then(module => module.attachLogger(domain));
}

export const $hashes = domain.createStore<Array<Files['fileHash']>>([], { name: 'hashes' });

export const check = domain.createEvent<Files['fileHash']>('check');
export const uncheck = domain.createEvent<Files['fileHash']>('uncheck');

$hashes.on(check, (state, fileHash) => {
    if (state.every(item => item !== fileHash)) {
        return [...state, fileHash];
    }
    return state;
});

$hashes.on(uncheck, (state, fileHash) => {
    return state.filter(item => item !== fileHash);
});

export const $downloadSomeUrl = $hashes.map(hashes => {
    const prefix = `//${process.env.HOST}/file/getarchive/`;
    return `${prefix}${hashes.join('_')}`;
});

export const $downloadAllUrl = $files.map(files => {
    const prefix = `//${process.env.HOST}/file/getarchive/`;
    return `${prefix}${files.map(file => file.fileHash).join('_')}`;
});
