import React, { useState, useCallback, useEffect } from 'react';
import { useParams } from 'react-router';
import { useQuery } from '@apollo/react-hooks';
import { useStore } from 'effector-react';
import { Alert } from '@crysp/kit';
import { Options, Detailed, SafeDeal, SafeGuarantee } from './components';
import { Wrapper, Column } from './styled';

import getConditionsQuery from '@client/schemas/queries/getConditions.gql';
import { GetConditionsQueryVariables, GetConditionsQuery } from '@client/types/gql';

const PayOrder: React.FC = () => {
    const { id } = useParams();
    const { data } = useQuery<GetConditionsQuery, GetConditionsQueryVariables>(getConditionsQuery, {
        variables: { offer: String(id) },
    });

    const virtualPayCondition = data?.offer?.virtualPayCondition;
    const partPayConditions = data?.offer?.partPayConditions;

    const [isPartPay, setIsPartPay] = useState<boolean>(false);
    const [paymentMethod, setPaymentMethod] = useState<string>('');

    return (
        <>
            <Wrapper>
                <Column>
                    <Options
                        direct={virtualPayCondition !== null && partPayConditions === null}
                        onChangePaymentMethod={setPaymentMethod}
                        paymentMethod={paymentMethod}
                        onChangePartPay={setIsPartPay}
                        isPartPay={isPartPay}
                    />
                    <SafeGuarantee />
                </Column>
                <Column>
                    <Detailed isPartPay={isPartPay} paymentMethod={paymentMethod} key={paymentMethod} />
                    <SafeDeal />
                </Column>
            </Wrapper>
        </>
    );
};

export default PayOrder;
