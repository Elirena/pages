import { ApolloQueryResult } from 'apollo-client';
import client from '@client/apollo';
import { createDomain } from 'effector';
import { GetTopCategoriesQueryVariables, GetTopCategoriesQuery, Scalars } from '@client/types/gql';
import topCategories from '@client/schemas/queries/order/getTopCategories.gql';

const domain = createDomain('topCategories');

if (process.env.NODE_ENV === 'development') {
    import('effector-logger/attach').then(module => module.attachLogger(domain));
}

export const $topCategories = domain.createStore<any[]>([], { name: 'topCategories' });

export const getTopCategories = domain.createEffect<Scalars['ID'], ApolloQueryResult<GetTopCategoriesQuery>>({
    name: 'getTopCategories',
    async handler(id) {
        return await client.query<GetTopCategoriesQuery, GetTopCategoriesQueryVariables>({
            query: topCategories,
            variables: { typeId: id },
        });
    },
});

$topCategories.on(getTopCategories.doneData, (_, data) => data.data?.dictionarylist?.topCategories);
