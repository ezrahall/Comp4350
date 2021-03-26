# Test Steps and Acceptance Criteria
In this document the steps are listed for each user story such that, if the steps are executed and no problems are found, the story is considered finished.
Organized by features, each feature has all user story tests listed with their steps and acceptance criteria.

## Features
## Main App
1. App is launched
2. Enter address page is shown
3. Please Enter Your Address is displayed

**Acceptance Criteria:** Please Enter Your Address is displayed

## Discover Restaurants
### Test: Address Page Test With Working Address
1. Mock the addresses gotten by address service, page is rendered
2. Get User Address page
3. Check starting page content
4. Type into input '66 Chance'
5. Make sure input '66 Chance' is displayed in input field
6. Wait for suggestions
7. Select address from selections '66 Chancelor Drive'
8. See if you can click the submit button

**Acceptance Criteria:** Address is selected and 'Find Restaurants Nearby' button can be pressed

### Test: Address Page Test With Bad Address
1. Mock the addresses gotten by address service, page is rendered
2. Get User Address page
3. Check starting page content
4. Type into input '66 Chance'
5. Make sure input '66 Chance' is displayed in input field
6. Wait for suggestions
7. Click submit button without selecting valid address
8. Check if button disabled

**Acceptance Criteria:** 'Please choose an address from one of the options' is displayed

### Test: Browse Restaurants
1. Mock store with valid address
2. Mock restaurants and adding restaurants
3. Get Home page
4. Check R1 page is displayed
5. Click 'Show More'
6. Check R2 page is displayed

**Acceptance Criteria:** R1 and R2 pages show resturants

### Test: Filter Restaurants
1. Mock store with valid address
2. Mock restaurants and adding restaurants
3. Get Home page
4. Check R1 page is displayed
5. Mock filtered restaurants
6. Click 'Sweet' filter
7. Check R3 page is displayed

**Acceptance Criteria:** Search bar displays 'Search Results For: Sweet'

### Test: Search Restaurants By Tag
1. Mock store with valid address
2. Mock restaurants and adding restaurants
3. Get Home page
4. Check R1 page is displayed
5. Mock filtered restaurants
6. Change tag to be 'Sweet' and submit input
7. Check R3 page is displayed

**Acceptance Criteria:** Search bar displays 'Search Results For: Sweet'

### Test: Search Restaurants By Name
1. Mock store with valid address
2. Mock restaurants and adding restaurants
3. Get Home page
4. Check R1 page is displayed
5. Mock filtered restaurants
6. Search by name for R3 restaurants
7. Check R3 page is displayed

**Acceptance Criteria:** Search bar displays 'Search Results For: R3'

## Account Management
### Test: Sign Up For Account Valid Values Customer
1. Mock store with valid address and invalid user
2. Get Login page
3. Click 'Sign Up'
4. Input 'John Smith' in name field
5. Input 'johnsmith@test.com' in email field
6. Enter password
7. Confirm password
8. Click 'Sign Up'

**Acceptance Criteria:** Store state is now 'AUTH_START' and account has been created

### Test: Sign Up For Account Invalid Name Customer
1. Mock store with valid address and invalid user
2. Get Login page
3. Click 'Sign Up'
4. Input 'johnsmith@test.com' in email field
5. Click 'Sign Up'

**Acceptance Criteria:** Error displays 'Name Required'

### Test: Sign Up For Account Invalid Email Customer
1. Mock store with valid address and invalid user
2. Get Login page
3. Click 'Sign Up'
4. Input 'John Smith' in name field
5. Click 'Sign Up'

**Acceptance Criteria:** Error displays 'Email Required'

### Test: Sign Up For Account Invalid Password Customer
1. Mock store with valid address and invalid user
2. Get Login page
3. Click 'Sign Up'
4. Input 'John Smith' in name field
5. Input 'johnsmith@test.com' in email field
6. Click 'Sign Up'

**Acceptance Criteria:** Error displays 'Password must Be at least 4 characters'

### Test: Sign Up For Account Invalid Confirm Password Customer
1. Mock store with valid address and invalid user
2. Get Login page
3. Click 'Sign Up'
4. Input 'John Smith' in name field
5. Input 'johnsmith@test.com' in email field
6. Enter password
7. No confirm password
8. Click 'Sign Up'

**Acceptance Criteria:** Error displays 'Make sure passwords match'

### Test: Sign In Valid Customer
1. Mock store with valid address and invalid user
2. Get Login page
3. Input 'johnsmith@test.com' in email field
4. Enter password
5. Click 'Sign In'

**Acceptance Criteria:** Store state is now 'AUTH_START' and login is successful

### Test: Sign In Invalid Email Customer
1. Mock store with valid address and invalid user
2. Get Login page
3. Enter password
4. Click 'Sign In'

**Acceptance Criteria:** Error displays 'Email Required'

### Test: Sign In Invalid Password Customer
1. Mock store with valid address and invalid user
2. Get Login page
3. Input 'johnsmith@test.com' in email field
4. Click 'Sign In'

