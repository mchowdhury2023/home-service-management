import { useContext, useEffect, useState } from "react";
import BookingRow from "./BookingRow";
import axios from "axios";
import { AuthContext } from "../../../providers/AuthProvider";

const Bookings = () => {
  const { user } = useContext(AuthContext);
  const [myBookings, setMyBookings] = useState([]);
  const [pendingWorks, setPendingWorks] = useState([]);

  // Fetch my bookings
  useEffect(() => {
    const fetchMyBookings = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/bookings?userEmail=${user?.email}`, {withCredentials:true}
        );
        setMyBookings(response.data);
      } catch (error) {
        console.error("Error fetching my bookings:", error);
      }
    };

    if (user?.email) {
      fetchMyBookings();
    }
  }, [user?.email]);

  // Fetch pending works
  useEffect(() => {
    const fetchServicesIProvide = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/bookings?serviceProviderEmail=${user?.email}`, {withCredentials:true}
        );
        // Filter out my own bookings, if necessary
        const servicesProvided = response.data.filter(
          (booking) => booking.userEmail !== user.email
        );
        setPendingWorks(servicesProvided);
      } catch (error) {
        console.error("Error fetching services I provide:", error);
      }
    };

    if (user?.email) {
      fetchServicesIProvide();
    }
  }, [user?.email]);

  const handleDelete = (id) => {
    const proceed = confirm("Are You sure you want to delete");
    if (proceed) {
      fetch(`http://localhost:5000/bookings/${id}`, {
        method: "DELETE",
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          if (data.deletedCount > 0) {
            alert("deleted successful");
            const remaining = myBookings.filter(
              (booking) => booking._id !== id
            );
            setMyBookings(remaining);
          }
        });
    }
  };

  const handleStatusChange = (bookingId, newStatus) => {
    axios
      .patch(`http://localhost:5000/bookings/${bookingId}`, {
        status: newStatus,
      })
      .then((response) => {
        // Update both sets of bookings with the new status
        const updateBookings = (bookings) =>
          bookings.map((booking) => {
            if (booking._id === bookingId) {
              return { ...booking, status: newStatus };
            }
            return booking;
          });

        setMyBookings(updateBookings(myBookings));
        setPendingWorks(updateBookings(pendingWorks));
      })
      .catch((error) => {
        console.error("Error updating booking status:", error);
      });
  };

  return (
    <div>
      <h2 className="text-5xl mb-4">Bookings Dashboard</h2>

      {/* My Bookings Section */}
      <section>
        <h3 className="text-3xl mb-2">Your Bookings</h3>
        {myBookings.length > 0 ? (
          <div className="overflow-x-auto w-full">
            <table className="table w-full">
              {/* ... table head ... */}
              <tbody>
                {myBookings.map((booking) => (
                  <BookingRow
                    key={booking._id}
                    booking={booking}
                    handleDelete={handleDelete}
                    showStatusChange={false} // don't show status change dropdown
                    showDelete={true} // show delete option
                  />
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-xl text-gray-500">You have no bookings.</p>
        )}
      </section>

      {/* My Pending Works Section */}
      <section className="mt-8">
        <h3 className="text-3xl mb-2">My Pending Works</h3>
        {/* Replace pendingWorks with the actual state variable */}
        {pendingWorks.length > 0 ? (
          <div className="overflow-x-auto w-full">
            <table className="table w-full">
              {/* ... table head ... */}
              <tbody>
                {pendingWorks.map((work) => (
                  <BookingRow
                    key={work._id}
                    booking={work}
                    handleStatusChange={handleStatusChange}
                    showStatusChange={true} // show status change dropdown
                    showDelete={false} // don't show delete option
                  />
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-xl text-gray-500">There are no pending works.</p>
        )}
      </section>
    </div>
  );
};

export default Bookings;
