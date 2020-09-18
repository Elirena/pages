import client from '@client/apollo';
import { ApolloQueryResult } from 'apollo-client';
import domain from './domain';

import getConditionsQuery from '@client/schemas/queries/getConditions.gql';
import { Offer, GetConditionsQueryVariables, GetConditionsQuery } from '@client/types/gql';

export const getConditions = domain.createEffect<Offer['id'], ApolloQueryResult<GetConditionsQuery>>({
    name: 'getConditionsQuery',
    async handler(id) {
        return await client.query<GetConditionsQuery, GetConditionsQueryVariables>({
            query: getConditionsQuery,
            variables: { offer: id as string },
        });
    },
});
