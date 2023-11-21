"use client";
import React, { useEffect, useState } from "react";
import { Radio, Space, Table, Modal, Button } from "antd";
import type { ColumnsType, TablePaginationConfig } from "antd/es/table";
import getWebbRuleList from "@/lib/getWebbRuleList";
import SwitchTab from "../components/SwitchTab";
import { Tooltip } from "react-tooltip";
import getWebbRuleItem from "@/lib/getWebbRuleItem";
import deleteWebbRuleItem from "@/lib/deleteWebbRuleItem";
import axios from "axios";
import Link from "next/link";
import { WebbRuleItem } from "@/type";

const WebbRuleList = () => {
  const [webbRules, setWebbRules] = useState<Array<WebbRuleItem>>();
  const [recurringTypes, setRecurringTypes] = useState(false);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [modalText, setModalText] = useState(
    "Please confirm whether to delete this file"
  );
  const [selectedDeletionFile, setSelectedDeletionFile] = useState<string>();
  const [isCancelDisabled, setIsCancelDisabled] = useState(false);
  

  async function setData(recurringTypes: boolean) {
    setLoading(true);
    const apiData = await getWebbRuleList();
    const ruleList =
      recurringTypes === false ? apiData.oneTimePath : apiData.recurringPath;
    setWebbRules(ruleList);
    setLoading(false);
  }

  function handleSetRecurringTypes(type: boolean) {
    setRecurringTypes(type);
  }

  const showModal = () => {
    setOpen(true);
  };

  const handleOk = () => {
    setModalText(`Deleting file ${selectedDeletionFile}`);
    setIsCancelDisabled(true);
    setConfirmLoading(true);
    setTimeout(async () => {
      const fileType = recurringTypes ? "schedule-recurring" : "schedule-onetime";
      const param = fileType + "/" + selectedDeletionFile;
      const response = await deleteWebbRuleItem(param);
      console.log("delete response: ", response);
      setOpen(false);
      setConfirmLoading(false);
      setSelectedDeletionFile("");
      setModalText("Please confirm whether to delete this file");
      setIsCancelDisabled(false);
    }, 2000);
  };

  const handleCancel = () => {
    console.log("Clicked cancel button");
    setOpen(false);
  };

  useEffect(() => {
    setData(recurringTypes);
  }, [recurringTypes, selectedDeletionFile]);

  const columns: ColumnsType<WebbRuleItem> = [
    {
      title: "File Name",
      dataIndex: "fileName",
      key: "fileName",
    },
    {
      title: "Upload Date",
      dataIndex: "uploadTime",
      key: "uploadTime",
    },
    {
      title: "Schedule Intervals",
      dataIndex: "scheduleIntervals",
      key: "scheduleIntervals",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle" className="text-main-blue hover:text-light-blue">
          <Link
            href={`/webbrulelist/${recurringTypes ? "schedule-recurring" : "schedule-onetime"}_${
              record.fileName
            }`}
          >
            Update
          </Link>
          <a
            onClick={() => {
              showModal();
              setSelectedDeletionFile(record.fileName);
            }}
          >
            Delete
          </a>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <SwitchTab
        setTaskType={handleSetRecurringTypes}
        taskType={recurringTypes}
      />
      <Table
        columns={columns}
        dataSource={webbRules}
        pagination={{ position: ["bottomCenter"] }}
        loading={loading}
      />
      <Tooltip anchorSelect=".type-switch" place="right">
        {recurringTypes ? "Recurring" : "OneTime"}
      </Tooltip>
      <Modal
        title="Please Confirm"
        open={open}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        cancelButtonProps={{ disabled: isCancelDisabled }}
        onCancel={handleCancel}
        maskClosable={false}
      >
        <p>{modalText}</p>
      </Modal>
    </div>
  );
};

export default WebbRuleList;
