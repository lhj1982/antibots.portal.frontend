import {
  Button,
  Card,
  Col,
  Collapse,
  DatePicker,
  Form,
  Input,
  Row,
  Select,
  Space,
} from "antd";
import { MonitorOutlined } from "@ant-design/icons";
import { useEffect } from "react";
import { useLaunchIDStore } from "@/zustand/launchIDStore";

type SelfProps = {
  handleStateUpdate: (result: any) => void;
  launchIdOnly: boolean; 
};

const LaunchChartForm = (props: SelfProps) => {
  const {  handleStateUpdate, launchIdOnly } = props;
  const { Panel } = Collapse;
  const [form] = Form.useForm();
  const launchIdState = useLaunchIDStore((state)=> state.launchId);

  useEffect(()=>{
    form.setFieldsValue({launchId: launchIdState});
  })

  return (
    <Collapse
      accordion
      bordered={false}
      size="small"
      expandIcon={({ isActive }) => (
        <MonitorOutlined rotate={isActive ? 90 : 0} />
      )}
    >
      <Panel
        header={
          <h3 className="font-bold underline hover:text-red-300">
            Advanced Search
          </h3>
        }
        key="1"
      >
        <Card>
          <Form
            form={form}
            name="Search Conditions"
            autoComplete="off"
            initialValues={{ items: [{}] }}
            className="w-full"
            onFinish={async (values) => {
              console.log(values);
              handleStateUpdate(values.launchId);
            }}
          >
            
                <Form.Item name="launchId" label="Launch Id">
                  <Input style={{ width: 400 }} placeholder="Launch Id"></Input>
                </Form.Item>
          
              {launchIdOnly == false && (
                
                  <Form.Item label="Chart Type" name="chartType">
                    <Select style={{ width: 400 }}>
                      <Select.Option value="pie">Pie Chart</Select.Option>
                      <Select.Option value="bar">Bar Chart</Select.Option>
                    </Select>
                  </Form.Item>
                
              )}
           
            <Form.Item
              wrapperCol={{
                xs: { span: 24, offset: 0 },
                sm: { span: 16, offset: 10 },
              }}
            >
              <Button type="primary" htmlType="submit" className="mr-4">
                search
              </Button>
              <Button htmlType="reset">reset</Button>
            </Form.Item>
          </Form>
        </Card>
      </Panel>
    </Collapse>
  );
};

export default LaunchChartForm;
