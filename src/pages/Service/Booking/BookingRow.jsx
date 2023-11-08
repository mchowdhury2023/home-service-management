const BookingRow = ({
  booking,
  handleDelete,
  handleStatusChange,
  showStatusChange,
  showDelete,
}) => {
  const { _id, serviceDate, serviceName, price, serviceImage } =
    booking;

    const status = booking.status || 'pending';



  return (
    <tr>
      <th>
        <label>
          <input type="checkbox" className="checkbox" />
        </label>
      </th>
      <td>
        <div className="avatar">
          <div className="rounded w-24 h-24">
            {serviceImage && <img src={serviceImage} alt={serviceName} />}
          </div>
        </div>
      </td>
      <td>{serviceName}</td>
      <td>{serviceDate}</td>
      <td>${price}</td>
      <td>
        {showStatusChange ? (
          <select
            value={status}
            onChange={(e) => handleStatusChange(_id, e.target.value)}
            className="select select-bordered w-full max-w-xs"
          >
            <option value="pending">Pending</option>
            <option value="inProgress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
        ) : (
          <span>{status}</span> // Just show the status text if dropdown is not needed
        )}
      </td>
      <td>
        {showDelete && (
          <button
            onClick={() => handleDelete(_id)}
            className="btn btn-error btn-sm"
          >
            Delete
          </button>
        )}
      </td>
    </tr>
  );
};

export default BookingRow;
