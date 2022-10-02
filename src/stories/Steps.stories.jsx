
import { CustomSteps } from '../components/Steps/';
import 'antd/dist/antd.css'; // or 'antd/dist/antd.less'

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'COMPONENTS/Steps',
  component: CustomSteps,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    backgroundColor: { control: 'color' },
  },
  parameters: {
    // layout: 'centered',
  },
};

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template = (args) => <CustomSteps {...args} />;



export const Primary = Template.bind({});
// // More on args: https://storybook.js.org/docs/react/writing-stories/args
// Primary.args = {
//   primary: true,
//   label: 'Steps',
// };


