import {
  Form,
  Select,
  Card,
  DatePicker,
  Typography,
  Space,
  Button,
  InputNumber,
  Input,
  Tooltip,
  Modal,
  FloatButton,
} from "antd";
import { useEffect, useState } from "react";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { CloseOutlined } from "@ant-design/icons";
import { RangePickerProps } from "antd/es/date-picker";
import moment from "moment";
import handleSubmitData from "@/lib/handleSubmitData";
import SubmitResult from "./SubmitResult";
import { SubmitStatus, WebbFormData } from "@/type";
import SubmitButton from "./SubmitButton";

type SelfProps = {
  isUpdate: boolean;
  formData: WebbFormData;
};

const WebbOneTimeForm = (props: SelfProps) => {
  const { isUpdate, formData } = props;
  const [form] = Form.useForm();
  const { Option } = Select;
  const { RangePicker } = DatePicker;
  dayjs.extend(customParseFormat);

  // const [formType, setFormType] = useState<string>("oneTime");
  const [oneTimeForm, setOneTimeForm] = useState<WebbFormData>({
    fileName: "",
    webbSourceType: "",
    taskType: "",
    dateSearchType: "absolute",
    scheduleIntervals: "",
    spl_config: [],
  });

  const [showModal, setShowModal] = useState(false);

  const [submitStatus, setSubmitStatus] = useState<SubmitStatus>({
    statusCode: 0,
    statusMessage: "",
  });

  const disabledDate: RangePickerProps["disabledDate"] = (current) => {
    return current && current >= moment().endOf("day");
  };

  useEffect(() => {
    setOneTimeForm(formData);
    form.setFieldsValue(formData);
  }, [form, formData]);

  return (
    <Card
      title={
        <h1 className="text-black">
          {isUpdate ? "Update OneTime Rule" : "Create OneTime Rule"}
        </h1>
      }
      className="w-2/3 m-8"
    >
      <Form
        form={form}
        name="onetime_form"
        autoComplete="off"
        initialValues={{ items: [{}] }}
        className="w-full"
        onFinish={(values) => {
          console.log("values: ", values);
          const res = handleSubmitData(
            "schedule-onetime", // path
            oneTimeForm.fileName,
            values
          );
          console.log("res: ", res);
          res
            .then((res) => {
              console.log(res);
              console.log(res.status);
              console.log(res.data.message);
              setSubmitStatus({
                ...submitStatus,
                statusCode: res.status,
                statusMessage: res.data.message,
              });
            })
            .catch((err) => {
              console.log(err.response.status);
              console.log(err.message);
              setSubmitStatus({
                ...submitStatus,
                statusCode: err.response.status,
                statusMessage: err.message,
              });
            });
          setTimeout(() => {
            setShowModal(true);
          }, 5000);
        }}
      >
        <Form.Item
          name="fileName"
          rules={[{ required: true, message: "required" }]}
          label="File Name"
        >
          <Input
            style={{ width: 360 }}
            placeholder="enter the file name"
            disabled={isUpdate}
            addonAfter=".yml"
            onBlur={(e: any) => {
              setOneTimeForm({ ...oneTimeForm, fileName: `${e.target.value}` });
            }}
          ></Input>
        </Form.Item>
        <Form.Item
          name="webbSourceType"
          label="Webb Source Type"
          rules={[{ required: true }]}
        >
          <Select
            placeholder="Select source type"
            allowClear
            onChange={(value: any) => {
              setOneTimeForm({ ...oneTimeForm, webbSourceType: value });
            }}
          >
            <Option value="splunk">Splunk</Option>
            <Option value="ali-sls">Ali SLS</Option>
          </Select>
        </Form.Item>
        <Form.Item
          name="taskType"
          label="Task Type"
          rules={[{ required: true }]}
        >
          <Select
            placeholder="Select a task type"
            allowClear
            onChange={(value: any) => {
              setOneTimeForm({ ...oneTimeForm, taskType: value });
            }}
          >
            <Option value="upmIdBlack">UpmId</Option>
            <Option value="phoneNumberBlack">Phone Number</Option>
            <Option value="countyBlack">County</Option>
            <Option value="ipBlack">IP</Option>
            <Option value="umidBlack">Umid</Option>
          </Select>
        </Form.Item>
        <Form.Item
          name="dateSearchType"
          label="Data Search Type"
          rules={[{ required: true }]}
        >
          <Select
            placeholder="Select data search type"
            allowClear
            onChange={(value: any) => {
              setOneTimeForm({ ...oneTimeForm, dateSearchType: value });
            }}
          >
            <Option value="relative">Relative</Option>
            <Option value="absolute">Absolute</Option>
          </Select>
        </Form.Item>
        <Form.Item
          label={
            oneTimeForm.dateSearchType == "relative"
              ? "Schedule Intervals"
              : "Trigger Time"
          }
          name="scheduleIntervals"
          rules={[{ required: true, message: "required" }]}
        >
          <Space>
            <Form.Item name="scheduleIntervals" noStyle>
              <Input
                style={{ width: 360 }}
                placeholder="Use Rate or Cron Expression"
              ></Input>
            </Form.Item>
            <Tooltip title="Learn about Rate & Cron Expression">
              <Typography.Link
                href="https://docs.aws.amazon.com/lambda/latest/dg/services-cloudwatchevents-expressions.html"
                target="_blank"
              >
                Need Help?
              </Typography.Link>
            </Tooltip>
          </Space>
        </Form.Item>
        <Form.Item>
          <Form.List name="spl_config">
            {(fields, { add, remove }) => (
              <div
                style={{
                  display: "flex",
                  rowGap: 16,
                  flexDirection: "column",
                  flex: 1,
                }}
              >
                {fields.map((field) => (
                  <Card
                    size="small"
                    title={`Spl ${field.name + 1}`}
                    key={field.key}
                    extra={
                      <CloseOutlined
                        onClick={() => {
                          remove(field.name);
                        }}
                      />
                    }
                  >
                    {oneTimeForm.dateSearchType === "absolute" && (
                      <Form.Item
                        label={"Search Time Range"}
                        rules={[{ required: true }]}
                      >
                        <Space wrap>
                          <Form.Item name={[field.name, "searchStartTime"]}>
                            <DatePicker
                              placeholder="Start Date Time"
                              showTime
                              disabledDate={disabledDate}
                            />
                          </Form.Item>
                          <Form.Item name={[field.name, "searchEndTime"]}>
                            <DatePicker
                              placeholder="End Date Time"
                              showTime
                              disabledDate={disabledDate}
                            />
                          </Form.Item>
                        </Space>
                      </Form.Item>
                    )}
                    {oneTimeForm.dateSearchType === "relative" && (
                      <Form.Item
                        label={"Search Past"}
                        rules={[{ required: true }]}
                        name={[field.name, "searchTimeRange"]}
                      >
                        <InputNumber addonAfter="Minutes" min={0} />
                      </Form.Item>
                    )}
                    <Form.Item
                      label="Rule Id"
                      name={[field.name, "ruleId"]}
                      rules={[{ required: true, message: "required" }]}
                    >
                      <Input
                        style={{ width: 400 }}
                        placeholder="Enter the ruleId corresponding to the splunk query below"
                      ></Input>
                    </Form.Item>
                    <Form.Item
                      label="Splunk Query"
                      rules={[{ required: true }]}
                      name={[field.name, "spl"]}
                    >
                      <Input.TextArea
                        rows={4}
                        placeholder="Input your splunk query here"
                      />
                    </Form.Item>
                    <Form.Item
                      label="Expiration"
                      rules={[{ required: true }]}
                      name={[field.name, "ttl"]}
                    >
                      <InputNumber addonAfter="Days" min={1} />
                    </Form.Item>
                    <Form.Item
                      label="Destination"
                      rules={[{ required: true }]}
                      name={[field.name, "destination"]}
                    >
                      <Select
                        mode="multiple"
                        allowClear
                        style={{ width: "50%" }}
                        placeholder="Please select destination"
                      >
                        <Option value="fairness">fairness</Option>
                        <Option value="edgeKV">edgeKV</Option>
                      </Select>
                    </Form.Item>
                    <Form.Item
                      label="Action"
                      rules={[{ required: true }]}
                      name={[field.name, "action"]}
                    >
                      <Select placeholder="Select an action" allowClear>
                        <Option value="captcha">Captcha</Option>
                        <Option value="block">Block</Option>
                      </Select>
                    </Form.Item>
                    <Form.Item
                      label="Name Space"
                      rules={[{ required: true }]}
                      name={[field.name, "nameSpace"]}
                    >
                      <Select
                        placeholder="Select an edgekv name space"
                        allowClear
                      >
                        <Option value="buy_suspect_users">
                          buy_suspect_users
                        </Option>
                        <Option value="order_suspect_users">
                          order_suspect_users
                        </Option>
                        <Option value="payment_suspect_users">
                          payment_suspect_users
                        </Option>
                        <Option value="test">
                          test_namespace
                        </Option>
                      </Select>
                    </Form.Item>
                    {oneTimeForm.webbSourceType === "ali-sls" && (
                      <Form.Item
                        label="Ali SLS project"
                        rules={[{ required: true }]}
                        name={[field.name, "project"]}
                      >
                        <Input placeholder="Ali SLS project" />
                      </Form.Item>
                    )}
                    {oneTimeForm.webbSourceType === "ali-sls" && (
                      <Form.Item
                        label="Ali SLS logstore"
                        rules={[{ required: true }]}
                        name={[field.name, "logstore"]}
                      >
                        <Input placeholder="Ali SLS logstore" />
                      </Form.Item>
                    )}
                  </Card>
                ))}
                <Button type="dashed" onClick={() => add()} block>
                  + Add New SPL
                </Button>
                <Modal
                  open={showModal}
                  okText="Got it"
                  cancelButtonProps={{ style: { display: "none" } }}
                  onOk={() => setShowModal(false)}
                  maskClosable={false}
                >
                  <SubmitResult
                    statusCode={submitStatus.statusCode}
                    statusMessage={submitStatus.statusMessage}
                  />
                </Modal>
              </div>
            )}
          </Form.List>
        </Form.Item>
        <Form.Item
          wrapperCol={{
            xs: { span: 24, offset: 0 },
            sm: { span: 16, offset: 10 },
          }}
        >
          <SubmitButton form={form} />
        </Form.Item>
        <Form.Item noStyle shouldUpdate>
          {() => (
            <Typography>
              <pre>{JSON.stringify(form.getFieldsValue(), null, 2)}</pre>
            </Typography>
          )}
        </Form.Item>
      </Form>
      <FloatButton.BackTop />
    </Card>
  );
};

export default WebbOneTimeForm;
