import { Booking } from '../../utils/generateBookings';

import Item from '../item';
import './index.css';

export default function Results(props: { results: Booking[] }) {
  return (
    <div className="container">
      {props.results.map((item) => (
        <Item key={item.bookingId} {...item} />
      ))}
    </div>
  );
}
