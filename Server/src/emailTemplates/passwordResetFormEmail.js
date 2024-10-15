export const PASSWORD_RESET_FORM_TEMPLATE = (resetLink) => `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Reset Your Password</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      background-color: #f4f4f4;
      color: #333;
      max-width: 600px;
      margin: 0 auto;
      padding: 20px;
    }
    h1 {
      text-align: center;
      color: #4CAF50;
    }
    .form-container {
      background-color: #fff;
      padding: 20px;
      border-radius: 5px;
      box-shadow: 0 2px 5px rgba(0,0,0,0.1);
      margin-top: 20px;
    }
    .form-group {
      margin-bottom: 15px;
    }
    .form-group label {
      display: block;
      margin-bottom: 5px;
    }
    .form-group input {
      width: 100%;
      padding: 10px;
      border: 1px solid #ccc;
      border-radius: 5px;
    }
    .form-group button {
      background-color: #4CAF50;
      color: white;
      border: none;
      padding: 10px;
      border-radius: 5px;
      cursor: pointer;
      width: 100%;
    }
    .form-group button:hover {
      background-color: #45a049;
    }
    .message {
      text-align: center;
      margin-top: 20px;
      color: #888;
      font-size: 0.9em;
    }
  </style>
</head>
<body>
  <h1>Reset Your Password</h1>
  <div class="form-container">
    <form id="resetPasswordForm" method="POST" action="/auth/reset-password">
      <input type="hidden" name="resetToken" value="{{resetToken}}"> <!-- Add the reset token dynamically -->
      <div class="form-group">
        <label for="password">New Password:</label>
        <input type="password" id="password" name="password" required>
      </div>
      <div class="form-group">
        <label for="repeatPassword">Confirm New Password:</label>
        <input type="password" id="repeatPassword" name="repeatPassword" required>
      </div>
      <div class="form-group">
        <button type="submit">Reset Password</button>
      </div>
    </form>
    <div class="message">Please enter your new password and confirm it.</div>
  </div>
</body>
</html>
`;