import React, { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { FormattedDate, FormattedMessage } from 'react-intl';
import { CSSTransition } from 'react-transition-group';
import { useStore } from 'effector-react';
import { Order } from '@client/types/gql';
import { Button } from '@crysp/kit';
import { Meta, Title } from './components';
import { animationName, Global, Wrapper, Inner, SubTitle, Divider, ButtonCell, MetaCell } from './styled';
import { $loading, $category, $deadline, $type } from './data/model';
import { getMeta } from './data/effects';

const Header: React.FC = props => {
    const { id } = useParams();
    const loading = useStore($loading);
    const category = useStore($category);
    const type = useStore($type);
    const deadline = useStore($deadline);
    const [expanded, setExpanded] = useState(false);

    const onExpand = useCallback(() => {
        setExpanded(v => !v);
    }, []);

    useEffect(() => {
        getMeta(id as Order['id']);
    }, [id]);

    return (
        <Wrapper {...props}>
            <Inner>
                <Title editable={expanded} />
                <CSSTransition in={!expanded} timeout={150} classNames={animationName}>
                    <SubTitle>
                        {!loading && (
                            <>
                                {type}
                                <Divider />
                                {category}
                                <Divider />
                                <FormattedMessage
                                    id="order_header_deadline"
                                    defaultMessage="Сдать до {date}"
                                    values={{
                                        date: (
                                            <FormattedDate
                                                value={deadline}
                                                year="numeric"
                                                month="2-digit"
                                                day="2-digit"
                                            />
                                        ),
                                    }}
                                />
                            </>
                        )}
                    </SubTitle>
                </CSSTransition>
            </Inner>
            <ButtonCell>
                <Button iconPlacement="right" icon="NextDown" onClick={onExpand}>
                    <FormattedMessage id="order_details_button" defaultMessage="Детали заказа" />
                </Button>
            </ButtonCell>
            <MetaCell>
                <Meta visible={expanded} />
            </MetaCell>
            <Global />
        </Wrapper>
    );
};

export default Header;
