import chai from 'chai';

describe('Sample Test File To Print Hello World', ()=>{
 it('should print out hello world', () => {
   let welcomeMsg = "Hello World";
   chai.expect(welcomeMsg).to.be.a('string');
 });
})
