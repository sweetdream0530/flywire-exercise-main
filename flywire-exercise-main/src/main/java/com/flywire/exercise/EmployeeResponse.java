package com.flywire.exercise;

import java.util.List;

public class EmployeeResponse {
    private Employee employee;
    private List<Employee> directReports;

    public EmployeeResponse(Employee employee, List<Employee> directReports) {
        this.employee = employee;
        this.directReports = directReports;
    }

    public Employee getEmployee() { return employee; }
    public void setEmployee(Employee employee) { this.employee = employee; }

    public List<Employee> getDirectReports() { return directReports; }
    public void setDirectReports(List<Employee> directReports) { this.directReports = directReports; }
}
