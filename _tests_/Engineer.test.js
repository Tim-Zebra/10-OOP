const Engineer = require("../lib/engineer");

describe('Engineer', () => {
    // Creates the constructor
    const testName = 'Tim';
    const testId = '26';
    const testEmail = "test@email.com";
    const testGithub = 'https://github.com/Tim-Zebra';

    const constructor = new Engineer(testName, testId, testEmail, testGithub);

    // Confirming constructor builds as expected.
    describe('constructor', () => {
        it('should take in name, id, email and return an object', () => {
            const desired = {name: 'Tim', id: '26', email: 'test@email.com', github: 'https://github.com/Tim-Zebra'};
            const result = constructor;
    
            expect(result).toEqual(desired);
        });
    });

    // Confirming the values can be pulled and returned after the constructor
    // Gets and returns GitHub
    describe('getGitHub', () => {
        it('should get and return Engineer\'s GitHub page', () => {
            const desired = 'https://github.com/Tim-Zebra';
            const result = constructor.getGitHub();
    
            expect(result).toEqual(desired);
        });
    });

    // Gets and returns role
    describe('getRole', () => {
        it('should get and return "Engineer"', () => {
            const desired = 'Engineer';
            const result = constructor.getRole();
    
            expect(result).toEqual(desired);
        });
    });
});