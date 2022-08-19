import Error from 'components/Views/error/index';

export default {
  title: 'Pages/Error',
  component: Error,
};

const Template = (args) => <Error {...args} />;

export const Error404 = Template.bind({});
Error404.args = {
  statusCode: 404,
};

export const Error500 = Template.bind({});
Error500.args = {
  statusCode: 500,
};
