/* eslint-disable no-unused-expressions,jest/valid-expect */
import { defaultDropDownSelectTheme as theme } from '../../../leda/components/DropDownSelect/theme';

describe('DropDownSelect', () => {
  let lastConsole;
  let stub;
  before(() => {
    cy.visit('http://localhost:9000/cypress/dropdownselect');
    cy.viewport(1600, 900)
  });

  describe('Display', () => {
    it('should render ClearButton', () => {
      cy.name('DDSDisabled')
        .parent()
        .children('.dropdownselect-clear-icon')
        .should('be.visible')
        .click()
        .name('DDSDisabled')
        .parent()
        .children('.dropdownselect-clear-icon')
        .should('not.be.visible')
    });

    it('should render placeholder', () => {
      cy.name('DDSDisabled')
        .should('have.attr', 'placeholder', 'Choose a city...')
        .click()
        .parent()
        .parent()
        .find('.suggestion-item.placeholder')
        .should('be.visible')      
        .should('have.text', 'Choose a city...')
        .click()
    });
    
    it('should render SuggestionList when isOpen', () => {
      cy.get('button')
        .contains('Toggle isOpen')
        .click()
        .name('Opened')
        .parent()
        .parent()
        .children('.suggestion-wrapper.visible')
        .should('exist')
        .children('.suggestion-list')
        .should('be.visible')
        .children('.suggestion-item')
        .should('have.length', 9)
        .parent('.suggestion-list')
        .children('.txt-bold.suggestion-item')
        .should('have.length', 5)
        .parent('.suggestion-list')
        .children('.txt-success.suggestion-item')
        .should('have.length', 3)
        .get('button')
        .contains('Toggle isOpen')
        .click()
    });

    describe('noSuggestionsRender', () => {
      it('defaultMessage', () => {
        cy.name('DDSBoundingContainerRef')
          .clear()
          .type('Z')
          .parent()
          .parent()
          .find('.suggestion-wrapper.pos-top.visible')
          .children('.nodata')
          .should('have.text', 'Ничего не найдено');
      });

      it('customMessage', () => {
        cy.name('Opened')
          .clear()
          .type('Z')
          .parent()
          .parent()
          .find('.suggestion-wrapper.visible')
          .should('have.text', 'Ничего не скажу по этому поводу');
      });
      
      it('nullMessage', () => {
        cy.name('DDSonBlur')
          .clear()
          .type('Z')
          .parent()
          .parent()
          .children('.suggestion-wrapper')
          .children('.nodata')
          .should('not.exist')
      });
    });

    it('should render loader when isLoading', () => {
      cy.get('button')
        .contains('Toggle isLoading')
        .click()
        .name('DDSBoundingContainerRef')
        .clear()
        .type('z')
        .parent()
        .parent()
        .find('.loader-container')
        .should('be.visible')
        .children('.loader-element')
        .should('be.visible')
        .get('button')
        .contains('Toggle isLoading')
        .click();
    });

    it('should be disabled when isDisabled', () => {
      cy.get('button')
        .contains('Toggle isDisabled')
        .click()
        .name('DDSDisabled')
        .should('be.disabled')
        .get('button')
        .contains('Toggle isDisabled')
        .click()
    });

    describe('itemRender', () => {
      it('bold', () => {
        cy.get('button')
          .contains('Toggle isOpen')
          .click()
          .name('Opened')
          .type('n')
          .parent()
          .parent()
          .contains('Berlin')
          .should('have.class', 'txt-bold')
          .should('not.have.class', 'txt-success')
          .get('button')
          .contains('Toggle isOpen')
          .click()
      });

      it('succes', () => {
        cy.get('button')
          .contains('Toggle isOpen')
          .click()
          .name('Opened')
          .type('n')
          .parent()
          .parent()
          .contains('Bangkok')
          .should('not.have.class', 'txt-bold')
          .should('have.class', 'txt-success')
          .get('button')
          .contains('Toggle isOpen')
          .click()
      });

      it('none', () => {
        cy.get('button')
          .contains('Toggle isOpen')
          .click()
          .name('Opened')
          .type('n')
          .parent()
          .parent()
          .contains('New-York')
          .should('not.have.class', 'txt-bold')
          .should('not.have.class', 'txt-success')
          .get('button')
          .contains('Toggle isOpen')
          .click()
      });
    });
  });

  describe('FilterRule', () => {
    it('smart', () => {
      cy.name('DDSFilterRule')
        .clear()
        .type('don')
        .parent()
        .parent()
        .find('.suggestion-item')
        .should('have.length', 1)
        .should('have.text', 'London')
        .name('DDSFilterRule')
        .clear()
        .type('don lon')
        .parent()
        .parent()
        .find('.suggestion-item')
        .should('have.length', 1)
        .should('have.text', 'London');
    });

    it('includes', () => {
      cy.get('button')
        .contains('Includes')
        .click()
        .name('DDSFilterRule')
        .clear()
        .type('don')
        .parent()
        .parent()
        .find('.suggestion-item')
        .should('have.length', 1)
        .should('have.text', 'London')
        .name('DDSFilterRule')
        .clear()
        .type('don lon')
        .parent()
        .parent()
        .children('.suggestion-wrapper')
        .children('.nodata')
        .should('be.visible');
    });

    it('startsWith', () => {
      cy.get('button')
        .contains('StartsWith')
        .click()
        .name('DDSFilterRule')
        .clear()
        .type('lon')
        .parent()
        .parent()
        .find('.suggestion-item')
        .should('have.length', 1)
        .should('have.text', 'London')
        .name('DDSFilterRule')
        .clear()
        .type('don')
        .parent()
        .parent()
        .children('.suggestion-wrapper')
        .children('.nodata')
        .should('be.visible');
    });
  });

  describe('Events', () => {
    beforeEach(() => {
      cy.visit('http://localhost:9000/cypress/dropdownselect', {
        onBeforeLoad(win) {
          stub = cy.stub(win.console, 'log', (ev) => { lastConsole = ev; });
        },
      });
    });
    it('onBlur', () => {
      cy.name('DDSonBlur')
        .clear()
        .type('London')
        .type('{downarrow}')
        .type('{enter}')
        .blur()
        .then(() => {
          expect(stub).to.be.called;
          expect(lastConsole).to.have.property('type', 'blur');
          expect(lastConsole.component).to.have.property('name', 'DDSonBlur');
          expect(lastConsole.component).to.have.property('value', 'London');
        });
    });

    it('onFocus', () => {
      cy.name('Opened')
        .focus()
        .then(() => {
          expect(stub).to.be.called;
          expect(lastConsole).to.have.property('type', 'focus');
          expect(lastConsole.component).to.have.property('name', 'Opened');
          expect(lastConsole.component).to.have.property('value', null);
        });
    });

   
  });

  describe('Interaction', () => {
    it('should clear input on clear button click', () => {
      cy.get('[name=DDSBoundingContainerRef]')
        .clear()
        .type('Paris')
        .type('{downarrow}')
        .type('{enter}')
        .parent()
        .children('.dropdownselect-clear-icon')
        .click()
        .get('[name=DDSBoundingContainerRef]')
        .should('have.value', '');
    });
}); 
    it('compareObjectsBy', () => {
      cy.name('DDSCompareObjectsBy')
        .click()
        .parent()
        .parent()
        .children('.suggestion-wrapper.visible')
        .contains('Moscow')
        .click()
        .name('DDSCompareObjectsBy')
        .click()
        .parent()
        .parent()
        .children('.suggestion-wrapper.visible')
        .find('.suggestion-item.highlighted.selected')
        .eq(0)
        .should('contain', 'Moscow')
        .parents('.suggestion-wrapper.visible')
        .find('.suggestion-item.highlighted.selected')
        .eq(1)
        .should('contain', 'Minsk')
        });

    xit('OnChange', () => {
    });

    xit('OnFilterChange', () => {
    });

    xit('sortSuggestions', () => {
    cy.name('DDSSortSuggestions')
    });

  describe('DataTypes', () => {
    xit('should render 0', () => {
      cy.get('[name=DDSShouldAllowEmpty]')
        .should('have.value', 0);
  });
});
});