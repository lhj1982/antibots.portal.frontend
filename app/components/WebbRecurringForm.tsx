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
  Button,
  Modal,
  FloatButton,
} from "antd";
import { useEffect, useState } from "react";
import dayjs from "dayjs";
import type { RangePickerProps } from "antd/es/date-picker";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { CloseOutlined } from "@ant-design/icons";
import handleSubmitData from "@/lib/handleSubmitData";
import SubmitResult from "./SubmitResult";
import { SubmitStatus, WebbFormData } from "@/type";
import SubmitButton from "./SubmitButton";
import { useRouter } from "next/navigation";
import LoadingModal from "./LoadingModal";
import {
  recurringAbsoluteValidation,
  recurringRelativeValidation,
} from "@/lib/scheduleIntervalValidation";

type SelfProps = {
  isUpdate: boolean;
  formData: WebbFormData;
};

const WebbRecurringForm = (props: SelfProps) => {
  const router = useRouter();
  const { isUpdate, formData } = props;
  const [form] = Form.useForm();
  const { Option } = Select;
  const { RangePicker } = DatePicker;
  dayjs.extend(customParseFormat);

  // const [formType, setFormType] = useState("recurring");
  const [recurringForm, setRecurringForm] = useState<WebbFormData>({
    fileName: "",
    webbSourceType: "",
    taskType: "",
    dateSearchType: "absolute",
    scheduleIntervals: "",
    spl_config: [],
  });

  const onOkHandler = () => {
    setShowSubmitModal(false);
    router.push("/webbrulelist");
  };

  const [showSubmitModal, setShowSubmitModal] = useState(false);

  const [showLoadingModal, setShowLoadingModal] = useState(false);

  const loadingModalHandler = (isOpen: boolean) => {
    setShowLoadingModal(isOpen);
  };

  const [submitStatus, setSubmitStatus] = useState<SubmitStatus>({
    statusCode: "",
    statusMessage: "Something Went wrong",
  });

  const [timeType, setTimeType] = useState("");
  const disabledDate: RangePickerProps["disabledDate"] = (current) => {
    return current && current >= dayjs().endOf("day");
  };

  useEffect(() => {
    setRecurringForm(formData);
    if (formData.timeType) {
      setTimeType(formData.timeType);
    }
    form.setFieldsValue(formData);
  }, [form, formData]);

  const absoluteTimeComponent = (
    <Select
      placeholder="Select time type"
      allowClear
      onChange={(value: any) => {
        setTimeType(value);
      }}
    >
      <Option value="with_date">Time With Date</Option>
      <Option value="without_date">Time Without Date</Option>
    </Select>
  );

  const relativeTimeComponent = <InputNumber addonAfter="Minutes" min={0} />;

  return (
    <Card
      title={
        <h1 className="text-black">
          {isUpdate ? "Update Recurring Rule" : "Create Recurring Rule"}
        </h1>
      }
      className="w-2/3 m-8"
    >
      <Form
        form={form}
        name="recurring_form"
        autoComplete="off"
        initialValues={{ items: [{}] }}
        className="w-full"
        onFinish={(values) => {
          //console.log("values: ", values);
          const res = handleSubmitData(
            "schedule-recurring", // path
            recurringForm.fileName,
            values
          );
          //console.log("res: ", res);
          res
            .then((res) => {
              //console.log(res);
              setSubmitStatus({
                ...submitStatus,
                statusCode: res.data.data.statusCode,
                statusMessage: res.data.data.message,
              });
              setShowLoadingModal(false);
              setShowSubmitModal(true);
            })
            .catch((err) => {
              //console.log(err);
              setSubmitStatus({
                ...submitStatus,
                statusCode: err.response.status,
                statusMessage: err.message,
              });
              setShowLoadingModal(false);
              setShowSubmitModal(true);
            });
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
              setRecurringForm({
                ...recurringForm,
                fileName: `${e.target.value}`,
              });
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
              setRecurringForm({ ...recurringForm, webbSourceType: value });
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
              setRecurringForm({ ...recurringForm, taskType: value });
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
              setRecurringForm({ ...recurringForm, dateSearchType: value });
            }}
          >
            <Option value="relative">Relative</Option>
            <Option value="absolute">Absolute</Option>
          </Select>
        </Form.Item>
        <Form.Item
          label={
            recurringForm.dateSearchType == "relative"
              ? "Schedule Intervals"
              : "Trigger Time"
          }
          name="scheduleIntervals"
          rules={[
            {
              required: true,
              validator:
                recurringForm.dateSearchType === "relative"
                  ? recurringRelativeValidation
                  : recurringAbsoluteValidation,
            },
          ]}
        >
          <Space>
            <Form.Item name="scheduleIntervals" noStyle>
              <Input
                style={{ width: 360 }}
                placeholder={
                  recurringForm.dateSearchType === "relative"
                    ? "Use Rate Expression"
                    : "Use Cron Expression"
                }
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
        {recurringForm.dateSearchType === "absolute" && (
          <Form.Item
            label="Select Time Type"
            rules={[{ required: true }]}
            name="timeType"
          >
            {absoluteTimeComponent}
          </Form.Item>
        )}

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
                    {recurringForm.dateSearchType === "relative" && (
                      <Form.Item
                        label="Search Past"
                        rules={[{ required: true }]}
                        name={[field.name, "searchTimeRange"]}
                      >
                        {relativeTimeComponent}
                      </Form.Item>
                    )}
                    {recurringForm.dateSearchType === "absolute" &&
                      timeType === "with_date" && (
                        <Form.Item
                          label={"Search Time Range"}
                          rules={[{ required: true }]}
                        >
                          <Space wrap>
                            <Form.Item
                              name={[field.name, "searchStartTime"]}
                              rules={[{ required: true }]}
                            >
                              <DatePicker
                                placeholder="Start Date Time"
                                showTime
                                disabledDate={disabledDate}
                              />
                            </Form.Item>
                            <Form.Item
                              name={[field.name, "searchEndTime"]}
                              rules={[{ required: true }]}
                            >
                              <DatePicker
                                placeholder="End Date Time"
                                showTime
                                disabledDate={disabledDate}
                              />
                            </Form.Item>
                          </Space>
                        </Form.Item>
                      )}
                    {recurringForm.dateSearchType === "absolute" &&
                      timeType === "without_date" && (
                        <Form.Item
                          label={"Search Time Range"}
                          rules={[{ required: true }]}
                        >
                          <Space wrap>
                            <Form.Item name={[field.name, "searchStartTime"]}>
                              <TimePicker
                                placeholder="Start Time"
                                format="HH:mm:ss"
                              />
                            </Form.Item>
                            <Form.Item name={[field.name, "searchEndTime"]}>
                              <TimePicker
                                placeholder="End Time"
                                format="HH:mm:ss"
                              />
                            </Form.Item>
                          </Space>
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
                      <InputNumber
                        addonAfter="Days"
                        min={1}
                        placeholder="ttl"
                      />
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
                        <Option value="test">test_namespace</Option>
                      </Select>
                    </Form.Item>
                    {recurringForm.webbSourceType === "ali-sls" && (
                      <Form.Item
                        label="Ali SLS project"
                        rules={[{ required: true }]}
                        name={[field.name, "project"]}
                      >
                        <Input placeholder="Ali SLS project" />
                      </Form.Item>
                    )}
                    {recurringForm.webbSourceType === "ali-sls" && (
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
                  open={showSubmitModal}
                  okText="Got it"
                  cancelButtonProps={{ style: { display: "none" } }}
                  onOk={onOkHandler}
                  maskClosable={false}
                  closeIcon={null}
                >
                  <SubmitResult
                    statusCode={submitStatus.statusCode}
                    statusMessage={submitStatus.statusMessage}
                  />
                </Modal>
                <LoadingModal isOpen={showLoadingModal} />
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
          <SubmitButton form={form} loadingModalHandler={loadingModalHandler} />
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

export default WebbRecurringForm;
