"use client";
import { useEffect, useRef, useState } from "react";
import type { InputRef, PaginationProps } from "antd";
import { FloatButton, Table, Tooltip } from "antd";
import type { ColumnsType } from "antd/es/table";
import axios from "axios";
import { DataType } from "@/type";
import { BACKEND_HOST, NAMELIST_PATH } from "@/utils/constants";
import dayjs from "dayjs";
import SearchForm from "../components/SearchForm";

type DataIndex = keyof DataType;

const NameList: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [total, setTotal] = useState<any>(0);
  const [currentPage, setCurrentPage] = useState<any>(1);
  const [pageSize, setPageSize] = useState<any>(50);
  const [data, setData] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchProps = (query: string) => {
    setSearchQuery(query);
  }

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

  const fetchPageData = async (pageNum: any, pageSize: any, searchQuery: string) => {
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
        `${BACKEND_HOST}/${NAMELIST_PATH}?page=${pageNum}&limit=${pageSize}${searchQuery}`,
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
    fetchPageData(1, pageSize, searchQuery);
  }, [pageSize, searchQuery]);

  const columns: ColumnsType<DataType> = [
    {
      title: "Source",
      dataIndex: "source",
      key: "source",
      width: "8%",
      align: "center",
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
      width: "8%",
      align: "center",
    },
    {
      title: "Value",
      dataIndex: "value",
      key: "value",
      width: "18%",
      align: "center",
    },
    {
      title: "Ttl",
      dataIndex: "ttl",
      key: "ttl",
      align: "center",
      width: "15%",
      sorter: (a, b) => a.ttl - b.ttl,
      sortDirections: ["descend", "ascend"],
      render: (ttl) => {
        const dateString = dayjs.unix(ttl).format('YYYY-MM-DD HH:mm:ss');
        return (
          <Tooltip placement="top" title={dateString}>
            <span>{ttl}</span>
          </Tooltip>
        );
      }
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      width: "10%",
      align: "center",
    },
    {
      title: "Name Space",
      dataIndex: "namespace",
      key: "namespace",
      width: "10%",
      align: "center",
    },
    {
      title: "Rule Id",
      dataIndex: "ruleId",
      key: "ruleId",
      width: "10%",
      align: "center",
    },
    {
      title: "Task Id",
      dataIndex: "taskId",
      key: "taskId",
      width: "10%",
      align: "center",
    },
    {
      title: "Creation Time",
      dataIndex: "creationTime",
      key: "creationTime",
      width: "10%",
      align: "center",
      sorter: (a, b) => a.creationTime - b.creationTime,
      sortDirections: ["descend", "ascend"],
      render: (creationTime) => {
        const dateString = dayjs.unix(creationTime).format('YYYY-MM-DD HH:mm:ss');
        return (
          <Tooltip placement="top" title={dateString}>
            <span>{creationTime}</span>
          </Tooltip>
        );
      }
    },
    {
      title: "Destination",
      dataIndex: "destination",
      key: "destination",
      width: "8%",
      align: "center",
    },
    {
      title: "Author",
      dataIndex: "author",
      key: "author",
      width: "10%",
      align: "center",
    },
  ];

  return (
    <div>
      <SearchForm handleSearchProps = {handleSearchProps} />
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
