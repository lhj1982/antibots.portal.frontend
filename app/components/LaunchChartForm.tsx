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

type SelfProps = {
  handleChartProps: (input: any) => void;
};

const LaunchChartForm = (props: SelfProps) => {
  const { handleChartProps } = props;
  const { Panel } = Collapse;
  const [form] = Form.useForm();

  return (
    <Collapse
      accordion
      bordered={false}
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
            onFinish={(values) => {
              console.log(values);
              handleChartProps(values);
            }}
          >
            {/*first Row*/}
            <Row gutter={16}>
              <Col span={10}>
                <Form.Item name="launchId" label="Launch Id">
                  <Input style={{ width: 400 }} placeholder="Launch Id"></Input>
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item label="Chart Type" name="chartType">
                  <Select>
                    <Select.Option value="pie">Pie Chart</Select.Option>
                    <Select.Option value="bar">Bar Chart</Select.Option>
                  </Select>
                </Form.Item>
              </Col>
            </Row>
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
