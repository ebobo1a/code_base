import { ChangeEvent, SetStateAction, useEffect, useState } from 'react';

import './index.css';
import { VARIABLES } from '../../utils/stub';
import { validateCityName } from '../../validate/validateCity';
import { validateDate } from '../../validate/validateDate';
import { Booking } from '../../utils/generateBookings';

function MyForm(props: { setResults: React.Dispatch<SetStateAction<Booking[]>> }): React.JSX.Element {
  const [textInput, setTextInput] = useState('');
  const [dateInput1, setDateInput1] = useState('');
  const [dateInput2, setDateInput2] = useState('');

  const [cityError, setCityError] = useState('');
  const [checkInError, setCheckInError] = useState('');
  const [checkOutError, setCheckOutError] = useState('');

  const handleTextInputChange = (event: { target: { value: string } }) => {
    const value = event.target.value;
    setTextInput(value);

    const res = validateCityName(value);
    setCityError(res.isValid ? '' : res.message);
  };

  const findItems = (text: string, date1 = '', date2 = '') => {
    const results = VARIABLES.filter((booking) => {
      const matchesText = booking.location.toLowerCase().includes(text.toLowerCase());
      const matchesDate1 = date1 === '' || booking.checkIn === date1;
      const matchesDate2 = date2 === '' || booking.checkOut === date2;
      return matchesText && matchesDate1 && matchesDate2;
    });

    props.setResults(results);
  };

  const handleDateInputChange = (
    event: ChangeEvent<HTMLInputElement>,
    setDate: React.Dispatch<SetStateAction<string>>,
  ) => {
    const value = event.target.value.replace(/\D/g, '');
    const parts: string[] = [];

    if (value.length > 0) parts.push(value.substring(0, 2));
    if (value.length > 2) parts.push(value.substring(2, 4));
    if (value.length > 4) parts.push(value.substring(4, 8));

    setDate(parts.join('.'));
  };

  
  useEffect(() => {
    if (!dateInput1) {
      setCheckInError('');
      return;
    }
    if (dateInput1.length < 10) {
      setCheckInError('');
      return;
    }

    const res = validateDate(dateInput1);
    setCheckInError(res.isValid ? '' : res.message);
  }, [dateInput1]);

  
  useEffect(() => {
    if (!dateInput2) {
      setCheckOutError('');
      return;
    }
    if (dateInput2.length < 10) {
      setCheckOutError('');
      return;
    }

    const res = validateDate(dateInput2, { minDate: dateInput1 });
    setCheckOutError(res.isValid ? '' : res.message);
  }, [dateInput1, dateInput2]);

  const handleSubmit = (event: { preventDefault: () => void }) => {
    event.preventDefault();

    
    if (dateInput1 && dateInput1.length === 10) {
      const r1 = validateDate(dateInput1);
      setCheckInError(r1.isValid ? '' : r1.message);
      if (!r1.isValid) return;
    }

    if (dateInput2 && dateInput2.length === 10) {
      const r2 = validateDate(dateInput2, { minDate: dateInput1 });
      setCheckOutError(r2.isValid ? '' : r2.message);
      if (!r2.isValid) return;
    }

    if (cityError) return;

    findItems(textInput, dateInput1, dateInput2);
  };

  const hasErrors = cityError.length > 0 || checkInError.length > 0 || checkOutError.length > 0;

  return (
    <form
      className="form"
      onSubmit={handleSubmit}
      style={{ maxWidth: '300px', margin: '20px auto', display: 'flex', flexDirection: 'column', gap: '10px' }}
    >
      <div className="item">
        <label htmlFor="textInput" className="label">
          Куда отправимся?
        </label>
        <input
          className="input"
          type="text"
          id="textInput"
          name="textInput"
          value={textInput}
          onChange={handleTextInputChange}
          placeholder="Введите текст"
          autoComplete="off"
        />
        {cityError && <p className="error">{cityError}</p>}
      </div>

      <div className="item">
        <label htmlFor="dateInput1" className="label">
          Дата заезда:
        </label>
        <input
          type="text"
          id="dateInput1"
          name="dateInput1"
          value={dateInput1}
          onChange={(e) => handleDateInputChange(e, setDateInput1)}
          placeholder="ДД.ММ.ГГГГ"
          maxLength={10}
          className="input"
        />
        {checkInError && <p className="error">{checkInError}</p>}
      </div>

      <div className="item">
        <label htmlFor="dateInput2" className="label">
          Дата выезда:
        </label>
        <input
          type="text"
          id="dateInput2"
          name="dateInput2"
          value={dateInput2}
          onChange={(e) => handleDateInputChange(e, setDateInput2)}
          placeholder="ДД.ММ.ГГГГ"
          maxLength={10}
          className="input"
        />
        {checkOutError && <p className="error">{checkOutError}</p>}
      </div>

      <button type="submit" className="create-button" disabled={!textInput || hasErrors}>
        Найти
      </button>
    </form>
  );
}

export default MyForm;
