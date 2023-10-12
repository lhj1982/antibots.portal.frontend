"use client";
import { SearchOutlined } from '@ant-design/icons';
import React, { useRef, useState } from 'react';
import Highlighter from 'react-highlight-words';
import type { InputRef } from 'antd';
import { Button, Input, Space, Table } from 'antd';
import type { ColumnType, ColumnsType } from 'antd/es/table';
import type { FilterConfirmProps } from 'antd/es/table/interface';

type DataIndex = keyof DataType;

const data: DataType[] = [
    {
        type: 'UPMID',
        ttl: 1696204800,
        value: '7c5cd1e1-9b6b-4f53-af2a-99763b654a5e',
        action: 'captcha',
        namespace: 'james',
        ruleid: 'WB01002',
        taskid: 'd75193e53c6e',
        creationTime: 1695657700,
        destination: 'edgekv',
        author: null,
    },
    {
        type: 'UPMID',
        ttl: 1696204800,
        value: '7c5cd1e1-9b6b-4f53-af2a-99763b654a5e',
        action: 'captcha',
        namespace: 'james',
        ruleid: 'WB01002',
        taskid: 'd75193e53c6e',
        creationTime: 1695657731,
        destination: 'edgekv',
        author: null,
    },
    {
        type: 'UPMID',
        ttl: 1696204800,
        value: '7c5cd1e1-9b6b-4f53-af2a-99763b654a5e',
        action: 'captcha',
        namespace: 'james',
        ruleid: 'WB01002',
        taskid: 'd75193e53c6e',
        creationTime: 1695657737,
        destination: 'edgekv',
        author: null,
    },
    {
        type: 'UPMID',
        ttl: 1696204800,
        value: '7c5cd1e1-9b6b-4f53-af2a-99763b654a5e',
        action: 'captcha',
        namespace: 'james',
        ruleid: 'WB01002',
        taskid: 'd75193e53c6e',
        creationTime: 1695657737,
        destination: 'fairness',
        author: null,
    }
];

const NameList: React.FC = () => {
    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const searchInput = useRef<InputRef>(null);

    const handleSearch = (
        selectedKeys: string[],
        confirm: (param?: FilterConfirmProps) => void,
        dataIndex: DataIndex,
    ) => {
        confirm();
        setSearchText(selectedKeys[0]);
        setSearchedColumn(dataIndex);
    };

    const handleReset = (clearFilters: () => void) => {
        clearFilters();
        setSearchText('');
    };

    const getColumnSearchProps = (dataIndex: DataIndex): ColumnType<DataType> => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
            <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
                <Input
                    ref={searchInput}
                    placeholder={`Search ${dataIndex}`}
                    value={selectedKeys[0]}
                    onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                    onPressEnter={() => handleSearch(selectedKeys as string[], confirm, dataIndex)}
                    style={{ marginBottom: 8, display: 'block' }}
                />
                <Space>
                    <Button
                        onClick={() => handleSearch(selectedKeys as string[], confirm, dataIndex)}
                        icon={<SearchOutlined />}
                        size="small"
                        style={{ width: 90 }}
                        className='text-black'
                    >
                        Search
                    </Button>
                    <Button
                        onClick={() => clearFilters && handleReset(clearFilters)}
                        size="small"
                        style={{ width: 90 }}
                    >
                        Reset
                    </Button>
                    <Button
                        type="link"
                        size="small"
                        onClick={() => {
                            confirm({ closeDropdown: false });
                            setSearchText((selectedKeys as string[])[0]);
                            setSearchedColumn(dataIndex);
                        }}
                    >
                        Filter
                    </Button>
                    <Button
                        type="link"
                        size="small"
                        onClick={() => {
                            close();
                        }}
                    >
                        close
                    </Button>
                </Space>
            </div>
        ),
        filterIcon: (filtered: boolean) => (
            <SearchOutlined style={{ color: filtered ? '#1677ff' : undefined }} />
        ),
        onFilter: (value, record) : any => {
            return record[dataIndex]?.toString().toLowerCase().includes((value as string).toLowerCase());
        },
        onFilterDropdownOpenChange: (visible) => {
            if (visible) {
                setTimeout(() => searchInput.current?.select(), 100);
            }
        },
        render: (text) =>
            searchedColumn === dataIndex ? (
                <Highlighter
                    highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
                    searchWords={[searchText]}
                    autoEscape
                    textToHighlight={text ? text.toString() : ''}
                />
            ) : (
                text
            ),
    });

    const columns: ColumnsType<DataType> = [
        {
            title: 'Type',
            dataIndex: 'type',
            key: 'type',
            width: '10%',
            ...getColumnSearchProps('type'),
        },
        {
            title: 'Value',
            dataIndex: 'value',
            key: 'value',
            width: '20%',
            ...getColumnSearchProps('value'),
        },
        {
            title: 'Ttl',
            dataIndex: 'ttl',
            key: 'ttl',
            ...getColumnSearchProps('ttl'),
            sorter: (a, b) => a.ttl - b.ttl,
            sortDirections: ['descend', 'ascend'],
        },
        {
            title: 'Action',
            dataIndex: 'action',
            key: 'action',
            width: '10%',
            ...getColumnSearchProps('action'),
        },
        {
            title: 'Name Space',
            dataIndex: 'namespace',
            key: 'namespace',
            width: '10%',
            ...getColumnSearchProps('namespace'),
        },
        {
            title: 'Rule Id',
            dataIndex: 'ruleid',
            key: 'ruleid',
            width: '10%',
            ...getColumnSearchProps('ruleid'),
        },
        {
            title: 'Task Id',
            dataIndex: 'taskid',
            key: 'taskid',
            width: '10%',
            ...getColumnSearchProps('taskid'),
        },
        {
            title: 'Creation Time',
            dataIndex: 'creationTime',
            key: 'creationTime',
            width: '10%',
            ...getColumnSearchProps('creationTime'),
            sorter: (a, b) => a.creationTime - b.creationTime,
            sortDirections: ['descend', 'ascend'],
        },
        {
            title: 'Destination',
            dataIndex: 'destination',
            key: 'destination',
            width: '10%',
            ...getColumnSearchProps('destination'),
        },
        {
            title: 'Author',
            dataIndex: 'author',
            key: 'author',
            width: '10%',
            ...getColumnSearchProps('author'),
        },
    ];

    return <Table columns={columns} dataSource={data} />;
};

export default NameList;
