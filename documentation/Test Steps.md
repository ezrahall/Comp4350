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

## Placing and Tracking Orders