**Acceptance Criteria:** Error displays 'Password Required'

### Test: Change Password
1. Mock sign in with valid credentials
2. Mock store with valid address
3. Get Password component
4. Input new password into password input field
5. Click 'Change Password'

**Acceptance Criteria:** Store state is now 'AUTH_START' and password change is successful

### Test: Edit Account Info
1. Mock sign in with valid credentials
2. Mock store with valid address
3. get Profile page
4. Wait for Account Info to be displayed
5. Click 'Edit'
6. Change name to new name
7. Change email to new email
8. Click 'Update'
9. Verify new name has been inputed successfully
10. Verify new email has been inputed successfully

**Acceptance Criteria:** Store state is now 'AUTH_START' and account has been updated with new name and email

## Contact Tracing
### Test: Confirm Report
1. Mock sign in with valid credentials
2. Mock store with valid address
3. Get Restaurant Details page 
4. Open report component
5. Clear Date and Time
6. Open Calendar
7. Open Month
8. Click 'January'
9. Click '1'
10. Click 'Submit Report'
11. Wait for report modal to open
12. Verify Date, Time and Restaurant Name
13. Click 'Confirm'
14. Wait for confirm modal to open
15. Click 'OK'
16. Wait for modal to close

**Acceptance Criteria:** Confirmation modal opens after report is successfully submited

### Test: Cancel Report
1. Mock sign in with valid credentials
2. Mock store with valid address
3. Get Restaurant Details page
4. Open report component
5. Clear Date and Time
6. Open Calendar
7. Open Month
8. Click 'January'
9. Click '1'
10. Click 'Cancel'
11. Wait for modal to close

**Acceptance Criteria:** Confirmation modal is NOT displayed and report modal is closed after successful cancelation

### Test: Report Invalid Date
1. Mock sign in with valid credentials
2. Mock store with valid address
3. Get Restaurant Details page
4. Open report component
5. Clear Date and Time
6. Click 'Submit Report'
7. Verify invalid date
8. Verfify report modal is still displayed 
9. Click 'Cancel'

**Acceptance Criteria:** Report modal stays open and confirm report button does not work 

## Staff Management
### Test: Get Staff Details
1. Mock response from axios post request
2. Open Staff Page
3. Wait for employee information to load
4. Check that request for employee information was made only once
5. Check that every employee information loads in and has no duplication

**Acceptance Criteria:** All employee information shows up in a table with their ID, Name, Email and Actions that can be performed for each employee

### Test: Add One New Staff Member
1. Mock initial response from axios post request to load in initial employee data
2. Mock response from axios post request to load employee information after new employee is added
3. Open Staff Page
4. Wait for employee information to load
5. Check that request for employee information was made only once
6. Check that every employee information loads in and has no duplication
7. Check that new employee to be added does not exist yet
8. Click on 'Add New Staff Member' 
9. Pop up opens to enter new employee information
10. Input New employee name 'James Does' into Staff Name field
11. Input New employee email 'jamesd@test.com' into Staff Email field
12. Click on 'Create'
13. Wait for New employee information to load
14. Check that new employee information is added to table

**Acceptance Criteria:** New employee information is loaded into employee table after creation

### Test: Edit a Staff Member
1. Mock initial response from axios post request to load in initial employee data
2. Mock response from axios post request to load employee information after employee is editted
3. Open Staff Page
4. Wait for employee information to load
5. Check that request for employee information was made only once
6. Check that every employee information loads in and has no duplication
7. Check that new employee to be added does not exist yet
8. Click on the actions field on the employee row to be editted
9. Click on 'Edit' 
10. Pop up opens to edit employee information
11. Edit employee name from 'James Doe' to 'Jameson Doe'
12. Edit employee email from 'jamesd@test.com' to 'jamesond@test.com'
13. Click on 'Update'
14. Wait for New employee information to load
15. Check that employee with name 'Jameson Doe' is in the table
16. Check that employee with name 'James Doe' is in not the table

**Acceptance Criteria:** Editted employee information is loaded into employee table without craeting a new employee
 
 ### Test: Delete a Staff Member
1. Mock initial response from axios post request to load in initial employee data
2. Mock response from axios post request to load employee information after employee is removed
3. Open Staff Page
4. Wait for employee information to load
5. Check that request for employee information was made only once
6. Check that every employee information loads in and has no duplication
7. Check that new employee to be added does not exist yet
8. Click on the actions field on the employee row to be removed
9. Click on 'Delete' 
10. Click on 'Continue' on the pop up that shows to confirm deletion of employee
11. Wait for New employee information to load
12. Check that deleted employee information is not present in table

**Acceptance Criteria:** Employee information isn't loaded into employee table after deletion

