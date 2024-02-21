"use client";

import { Modal } from "antd";
import { LoadingOutlined } from '@ant-design/icons';

type SelfProps = {
  isOpen: boolean;
};

const LoadingModal = (props: SelfProps) => {
  const { isOpen } = props;
  return (
    <Modal open={isOpen} title="Uploading the rules..." footer={null}>
      <div className="flex justify-center items-center">
        <LoadingOutlined className="text-5xl" spin/>
      </div>
    </Modal>
  );
};

export default LoadingModal;
