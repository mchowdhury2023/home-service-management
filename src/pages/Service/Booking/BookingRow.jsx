
const BookingRow = ({ booking, handleDelete, handleBookingConfirm}) => {
    const { _id, serviceDate, serviceName, price, serviceImage, status } = booking;

    const handleDropdownChange = (event) => {
        handleStatusChange(_id, event.target.value);
    };



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
            <select value={status} onChange={(e) => handleDropdownChange(_id, e.target.value)} className="select select-bordered w-full max-w-xs">
                <option value="pending">Pending</option>
                <option value="inProgress">In Progress</option>
                <option value="completed">Completed</option>
            </select>
        </td>
        <td>
            <button onClick={() => handleDelete(_id)} className="btn btn-error btn-sm">
                Delete
            </button>
        </td>
    </tr>
    );
};

export default BookingRow;