import { Button, Col, Form, Input, Row, Spin } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useSigninApiMutation } from '~/queries/apis/authApi.query';
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

const LoginScreen = () => {
  const { isLoading, mutate } = useSigninApiMutation();

  const navigate = useNavigate();

  const onFinish = async (values: { username: string; password: string }) => {
    const data = { ...values };
    mutate(
      { data },
      {
        onError: (err) => {
          showNotification({ type: 'error', description: err as string });
        },
        onSuccess: () => {
          navigate('/');
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
          Login Form
        </Col>
        <Col xs={24}>
          <Row className="flex justify-center">
            <Col xs={12}>
              <Form {...formItemLayout} onFinish={onFinish} onFinishFailed={onFinishFailed}>
                <Form.Item
                  name="username"
                  label="Username"
                  tooltip="Ur username, email or phone number!"
                  rules={[{ required: true, message: 'Please input this field!', whitespace: true }]}
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
                <Form.Item {...tailFormItemLayout}>
                  <Button type="primary" htmlType="submit">
                    Login
                  </Button>
                  <Button
                    onClick={() => {
                      navigate('/register');
                    }}
                    type="default"
                  >
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

export default LoginScreen;
