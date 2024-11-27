# React Admin Panel Project

This is a React-based Admin Panel project built with React 18.3.1 and Node.js 20.9.0. The project is structured to include various components for managing users and other administrative tasks.

## Prerequisites

Before you start, ensure that you have the following installed:

- **Node.js** (version 20.9.0)
- **npm** (comes with Node.js, version 9.0.0 or higher)


## Installation Steps

### 1. Install Node.js and npm

Before you start, you need to have **Node.js** (which comes with **npm**) installed on your system.

#### For Windows/macOS/Linux:

1. **Download and Install Node.js**:
   - Visit the official Node.js website: [https://nodejs.org/](https://nodejs.org/)
   - Download the **Current** version (which should be **20.9.0** or higher).
   - Follow the installation instructions:
    - For **Windows**: Download the `.msi` installer and run it.
     - For **macOS**: Download the `.pkg` installer and run it.
     - For **Linux** (Ubuntu/Debian-based):
       ```bash
        curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
        sudo apt-get install -y nodejs
       ```

2. **Verify Installation**:
   After installation, open a terminal or command prompt and run the following commands to verify the installation:
   
        ```bash
         node -v
         npm -v

## Clone the Repository 
    git clone <https://github.com/AnandhuU7/admin_dashboard>
    cd <admin_dashboard>

## Install the Required Dependencies:
    npm install

## Start the Development Server
    npm start

    The app will be available at http://localhost:3000


## Explanation

## node_modules/
Contains all the installed dependencies for the project. This folder is automatically generated when you run npm install and should not be manually modified.

## public/
Contains static assets that are directly served by the web server. Important files here include:

## index.html:
The main HTML template for the React application.
Static assets like icons, logos, and the favicon.

## src/
Contains all the source code for the React application. This is where you’ll work with components, pages, and application logic.

## Subdirectories and Files in src/:
## assets/: 
Stores images, icons, and other static files used across the app.

## components/: 
Reusable UI components used throughout the app. Each component is a modular unit of functionality and display. Key components include:

   AddNew.js: A button component for triggering the addition of new entries.
    CreateUser.js: A form component used for creating new user entries.
    DeleteModal.js: A modal dialog that confirms the deletion of an item.
    EditModal.js: A modal dialog used for editing existing data (e.g., user details).
    Header.js: The header section of the app, typically containing navigation and logos.
    SearchButton.js: A button component to trigger the search functionality.
    Sidebar.js: A sidebar navigation component, typically used for admin panels.
    
## pages/:
 Contains the pages for your application. Each page represents a distinct view or route within the app.

AdminPanelPage.js: The main page of the admin panel, typically containing user management, settings, and other admin features.
## styles/:
Contains the CSS or SCSS files for styling the components. This includes global styles as well as component-specific styles.

## api.js:
 Contains functions to handle API calls. This file manages the fetching of data from external servers or services.

## App.css:
 Contains global styles that are applied across the entire app, ensuring a consistent look and feel.

## package.json
Lists all the dependencies, scripts, and metadata for the project. It defines which packages are required, available scripts (e.g., start, build, test), and other important configuration details.

## package-lock.json
This file ensures that the exact versions of dependencies are installed across different environments. It locks down the version of each installed package to prevent inconsistencies between different developers' environments.

## Admin Dashboard Project
This project is an Admin Dashboard application where an admin can manage users, assign roles, and handle user permissions. The system allows the admin to perform actions such as viewing, editing, deleting users, and assigning roles to users. Additionally, the admin can define and modify roles and permissions, providing fine-grained control over user access and actions within the application.