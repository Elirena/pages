import React from 'react';
import { CSSTransition } from 'react-transition-group';
import { useParams } from 'react-router-dom';
import { FormattedMessage, FormattedDate } from 'react-intl';
import { useStore } from 'effector-react';
import { $creation } from '../../data/model';
import { Type, Category, Deadline, PagesFrom, Description, RemoveOrderButton, FilesButton } from './components';
import { Global, Wrapper, ParamsTable, Divider, Footer, Column, Gray, Content } from './styled';

interface Props {
    visible?: boolean;
}

const Meta: React.FC<Props> = ({ visible = false }) => {
    const { id } = useParams();
    const creation = useStore($creation);

    return (
        <>
            <CSSTransition in={visible} timeout={120} classNames="expand">
                <Wrapper>
                    <Content>
                        <ParamsTable>
                            <tbody>
                                <Type />
                                <Category />
                                <Deadline />
                                <PagesFrom />
                                <Description />
                            </tbody>
                        </ParamsTable>
                        <div>
                            <FilesButton />
                        </div>
                    </Content>
                    <Divider />
                    <Footer>
                        <Column>
                            <div>
                                <FormattedMessage id="order_meta_id" defaultMessage="ID {id}" values={{ id }} />
                            </div>
                            <div>Выбор исполнителя</div>
                        </Column>
                        <Column>
                            <div>
                                <FormattedMessage
                                    id="order_meta_created"
                                    defaultMessage="<label>Задание создано</label> {date}"
                                    values={{
                                        label: (...chunks) => <Gray>{chunks}</Gray>,
                                        date: (
                                            <FormattedDate
                                                value={creation}
                                                year="numeric"
                                                month="2-digit"
                                                day="2-digit"
                                            />
                                        ),
                                    }}
                                />
                            </div>
                            <RemoveOrderButton />
                        </Column>
                    </Footer>
                </Wrapper>
            </CSSTransition>
            <Global />
        </>
    );
};

export default Meta;
