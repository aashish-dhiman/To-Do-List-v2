# To-Do-List-v2

This is a To-Do List project built with Node.js, Express.js, and MongoDB, using the Mongoose library for database integration.
The project allows users to create custom to-do lists by adding custom routes to the website's URL. Users can add tasks, delete tasks, and manage their to-do lists.

## Prerequisites

To run this project locally, you need to have the following software installed on your machine:

- Node.js: [Download and install Node.js](https://nodejs.org/en/download/)
- MongoDB: [Download and install MongoDB](https://www.mongodb.com/try/download/community)

## Installation

1. Clone the repository to your local machine or download the source code as a ZIP file.
2. Open a terminal and navigate to the project directory.
3. Install the project dependencies by running the following command:

   ```
   npm install
   ```

## Configuration

Before running the project, you need to configure the database connection. Follow these steps:

1. Create a MongoDB Atlas account or set up a local MongoDB instance.
2. Obtain the MongoDB connection URI, which should look similar to the following:

   ```
   mongodb+srv://<username>:<password>@<cluster-url>/<database-name>?retryWrites=true&w=majority
   ```

3. Open the `app.js` file in the project directory.
4. Replace `<YOUR_MONGODB_URL>` in the following line with your MongoDB connection URI:

   ```javascript
   const mongodbURL = '<YOUR_MONGODB_URI>';
   ```

## Usage

To run the project, follow these steps:

1. Open a terminal and navigate to the project directory.
2. Start the application by running the following command:

   ```
   node app.js
   ```

3. Open a web browser and visit `http://localhost:3000` to access the application.

## Custom Routes

By default, the project provides a `/` route for the main to-do list. However, you can create custom routes by appending a new route name to the website's URL.
For example, to create a custom route named `work`, you would visit `http://localhost:3000/work`. Each custom route will have its own separate to-do list.

## Adding Tasks

To add a new task to a to-do list, follow these steps:

1. Navigate to the desired route, either the main route or a custom route.
2. Enter the task description in the input field provided.
3. Click the "Add" button to add the task to the list.
4. The new task will appear in the list below.

## Deleting Tasks

To delete a task from a to-do list, follow these steps:

1. Navigate to the desired route, either the main route or a custom route.
2. Check the "Checkbox" button left to the task you want to remove.
3. The task will be removed from the list.

## Templates

This project uses the EJS templating engine to render dynamic web pages.
You can find the EJS template files in the `views` directory. Feel free to modify these files to customize the look and feel of the application.

## Contributing

If you want to contribute to this project, you can fork the repository, make your changes, and submit a pull request. Your contributions are highly appreciated.

## Contact

If you have any questions or suggestions regarding this project, feel free to contact me at [aashishdhiman88@gmail.com](mailto:aashishdhiman88@gmail.com).

---

That's it! You're now ready to use the To-Do List project with custom routes, database storage using MongoDB, and task management capabilities.
Enjoy organizing your tasks efficiently
