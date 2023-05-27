import { notification } from 'antd';
import { ReactNode } from 'react';

export const showNotification = ({
  type = 'success',
  title,
  description = '',
  duration = 3,
}: {
  type?: 'success' | 'error';
  description: ReactNode;
  title?: ReactNode;
  duration?: number;
}) => {
  let message = null;

  if (title) {
    message = title;
  } else {
    if (type === 'success') {
      message = 'Success!';
    }
    if (type === 'error') {
      message = 'Error!';
    }
  }

  const execFunc = notification[type];
  execFunc({
    description,
    message,
    duration,
  });
};
