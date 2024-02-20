import React from "react";
import { Button, Result } from "antd";
import { ResultStatusType } from "antd/es/result";

type SelfProps = {
  statusCode: string | number;
  statusMessage: string;
};

const submitStatus = (statusCode: any) => {
  return statusCode === "200"
    ? "success"
    : statusCode == "403"
    ? "403"
    : "error";
};

const SubmitResult = (props: SelfProps) => {
  let { statusCode, statusMessage } = props;

  const handleStatusCode = (
    statusCode: string | number,
    statusMessage: string
  ) => {
    if (statusCode == "200") {
      return statusMessage;
    } else if (statusCode == "403") {
      statusMessage = "Upload Failed: Not Authorized";
      return statusMessage;
    } else if (statusCode == "502") {
      statusMessage =
        statusMessage +
        "\n Make sure you're using the right form type with the correct Rate & Cron Expression";
      return statusMessage;
    } else {
      statusMessage = "Something went wrong: " + statusMessage;
      return statusMessage;
    }
  };

  const message = handleStatusCode(statusCode, statusMessage);

  return (
    <Result
      status={submitStatus(statusCode)}
      title={statusCode}
      subTitle={message}
      // extra={<Button type="primary">Back Home</Button>}
    />
  );
};

export default SubmitResult;
