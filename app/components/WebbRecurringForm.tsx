import {
  Form,
  Select,
  Card,
  Input,
  Tooltip,
  Typography,
  Space,
  DatePicker,
  InputNumber,
  TimePicker,
} from "antd";
import { useState } from "react";
import dayjs from "dayjs";
import type { Dayjs } from "dayjs";
import type { RangePickerProps } from "antd/es/date-picker";
import customParseFormat from "dayjs/plugin/customParseFormat";
import type { SelectProps } from "antd";
import { relative } from "path";

const { Option } = Select;
const { RangePicker } = DatePicker;
dayjs.extend(customParseFormat);

const WebbRecurringForm = () => {
  const [searchType, setSearchType] = useState("relative");
  const [absoluteObj, setAbsoluteObj] = useState("");
  const [recurringObj, setRecurringObj] = useState("");
  const [recStartTime, setRecStartTime] = useState<Dayjs | null>(null);
  const [recEndTime, setRecEndTime] = useState<Dayjs | null>(null);
  const handleDataSearchTypeChange = (value: any) => {
    setSearchType(value);
  };

  const disabledDate: RangePickerProps["disabledDate"] = (current) => {
    return current && current >= dayjs().endOf("day");
  };

  const absTimeComp = (
    <Space wrap>
      <TimePicker
        value={recStartTime}
        placeholder="Start Time"
        onChange={(time: Dayjs) => setRecStartTime(time)}
      />
      <TimePicker
        value={recEndTime}
        placeholder="End Time"
        onChange={(time: Dayjs) => setRecEndTime(time)}
      />
    </Space>
  );
  const recTimeComp = (
    <InputNumber addonAfter="Minutes" defaultValue={0} min={0} />
  );

  return (
    <Card
      title={<h1 className="text-black">Create Recurring Rule</h1>}
      className="w-2/3 m-8"
    >
      <Form>
        <Form.Item
          name="taskType"
          label="Task Type"
          rules={[{ required: true }]}
        >
          <Select placeholder="Select a task type" allowClear>
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
            defaultValue={"relative"}
            allowClear
            onChange={handleDataSearchTypeChange}
          >
            <Option value="relative">Relative</Option>
            <Option value="absolute">Absolute</Option>
          </Select>
        </Form.Item>
        <Form.Item
          label={
            searchType == "absolute" ? "Trigger Time" : "Scheduled Interval"
          }
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
        <Form.Item
          label={
            searchType == "absolute"
              ? "Search Time Range"
              : "Search Minutes Before"
          }
          rules={[{ required: true }]}
        >
          {searchType == "absolute" ? absTimeComp : recTimeComp}
        </Form.Item>
        <Form.Item label="Splunk Query" rules={[{ required: true }]}>
          <Input.TextArea rows={4} placeholder="Input your splunk query here" />
        </Form.Item>
        <Form.Item label="Rule Id">
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
        <Form.Item label="Expiration" rules={[{ required: true }]}>
          <InputNumber addonAfter="Days" min={1} />
        </Form.Item>
        <Form.Item label="Destination" rules={[{ required: true }]}>
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
        <Form.Item name="action" label="Action" rules={[{ required: true }]}>
          <Select placeholder="Select an action" allowClear>
            <Option value="captcha">Captcha</Option>
            <Option value="block">Block</Option>
          </Select>
        </Form.Item>
        <Form.Item
          name="nameSpace"
          label="Name Space"
          rules={[{ required: true }]}
        >
          <Select placeholder="Select an edgekv name space" allowClear>
            <Option value="buy_suspect_users">buy_suspect_users</Option>
            <Option value="order_suspect_users">order_suspect_users</Option>
            <Option value="payment_suspect_users">payment_suspect_users</Option>
          </Select>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default WebbRecurringForm;
