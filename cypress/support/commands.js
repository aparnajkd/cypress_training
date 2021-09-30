// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
Cypress.Commands.add('login', () => 
{ const username = Cypress.env('googleSocialLoginUsername');
 const password = Cypress.env('googleSocialLoginPassword');
  const loginUrl = Cypress.env('loginUrl'); 
  const cookieName = Cypress.env('cookieName'); 
  
  
  const socialLoginOptions = {
    username:username,
    password:password,
    loginUrl:loginUrl,  // Login URL represents the page of webpage that has login button
    headless:false,  // If value is false, plugin shows chrome window to you while test case is executing. Else window wil be hidden and whole process will be completed in background.
    loginSelector: '.custom-btn-primary', // Login button selector
    logs: true, // shows all the logs
    isPopup: false,
    postLoginSelector: '.m-b' // After login, which button/link should be clicked
  };
  
  cy.clearCookies();
  return cy.task('GoogleSocialLogin', socialLoginOptions)  // We can execute all the events using cy.task. checkout more info [here](https://docs.cypress.io/api/commands/task)
    .then(({ cookies }) => {
      cy.clearCookies();
  
      const cookie = cookies
        .filter((cookie) => cookie.name === cookieName)
        .pop();
  
      if (cookie) {
        cy.setCookie(cookie.name, cookie.value, { // Portal stores token in a cookie named "geekyants_session". You can get this info directly by checking webpage storage tab or from developers.
          domain: cookie.domain, // If this cookie value is set, portal understands that user is logged in and let's user access authorised pages.
          expiry: cookie.expires,
          httpOnly: cookie.httpOnly,
          path: cookie.path,
          secure: cookie.secure
        });
  
        Cypress.Cookies.defaults({  // Check out more info on cookies[ here](https://docs.cypress.io/api/cypress-api/cookies) 
          preserve: cookieName
        })}})})