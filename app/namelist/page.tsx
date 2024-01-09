"use client";
import { SearchOutlined } from "@ant-design/icons";
import { useEffect, useRef, useState } from "react";
import Highlighter from "react-highlight-words";
import type { InputRef, PaginationProps } from "antd";
import { Button, FloatButton, Input, Space, Table } from "antd";
import type { ColumnType, ColumnsType } from "antd/es/table";
import type { FilterConfirmProps } from "antd/es/table/interface";
import axios from "axios";
import { DataType } from "@/type";
import { BACKEND_HOST, NAMELIST_PATH } from "@/utils/constants";

type DataIndex = keyof DataType;

const NameList: React.FC = () => {
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const [loading, setLoading] = useState(false);
  const [total, setTotal] = useState<any>(0);
  const [currentPage, setCurrentPage] = useState<any>(1);
  const [pageSize, setPageSize] = useState<any>(50);
  const [data, setData] = useState<any[]>([]);

  const searchInput = useRef<InputRef>(null);

  const itemRender: PaginationProps["itemRender"] = (
    _,
    type,
    originalElement
  ) => {
    if (type === "prev") {
      return <a>Previous</a>;
    }
    if (type === "next") {
      return <a>Next</a>;
    }
    return originalElement;
  };

  const fetchPageData = async (pageNum: any, pageSize: any) => {
    setLoading(true);
    let config = {
      headers: {
        Authorization: `Bearer ${window.localStorage.getItem("sess")}`,
        User: `${window.localStorage.getItem("email")}`,
      },
    };
    try {
      const response = await axios.get(
        // `http://localhost:3001/antibotswebb/v1/list?page=${pageNum}&limit=${pageSize}`,
        `${BACKEND_HOST}/${NAMELIST_PATH}?page=${pageNum}&limit=${pageSize}`,
        config
      );
      const { items, totalItems, page } = response.data.data;
      setData(items);
      setLoading(false);
      setCurrentPage(page);
      setTotal(totalItems);
    } catch (error) {
      //console.log(error);
    }
  };

  useEffect(() => {
    fetchPageData(1, pageSize);
  }, [pageSize]);

  const handleSearch = (
    selectedKeys: string[],
    confirm: (param?: FilterConfirmProps) => void,
    dataIndex: DataIndex
  ) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters: () => void) => {
    clearFilters();
    setSearchText("");
  };

  const getColumnSearchProps = (
    dataIndex: DataIndex
  ): ColumnType<DataType> => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
      close,
    }) => (
      <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() =>
            handleSearch(selectedKeys as string[], confirm, dataIndex)
          }
          style={{ marginBottom: 8, display: "block" }}
        />
        <Space>
          <Button
            onClick={() =>
              handleSearch(selectedKeys as string[], confirm, dataIndex)
            }
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
            className="text-black"
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
      <SearchOutlined style={{ color: filtered ? "#1677ff" : undefined }} />
    ),
    onFilter: (value, record): any => {
      return record[dataIndex]
        ?.toString()
        .toLowerCase()
        .includes((value as string).toLowerCase());
    },
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });

  const columns: ColumnsType<DataType> = [
    {
      title: "Source",
      dataIndex: "source",
      key: "source",
      width: "8%",
      align: "center",
      ...getColumnSearchProps("source"),
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
      width: "8%",
      align: "center",
      ...getColumnSearchProps("type"),
    },
    {
      title: "Value",
      dataIndex: "value",
      key: "value",
      width: "18%",
      align: "center",
      ...getColumnSearchProps("value"),
    },
    {
      title: "Ttl",
      dataIndex: "ttl",
      key: "ttl",
      align: "center",
      ...getColumnSearchProps("ttl"),
      sorter: (a, b) => a.ttl - b.ttl,
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      width: "10%",
      align: "center",
      ...getColumnSearchProps("action"),
    },
    {
      title: "Name Space",
      dataIndex: "namespace",
      key: "namespace",
      width: "10%",
      align: "center",
      ...getColumnSearchProps("namespace"),
    },
    {
      title: "Rule Id",
      dataIndex: "ruleId",
      key: "ruleId",
      width: "10%",
      align: "center",
      ...getColumnSearchProps("ruleId"),
    },
    {
      title: "Task Id",
      dataIndex: "taskId",
      key: "taskId",
      width: "10%",
      align: "center",
      ...getColumnSearchProps("taskId"),
    },
    {
      title: "Creation Time",
      dataIndex: "creationTime",
      key: "creationTime",
      width: "10%",
      align: "center",
      ...getColumnSearchProps("creationTime"),
      sorter: (a, b) => a.creationTime - b.creationTime,
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "Destination",
      dataIndex: "destination",
      key: "destination",
      width: "10%",
      align: "center",
      ...getColumnSearchProps("destination"),
    },
    {
      title: "Author",
      dataIndex: "author",
      key: "author",
      width: "10%",
      align: "center",
      ...getColumnSearchProps("author"),
    },
  ];

  return (
    <div>
      <Table
        columns={columns}
        dataSource={data}
        loading={loading}
        pagination={{
          total: total,
          position: ["bottomCenter"],
          defaultCurrent: currentPage,
          itemRender: itemRender,
          showQuickJumper: true,
          onChange: (page, pageSize) => {
            fetchPageData(page, pageSize);
          },
        }}
      />
      <FloatButton.BackTop type= "primary"/>
    </div>
  );
};

export default NameList;
