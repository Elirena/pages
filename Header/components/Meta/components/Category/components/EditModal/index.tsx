import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { useParams } from 'react-router-dom';
import { useStore } from 'effector-react';
import { Order } from '@client/types/gql';
import { Button, Modal, Label } from '@crysp/kit';
import { app } from '@client/models';
import { updateFields } from '../../../../../../data/effects';
import { getTopCategories, $topCategories } from './data/model';
import { StyledSelect, Popular, TopCategory } from './styled';
import { $typeId } from '@client/pages/Order/components/Header/data/model';

interface Props {
    defaultValue: string;
    visible: boolean;
    onClose: () => void;
}

const EditModal: React.FC<Props> = ({ defaultValue, visible, onClose }) => {
    const { formatMessage } = useIntl();
    const { id } = useParams();
    const { dictionary } = useStore(app);
    const typeId = useStore($typeId);
    const topCategories = useStore($topCategories);
    const [categoryId, setCategoryId] = useState(defaultValue);
    const options = useMemo(
        () =>
            dictionary?.workcategories
                ? dictionary?.workcategories.map(category => ({
                      value: category?.id || '',
                      label: category?.name || '',
                  }))
                : [],
        [dictionary],
    );

    const onUpdate = useCallback(async () => {
        await updateFields({ id: id as Order['id'], categoryId });
        onClose();
    }, [id, categoryId, onClose]);

    useEffect(() => {
        if (dictionary && defaultValue) {
            const category = dictionary.workcategories.find(type => type && type.name === defaultValue);
            setCategoryId(category ? category.id : '');
        }
    }, [dictionary, defaultValue]);

    useEffect(() => {
        getTopCategories(typeId);
    }, [typeId]);

    return (
        <Modal
            title={formatMessage({
                id: 'order_meta_subject_modal_title',
                defaultMessage: 'Предмет',
            })}
            visible={visible}
            onClose={onClose}
            footer={
                <Button primary onClick={onUpdate}>
                    <FormattedMessage id="order_meta_modal_btn" defaultMessage="Сохранить" />
                </Button>
            }
        >
            <StyledSelect
                value={categoryId}
                placeholder={formatMessage({
                    id: 'subject_placeholder',
                    defaultMessage: 'Начинайте набирать предмет',
                })}
                allowClear
                showSearch
                onChange={value => {
                    setCategoryId(value || '');
                }}
                options={options}
            />
            <Popular>
                <FormattedMessage id="order_meta_popular_subject" defaultMessage="Популярные предметы:" />
                <TopCategory>
                    {topCategories?.map(item => (
                        <Label key={item.id} color={'gray'} onClick={() => setCategoryId(item.id)}>
                            {item.name}
                        </Label>
                    ))}
                </TopCategory>
            </Popular>
        </Modal>
    );
};

export default EditModal;
