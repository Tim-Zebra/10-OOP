const Employee = require('../lib/employee');

describe('Employee', () => {
    // Creates the constructor
    const testName = 'Tim';
    const testId = '26';
    const testEmail = "test@email.com";

    const constructor = new Employee(testName, testId, testEmail);

    // Confirming constructor builds as expected.
    describe('constructor', () => {
        it('should take in name, id, email and return an object', () => {
            const desired = {name: 'Tim', id: '26', email: 'test@email.com'};
            const result = constructor;
    
            expect(result).toEqual(desired);
        });
    });

    // Confirming the values can be pulled and returned after the constructor
    describe('getName', () => {
        it('should get and return employee name', () => {
            const desired = 'Tim';
            const result = constructor.getName();
    
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

    // Gets and returns role
    describe('getRole', () => {
        it('should get and return "Employee"', () => {
            const desired = 'Employee';
            const result = constructor.getRole();
    
            expect(result).toEqual(desired);
        });
    });
});