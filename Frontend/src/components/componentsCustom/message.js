import { message } from 'antd';

const [messageApi, contextHolder] = message.useMessage();
export const success = (message) => {
    messageApi.open({
        type: 'success',
        content: message,
    });
};
export const error = () => {
    messageApi.open({
        type: 'error',
        content: 'This is an error message',
    });
};
export const warning = () => {
    messageApi.open({
        type: 'warning',
        content: 'This is a warning message',
    });
};

