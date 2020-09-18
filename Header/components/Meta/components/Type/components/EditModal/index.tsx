import React, { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { FormattedMessage, useIntl } from 'react-intl';
import { useStore } from 'effector-react';
import { Order } from '@client/types/gql';
import { Button, Link, Modal } from '@crysp/kit';
import { app } from '@client/models';
import { updateFields } from '../../../../../../data/effects';
import { TypeName, List } from './styled';

interface Props {
    defaultValue: string;
    visible: boolean;
    onClose: () => void;
}

const EditModal: React.FC<Props> = ({ defaultValue, visible, onClose }) => {
    const { id } = useParams();
    const { formatMessage } = useIntl();
    const { dictionary } = useStore(app);
    const pending = useStore(updateFields.pending);
    const [typeId, setTypeId] = useState('');

    const onUpdate = useCallback(async () => {
        await updateFields({ id: id as Order['id'], typeId });
        onClose();
    }, [id, onClose, typeId]);

    useEffect(() => {
        if (dictionary?.worktypes && defaultValue) {
            const type = dictionary.worktypes.find(type => type && type.name === defaultValue);
            if (type) {
                setTypeId(type.id);
            }
        }
    }, [defaultValue, dictionary]);

    return (
        <Modal
            title={formatMessage({
                id: 'order_meta_type_modal_title',
                defaultMessage: 'Тип работы',
            })}
            visible={visible}
            onClose={onClose}
            width={'780px'}
            footer={
                <Button primary onClick={onUpdate} loading={pending}>
                    <FormattedMessage id="order_meta_modal_btn" defaultMessage="Сохранить" />
                </Button>
            }
        >
            <List>
                {dictionary?.worktypes?.map(
                    type =>
                        type && (
                            <TypeName key={type.id} active={type.id === typeId}>
                                <Link type={'underline'} onClick={() => setTypeId(type.id)}>
                                    {type.name}
                                </Link>
                            </TypeName>
                        ),
                )}
            </List>
        </Modal>
    );
};

export default EditModal;
