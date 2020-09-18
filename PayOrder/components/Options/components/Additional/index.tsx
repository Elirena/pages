import React from 'react';
import { FormattedMessage } from 'react-intl';
import Item from './Item';

const Additional: React.FC = () => {
    return (
        <>
            <Item
                src={'/media/images/consult.svg'}
                title={<FormattedMessage id="consult_payment_title" defaultMessage="Онлайн консультация с автором" />}
                description={
                    <FormattedMessage
                        id="consult_payment_description"
                        defaultMessage="Повысь шансы успешно защитить работу"
                    />
                }
                price={<span>300</span>}
            />

            <Item
                src={'/media/images/premium.svg'}
                title={<FormattedMessage id="make_premium_title" defaultMessage="Премиум размещение" />}
                description={
                    <FormattedMessage
                        id="make_payment_description"
                        defaultMessage="Получи в два раза больше откликов"
                    />
                }
                price={<span>200</span>}
            />
        </>
    );
};

export default Additional;
