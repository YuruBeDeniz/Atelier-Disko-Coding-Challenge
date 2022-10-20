# Atelier Disko coding challenge

This is a [Next.js](https://nextjs.org/) project bootstrapped with
[`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

Copy the environment configuration, install all dependencies and run the development server:

```bash
cp .env.example .env
npm ci
npm run dev
```

Note that changes in `.env` require a server restart.

Open [http://localhost:3000](http://localhost:3000) with your browser.

You can start editing the page by modifying `pages/index.tsx`. The page auto-updates as you edit the file.

## Before you start

- Opn this codebase in an IDE with Typescript support
- In case you are stuck with a task, do not hesitate to ask for help
- When committing changes, ensure your changes can be built successfully using `npm run build`
- Initialize this codebase with git and configure a remote origin to repository in your GitHub account
- Before starting any tasks, create an initial commit with all files
- When completing a task from the list, commit all changes with a message containing the corresponding task title

## Tasks

- [Basic HTML form](#basic-html-form)
- [Page styling](#page-styling)
- [Form data handling](#form-data-handling)
- [Extension of the form with a message field](#extension-of-the-form-with-a-message-field)
- [Prisma](#prisma)
- [Registration model](#registration-model)
- [Connection of form and database](#connection-of-form-and-database)
- [Integration of a success and error page](#integration-of-a-success-and-error-page)
- [Title select field](#title-select-field)
- [HTTP client](#http-client)
- [Isolation of the registration logic to an API endpoint](#isolation-of-the-registration-logic-to-an-api-endpoint)
- [Unique email field](#unique-email-field)
- [Server side validation](#server-side-validation)
- [Reusable input components](#reusable-input-components)
- [Registrations overview page](#registrations-overview-page)
- [Email confirmation process](#email-confirmation-process)
- [API Authentication process](#api-authentication-process)
- [API documentation](#api-documentation)
- [MySQL migration](#mysql-migration)

### Basic HTML form

Create an HTML form with following inputs.

| name      | required | type     |
| --------- | -------- | -------- |
| firstname | yes      | text     |
| lastname  | yes      | text     |
| email     | yes      | email    |
| message   | no       | textarea |

### Page styling

Styles are written using [CSS Modules](https://github.com/css-modules/css-modules). Styles for each page and component
should reside in a dedicated `.module.css` on the same level as the `.tsx` file.

### Form data handling

Add a submit handler function to the form component that prints the form data to the console on submit.

### Extension of the form with a message field

Refactor the textarea field to its own component and add an optional `characterLimit` prop.
An indicator should display the remaining character count, if no characterCount prop is provided, the indicator should
not be displayed. If the value of `characterLimit` is reached, the message field should not accept any additional input.
A design reference can be found in this [Figma document](https://www.figma.com/file/Dsz2K38vPA3PnOEhu3RmHZ/Coding-Challenge?node-id=1%3A2).

### Prisma

[Prisma](https://www.prisma.io) is a node package providing a mapping between database and JavaScript objects.
todo. description migrations

```bash
npm install prisma --save-dev
npm install @prisma/client

npx prisma init --datasource-provider sqlite
```

### Registration model

Add a model named `registration` to the `prisma/schema.prisma` file with all fields from the form created previously.
Pick corresponding database field types using information from the
[prisma.io](https://www.prisma.io/docs/getting-started/quickstart#2-model-your-data-in-the-prisma-schema) docs.

### Connection of form and database

Extend the submit handler function which prints the form data to the console, to insert the data into the database
using the previously created registration model.
An example of creating new records can be found in the
[prisma.io](https://www.prisma.io/docs/getting-started/quickstart#41-create-a-new-user-record) docs.

### Integration of a success and error page

If the record insert was successful, display the success state, else the error state.
A design reference can be found in this [Figma document](https://www.figma.com/file/Dsz2K38vPA3PnOEhu3RmHZ/Coding-Challenge?node-id=6%3A48).

### Title select field

Add an optional title select to the form created in todo 1 with following options:

- Dr.
- Prof.
- Prof.Dr.

### HTTP client

Choose one of the following HTTP clients and document your decision.

- [got](https://github.com/sindresorhus/got)
- [axios](https://github.com/axios/axios)
- [node-fetch](https://github.com/node-fetch/node-fetch)

### Isolation of the registration logic to an API endpoint

Create an API route in `/api/registrations` that only accepts `POST` method requests and sends according responses if
the method is not allowed. Re-wire the existing logic in `pages/index.tsx` to use the API route.
Note that the request path needs to be an absolute path containing the host name, so prefix the request with the
`SITE_HOST` environment variable.

### Unique email field

Add a migration making the email field unique in the database schema. Catch errors occurring on an insert using an
existing email address and return a response with appropriate HTTP status and error message in JSON format

### Server side validation

Add server side validation to the request data using the `joi/joi` npm package. The rules should match those in the
form frontend.

### Reusable input components

Create dedicated components for all input types in the `components` folder, using the `components/sample` component as
reference. Refactor the `pages/index.tsx` page to use the new components.

### Registrations overview page

Add a route in `pages/registration/index.tsx` that lists all registrations using the `components/dataTable` component.
Sort the results alphabetically by first and lastname in descending order.

### Email confirmation process

Install and configure the [nodemailer package](https://nodemailer.com/about) using [this mailer configuration](https://cdn.disko.io/coding-challenge/mail-config.md).

In a prisma migration add a `confirmed` field to the registration model, which by default contains `false`.
Additionally add a `token` field, containing a random generated unique string identifier, which should be generated
when inserting a new registration.

To generate the token, use a secure algorithm such as `AES` using
[CryptoJS](https://cryptojs.gitbook.io/docs/#ciphers). Use a passphrase stored in an environment variable.

After successfully inserting a registration, email the user a message with a link for confirmation using nodemailer.
The link should route to a new template in `pages/confirmation.tsx` and provide the token as `GET` parameter e.g.
`/confimation?token=[token]`. In the template obtain the token from the router and print it to the console.

Create another API route in `/pages/api/confirmation/[token].js`. The route should support `GET` requests and send
an according response for all other methods.

In the API route write a Prisma query to find the `registration` by the `token` provided in the `GET` parameter where
`confirmed` is `false`. If no result could be found, return an appropriate HTTP response code.

If a result was found, set the `confirmed` field to `true` and update the `registration`. Ensure the changes were
persisted to the database using [Prisma Studio](https://www.prisma.io/docs/concepts/components/prisma-studio)

Integrate the API call in `pages/confirmation.tsx` and display an according state.
A design reference can be found in this [Figma document](#todo).

Document the process in a [Flowchart](https://en.wikipedia.org/wiki/Flowchart) using a tool of your choice.

### API authentication process

Add an `API_TOKEN` environment variable which contains a string password securing the `/api/registration` route.
Implement the authentication process using the
[bearer scheme](https://swagger.io/docs/specification/authentication/bearer-authentication). Compare the `token`
provided the `Authorization` header with the `token` stored in the environment variable and return a response with
appropriate HTTP status depending on the comparison result.

### API documentation

Collect all API endpoints in an [Insomnia](https://insomnia.rest) documentation and export the data to a file in this repository.

### MySQL migration

Create a local MySQL instance using docker and configure prisma to connect to the container.
