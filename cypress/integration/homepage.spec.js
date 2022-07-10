describe('Test homepage', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  function visiblityCheck() {
    cy.get('.Panel1_container__fshdp').should('be.visible');
    cy.get('.Panel2_panelTwoContainer__VZT4a').should('be.visible');
    cy.get('.Panel3_container__rwlgO').should('be.visible');
    cy.get('.Footer_footer__primary__xIc_0').should('be.visible');
  }

  it('Show Mainnet Dashboard', () => {
    visiblityCheck();
  });

  it('Show Testnet Dashboard', () => {
    cy.get('.SelectInput_container__K8yGb').select('Testnet');
    visiblityCheck();
  });

  function checkAccountDivsVisibility() {
    cy.get('.AccountInfo_cardsContainer__FUjaL').should('be.visible');
    cy.get('.AccountDetail_details__tUWJ5').should('be.visible');
    // 'Check if QRcode generated'
    cy.get('.AccountDetail_qrCode__Hvv_G').should('be.visible');
    cy.get('.TransactionDetails_page__Old5g').should('be.visible');
  }

  it('Search for username:account', () => {
    const user_account = 'US:Interactions';
    cy.get('.SearchBar_searchInput__zCAsW').type(`${user_account}{enter}`);
    checkAccountDivsVisibility();
  });

  it('Search for account address', () => {
    const account_address =
      '8CiG14XHVz5jrgsSqNysN5dBr7N1b3bfodyAQn8LNpmr1Q2yU93';
    cy.get('.SearchBar_searchInput__zCAsW').type(`${account_address}{enter}`);
    checkAccountDivsVisibility();
  });

  it('Goto Metrics page', () => {
    cy.visit('/metrics');
    cy.contains('Signature Chains');
    cy.contains('Total Supply');
  });

  it('Goto Blocks page', () => {
    cy.visit('/blocks');
    cy.get('.Table_tbody__iBkH3').should('be.visible');
  });

  it('Goto Transactions page', () => {
    cy.visit('/transactions');
    cy.contains('Transaction ID');
  });

  it('Goto Trustlist page', () => {
    cy.visit('/trustlist');
    cy.contains('Address');
    cy.contains('Balance');
    cy.contains('Stake');
  });

  it('Goto Richlist page', () => {
    const pieChartSelector = '[id^="SvgjsCircle"]';
    cy.visit('/richlist');
    cy.get(pieChartSelector, { timeout: 10000 }).should('be.visible');
    cy.contains('Address');
    cy.contains('Balance');
    cy.contains('Stake Rate');
  });

  it('Goto Globalnames page', () => {
    cy.visit('/globalnames');
    cy.contains('Name');
  });

  it('Goto Namespaces page', () => {
    cy.visit('/namespaces');
    cy.contains('Namespace');
  });

  it('Goto Tokens page', () => {
    cy.visit('/tokens');
    cy.contains('Token Name');
    cy.contains('Max Supply');
  });

  it('Toggle dark mode', () => {
    cy.get('.ThemeMode_themeMode__tcZ2H').click();
  });
});
