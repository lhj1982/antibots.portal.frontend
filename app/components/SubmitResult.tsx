import React from "react";
import { Button, Result } from "antd";
import { ResultStatusType } from "antd/es/result";

type SelfProps = {
  statusCode: number;
  statusMessage: string;
};

const submitStatus = (statusCode: any) => {
  return statusCode === 201 ? "success" : statusCode==403? "403": "error"
}

const SubmitResult = (props: SelfProps) => {
  const { statusCode, statusMessage } = props;
  return (
    <Result
      status= { submitStatus(statusCode)}
      title={statusCode === 201 ? "Upload Success": "Upload Error"}
      subTitle=  {statusCode}
      // extra={<Button type="primary">Back Home</Button>}
    />
  );
};

export default SubmitResult;
