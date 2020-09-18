import React, { useCallback, useEffect, useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { useParams } from 'react-router-dom';
import { useStore } from 'effector-react';
import { Textarea } from './styled';
import { Button, Modal } from '@crysp/kit';
import { updateFields } from '../../../../../../data/effects';
import { Order } from '@client/types/gql';

interface Props {
    defaultValue: string;
    visible: boolean;
    onClose: () => void;
}

const EditModal: React.FC<Props> = ({ defaultValue, visible, onClose }) => {
    const { id } = useParams();
    const { formatMessage } = useIntl();
    const [description, setDescription] = useState(defaultValue);
    const pending = useStore(updateFields.pending);

    const onChange = useCallback(event => {
        setDescription(event.target.value);
    }, []);
    const onUpdate = useCallback(async () => {
        await updateFields({ id: id as Order['id'], description });
        onClose();
    }, [id, description, onClose]);

    useEffect(() => {
        if (defaultValue) {
            setDescription(defaultValue);
        }
    }, [defaultValue]);

    return (
        <Modal
            title={formatMessage({
                id: 'order_meta_description_modal_title',
                defaultMessage: 'Описание',
            })}
            visible={visible}
            onClose={onClose}
            footer={
                <Button primary onClick={onUpdate} loading={pending}>
                    <FormattedMessage id="order_meta_modal_btn" defaultMessage="Сохранить" />
                </Button>
            }
        >
            <Textarea
                placeholder={'Добавьте описание к вашему заданию чтобы авторам было проще его оценить...'}
                defaultValue={description}
                onChange={onChange}
                autoFocus={description.length === 0}
            />
        </Modal>
    );
};

export default EditModal;
