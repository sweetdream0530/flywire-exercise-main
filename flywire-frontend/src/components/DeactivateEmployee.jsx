import React, { useState } from "react";
import { TextField, Button, Typography } from "@material-ui/core";
import employeeService from "../services/employeeService";

const DeactivateEmployee = () => {
  const [employeeId, setEmployeeId] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleDeactivate = () => {
    setLoading(true);
    employeeService
      .deactivateEmployee(employeeId)
      .then(() => {
        setLoading(false);
        setError(null);
        alert("Employee deactivated successfully!");
      })
      .catch((error) => {
        console.error("Error deactivating employee:", error);
        setLoading(false);
        setError(error.message);
      });
  };

  return (
    <div>
      <Typography variant="h6" gutterBottom>
        Deactivate Employee
      </Typography>
      <TextField
        label="Employee ID"
        value={employeeId}
        onChange={(e) => setEmployeeId(e.target.value)}
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
        onClick={handleDeactivate}
        disabled={!employeeId || loading}
        style={{ marginTop: "10px" }}
      >
        Deactivate Employee
      </Button>
    </div>
  );
};

export default DeactivateEmployee;
