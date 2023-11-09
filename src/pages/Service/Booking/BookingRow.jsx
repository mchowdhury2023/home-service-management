import { TableRow, TableCell, Checkbox, Button, Select, MenuItem } from '@mui/material';
const BookingRow = ({
  booking,
  handleDelete,
  handleStatusChange,
  showStatusChange,
  showDelete,
}) => {
  const { _id, serviceDate, serviceName, price, serviceImage, status = 'pending' } = booking;

  return (
    <TableRow>
      <TableCell padding="checkbox">
        <Checkbox />
      </TableCell>
      <TableCell component="th" scope="row">
        <div style={{ display: 'flex', alignItems: 'center' }}>
          {serviceImage && (
            <img src={serviceImage} alt={serviceName} style={{ width: '50px', height: '50px', borderRadius: '50%', marginRight: '10px' }} />
          )}
          {serviceName}
        </div>
      </TableCell>
      <TableCell>{serviceDate}</TableCell>
      <TableCell>${price}</TableCell>
      <TableCell>
        {showStatusChange ? (
          <Select
            value={status}
            onChange={(e) => handleStatusChange(_id, e.target.value)}
            size="small"
            style={{ width: '100%' }}
          >
            <MenuItem value="pending">Pending</MenuItem>
            <MenuItem value="inProgress">In Progress</MenuItem>
            <MenuItem value="completed">Completed</MenuItem>
          </Select>
        ) : (
          <span>{status}</span>
        )}
      </TableCell>
      <TableCell>
        {showDelete && (
          <Button
            onClick={() => handleDelete(_id)}
            color="error"
            variant="contained"
            size="small"
          >
            Delete
          </Button>
        )}
      </TableCell>
    </TableRow>
  );
};

export default BookingRow;
