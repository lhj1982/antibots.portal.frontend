import {
  Form,
  Select,
  Card,
  DatePicker,
  Typography
} from "antd";
import { useEffect, useState } from "react";
import dayjs, { Dayjs } from "dayjs";
import type { RangePickerProps } from "antd/es/date-picker";
import customParseFormat from "dayjs/plugin/customParseFormat";
import SplForm from "./SplForm";


const { Option } = Select;
const { RangePicker } = DatePicker;
dayjs.extend(customParseFormat);

const WebbOneTimeForm = () => {
  const [form] = Form.useForm();
  const { Option } = Select;
  const { RangePicker } = DatePicker;
  dayjs.extend(customParseFormat);
  
  const [formType, setFormType] = useState<FormType>({
    taskType: "",
    dataSearchType: ""
  }); 

  return (
    <Card
      title={<h1 className="text-black">Create OneTime Rule</h1>}
      className="w-2/3 m-8"
    >
      <Form
        form={form}
        name="form_type"
        autoComplete="off"
      >
        <Form.Item
          name="taskType"
          label="Task Type"
          rules={[{ required: true }]}
        >
          <Select placeholder="Select a task type" allowClear onChange={(value)=> {
             setFormType({...formType, taskType: value })
          }}>
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
        //   initialValue = 'absolute'
        >
          <Select
            placeholder="Select data search type"
            defaultValue={"absolute"}
            allowClear
            onChange = {(value)=>{
                setFormType({...formType, dataSearchType: value})
            }}
          >
            <Option value="relative">Relative</Option>
            <Option value="absolute">Absolute</Option>
          </Select>
        </Form.Item>
        <Form.Item noStyle shouldUpdate>
        {() => (
          <Typography>
            <pre>{JSON.stringify(form.getFieldsValue(), null, 2)}</pre>
          </Typography>
        )}
      </Form.Item>
      </Form>
      <SplForm {...formType}/>
    </Card>
  );
};

export default WebbOneTimeForm;
