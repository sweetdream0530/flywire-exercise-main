import React, { useState } from "react";
import { TextField, Button, Typography } from "@material-ui/core";
import employeeService from "../services/employeeService";

const AddEmployeeForm = () => {
  const [employeeData, setEmployeeData] = useState({
    name: "",
    position: "",
    directReports: "",
    hireDate: "",
    manager: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmployeeData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    setLoading(true);
    employeeService
      .addEmployee(employeeData)
      .then(() => {
        setEmployeeData({
          name: "",
          position: "",
          directReports: "",
          hireDate: "",
          manager: "",
        });
        setLoading(false);
        setError(null);
        alert("Employee added successfully!");
      })
      .catch((error) => {
        console.error("Error adding employee:", error);
        setLoading(false);
        setError(error.message);
      });
  };

  return (
    <div>
      <Typography variant="h6" gutterBottom>
        Add Employee
      </Typography>
      <TextField
        name="name"
        label="Name"
        value={employeeData.name}
        onChange={handleChange}
        variant="outlined"
        margin="dense"
        fullWidth
      />
      <TextField
        name="position"
        label="Position"
        value={employeeData.position}
        onChange={handleChange}
        variant="outlined"
        margin="dense"
        fullWidth
      />
      <TextField
        name="directReports"
        label="Direct Reports (comma-separated IDs)"
        value={employeeData.directReports}
        onChange={handleChange}
        variant="outlined"
        margin="dense"
        fullWidth
      />
      <TextField
        name="hireDate"
        label="Hire Date (dd/MM/yyyy)"
        value={employeeData.hireDate}
        onChange={handleChange}
        variant="outlined"
        margin="dense"
        fullWidth
      />
      <TextField
        name="manager"
        label="Manager"
        value={employeeData.manager}
        onChange={handleChange}
        variant="outlined"
        margin="dense"
        fullWidth
      />
      {error && (
        <Typography variant="body1" color="error">
          {error}
        </Typography>
      )}
      <Button
        variant="contained"
        color="primary"
        onClick={handleSubmit}
        disabled={loading}
        style={{ marginTop: "10px" }}
      >
        Add Employee
      </Button>
    </div>
  );
};

export default AddEmployeeForm;
