// ** Styles Import
import styles from './index.module.scss';

// ** Another Import
import { useEffect, useState } from 'react';
import { Input } from '../../utils/components/Input';
import { Select } from '../../utils/components/Select';
import RadioGroup from '../../utils/components/RadioGroup';
import { activities, gender, roles } from '../../../../data';
import CheckboxGroup from '../../utils/components/CheckboxGroup';

function InputContainer() {
  // ** State
  const [phone, setPhone] = useState<string>('');
  const [amount, setAmount] = useState<string>('');
  const [sports, setSports] = useState<string[]>([]);
  const [textArea, setTextArea] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [userName, setUserName] = useState<string>('');
  const [fullPhone, setFullPhone] = useState<string>('');
  const [datePicker, setDatePicker] = useState<string>('');
  const [role, setRole] = useState<{ item: any; name?: string }>();
  const [sex, setSex] = useState<
    Array<{
      id: string;
      name: string;
    }>
  >([]);

  // ** Function
  const handleFileChange = (files: FileList | null) => {
    if (!files) return;
    console.log(files[0]); // File object
  };

  // ** useEffect
  useEffect(() => {
    console.log('sex :>> ', sex);
    console.log('role :>> ', role);
    console.log('fullPhone :>> ', fullPhone);
    console.log('datePicker :>> ', datePicker);
  }, [role, sex, datePicker, fullPhone]);

  return (
    <div className={styles.bodyContainer}>
      <div className={styles['options-grid']}>
        <div className={styles['option-card']}>
          <Input.Textarea
            showCount
            maxLength={200}
            value={textArea}
            onChange={setTextArea}
            placeholder='Introduction'
          >
            <i className='ti ti-user-info'></i> Introduction
          </Input.Textarea>
        </div>

        <Input.Calendar
          views={['day', 'month', 'year']}
          beginFromDay='Sunday'
          formatDayOfweek={['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7']}
        ></Input.Calendar>

        <div className={styles['option-card']}>
          <CheckboxGroup
            name={'sport'}
            displayGroup='row'
            items={activities}
            labelDisplay='last'
            title='Favorite Sports'
            value={sports}
            onChange={setSports}
          >
            <i className='ti ti-shirt-sport'></i> Sport
          </CheckboxGroup>
        </div>

        <div className={styles['option-card']}>
          <RadioGroup
            items={gender}
            name={'gender'}
            title={'Gender'}
            labelDisplay='last'
            displayGroup={'row'}
            onChange={() => setSex}
          >
            <i className='ti ti-gender-bigender'></i> Gender
          </RadioGroup>
        </div>

        <div className={styles['option-card']}>
          <Input.File onChange={handleFileChange} accept='.pdf,.png'>
            Upload file
          </Input.File>
        </div>

        <div className={styles['option-card']}>
          <Input.Phone
            required
            label='Enter your phone'
            value={phone}
            onChange={({ phone, fullPhone }) => {
              setPhone(phone);
              setFullPhone(fullPhone);
            }}
          />
        </div>

        <div className={styles['option-card']}>
          <Input.Text
            maxLength={200}
            value={userName}
            placeholder='Username'
            onChange={setUserName}
          >
            <i className='ti ti-user-circle' /> Username
          </Input.Text>
        </div>

        <div className={styles['option-card']}>
          <Input.Password
            maxLength={200}
            value={password}
            visibilityToggle
            placeholder='Password'
            onChange={setPassword}
          >
            <i className='ti ti-key'></i> Password
          </Input.Password>
        </div>

        <div className={styles['option-card']}>
          <Input.DatePicker onChange={setDatePicker}>
            <i className='ti ti-cake'></i> Date of birth
          </Input.DatePicker>
        </div>

        <div className={styles['option-card']}>
          <Input.Number
            value={amount}
            onChange={setAmount}
            required={false}
            placeholder='Money'
          >
            Money
          </Input.Number>
        </div>

        <div className={styles['option-card']}>
          <Input.Search placeholder='searching....'>
            <i className='ti ti-user-info'></i> Search
          </Input.Search>
        </div>

        <div className={styles['option-card']}>
          <Select
            title='Vai trò'
            itemsSelect={roles}
            placeholder='Select your role...'
            onChange={setRole}
            name={'role'}
          >
            <i className='ti ti-user-check'></i> Role
          </Select>
        </div>
      </div>
    </div>
  );
}

export default InputContainer;
