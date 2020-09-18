import React, { useCallback, useState } from 'react';
import { FormattedMessage } from 'react-intl';
import { useStore } from 'effector-react';
import { Button, Link } from '@crysp/kit';
import { $files } from '../../../../data/model';
import { ListModal } from './components';
import { Wrapper, Text } from './styled';

const FilesButton: React.FC = () => {
    const files = useStore($files);
    const [modalVisible, setModalVisible] = useState(false);

    const onClick = useCallback(() => {
        setModalVisible(true);
    }, []);
    const onCancel = useCallback(() => {
        setModalVisible(false);
    }, []);

    return (
        <>
            <Wrapper onClick={onClick}>
                <Button primary shape="circle" size="small" icon="Attach" />
                <Text>
                    <Link type="dashed">
                        {files.length > 0 ? (
                            <FormattedMessage
                                id="my_files"
                                defaultMessage="Мои файлы ({count})"
                                values={{ count: files.length }}
                            />
                        ) : (
                            <FormattedMessage id="attach_file" defaultMessage="Прикрепить файл" />
                        )}
                    </Link>
                </Text>
            </Wrapper>
            <ListModal visible={modalVisible} onCancel={onCancel} />
        </>
    );
};

export default FilesButton;
