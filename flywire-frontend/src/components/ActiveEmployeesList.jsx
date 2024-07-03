import React, { useEffect, useState } from "react";
import { List, ListItem, ListItemText, Typography } from "@material-ui/core";
import employeeService from "../services/employeeService";

const ActiveEmployeesList = () => {
  const [activeEmployees, setActiveEmployees] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    employeeService
      .getActiveEmployees()
      .then((data) => {
        setActiveEmployees(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching active employees:", error);
        setLoading(false);
      });
  }, []);

  return (
    <div>
      <Typography variant="h6" gutterBottom>
        Active Employees
      </Typography>
      {loading ? (
        <Typography variant="body1">Loading...</Typography>
      ) : (
        <List>
          {activeEmployees.map((employee) => (
            <ListItem key={employee.id}>
              <ListItemText primary={employee.name} />
            </ListItem>
          ))}
        </List>
      )}
    </div>
  );
};

export default ActiveEmployeesList;
