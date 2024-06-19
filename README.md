# MenuMager App

This is a simple app that allows you create an order for meal plans (user) and manage the components of the meal plans (admin).

## Deployment

The app is deployed on Vercel. You can access the app [here](https://menumager.netlify.app/).

## Features

- Landing Page (endpoints: `/`)
- User can create an order for meal plans (endpoints: `/order/select-plan`)

- Admin can login to dashboard (endpoints: `/dashboard/login`)
- Admin can change subscription plan (endpoints: `/dashboard/subscriptions`)
- Admin can manage meal plans (endpoints: `/dashboard/plans`)
- Admin can manage recipes (endpoints: `/dashboard/recipes`)
- Admin can manage ingredients (endpoints: `/dashboard/ingredients`)
- Admin can manage preferences (endpoints: `/dashboard/preferences`)
- Admin can manage allergies (endpoints: `/dashboard/allergies`)

## Credentials

Login credentials for admin:

- username: <admin@gmail.com>
- password: adminmenumager

## How to run the app (frontend)

1. Clone the repository

> git clone <https://github.com/C624-PS015/menu-mager.git>

2. Change directory to the `frontend` folder

> cd frontend

3. Install the dependencies

> npm install

4. Run the app in development mode

> npm run dev

5. Open your browser and navigate to `http://localhost:5173/`

## Technologies Used

- Axios
- Daisy UI
- Date Fns
- JS-Cookie
- React Hook Form
- React Icons
- React JS
- React Router Dom
- React Select
- React Social Icons
- React Toastify
- Redux Toolkit
- Tailwind CSS
- Vite
- Yup
