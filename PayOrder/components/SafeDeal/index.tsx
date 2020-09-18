import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Wrapper, Title, Description } from './styled';

const SafeDeal: React.FC = () => {
    return (
        <Wrapper>
            <img src="/media/images/shield.svg" />
            <div>
                <Title>
                    <FormattedMessage id="safe_deal" defaultMessage="Безопасная сделка" />
                </Title>
                <Description>
                    <FormattedMessage
                        id="safe_deal_description"
                        defaultMessage="Мы гарантируем возврат денег, если исполнитель не справился с заказом или сорвал сроки"
                    />
                </Description>
            </div>
        </Wrapper>
    );
};

export default SafeDeal;
