Feature: Let's go to the cinema tests
    Scenario: successful choice of chair
        Given user is on "https://qamid.tmweb.ru/client/index.php" page
        When user selects row and place
        Then the selected seat "10/8" is reserved


    Scenario: successful choice of VIPchair
        Given user is on "https://qamid.tmweb.ru/client/index.php" page
        When user selects VIPchair 
        Then the selected VIPchair for "550" rubles is reserved


    Scenario: unsuccessful choice of token chair
        Given user is on "https://qamid.tmweb.ru/client/index.php" page
        When user selects and reserved chair 
        Then user sees an inactive button and seat