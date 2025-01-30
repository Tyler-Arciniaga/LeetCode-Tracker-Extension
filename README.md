# LeetCode Tracker Chrome Extension

A Chrome extension that helps you log LeetCode questions and track your progress directly in Google Sheets. With user authentication, the extension connects to your Google account, allowing you to securely store your data and interact with a custom Google Sheet for logging your LeetCode questions.

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

## Installation

1. Clone this repository to your local machine:
   ```bash
   git clone https://github.com/yourusername/leetcode-tracker-extension.git