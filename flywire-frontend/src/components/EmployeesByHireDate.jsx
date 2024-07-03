import React, { useState } from "react";
import {
  TextField,
  Button,
  Typography,
  List,
  ListItem,
  ListItemText,
} from "@material-ui/core";
import employeeService from "../services/employeeService";

const EmployeesByHireDate = () => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = () => {
    setLoading(true);
    employeeService
      .getEmployeesByHireDateRange(startDate, endDate)
      .then((data) => {
        setEmployees(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching employees by hire date:", error);
        setLoading(false);
      });
  };

  return (
    <div>
      <Typography variant="h6" gutterBottom>
        Employees By Hire Date
      </Typography>
      <TextField
        label="Start Date (dd/MM/yyyy)"
        value={startDate}
        onChange={(e) => setStartDate(e.target.value)}
        variant="outlined"
        margin="dense"
        style={{ marginRight: "10px" }}
      />
      <TextField
        label="End Date (dd/MM/yyyy)"
        value={endDate}
        onChange={(e) => setEndDate(e.target.value)}
        variant="outlined"
        margin="dense"
        style={{ marginRight: "10px" }}
      />
      <Button
        variant="contained"
        color="primary"
        onClick={handleSearch}
        disabled={!startDate || !endDate}
      >
        Search
      </Button>
      {loading && <Typography variant="body1">Loading...</Typography>}
      <List>
        {employees.map((employee) => (
          <ListItem key={employee.id}>
            <ListItemText
              primary={employee.name}
              secondary={`Hire Date: ${employee.hireDate}`}
            />
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default EmployeesByHireDate;
