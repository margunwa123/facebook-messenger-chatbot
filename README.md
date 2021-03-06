# Facebook Messenger Chatbot

A facebook messenger chatbot for birthdays

## QuickStart
1. Download or clone this repository
2. Install all dependencies (`yarn install`) or (`npm install`)
3. Copy the .env.example to .env in the root directory
4. Add your page access token to the .env (you should setup your app first. For setup references, see [this page](https://developers.facebook.com/docs/messenger-platform/getting-started/quick-start) on the Get started section)
5. Download or use [ngrok](https://ngrok.com/) to deploy your app temporarily or deploy it using VPS or heroku
6. Copy the link provided by your service appended by /webhook. For example if I'm using ngrok then I will use `https://<ngrok link>/webhook`.
7. Use the aforementioned link to add it to the facebook app
8. Run `npx prisma migrate dev` then type `y` to migrate the database (this app is using sqlite)
9. Run the application by typing `yarn dev`

## Build
You can build the server for deployment by running:
1. `yarn build` to compile the app to /build directory
2. `yarn start` to start the application

## Testing
Use `yarn jest` to test this application. Currently only testing helper fucntions.
# Folder Structure

1. **src**
   The main development folder. This folder contains those subdirectories:
	 - /controller -> contains request handlers to be used in /routes folder
	 - /core 				-> contains core classes that is used like database connection, etc
	 - /helper			-> contains helper functions
	 - /middleware	-> contains middlewares to be used on /routes folder
	 - /routes 			-> application routes, used in src/index.ts
	 - /services		-> like helper but contains 3rd party services
	 - /types				-> contains typescript types
	 - index.ts 		-> the starting point of the application
2. **prisma**
   This folder is for database migrations, schema, and actual physical database (using sqlite)
3. **test**
   This folder is for user testing
4. **docs**
   This folder is for API documentation
5. **dist**
   This folder is autogenerated by running the `yarn build` command
6. **.husky**
	 This folder is generated by husky tools, for pre-git hooks commands

## Technology stacks
1. ExpressJS (NodeJS framework for server)
2. Prisma (DB ORM)
3. Typescript (Javascript extension library)
4. Jest (For testing)

## Tools Used
1. Husky   (for pre-git hooks commands)
2. Nodemon (for development server)
3. Postman (for testing GET / POST requests)

## Documentation
You can use postman documentation by downloading the collection on docs/postman directory or watch the video for the complete example of the app