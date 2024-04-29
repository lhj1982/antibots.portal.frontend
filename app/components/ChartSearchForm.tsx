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
              Launch Id
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
                  <Form.Item name="Launch ID" label="value">
                    <Input style={{ width: 300 }} placeholder="value"></Input>
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
  