import { ApolloQueryResult } from 'apollo-client';
import { FetchResult } from 'apollo-link';
import client from '@client/apollo';
import {
    OrderMetaQuery,
    OrderMetaQueryVariables,
    Order,
    UpdateOrderMutation,
    UpdateOrderMutationVariables,
    OrderInputType,
} from '@client/types/gql';
import orderMetaQuery from '@client/schemas/queries/order/orderMeta.gql';
import updateOrderMutation from '@client/schemas/mutations/order/updateOrder.gql';
import domain from './domain';

export const getMeta = domain.createEffect<Order['id'], ApolloQueryResult<OrderMetaQuery>>({
    name: 'getMeta',
    async handler(id) {
        return await client.query<OrderMetaQuery, OrderMetaQueryVariables>({
            query: orderMetaQuery,
            variables: { id },
            fetchPolicy: 'network-only',
        });
    },
});

interface UpdateFieldParams extends OrderInputType {
    id: Order['id'];
}

export const updateFields = domain.createEffect<UpdateFieldParams, FetchResult<UpdateOrderMutation>>({
    name: 'updateFields',
    async handler({ id, ...order }) {
        return await client.mutate<UpdateOrderMutation, UpdateOrderMutationVariables>({
            mutation: updateOrderMutation,
            variables: { id, order },
        });
    },
});

export const deleteOrder = domain.createEffect();
