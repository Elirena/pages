import { Files } from '@client/types/gql';
import domain from './domain';
import { getMeta, updateFields } from './effects';

export const $loading = domain.createStore(true, { name: 'loading' });

export const $title = domain.createStore('', { name: 'title' });

export const $category = domain.createStore('', { name: 'category' });

export const $type = domain.createStore('', { name: 'type' });

export const $typeId = domain.createStore('', { name: 'typeId' });

export const $pages = domain.createStore([5, 10], { name: 'pages' });

export const $deadline = domain.createStore('', { name: 'deadline' });

export const $description = domain.createStore('', { name: 'description' });

export const $creation = domain.createStore('', { name: 'creation' });

export const $files = domain.createStore<Files[]>([], { name: 'files' });

$loading.on(getMeta.doneData, () => false);

$title.on(getMeta.doneData, (_, data) => data.data.order?.title);

$title.on(updateFields.doneData, (_, data) => data.data?.updateOrder?.title);

$category.on(getMeta.doneData, (_, data) => data.data.order?.category);

$category.on(updateFields.doneData, (_, data) => data.data?.updateOrder?.category);

$type.on(getMeta.doneData, (_, data) => data.data.order?.type);

$typeId.on(getMeta.doneData, (_, data) => data.data.order?.typeId);

$type.on(updateFields.doneData, (_, data) => data.data?.updateOrder?.type);

$typeId.on(updateFields.doneData, (_, data) => data.data?.updateOrder?.typeId);

$pages.on(getMeta.doneData, (_, data) => (data.data.order ? [data.data.order.pagesFrom, data.data.order.pagesTo] : _));

$pages.on(updateFields.doneData, (_, data) =>
    data.data?.updateOrder ? [data.data.updateOrder.pagesFrom, data.data.updateOrder.pagesTo] : _,
);

$deadline.on(getMeta.doneData, (_, data) => data.data.order?.deadline);

$deadline.on(updateFields.doneData, (_, data) => data.data?.updateOrder?.deadline);

$description.on(getMeta.doneData, (_, data) => data.data.order?.description);

$description.on(updateFields.doneData, (_, data) => data.data?.updateOrder?.description);

$creation.on(getMeta.doneData, (_, data) => data.data.order?.creation);

$files.on(getMeta.doneData, (_, data) => data.data.order?.files as Files[]);
