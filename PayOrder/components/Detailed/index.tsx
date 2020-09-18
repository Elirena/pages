import React, { useMemo } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { FormattedDate, FormattedMessage } from 'react-intl';
import { Avatar, Tooltip, Typography } from '@crysp/kit';
import { useParams } from 'react-router';
import { Currency } from '@client/widgets';
import { Block } from '../../styled';
import {
    Wrapper,
    Header,
    Meta,
    OrderName,
    Divider,
    Row,
    Notifications,
    Text,
    RowTitle,
    RowTotal,
    RowValue,
    RowBalance,
    Question,
    TooltipStyled,
    Subtext,
} from './styled';

import getPaymentData from '@client/schemas/queries/payOrder/paymentData.gql';
import getOrderTitle from '@client/schemas/queries/payOrder/getOrderTitle.gql';

import {
    GetPaymentDataQuery,
    GetPaymentDataQueryVariables,
    GetOrderTitleQuery,
    GetOrderTitleQueryVariables,
} from '@client/types/gql';

import { useStore } from 'effector-react';
import { $phoneMethodId } from '@client/pages/PayOrder/data/model';

const { Title } = Typography;

interface Props {
    isPartPay: boolean;
    paymentMethod?: string;
}

const Detailed: React.FC<Props> = ({ isPartPay, paymentMethod = '20' }) => {
    const { id } = useParams();

    const phoneMethodId = useStore($phoneMethodId);

    const paymentMethodId = useMemo(() => {
        return paymentMethod === '30' ? phoneMethodId : paymentMethod;
    }, [phoneMethodId, paymentMethod]);

    const { data: paymentData } = useQuery<GetPaymentDataQuery, GetPaymentDataQueryVariables>(getPaymentData, {
        variables: {
            offerId: String(id),
            isPartPay: isPartPay,
            paymentMethodId: paymentMethodId,
        },
        fetchPolicy: 'no-cache',
    });

    const orderId = paymentData?.offer?.orderId;
    const { data: orderTitle } = useQuery<GetOrderTitleQuery, GetOrderTitleQueryVariables>(getOrderTitle, {
        variables: {
            id: String(orderId),
        },
        skip: !orderId,
    });
    const invoice = paymentData?.payment?.invoice;

    const detailsBlock = paymentData?.payment?.invoice?.details?.map(detail => {
        switch (detail?.__typename) {
            case 'realbalance':
                return detail?.value ? (
                    <RowBalance>
                        <RowTitle>
                            {/* eslint-disable-next-line */}
                            <FormattedMessage id="payment_detailed_balance" defaultMessage="На моем балансе" />
                        </RowTitle>
                        <Currency value={detail?.value} />
                    </RowBalance>
                ) : (
                    <Divider />
                );
            case 'bid':
                return detail?.value ? (
                    <Row>
                        <RowTitle>
                            {/* eslint-disable-next-line */}
                            <FormattedMessage id="payment_detailed_bid" defaultMessage="Ставка автора" />
                        </RowTitle>
                        <Currency value={detail?.value} />
                    </Row>
                ) : (
                    ''
                );
            case 'platformtax':
                return detail?.value ? (
                    <Row>
                        <RowTitle>
                            {/* eslint-disable-next-line */}
                            <FormattedMessage id="payment_detailed_platformTax" defaultMessage="Комиссия сервиса" />
                            <TooltipStyled>
                                <Tooltip label="комиссия сервиса" placement="top">
                                    <Question />
                                </Tooltip>
                            </TooltipStyled>
                        </RowTitle>
                        <Currency value={detail?.value} />
                    </Row>
                ) : (
                    ''
                );
            case 'paymentsystemtax':
                return detail.value ? (
                    <Row>
                        <RowTitle>
                            <FormattedMessage
                                id="payment_detailed_platformTax"
                                defaultMessage="Комиссия сервиса"
                            />
                        </RowTitle>
                        <Currency value={detail?.value} />
                    </Row>
                ) : (
                    ''
                );
            case 'virtualmoney':
                return detail?.value ? (
                    <Row>
                        <RowTitle>
                            {/* eslint-disable-next-line */}
                            <FormattedMessage id="payment_detailed_virtualMoney" defaultMessage="Бонусные деньги" />
                        </RowTitle>
                        -<Currency value={detail?.value} />
                    </Row>
                ) : (
                    ''
                );
            case 'warrantyperiod':
                return detail.value ? (
                    <Row>
                        <RowTitle>
                            <FormattedMessage
                                id="payment_detailed_guarantee"
                                defaultMessage="Гарантия <span>0</span> дней"
                                values={{ span: (...chunks) => <span>{detail?.value}</span> }}
                            />
                        </RowTitle>
                        <RowValue>Бесплатно</RowValue>
                    </Row>
                ) : (
                    ''
                );
            default:
                break;
        }
    });

    return (
        <Block>
            <Wrapper>
                <Header>
                    <Avatar role="performer" size="m48" src={paymentData?.offer?.user?.avatar || undefined} />
                    <Meta>
                        <Title level="5">{paymentData?.offer?.user?.nickName || ''}</Title>
                        <OrderName>{orderTitle?.order?.title}</OrderName>
                    </Meta>
                </Header>

                {detailsBlock}

                <Divider />
                <RowTotal>
                    {isPartPay ? (
                        <Title level="5">
                            {/* eslint-disable-next-line */}
                            <FormattedMessage id="payment_detailed_pay" defaultMessage="К оплате сейчас" />
                        </Title>
                    ) : (
                        <Title level="5">
                            {/* eslint-disable-next-line */}
                            <FormattedMessage id="payment_detailed_summToPay" defaultMessage="Сумма к оплате" />
                        </Title>
                    )}
                    <Title level="3">
                        <Currency value={invoice?.total || 0} />
                    </Title>
                </RowTotal>
                {isPartPay && (
                    <Row>
                        <Notifications>
                            <img src="/media/images/attention.svg" />
                            <Text>
                                <Currency value={invoice?.secondPartPayInfo?.value || 0} />{' '}
                                <Subtext>
                                    <FormattedMessage
                                        id="payment_detailed_partPay_secondPart"
                                        defaultMessage="нужно будет доплатить до <span>0</span>"
                                        values={{
                                            span: (...chunks) => (
                                                <FormattedDate
                                                    value={invoice?.secondPartPayInfo?.deadline}
                                                    month="long"
                                                    day="2-digit"
                                                    year="numeric"
                                                    hour="numeric"
                                                    minute="numeric"
                                                />
                                            ),
                                        }}
                                    />
                                </Subtext>
                            </Text>
                        </Notifications>
                    </Row>
                )}
            </Wrapper>
        </Block>
    );
};

export default Detailed;
