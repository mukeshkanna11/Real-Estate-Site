// src/context/BookingContext.jsx
import React, { createContext, useState, useContext } from "react";

const BookingContext = createContext();

export const useBooking = () => useContext(BookingContext);

export const BookingProvider = ({ children }) => {
  const [bookedListings, setBookedListings] = useState([]);

  const bookListing = (listing) => {
    setBookedListings((prev) => {
      const existingListing = prev.find((item) => item.id === listing.id);
      if (existingListing) {
        return prev.map((item) =>
          item.id === listing.id
            ? { ...item, count: item.count + 1 }
            : item
        );
      } else {
        return [...prev, { ...listing, count: 1 }];
      }
    });
  };

  return (
    <BookingContext.Provider value={{ bookedListings, bookListing }}>
      {children}
    </BookingContext.Provider>
  );
};
