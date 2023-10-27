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
} from "antd";
import { useState } from "react";
import dayjs from "dayjs";
import { RocketOutlined } from '@ant-design/icons';
import customParseFormat from "dayjs/plugin/customParseFormat";
import { CloseOutlined } from "@ant-design/icons";
import { RangePickerProps } from "antd/es/date-picker";

const { Option } = Select;
const { RangePicker } = DatePicker;
dayjs.extend(customParseFormat);

const WebbOneTimeForm = () => {
  const [form] = Form.useForm();
  const { Option } = Select;
  const { RangePicker } = DatePicker;
  dayjs.extend(customParseFormat);

  const [formType, setFormType] = useState<FormType>({
    webbSourceType: "",
    formType: "oneTime",
    taskType: "",
    dataSearchType: "absolute",
  });
  const disabledDate: RangePickerProps["disabledDate"] = (current) => {
    return current && current >= dayjs().endOf("day");
  };

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

  const relativeTimeComponent = (
    <InputNumber addonAfter="Minutes"  min={0} />
  );

  return (
    <Card
      title={<h1 className="text-black">Create OneTime Rule</h1>}
      className="w-2/3 m-8"
    >
      <Form
        form={form}
        name="onetime_form"
        autoComplete="off"
        initialValues={{ items: [{}] }}
        className="w-full"
        onFinish={(values)=>{
          console.log("values: ", values);
        }}
      >
        <Form.Item
          name="webbSourceType"
          label="Webb Source Type"
          rules={[{ required: true }]}
        >
          <Select
            placeholder="Select source type"
            allowClear
            onChange={(value: any) => {
              setFormType({ ...formType, webbSourceType: value });
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
              setFormType({ ...formType, taskType: value });
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
          name="dataSearchType"
          label="Data Search Type"
          rules={[{ required: true }]}
        >
          <Select
            placeholder="Select data search type"
            allowClear
            onChange={(value: any) => {
              setFormType({ ...formType, dataSearchType: value });
            }}
          >
            <Option value="relative">Relative</Option>
            <Option value="absolute">Absolute</Option>
          </Select>
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
                    <Form.Item
                      label={
                        formType.dataSearchType === "absolute"
                          ? "Search Time Range"
                          : "Search Past"
                      }
                      rules={[{ required: true }]}
                      name={[field.name, "searchTimeRange"]}
                    >
                      {formType.dataSearchType == "relative"
                        ? relativeTimeComponent
                        : absoluteTimeComponent}
                    </Form.Item>
                    <Form.Item
                      label={
                        formType.dataSearchType == "relative"
                          ? "Scheduled Interval"
                          : "Trigger Time"
                      }
                      name={[field.name, "scheduledInterval"]}
                      rules={[{ required: true, message: "required" }]}
                    >
                      <Space>
                        <Form.Item name="scheduledInterval" noStyle>
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
                    <Form.Item
                      label="Rule Id"
                      name={[field.name, "ruleId"]}
                      rules={[{ required: true, message: "required" }]}
                    >
                      <Space>
                        <Form.Item name="ruleId" noStyle>
                          <Input
                            style={{ width: 400 }}
                            placeholder="Enter the ruleId corresponding to the splunk query below"
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
                      </Select>
                    </Form.Item>
                    {formType.webbSourceType === "ali-sls" && (
                      <Form.Item
                        label="Ali SLS project"
                        rules={[{ required: true }]}
                        name={[field.name, "project"]}
                      >
                        <Input placeholder="Ali SLS project" />
                      </Form.Item>
                    )}
                    {formType.webbSourceType === "ali-sls" && (
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
              </div>
            )}
          </Form.List>
        </Form.Item>
        <Form.Item
          wrapperCol={{
            xs: { span: 24, offset: 0},
            sm: { span: 16, offset: 10 },
          }}
          
        >
          <Button type="primary" shape="round" icon={<RocketOutlined />} size='large' onClick={()=>{form.submit()}}>
            Submit
          </Button>
        </Form.Item>
        <Form.Item noStyle shouldUpdate>
          {() => (
            <Typography>
              <pre>{JSON.stringify(form.getFieldsValue(), null, 2)}</pre>
            </Typography>
          )}
        </Form.Item>
      </Form>
    </Card>
  );
};

export default WebbOneTimeForm;
