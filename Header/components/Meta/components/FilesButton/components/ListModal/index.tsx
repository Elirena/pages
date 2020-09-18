import React from 'react';
import { useStore } from 'effector-react';
import { Modal } from '@crysp/kit';
import { $files } from '@client/pages/Order/components/Header/data/model';
import { $activeOrderUploadList } from '@client/models/upload';
import { Empty, List } from './components';

interface Props {
    visible: boolean;
    onCancel: () => void;
}

const ListModal: React.FC<Props> = ({ visible, onCancel }) => {
    const files = useStore($files);
    const uploadList = useStore($activeOrderUploadList);
    const showList = uploadList.length > 0 || files.length > 0;

    return (
        <Modal visible={visible} onClose={onCancel} footer={null}>
            {showList ? <List /> : <Empty />}
        </Modal>
    );
};

export default ListModal;
