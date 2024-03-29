import {
  Button,
  Card,
  Col,
  Collapse,
  DatePicker,
  Form,
  Input,
  Row,
  Space,
} from "antd";
import { MonitorOutlined } from "@ant-design/icons";
import { RangePickerProps } from "antd/es/date-picker";
import moment from "moment";
import { handleSearchQuery } from "@/lib/handleSearchQuery";

type SelfProps = {
    handleSearchProps: (query: string)=> void;
}

const SearchForm = (props: SelfProps) => {
  const {handleSearchProps} = props;
  const { Panel } = Collapse;
  const [form] = Form.useForm();
  const creationDisabledDate: RangePickerProps["disabledDate"] = (current) => {
    return current && current >= moment().endOf("day");
  };
  const ttlDisabledDate: RangePickerProps["disabledDate"] = (current) => {
    return current && current <= moment().endOf("day");
  };
 

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
              // console.log(values);
              const query = handleSearchQuery(values);
              handleSearchProps(query);
            }}
          >
            {/*first Row*/}
            <Row gutter={16}>
              <Col span={8}>
                <Form.Item name="value" label="value">
                  <Input style={{ width: 300 }} placeholder="value"></Input>
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item name="ruleId" label=" ruleId">
                  <Input style={{ width: 300 }} placeholder="ruleId"></Input>
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item name="source" label="source">
                  <Input style={{ width: 300 }} placeholder="source"></Input>
                </Form.Item>
              </Col>
            </Row>
            {/*second Row*/}
            <Row gutter={16}>
              <Col span={8}>
                <Form.Item name="action" label="action">
                  <Input style={{ width: 300 }} placeholder="action"></Input>
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item name="taskId" label="taskId">
                  <Input style={{ width: 300 }} placeholder="taskId"></Input>
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item name="destination" label="destination">
                  <Input
                    style={{ width: 300 }}
                    placeholder="destination"
                  ></Input>
                </Form.Item>
              </Col>
            </Row>
            {/*Third Row*/}
            <Row gutter={16}>
              <Col span={8}>
                <Form.Item name="type" label="type">
                  <Input style={{ width: 300 }} placeholder="type"></Input>
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item name="author" label="author">
                  <Input style={{ width: 300 }} placeholder="author"></Input>
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item name="nameSpace" label="nameSpace">
                  <Input style={{ width: 300 }} placeholder="nameSpace"></Input>
                </Form.Item>
              </Col>
            </Row>
            {/*Fourth Row*/}
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  label={"TTL"}
                  //   rules={[{ required: true }]}
                >
                  <Space wrap>
                    <Form.Item name="ttlSearchStartTime">
                      <DatePicker
                        placeholder="TTL Start Date Time"
                        showTime
                        disabledDate={ttlDisabledDate}
                      />
                    </Form.Item>
                    <Form.Item name="ttlSearchEndTime">
                      <DatePicker
                        placeholder="TTL End Date Time"
                        showTime
                        disabledDate={ttlDisabledDate}
                      />
                    </Form.Item>
                  </Space>
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label={"Creation"}
                  //   rules={[{ required: true }]}
                >
                  <Space wrap>
                    <Form.Item name="creationSearchStartTime">
                      <DatePicker
                        placeholder="Creation Start Date Time"
                        showTime
                        disabledDate={creationDisabledDate}
                      />
                    </Form.Item>
                    <Form.Item name="creationSearchEndTime">
                      <DatePicker
                        placeholder="Creation End Date Time"
                        showTime
                        disabledDate={creationDisabledDate}
                      />
                    </Form.Item>
                  </Space>
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

export default SearchForm;
