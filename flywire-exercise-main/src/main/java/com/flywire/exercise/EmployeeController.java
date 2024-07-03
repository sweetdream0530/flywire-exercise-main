package com.flywire.exercise;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.web.bind.annotation.*;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;
import org.springframework.http.ResponseEntity;

import java.io.IOException;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.*;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/employees")
public class EmployeeController {

    @Value("classpath:json/data.json")
    private Resource dataFile;

    private final ObjectMapper objectMapper;
    private final DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd/MM/yyyy");

    public EmployeeController(ObjectMapper objectMapper) {
        this.objectMapper = objectMapper;
    }

    private List<Employee> readEmployeesFromFile() throws IOException {
        return Arrays.asList(objectMapper.readValue(dataFile.getInputStream(), Employee[].class));
    }

    private void writeEmployeesToFile(List<Employee> employees) throws IOException {
        objectMapper.writeValue(dataFile.getFile(), employees);
    }

    @GetMapping("/active")
    public ResponseEntity<List<Employee>> getActiveEmployees() throws IOException {
        List<Employee> employees = readEmployeesFromFile();
        List<Employee> activeEmployees = employees.stream()
                .filter(Employee::isActive)
                .sorted(Comparator.comparing(Employee::getLastName))
                .collect(Collectors.toList());
        return ResponseEntity.ok(activeEmployees);
    }

    @GetMapping("/{id}")
    public ResponseEntity<EmployeeResponse> getEmployeeById(@PathVariable int id) throws IOException {
        List<Employee> employees = readEmployeesFromFile();
        Employee employee = employees.stream()
                .filter(e -> e.getId() == id)
                .findFirst()
                .orElseThrow(() -> new NoSuchElementException("Employee not found"));

        List<Employee> directReports = employees.stream()
                .filter(e -> employee.getDirectReports().contains(e.getId()))
                .collect(Collectors.toList());

        return ResponseEntity.ok(new EmployeeResponse(employee, directReports));
    }

    @GetMapping("/hired")
    public ResponseEntity<List<Employee>> getEmployeesByHireDateRange(
            @RequestParam String startDate, @RequestParam String endDate) throws IOException {
        List<Employee> employees = readEmployeesFromFile();
        LocalDate start = LocalDate.parse(startDate, formatter);
        LocalDate end = LocalDate.parse(endDate, formatter);

        List<Employee> filteredEmployees = employees.stream()
                .filter(e -> {
                    LocalDate hireDate = LocalDate.parse(e.getHireDate(), formatter);
                    return !hireDate.isBefore(start) && !hireDate.isAfter(end);
                })
                .sorted(Comparator.comparing(Employee::getHireDate).reversed())
                .collect(Collectors.toList());
        return ResponseEntity.ok(filteredEmployees);
    }

    @PostMapping("/add")
    public ResponseEntity<Employee> addEmployee(@RequestBody Employee employee) throws IOException {
        List<Employee> employees = new ArrayList<>(readEmployeesFromFile());
        if (employees.stream().anyMatch(e -> e.getId() == employee.getId())) {
            throw new IllegalArgumentException("Employee with this ID already exists");
        }
        employees.add(employee);
        writeEmployeesToFile(employees);
        return ResponseEntity.ok(employee);
    }

    @PostMapping("/deactivate/{id}")
    public ResponseEntity<Employee> deactivateEmployee(@PathVariable int id) throws IOException {
        List<Employee> employees = readEmployeesFromFile();
        Employee employee = employees.stream()
                .filter(e -> e.getId() == id)
                .findFirst()
                .orElseThrow(() -> new NoSuchElementException("Employee not found"));
        employee.setActive(false);
        writeEmployeesToFile(employees);
        return ResponseEntity.ok(employee);
    }
}
