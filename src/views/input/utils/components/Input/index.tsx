// ** Component Input Import
import InputOTP from './component/InputOTP';
import InputText from './component/InputText';
import InputFile from './component/InputFile';
import InputTextarea from './component/Textarea';
import InputSearch from './component/InputSearch';
import InputNumber from './component/InputNumber';
import InputPassword from './component/InputPassword';
import Calendar from './component/Calendar';
import InputPhone from './component/InputPhone';
import DatePicker from './component/Datepicker';

const Input = Object.assign(
  (props: any) => {
    return <div>{props.children}</div>;
  },
  {
    OTP: InputOTP,
    File: InputFile,
    Text: InputText,
    Phone: InputPhone,
    Calendar: Calendar,
    Search: InputSearch,
    Number: InputNumber,
    DatePicker: DatePicker,
    Password: InputPassword,
    Textarea: InputTextarea,
  }
);

export { Input };
