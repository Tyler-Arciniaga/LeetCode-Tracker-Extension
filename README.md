# LeetCode Tracker Chrome Extension

A Chrome extension that helps you log LeetCode questions and track your progress directly in Google Sheets. The extension automatically populates a form with details from the LeetCode page, allowing you to fill in personal notes and progress before submitting it to securely store your data in a custom Google Sheet. With user authentication, it connects to your Google account, ensuring your information is safely stored and easily accessible.

## Features

- **Log LeetCode Questions**: Capture details such as question name, difficulty, concepts, and personal notes directly from LeetCode.
- **Google Sheets Integration**: Store and manage logged data in a Google Sheet, linked to your Google account.
- **User Authentication**: Secure login via Google OAuth to connect and sync with your Google Sheets.
- **Customizable Settings**: Change the target Google Spreadsheet ID and adjust the popup window appearance via a settings page.

## Technologies Used

- **Frontend**: 
  - HTML, CSS, JavaScript (Chrome Extension APIs)
  - User interface for the popup window and settings page
- **Backend**: 
  - Google Sheets API for storing and retrieving question data
  - JavaScript to handle API requests and form submissions
- **Authentication**: Google OAuth for user authentication to interact with Google Sheets

## How It Works

1. **User Authentication**: The extension prompts the user to sign in using their Google account. Once authenticated, the extension gains access to their Google Sheets for logging data.
2. **Logging Questions**: Users can log LeetCode questions via a form in the popup, capturing question details such as:
   - Question ID/Name
   - Difficulty (Easy, Medium, Hard)
   - Concepts (e.g., Dynamic Programming, Recursion)
   - Personal Difficulty Rating
   - Notes/Comments
3. **Settings Page**: The settings page allows users to change:
   - The Google Spreadsheet ID where data is logged.
   - Appearance settings for the popup window.
  
## Video Demonstration:
![LeetLogger-demo](https://github.com/user-attachments/assets/b9001622-28c5-478b-872f-36cbd050e699)


## Try It For Yourself

1. Clone this repository to your local machine:
   ```bash
   git clone https://github.com/yourusername/leetcode-tracker-extension.git
2. Be sure to enter the Google Sheets spreadsheet ID exactly as shown in the video demonstration to link it with the extension for sending LeetCode problem data.
3. Enjoy!
