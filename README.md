# Travel Tracker Project

This project is a travel tracking application designed to help users keep track of the countries they have visited. It allows users to add new countries they have visited, add new users, and view the visited countries on a map.

## Technologies Used

- **Node.js**: A JavaScript runtime environment used for building server-side applications.
- **Express.js**: A web application framework for Node.js used to create robust APIs and web applications.
- **PostgreSQL**: An open-source relational database management system used to store user data and information about visited countries.
- **SQL**: Structured Query Language used to interact with the PostgreSQL database.
- **HTML**: Hypertext Markup Language used for creating the structure of web pages.
- **CSS**: Cascading Style Sheets used for styling the HTML elements.
- **Rest API**: Use of Post, Get etc routes.

## Running the Project Locally

To run this project locally on your machine, follow these steps:

1. **Clone the Repository**: 
   ```
   git clone https://github.com/varun2123/travel-tracker.git

2. **Install Dependencies**: 
   Navigate to the project directory and install the required dependencies using npm:
   ```
   cd travel-tracker
   npm install
   ```

3. **Set Up PostgreSQL Database**:
   - Install PostgreSQL if you haven't already: [PostgreSQL Downloads](https://www.postgresql.org/download/)
   - Create a new database named `world_capitals`.
   - Modify the `pg.Client` configuration in `app.js` to match your PostgreSQL setup (e.g., username, password, host, port) or you can make changes in the code to match your existing configuration.
   - Import the csv files and create tables according to them.

4. **Run the Application**: 
   ```
   npm start
   ```

5. **Access the Application**: 
   Open your web browser and navigate to `http://localhost:3000` to access the travel tracker application.

## Usage

- Upon accessing the application, you will see a world map with countries highlighted in default colors.
- Each user is assigned a specific color.
- As a user adds countries they have visited, the color of those countries on the map changes to match the user's assigned color.
- You can add a new country you have visited by typing its name in the input field and clicking the "Add" button.
- You can switch between users.
- To add a new user, click on the "New User" button, fill in the details, and click "Create User".

## Snapshots

![Screenshot (158)](https://github.com/varun2123/Travel-Tracker/assets/116836542/ad0f2e69-7e9a-4517-8097-0b4c82038c5e)

![Screenshot (159)](https://github.com/varun2123/Travel-Tracker/assets/116836542/850bf621-dde6-437c-9e63-f8bbf88533cb)

![Screenshot (160)](https://github.com/varun2123/Travel-Tracker/assets/116836542/cd9400fa-528d-45d1-8b82-70368cdfba86)



## Future Prospect

- Adding user authentication.
- Hosting the project.
- Enhancing the UI/UX.

Ideas are also welcomed😊.

## Contributing

Contributions to this project are welcome. If you have suggestions for improvements or find any issues, please feel free to open an issue or submit a pull request.
