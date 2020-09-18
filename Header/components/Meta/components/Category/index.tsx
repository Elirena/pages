import React, { useCallback, useState } from 'react';
import { FormattedMessage } from 'react-intl';
import { useStore } from 'effector-react';
import { $category } from '../../../../data/model';
import { ChangeBtn, Label, EditIcon } from './../styled';
import { EditModal } from './components';

const Category: React.FC = () => {
    const category = useStore($category);
    const [isOpen, setIsOpen] = useState(false);

    const onClose = useCallback(() => {
        setIsOpen(false);
    }, []);

    return (
        <tr>
            <td>
                <Label>
                    <FormattedMessage id="order_meta_subject_label" defaultMessage="Предмет" />
                </Label>
            </td>
            <td>
                <ChangeBtn onClick={() => setIsOpen(true)}>
                    {category}
                    <EditIcon />
                </ChangeBtn>
                <EditModal defaultValue={category} visible={isOpen} onClose={onClose} />
            </td>
        </tr>
    );
};

export default Category;