### Test: Add a Staff Member twice
1. Mock initial response from axios post request to load in initial employee data
2. Mock response from axios post request to load employee information after new employee is added
3. Open Staff Page
4. Wait for employee information to load
5. Check that request for employee information was made only once
6. Check that every employee information loads in and has no duplication
7. Check that new employee to be added does not exist yet
8. Click on 'Add New Staff Member' 
9. Pop up opens to enter new employee information
10. Input New employee name 'James Does' into Staff Name field
11. Input New employee email 'jamesd@test.com' into Staff Email field
12. Click on 'Create'
13. Wait for New employee information to load
14. Check that new employee information is added to table
15. Click on 'Add New Staff Member' 
16. Pop up opens to enter new employee information
17. Input the same employee name 'James Does' into Staff Name field
18. Input the same employee email 'jamesd@test.com' into Staff Email field
19. Click on 'Create'
20. Wait for New employee information to load
21. Check that the employee information is only shown on the table once

**Acceptance Criteria:** Employee information is loaded into employee table only once after adding twice 

## Restaurant Tag Management
### Test: Get all restaurant tags
1. Mock response from axios post request
2. Open Tag Page
3. Check that all tags appear once to make sure only 'Cuisine Categories' tags are shown
4. Wait for restaurant tags to load
5. Check that only restaurant tags that are loaded are shown twice on the screen

**Acceptance Criteria:** All restaurant tag data loads into the 'My Tag Categories' area


### Test: Update Tags with 'Spicy' tag
1. Mock initial response from axios post request to load in initial restaurant tag data
2. Mock response from axios post request to load restaurant tag data after tags are updated
3. Open Tag Page
4. Check that all tags appear once to make sure only 'Cuisine Categories' tags are shown
6. Wait for restaurant tags to load
7. Check that only restaurant tags that are loaded are shown twice on the screen
8. Click on the 'spicy' tag from the 'Cuisine Categories'
9. Wait for the new restaurant tag data to be loaded
10. Check that the 'spicy' tag appears twice

**Acceptance Criteria:** Updated restaurant tag data loads into the 'My Tag Categories' area with the newly added tag


### Test: Add Spicy tag only once  
1. Mock initial response from axios post request to load in initial restaurant tag data
3. Open Tag Page
4. Check that the 'spicy' tag appears once to make sure only 'Cuisine Categories' tags are shown
5. Click on the 'spicy' tag to add it to restaurant tag data
6. Wait for the new restaurant tag data to be loaded
7. Check that the 'spicy' tag appears twice, one for the 'Cuisine Categories' and 'My Tag Categories'
8. Click on the 'spicy' tag in the 'Cuisine Categories' to add it to restaurant tag data again
9. Wait for the new restaurant tag data to be loaded
10. Check that the 'spicy' tag appears twice, one for the 'Cuisine Categories' and 'My Tag Categories'

**Acceptance Criteria:** Updated restaurant tag only shows up once in the 'My Tag Categories' area after being added twice

### Test: Remove Spicy Tag from restaurant tags
1. Mock initial response from axios post request to load in initial restaurant tag data
2. Mock response from axios post request to load restaurant tag data after tag is removed
3. Open Tag Page
4. Check that all tags appear once to make sure only 'Cuisine Categories' tags are shown
6. Wait for restaurant tags to load
7. Check that only restaurant tags that are loaded are shown twice on the screen
8. Click on the 'spicy' tag from the 'My Tag Categories'
9. Wait for the new restaurant tag data to be loaded
10. Check that the 'spicy' tag doesn't appears in the 'My Tag Categories' area

**Acceptance Criteria:** Removed restaurant tag data doesn't load into the 'My Tag Categories' area after it was removed

### Test: Remove all Tags from restaurant tags list
1. Mock initial response from axios post request to load in initial restaurant tag data
2. Mock response from axios post request to load restaurant tag data after each tag is removed
3. Open Tag Page
4. Check that all tags appear once to make sure only 'Cuisine Categories' tags are shown
6. Wait for restaurant tags to load
7. Check that only restaurant tags that are loaded are shown twice on the screen
8. Click on the 'spicy' tag from the 'My Tag Categories'
9. Wait for the new restaurant tag data to be loaded
10. Check that the 'spicy' tag doesn't appears in the 'My Tag Categories' area
11. Click on the 'sweet' tag from the 'My Tag Categories'
12. Wait for the new restaurant tag data to be loaded
13. Check that the 'sweet' tag doesn't appears in the 'My Tag Categories' area
14. Click on the 'wraps' tag from the 'My Tag Categories'
15. Wait for the new restaurant tag data to be loaded
16. Check that the 'wraps' tag doesn't appears in the 'My Tag Categories' area
17. Click on the 'korean' tag from the 'My Tag Categories'
18. Wait for the new restaurant tag data to be loaded
19. Check that the 'korean' tag doesn't appears in the 'My Tag Categories' area
20. Check that all tags in the 'My Tag Categories' area are empty

**Acceptance Criteria:** All restaurant tags initially loaded are removed and restaurant has no tag data

## Placing and Tracking Orders