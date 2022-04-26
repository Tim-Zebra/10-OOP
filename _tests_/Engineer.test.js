const Engineer = require("../lib/Engineer.js");

const Employee = require('../lib/Employee.js');

describe('Employee', () => {
    // Creates the constructor
    const testName = 'Tim';
    const testId = '26';
    const testEmail = "test@email.com"

    const constructor = new Employee(testName, testId, testEmail);

    // Confirming the values can be pulled and returned after the constructor
    describe('getName', () => {
        it('should get and return employee name', () => {
            const desired = 'Tim';
            const result = constructor.getName(test);
    
            expect(result).toEqual(desired);
        });
    });

    // Gets and returns id
    describe('getId', () => {
        it('should get and return employee id', () => {
            const desired = '26';
            const result = constructor.getId();
    
            expect(result).toEqual(desired);
        });
    });

    // Gets and returns email
    describe('getEmail', () => {
        it('should get and return employee email', () => {
            const desired = 'test@email.com';
            const result = constructor.getEmail();
    
            expect(result).toEqual(desired);
        });
    });

    // Gets and returns Role
    describe('getRole', () => {
        it('should get and return role', () => {
            const desired = 'Employee';
            const result = constructor.getRole();
    
            expect(result).toEqual(desired);
        });
    });
});