const Manager = require("../lib/manager");

describe('Manager', () => {
    // Creates the constructor
    const testName = 'Tim';
    const testId = '26';
    const testEmail = "test@email.com";
    const testOfficeNum = '555-555-5555';

    const constructor = new Manager(testName, testId, testEmail, testOfficeNum);

    // Confirming constructor builds as expected.
    describe('constructor', () => {
        it('should take in name, id, email and return an object', () => {
            const desired = {name: 'Tim', id: '26', email: 'test@email.com', officeNum: '555-555-5555'};
            const result = constructor;
    
            expect(result).toEqual(desired);
        });
    });

    // Confirming the values can be pulled and returned after the constructor
    // Gets and returns role
    describe('getRole', () => {
        it('should get and return "Manager"', () => {
            const desired = 'Manager';
            const result = constructor.getRole();
    
            expect(result).toEqual(desired);
        });
    });

});