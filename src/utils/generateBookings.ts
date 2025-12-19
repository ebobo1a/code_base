import { getRandomDateInNextMonth } from './getRandomDateInNextMonth';
import { Apartment, IMAGES } from './stub';
import { getRandomImage } from './getRandomImage';

export interface Booking {
  bookingId: number;
  apartmentId: number;
  apartmentName: string;
  location: string;
  checkIn: string;
  checkOut: string;
  img: string;
}
export function generateBookings(apartments: Apartment[], numOfBookings: number): Booking[] {
  const bookings: Booking[] = [];
  for (let i = 0; i < numOfBookings; i++) {
    const apartment = apartments[Math.floor(Math.random() * apartments.length)];
    const checkInDate = getRandomDateInNextMonth();
    const checkOutDate = new Date(checkInDate);
    checkOutDate.setDate(checkOutDate.getDate() + Math.floor(Math.random() * 7) + 1);
    const image = getRandomImage(IMAGES);

    bookings.push({
      bookingId: i + 1,
      apartmentId: apartment.id,
      apartmentName: apartment.name,
      location: apartment.location,
      checkIn: checkInDate.toISOString().split('T')[0],
      checkOut: checkOutDate.toISOString().split('T')[0],
      img: image,
    });
  }

  return bookings;
}
