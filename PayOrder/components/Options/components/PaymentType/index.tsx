import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { RadioButton, Tooltip } from '@crysp/kit';
import { Payment, Gray, PaymentWrapper, Question, ToolStyled } from './styled';
import { FormattedMessage } from 'react-intl';

import { GlobalDataQuery } from '@client/types/gql';
import globalData from '@client/schemas/queries/globalData.gql';

interface Props {
    onChangePartPay: (isPartPay: boolean) => void;
    isPartPay: boolean;
}

const PaymentType: React.FC<Props> = ({ onChangePartPay, isPartPay }) => {
    const { data: profileData } = useQuery<GlobalDataQuery>(globalData);
    const partPayPercent = profileData?.profile?.partPayPercent;
    const isEnablePartPay = false;

    const type = 'availablecondition';
    const tooltipLabel = type => {
        switch (type) {
            // Предоплата доступна,
            case 'availablecondition':
                return <FormattedMessage id="partPay_available" defaultMessage="Оплата по частям" />;
            // Предоплата недоступна, так как превышено максимальное количество заказов по предоплате
            case 'exceededlimitcondition':
                return (
                    <FormattedMessage
                        id="partPay_unavailable"
                        defaultMessage="Предоплата недоступна, так как вы имеете просроченную оплату. Пожалуйста, погасите"
                    />
                );
            // Предоплата недоступна, так как есть долг
            case 'exceededlimitwithdebtcondition':
                return (
                    <FormattedMessage
                        id="partPay_unavailable"
                        defaultMessage="Предоплата недоступна, так как вы имеете просроченную оплату. Пожалуйста, погасите"
                    />
                );
            // Превышено максимальное количество заказов по предоплате и есть долг по старым заказам
            case 'havedebtcondition':
                return (
                    <FormattedMessage
                        id="partPay_unavailable"
                        defaultMessage="Предоплата недоступна, так как вы имеете просроченную оплату. Пожалуйста, погасите"
                    />
                );
            // Предоплата недоступна, так как есть неоплаченные заказы
            case 'haveunpaidcondition':
                return (
                    <FormattedMessage
                        id="modal__partPay_unavailable__unpaid_condition"
                        defaultMessage="Предоплата недоступна, так как у Вас есть неоплаченные заказы. Завершите оплату по всем заказам, функция снова будет доступна Вам автоматически. Пожалуйста, погасите"
                    />
                );
            default:
                return null;
        }
    };

    return (
        <Payment>
            <PaymentWrapper selected={!isPartPay}>
                <RadioButton
                    stroke
                    label={<FormattedMessage id="full_payment" defaultMessage="Полная оплата" />}
                    isChecked={!isPartPay}
                    onChange={isChecked => isChecked && onChangePartPay(false)}
                />
            </PaymentWrapper>

            <PaymentWrapper selected={isPartPay}>
                <RadioButton
                    stroke
                    label={
                        <React.Fragment>
                            <FormattedMessage
                                id="partial_payment"
                                defaultMessage="По частям <span>(30%)</span>"
                                values={{
                                    span: (...chunks) => <Gray>({partPayPercent}%)</Gray>,
                                }}
                            />
                            <ToolStyled>
                                <Tooltip label={tooltipLabel(type)} placement="top">
                                    <Question />
                                </Tooltip>
                            </ToolStyled>
                        </React.Fragment>
                    }
                    isChecked={isPartPay}
                    // disabled={!isEnablePartPay}
                    onChange={isChecked => isChecked && onChangePartPay(true)}
                />
            </PaymentWrapper>
        </Payment>
    );
};

export default PaymentType;
