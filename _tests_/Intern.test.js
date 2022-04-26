const Intern = require("../lib/Intern");

describe('Intern', () => {
    // Creates the constructor
    const testName = 'Tim';
    const testId = '26';
    const testEmail = "test@email.com";
    const testSchool = 'UTA';

    const constructor = new Intern(testName, testId, testEmail, testSchool);

    // Confirming constructor builds as expected.
    describe('constructor', () => {
        it('should take in name, id, email and return an object', () => {
            const desired = {name: 'Tim', id: '26', email: 'test@email.com', school: 'UTA'};
            const result = constructor;
    
            expect(result).toEqual(desired);
        });
    });

    // Confirming the values can be pulled and returned after the constructor
    // Gets and returns school
    describe('getSchool', () => {
        it('should get and return school name', () => {
            const desired = 'UTA';
            const result = constructor.getSchool();
    
            expect(result).toEqual(desired);
        });
    });
    
    // Gets and returns role
    describe('getRole', () => {
        it('should get and return "Intern"', () => {
            const desired = 'Intern';
            const result = constructor.getRole();
    
            expect(result).toEqual(desired);
        });
    });

});