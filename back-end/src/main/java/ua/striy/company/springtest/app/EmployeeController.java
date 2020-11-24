package ua.striy.company.springtest.app;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/")
@CrossOrigin(origins = "http://localhost:4200")
public class EmployeeController {
    @Autowired
    private EmployeeRepository employeeRepository;

//get all employees

    @GetMapping("/employees")
    public List<Employee> getAllEmployees(){
        return employeeRepository.findAll();
    }

    @PostMapping("/employees")
    void addUser(@RequestBody Employee employee) {
        employeeRepository.save(employee);
    }

    @PutMapping("/employees/{id}")
    public  ResponseEntity<Employee>updateEmploee(@PathVariable Long id, @RequestBody Employee employeeDetalils){
        Employee employee = employeeRepository.findById(id).orElseThrow(()-> new ResourcenotFoundException("Employe not exist wirh id :" + id));
        employee.setFirstName(employeeDetalils.getFirstName());
        employee.setEmailId(employeeDetalils.getEmailId());
        employee.setLastName(employeeDetalils.getLastName());
        Employee updatedEmp = employeeRepository.save(employee);
        return  ResponseEntity.ok(updatedEmp);
    }


    @DeleteMapping("/employees/{id}")
    public ResponseEntity<Map<String,Boolean>> deletebyId(@PathVariable long id){
        Employee employee = employeeRepository.findById(id).orElseThrow(()-> new ResourcenotFoundException("Employe not exist wirh id :" + id));

        employeeRepository.delete(employee);

    Map<String,Boolean>response = new HashMap<>();
    response.put("delete",Boolean.TRUE);
        return ResponseEntity.ok(response);
    }

}
