import React from "react";
import { CloseOutlined } from "@ant-design/icons";
import dayjs, { Dayjs } from "dayjs";
import type { RangePickerProps } from "antd/es/date-picker";
import customParseFormat from "dayjs/plugin/customParseFormat";
import {
  Button,
  Card,
  Form,
  Input,
  Space,
  Typography,
  Select,
  DatePicker,
  Tooltip,
  InputNumber,
  TimePicker,
} from "antd";

const { Option } = Select;
const { RangePicker } = DatePicker;
dayjs.extend(customParseFormat);

const OneTimeSplForm: React.FC<FormType> = (props) => {
  const [form] = Form.useForm();
  const disabledDate: RangePickerProps["disabledDate"] = (current) => {
    return current && current >= dayjs().endOf("day");
  };

  const { dataSearchType, formType, webbSourceType } = props;
  console.log(dataSearchType);

  const absoluteTimeComponent = (
    <RangePicker
      showTime={{
        hideDisabledOptions: true,
        defaultValue: [
          dayjs("00:00:00", "HH:mm:ss"),
          dayjs("00:00:00", "HH:mm:ss"),
        ],
      }}
      format="YYYY-MM-DD HH:mm:ss"
      disabledDate={disabledDate}
    />
  );

  const recuringTimeComponent = (
    <InputNumber addonAfter="Minutes" defaultValue={0} min={0} />
  );
  return (
    <Form
      className="w-full"
      labelCol={{ span: 5 }}
      wrapperCol={{ span: 18 }}
      form={form}
      name="spl_config"
      autoComplete="off"
      initialValues={{ spl_config: [{}] }}
    >
      <Form.List name="spl_config">
        {(fields, { add, remove }) => (
          <div className="flex flex-col gap-y-6">
            {fields.map((field) => (
              <Card
                className="flex flex-col w-full justify-center"
                size="small"
                title={`spl ${field.name + 1}`}
                key={field.key}
                extra={
                  <CloseOutlined
                    onClick={() => {
                      remove(field.name);
                    }}
                  />
                }
              >
                <Form.Item
                  label={
                    dataSearchType === "absolute"
                      ? "Search Time Range"
                      : "Search Past"
                  }
                  rules={[{ required: true }]}
                  name={[field.name, "searchTimeRange"]}
                >
                  {dataSearchType == "relative"
                    ? recuringTimeComponent
                    : absoluteTimeComponent}
                </Form.Item>
                <Form.Item
                  label={
                    dataSearchType == "relative"
                      ? "Scheduled Interval"
                      : "Trigger Time"
                  }
                  name={[field.name, "scheduledInterval"]}
                >
                  <Space>
                    <Form.Item
                      name="scheduledInterval"
                      noStyle
                      rules={[{ required: true, message: "required" }]}
                    >
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
                <Form.Item label="Rule Id" name={[field.name, "ruleId"]}>
                  <Space>
                    <Form.Item
                      name="ruleId"
                      noStyle
                      rules={[{ required: true, message: "required" }]}
                    >
                      <Input
                        style={{ width: 400 }}
                        placeholder="Enter the ruleId corresponding to the splunk query above"
                      ></Input>
                    </Form.Item>
                    <Tooltip title="Webb Rule Cheat Sheet">
                      <Typography.Link
                        href="https://confluence.nike.com/pages/viewpage.action?pageId=825536585"
                        target="_blank"
                      >
                        Not Sure Which Rule to Use?
                      </Typography.Link>
                    </Tooltip>
                  </Space>
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
                  <Select placeholder="Select an edgekv name space" allowClear>
                    <Option value="buy_suspect_users">buy_suspect_users</Option>
                    <Option value="order_suspect_users">
                      order_suspect_users
                    </Option>
                    <Option value="payment_suspect_users">
                      payment_suspect_users
                    </Option>
                  </Select>
                </Form.Item>
                {webbSourceType === "ali-sls" && (
                  <Form.Item
                    label="Ali SLS project"
                    rules={[{ required: true }]}
                    name={[field.name, "project"]}
                  >
                    <Input placeholder="Ali SLS project" />
                  </Form.Item>
                )}
                {webbSourceType === "ali-sls" && (
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
              + Add Item
            </Button>
          </div>
        )}
      </Form.List>

      <Form.Item noStyle shouldUpdate>
        {() => (
          <Typography>
            <pre>{JSON.stringify(form.getFieldsValue(), null, 2)}</pre>
          </Typography>
        )}
      </Form.Item>
    </Form>
  );
};

export default OneTimeSplForm;
