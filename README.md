# turbi-chat

Turbi Chat is a simple chat application that lets you connect to other people anonymously. We don't keep track of you or anybody else!

You can check a live demo of this application ![here](https://turbi-chat.firebaseapp.com/).

## Technology Stack

- ![React](https://github.com/facebook/react)
- ![Redux](https://github.com/reduxjs/redux)
- ![Material UI](https://github.com/mui-org/material-ui)
- ![React Router](https://github.com/ReactTraining/react-router)
- ![date-fns](https://github.com/date-fns/date-fns)
- ![Firebase](https://github.com/firebase/firebase-js-sdk)

## Development

### Download source code and install application

If you want to run locally this application you can follow these instructions. First, you'll need to clone the repo:

```shell
git clone git@github.com:surbina/turbi-chat.git
```

After that, move inside your application directory and install the application:

```shell
cd turbi-chat
npm install
```

### Set up Firebase project

Then you'll need to create a Firebase project. You can follow the instructions here: ![https://firebase.google.com/docs/web/setup](https://firebase.google.com/docs/web/setup).

Once you have created your Firebase project you should be able to get the configuration for you project which includes the following values:

```javascript
var config = {
  apiKey: "<API_KEY>",
  authDomain: "<PROJECT_ID>.firebaseapp.com",
  databaseURL: "https://<DATABASE_NAME>.firebaseio.com",
  projectId: "<PROJECT_ID>",
  storageBucket: "<BUCKET>.appspot.com",
  messagingSenderId: "<SENDER_ID>",
};
```

Using those values you'll have to create a `.env` file. For this create a copy of the `.env.tpl` file in the root of the repository and update the values using your owns.

Finally you'll need to set up the Cloud Firestore, you can follow the instructions here to achieve this: https://firebase.google.com/docs/firestore/quickstart

### Run

After everything is in place you should be able to run the application with this command:

```shell
npm run start
```

