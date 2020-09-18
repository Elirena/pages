import React, { useCallback, useState, useEffect, useMemo } from 'react';
import { useMutation, useQuery, useApolloClient } from '@apollo/react-hooks';
import { FormattedMessage } from 'react-intl';
import { useParams, useHistory } from 'react-router-dom';
import { Typography, Link, Button } from '@crysp/kit';
import { Additional, ConfirmPhone, PaymentMethod, PaymentType, SmsPayment, PhoneMethod } from './components/';
import { Header, Main, Row, OptionTitle, Footer, PrivacyText } from './styled';
import { Block } from '../../styled';

const { Title, Content } = Typography;

import hireMutation from '@client/schemas/mutations/hire.gql';
import getPaymentData from '@client/schemas/queries/payOrder/paymentData.gql';
import globalData from '@client/schemas/queries/globalData.gql';

import { GlobalDataQuery, GetPaymentDataQuery, GetPaymentDataQueryVariables } from '@client/types/gql';

import { useStore } from 'effector-react';
import { $phoneMethodId, $phone } from '@client/pages/PayOrder/data/model';

interface Props {
    direct: boolean;
    onChangePaymentMethod: (methodId: string) => void;
    paymentMethod: string;
    onChangePartPay: (isPartPay: boolean) => void;
    isPartPay: boolean;
}

const Options: React.FC<Props> = ({ direct, onChangePaymentMethod, paymentMethod, isPartPay, onChangePartPay }) => {
    const { id } = useParams();
    const history = useHistory();
    const client = useApolloClient();
    const [hire] = useMutation(hireMutation);
    const [loading, setLoading] = useState(false);

    const phone = useStore($phone);
    const phoneMethodId = useStore($phoneMethodId);

    const paymentMethodId = useMemo(() => {
        return paymentMethod === '30' ? phoneMethodId : paymentMethod;
    }, [phoneMethodId, paymentMethod]);

    const { data: profileData } = useQuery<GlobalDataQuery>(globalData);

    const { data: paymentData } = useQuery<GetPaymentDataQuery, GetPaymentDataQueryVariables>(getPaymentData, {
        variables: {
            offerId: String(id),
            isPartPay: isPartPay,
            paymentMethodId: paymentMethod,
        },
    });

    const onProceedToGate = useCallback(async () => {
        const response = await client.query<GetPaymentDataQuery, GetPaymentDataQueryVariables>({
            query: getPaymentData,
            variables: {
                offerId: String(id),
                isPartPay: isPartPay,
                paymentMethodId: paymentMethodId,
                phone: phone,
            },
        });

        if (response?.data?.payment?.orderData) {
            let requestUrl = '';
            try {
                const orderData = JSON.parse(response?.data?.payment?.orderData || '{}');
                requestUrl = orderData.requestUrl;
            } catch (e) {
                console.log('error');
            }
            if (requestUrl) {
                const page = window.open(requestUrl, '_blank');
                page && page.focus();
            }
        }
    }, [client, isPartPay, paymentMethodId, id, phone]);

    const onPay = useCallback(async () => {
        setLoading(true);
        const offerId = id && parseInt(id);
        await hire({ variables: { offerId } });
        history.goBack();
    }, [hire, id, history]);

    return (
        <Block>
            <Header>
                <Title>
                    <FormattedMessage id="order_payment" defaultMessage="Оплата заказа" />
                </Title>
            </Header>
            <Main>
                {!direct && (
                    <>
                        {profileData?.profile?.isEnablePartPay && (
                            <Row>
                                <OptionTitle>
                                    <Title level="5">
                                        <FormattedMessage
                                            id="choose_payment_type"
                                            defaultMessage="Как бы вы хотели оплатить?"
                                        />
                                    </Title>
                                </OptionTitle>
                                <PaymentType {...{ onChangePartPay, isPartPay }} />
                            </Row>
                        )}

                        {isPartPay && !profileData?.profile?.isPhoneConfirmed && (
                            <Row>
                                <OptionTitle>
                                    <Title level="5">
                                        <FormattedMessage
                                            id="phone_confirm_block"
                                            defaultMessage="Подтвердите ваш телефон"
                                        />
                                    </Title>
                                </OptionTitle>
                                <ConfirmPhone />
                            </Row>
                        )}

                        {/*есть доп усгуги*/}
                        {/*<Row>*/}
                        {/*    <OptionTitle>*/}
                        {/*        <Title level="5">*/}
                        {/*            <FormattedMessage id="payment_additional" defaultMessage="Дополнительные услуги" />*/}
                        {/*        </Title>*/}
                        {/*    </OptionTitle>*/}
                        {/*    <Additional />*/}
                        {/*</Row>*/}

                        {!paymentData?.payment?.invoice?.canPayWithBalance && (
                            // todo: убрать когда пофиксим Select
                            <Row raised>
                                <OptionTitle>
                                    <Title level="5">
                                        <FormattedMessage id="payment_method" defaultMessage="Способ оплаты" />
                                    </Title>
                                </OptionTitle>
                                <PaymentMethod setPaymentMethod={onChangePaymentMethod} paymentMethod={paymentMethod} />
                            </Row>
                        )}

                        {paymentMethod === '30' && (
                            <>
                                <Row>
                                    <OptionTitle>
                                        <Title level="5">
                                            {/* eslint-disable-next-line */}
                                            <FormattedMessage id="payment_sms" defaultMessage="Выберите оператора" />
                                        </Title>
                                    </OptionTitle>
                                    <SmsPayment />
                                </Row>
                                <Row>
                                    <OptionTitle>
                                        <Title level="5">
                                            <FormattedMessage
                                                id="payment_sms_phone"
                                                defaultMessage="Введите номер телефона"
                                            />
                                        </Title>
                                    </OptionTitle>
                                    <PhoneMethod />
                                </Row>
                            </>
                        )}
                    </>
                )}
                <Footer>
                    <PrivacyText>
                        <Content level="3">
                            <FormattedMessage
                                id="payment_privacy_policy"
                                defaultMessage="Продолжай оплату вы соглашаетесь <a>с&nbsp;условиями использования</a>"
                                values={{
                                    a: (...chunks) => <Link>{chunks}</Link>,
                                }}
                            />
                        </Content>
                    </PrivacyText>

                    {paymentMethod === '30' ? (
                        <Button
                            primary
                            color={'purple'}
                            size="large"
                            disabled={loading || !phone}
                            onClick={onProceedToGate}
                        >
                            {/* eslint-disable-next-line */}
                            <FormattedMessage id="continue_to_pay" defaultMessage="Продолжить" />
                        </Button>
                    ) : (
                        <Button
                            primary
                            color={'purple'}
                            size="large"
                            disabled={loading}
                            onClick={direct ? onPay : onProceedToGate}
                        >
                            {direct ? (
                                <FormattedMessage id="direct_pay" defaultMessage="Перейти к оплате" />
                            ) : (
                                <FormattedMessage id="proceed_to_gate" defaultMessage="Оплатить" />
                            )}
                        </Button>
                    )}
                </Footer>
            </Main>
        </Block>
    );
};

export default Options;
