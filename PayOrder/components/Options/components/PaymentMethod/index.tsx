import React, { useCallback, useEffect } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { Select } from '@crysp/kit';
import { PaymentLabel, LabelText } from './styled';

import GetPaymentOrderMethods from '@client/schemas/queries/payOrder/paymentOrderMethods.gql';
import { GetPaymentOrderMethodsQueryVariables, GetPaymentOrderMethodsQuery } from '@client/types/gql';

interface Props {
    paymentMethod: string;
    setPaymentMethod: (methodId: string) => void;
}

const PaymentMethod: React.FC<Props> = ({ setPaymentMethod, paymentMethod }) => {
    const { data } = useQuery<GetPaymentOrderMethodsQuery, GetPaymentOrderMethodsQueryVariables>(
        GetPaymentOrderMethods,
        {
            variables: {
                useSms: true,
            },
        },
    );
    const paymentMethods = data?.payment?.methods || [];

    const getPaymentIcon = (type: string): React.ReactNode => {
        switch (type) {
            case '20':
                return (
                    <>
                        <img src="/media/images/master.svg" />
                        <img src="/media/images/visa.svg" />
                    </>
                );
            case '36':
                return <img src="/media/images/mir.svg" />;
            case '30':
                return <img src="/media/images/sms.svg" />;
            case '1':
                return <img src="/media/images/qiwi.svg" />;
            case '7':
                return <img src="/media/images/yandex.svg" />;
            default:
                return <></>;
        }
    };

    useEffect(() => {
        const firstPaymentMethod = paymentMethods[0] ? paymentMethods[0].id : '';
        setPaymentMethod(String(firstPaymentMethod));
    }, [paymentMethods, setPaymentMethod]);

    return (
        <>
            {paymentMethods.length && (
                <Select
                    size={'large'}
                    width={552}
                    options={paymentMethods.map(method => ({
                        value: method?.id || '',
                        label: method?.name || '',
                    }))}
                    renderItem={item => (
                        <PaymentLabel>
                            <LabelText>{item.label}</LabelText>
                            {getPaymentIcon(item.value)}
                        </PaymentLabel>
                    )}
                    value={paymentMethod}
                    onChange={value => setPaymentMethod(value as string)}
                />
            )}
        </>
    );
};

export default PaymentMethod;
