import React from "react";
import { Container, Grid, Typography } from "@material-ui/core";
import ActiveEmployeesList from "./components/ActiveEmployeesList";
import EmployeeDetails from "./components/EmployeeDetails";
import EmployeesByHireDate from "./components/EmployeesByHireDate";
import AddEmployeeForm from "./components/AddEmployeeForm";
import DeactivateEmployee from "./components/DeactivateEmployee";

function App() {
  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Employee Management System
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <ActiveEmployeesList />
        </Grid>
        <Grid item xs={12} md={6}>
          <EmployeeDetails />
        </Grid>
        <Grid item xs={12} md={6}>
          <EmployeesByHireDate />
        </Grid>
        <Grid item xs={12} md={6}>
          <AddEmployeeForm />
        </Grid>
        <Grid item xs={12} md={6}>
          <DeactivateEmployee />
        </Grid>
      </Grid>
    </Container>
  );
}

export default App;
