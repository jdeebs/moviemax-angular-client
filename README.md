# MovieMax Angular App

## Project Overview

The **MovieMax Angular App** is a single-page, responsive application built using Angular. It allows users to browse movies and access detailed information about selected movies, directors, and genres. This app interfaces with an existing server-side API and database. The client-side app is built with Angular v16, providing a seamless experience with modern features like routing and reusable components.

## Table of Contents

- [Project Overview](#project-overview)
- [Features](#features)
- [User Stories](#user-stories)
- [Setup and Installation](#setup-and-installation)
- [Usage](#usage)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [License](#license)

## Features

### Views & Features

- **Welcome View:**
  - Allows users to log in or register an account.
  
- **Main Movie View:**
  - Displays all movies once a user is authenticated.
  - Movies are presented in card format with basic details, including cast, genre, director, and synopsis.
 
- **Profile View:**
  - Displays all user information.
  - Allows users to update or delete their account.
  - Allows users to logout.

### Additional Features

- Built using **Angular Material** for UI components.
- Utilizes **Angular Routing** to navigate between views.

## User Stories

- **As a user**, I want to receive information about movies, directors, and genres so that I can learn more about films I’m interested in.
- **As a user**, I want to create a profile and log in so that I can save data about my favorite movies.

## Setup and Installation

To set up the **MovieMax Angular App** on your local machine, follow these steps:

1. **Clone the repository:**

    ```sh
    git clone https://github.com/your-username/moviemax-angular-client.git
    ```

2. **Navigate to the project directory:**

    ```sh
    cd moviemax-angular-client
    ```

3. **Install dependencies:**

    Ensure you have the latest version of Node.js and npm installed.

    ```sh
    npm install
    ```

4. **Run the application:**

    ```sh
    ng serve
    ```

    Open your browser and navigate to `http://localhost:4200`.

## Usage

1. Open the application and log in or register as a new user.
2. Browse through the list of movies available.
3. Click on the Genre, Director, or Synopsis buttons to learn more about relevant details.
4. Click on the favorite icon to add/remove a movie from favorites.
5. Navigate to Profile in the navbar to view or update user information.
6. Logout from the navbar.

## Deployment

The **MovieMax Angular App** is deployed [here](https://jdeebs.github.io/moviemax-angular-client).

## Contributing

Contributions are welcome! Please fork the repository and submit a pull request with your changes. Make sure to follow the coding standards and provide relevant documentation and comments using Typedoc and JSDoc.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
