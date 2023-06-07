import { Button, Col, DatePicker, Form, Input, Row, Spin } from 'antd';
import { Dayjs } from 'dayjs';
import { useNavigate } from 'react-router-dom';
import { useSignupApiMutation } from '~/queries/apis/authApi.query';
import { showNotification } from '~/shared/notifications';
import useAuthStore from '~/stores/useAuthStore';

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
  },
};

const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
};

const RegisterScreen = () => {
  const setIsLogged = useAuthStore((state) => state.setIsLogged);

  const { isLoading, mutate } = useSignupApiMutation();

  const navigate = useNavigate();

  const onFinish = async (values: {
    email: string;
    username: string;
    password: string;
    phone_number: string;
    date_of_birth: Dayjs;
  }) => {
    const data = { ...values, date_of_birth: values.date_of_birth.format('DD-MM-YYYY') };
    mutate(
      { data },
      {
        onError: (err) => {
          showNotification({ type: 'error', description: err as string });
        },
        onSuccess: () => {
          setIsLogged(true);
          navigate('/login');
        },
      },
    );
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <Spin spinning={isLoading}>
      <Row>
        <Col className="mb-5 flex justify-center text-3xl text-red-500" xs={24}>
          Register Form
        </Col>
        <Col xs={24}>
          <Row className="flex justify-center">
            <Col xs={12}>
              <Form {...formItemLayout} onFinish={onFinish} onFinishFailed={onFinishFailed}>
                <Form.Item
                  name="email"
                  label="E-mail"
                  rules={[
                    {
                      type: 'email',
                      message: 'The input is not valid E-mail!',
                    },
                    {
                      required: true,
                      message: 'Please input your E-mail!',
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  name="password"
                  label="Password"
                  rules={[
                    {
                      required: true,
                      message: 'Please input your password!',
                    },
                  ]}
                  hasFeedback
                >
                  <Input.Password />
                </Form.Item>
                <Form.Item
                  name="confirm"
                  label="Confirm Password"
                  dependencies={['password']}
                  hasFeedback
                  rules={[
                    {
                      required: true,
                      message: 'Please confirm your password!',
                    },
                    ({ getFieldValue }) => ({
                      validator(_, value) {
                        if (!value || getFieldValue('password') === value) {
                          return Promise.resolve();
                        }
                        return Promise.reject(new Error('The two passwords that you entered do not match!'));
                      },
                    }),
                  ]}
                >
                  <Input.Password />
                </Form.Item>
                <Form.Item
                  name="username"
                  label="Username"
                  tooltip="Ur username!"
                  rules={[{ required: true, message: 'Please input your username!', whitespace: true }]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  name="phone_number"
                  label="Phone Number"
                  rules={[{ required: true, message: 'Please input your phone number!' }]}
                >
                  <Input style={{ width: '100%' }} />
                </Form.Item>
                <Form.Item
                  name="date_of_birth"
                  label="DatePicker"
                  rules={[{ required: true, message: 'Please choosae your date of birth!' }]}
                >
                  <DatePicker />
                </Form.Item>
                <Form.Item {...tailFormItemLayout}>
                  <Button type="primary" htmlType="submit">
                    Register
                  </Button>
                </Form.Item>
              </Form>
            </Col>
          </Row>
        </Col>
      </Row>
    </Spin>
  );
};

export default RegisterScreen;
