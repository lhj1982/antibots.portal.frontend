import { Button, Form, FormInstance } from "antd";
import React, { useEffect, useState } from "react";
import { RocketOutlined } from "@ant-design/icons";

type SelfProps = {
  form: FormInstance,
  loadingModalHandler: (isOpen: boolean) => void
}

const SubmitButton = (props: SelfProps) => {
  const [submittable, setSubmittable] = useState(false);
  const [loadings, setLoadings] = useState<boolean[]>([]);

  const {form, loadingModalHandler} = props;

  const enterLoading = (index: number) => {
    setLoadings((prevLoadings) => {
      const newLoadings = [...prevLoadings];
      newLoadings[index] = true;
      return newLoadings;
    });
    setTimeout(() => {
      setLoadings((prevLoadings) => {
        const newLoadings = [...prevLoadings];
        newLoadings[index] = false;
        return newLoadings;
      });
      setSubmittable(true);
    }, 6000);
  };

  // Watch all values
  const values = Form.useWatch([], form);

  useEffect(() => {
    form.validateFields({ validateOnly: true }).then(
      () => {
        setSubmittable(true);
      },
      () => {
        setSubmittable(false);
      }
    );
  }, [form, values]);

  return (
    <Button
      type="primary"
      htmlType="submit"
      disabled={!submittable}
      shape="round"
      icon={<RocketOutlined />}
      size="large"
      onClick={(e)=> {
        loadingModalHandler(true);
        e.stopPropagation();
        e.preventDefault();
        setSubmittable(false);
        enterLoading(1);
        form.submit();
      }}
      loading={loadings[1]}
    >
      Submit
    </Button>
  );
};

export default SubmitButton;
