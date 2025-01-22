# Social Media Website

This project is a simple social media platform built using **Pure JavaScript** and **Tailwind CSS**. The application includes core features like user authentication, posting, commenting, and interacting with a RESTful API for data handling.

## Features

### Pages
1. **Home Page**
   - Displays a feed of all posts from users.
   - Users can view posts, like them, and navigate to detailed views.

2. **Profile Page**
   - Shows user-specific data including their posts and profile information.
   - Users can edit their profile details.

3. **Post Details Page**
   - Displays detailed information about a specific post.
   - Allows users to view and add comments.

4. **Authentication Pages**
   - **Login Page**: Allows existing users to sign in.
   - **Sign-Up Page**: Enables new users to register for an account.

### Core Functionality
- **Post Management**
  - Users can create new posts, edit their existing posts, or delete them.

- **Comment Management**
  - Users can add comments to posts, edit their comments, or delete them.

- **User Authentication**
  - Includes login, logout, and sign-up functionality.
  - Ensures secure access to user-specific data.

- **API Integration**
  - Handles all data interactions through a RESTful API.
  - Supports CRUD operations for posts and comments.

## Technologies Used
- **JavaScript**: Core programming language for application logic.
- **Tailwind CSS**: For styling the application and ensuring a responsive design.
- **RESTful API**: To handle data storage and retrieval.

## How to Run the Project

1. Clone the repository:
   ```bash
   git clone <repository-url>
   ```

2. Navigate to the project directory:
   ```bash
   cd social-media-website
   ```

3. Open the `index.html` file in a browser to run the application:
   ```bash
   open index.html
   ```

## Folder Structure
```
project-root/
├── index.html        # Entry point for the app
├── css/
│   └── styles.css    # Compiled Tailwind CSS styles
├── js/
│   ├── main.js       # Main application logic
│   ├── api.js        # Handles API requests
│   ├── auth.js       # Authentication logic
│   ├── posts.js      # Post-related functionality
│   └── comments.js   # Comment-related functionality
├── assets/
│   └── images/       # Images and icons
└── README.md         # Project documentation
```

## Future Improvements
- Add real-time updates for posts and comments.
- Include support for media uploads (e.g., images/videos in posts).
- Implement advanced authentication methods (e.g., OAuth).
- Enhance the UI with animations and transitions.

## License
This project is open-source and available under the [MIT License](LICENSE).
