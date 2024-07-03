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

const EmployeeDetails = () => {
  const [employeeId, setEmployeeId] = useState("");
  const [employee, setEmployee] = useState(null);
  const [directReports, setDirectReports] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = () => {
    setLoading(true);
    employeeService
      .getEmployeeById(employeeId)
      .then((data) => {
        setEmployee(data.employee);
        setDirectReports(data.directReports);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching employee details:", error);
        setLoading(false);
      });
  };

  return (
    <div>
      <Typography variant="h6" gutterBottom>
        Employee Details
      </Typography>
      <TextField
        label="Employee ID"
        value={employeeId}
        onChange={(e) => setEmployeeId(e.target.value)}
        variant="outlined"
        margin="dense"
      />
      <Button
        variant="contained"
        color="primary"
        onClick={handleSearch}
        disabled={!employeeId}
        style={{ marginLeft: "10px" }}
      >
        Search
      </Button>
      {loading && <Typography variant="body1">Loading...</Typography>}
      {employee && (
        <div>
          <Typography variant="h6">{employee.name}</Typography>
          <Typography variant="subtitle1">{employee.position}</Typography>
          <Typography variant="body1">Direct Reports:</Typography>
          <List>
            {directReports.map((report) => (
              <ListItem key={report.id}>
                <ListItemText primary={report.name} />
              </ListItem>
            ))}
          </List>
        </div>
      )}
    </div>
  );
};

export default EmployeeDetails;
