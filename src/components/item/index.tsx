import { Booking } from '../../utils/generateBookings';
import './index.css';

export default function Item(props: Booking) {
  return (
    <div className="card">
      <img src={props.img} className="image" />
      <p className="name">{props.apartmentName}</p>
      <p className="location">{props.location}</p>
      <p className="date">
        Available dates: {props.checkIn} - {props.checkOut}
      </p>
    </div>
  );
}
