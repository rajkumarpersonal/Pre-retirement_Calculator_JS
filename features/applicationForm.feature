Feature: Verifying the functionality of Pre-Retirement calculator

#applicationPage with No securityBenefits

# Scenario: To Verify Pre-retirement calculator when social security income is NO
#     Given I Launch The Browser
#     When I Open The Pre-retirement calculator
#     Then Common details of the form
#    # And Fill the additional Fields
#     And Submit the application
#     Then Validate results
#     Then Edit Info
#     Then Clear form


#applicationPage with YES securityBenefits

Scenario: To Verify Pre-retirement calculator when social security income is YES
    Given Open Pre-retirement calculator
    When Fill the Common details of the form
    Then Fill the additional details 
    And Click on the calculator
    Then Check the results
    Then Clear the application form 
        