import Home from "./page";

describe('<Home />', () => {
    it('Should render all content', () => {
        cy.mount(<Home />);

        cy.get('h1').contains('Hello');
    })
})