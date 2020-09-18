import { ApolloQueryResult } from 'apollo-client';
import client from '@client/apollo';
import { createDomain } from 'effector';
import { GetSuggestPagesQueryVariables, GetSuggestPagesQuery, Scalars } from '@client/types/gql';
import GetSuggestPages from '@client/schemas/queries/order/suggestPages.gql';

const domain = createDomain('suggestPages');

if (process.env.NODE_ENV === 'development') {
    import('effector-logger/attach').then(module => module.attachLogger(domain));
}

export const $suggestPages = domain.createStore<any>({}, { name: 'suggestPages' });

export const getSuggestPages = domain.createEffect<Scalars['ID'], ApolloQueryResult<GetSuggestPagesQuery>>({
    name: 'getSuggestPages',
    async handler(id) {
        return await client.query<GetSuggestPagesQuery, GetSuggestPagesQueryVariables>({
            query: GetSuggestPages,
            variables: { typeId: id },
        });
    },
});

$suggestPages.on(getSuggestPages.doneData, (_, data) => data.data?.suggestpages);
