import React, { useState, useCallback, useMemo } from 'react';
import { FormattedMessage } from 'react-intl';
import { useList, useStoreMap, useStore } from 'effector-react';
import { Typography, Button, Link, Icon } from '@crysp/kit';
import { $files } from '@client/pages/Order/components/Header/data/model';
import { $activeOrderUploadList } from '@client/models/upload';
import { $hashes, $downloadSomeUrl, $downloadAllUrl } from './data/model';
import { SubTitle } from '../../styled';
import { Item, DownloadButton } from './components';
import UploadFile from '../../../UploadFile';
import { Wrapper, ListContent, Actions, Header } from './styled';

const { Title, Content } = Typography;

const List: React.FC = () => {
    const count = useStoreMap({ store: $files, keys: [], fn: state => state.length });
    const hashes = useStore($hashes);
    const downloadSomeUrl = useStore($downloadSomeUrl);
    const downloadAllUrl = useStore($downloadAllUrl);

    const list = useList($files, file => (
        <Item
            fileType={file.fileType as string}
            fileName={file.fileName as string}
            creation={file.creation as number}
            fileSizeInMb={file.fileSizeInMb as number}
            filePath={file.filePath as string}
            fileHash={file.fileHash as string}
        />
    ));

    const uploadList = useList($activeOrderUploadList, item => (
        <Item
            fileName={item.file.name}
            creation={item.file.lastModified}
            bytesLength={item.file.size}
            filePath="#"
            fileHash="#"
            progress={item.progress}
        />
    ));

    return (
        <Wrapper>
            <Header>
                <Title level="2">
                    <FormattedMessage
                        id="my_files_title"
                        defaultMessage="Мои файлы <gray>({count})</gray>"
                        values={{ gray: (...chunks) => <SubTitle>{chunks}</SubTitle>, count }}
                    />
                </Title>
                <UploadFile>
                    <Button icon="Attach">
                        <FormattedMessage id="attach_file" defaultMessage="Прикрепить файл" />
                    </Button>
                </UploadFile>
            </Header>
            <ListContent>
                {list}
                {uploadList}
            </ListContent>
            <Actions>
                <DownloadButton disabled={hashes.length === 0} link={downloadSomeUrl}>
                    <Content level="2">
                        <Icon.Download />
                        <FormattedMessage id="download_selected" defaultMessage="Скачать выбранные" />
                    </Content>
                </DownloadButton>
                <DownloadButton link={downloadAllUrl}>
                    <Content level="2">
                        <FormattedMessage id="download_all" defaultMessage="Скачать все" />
                    </Content>
                </DownloadButton>
            </Actions>
        </Wrapper>
    );
};

export default List;
