import { Button } from 'antd';
import logo from '~/assets/github.svg';
import './customButton.scss';
const CustomButton = ({ text, ...otherProps }) => {
  return (
    <div className='custom-button'>
      <Button type='primary' {...otherProps}>
        <img src={logo} alt='github' className='github-logo' />
        {text}
      </Button>
    </div>
  );
};

export default CustomButton;
