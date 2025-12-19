import Form from './components/form';
import Title from './components/title';
import Results from './components/results';

import './App.css';
import { useState } from 'react';
import { Booking } from './utils/generateBookings';

function App() {
  const [res, setResults] = useState<Booking[]>([]);

  return (
    <>
      <Title />
      <Form setResults={setResults} />
      {res.length > 0 && <Results results={res} />}
    </>
  );
}

export default App;
