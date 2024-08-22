import {
  AuthenticationDetails,
  CognitoUser,
  CognitoUserAttribute,
  CognitoUserPool,
} from "amazon-cognito-identity-js";

export const signUpWithCognito = (user) => {
  return new Promise((resolve, reject) => {
    const userPool = new CognitoUserPool({
      UserPoolId: `${import.meta.env.VITE_USER_POOL_ID}`,
      ClientId: `${import.meta.env.VITE_CLIENT_ID}`,
    });

    const attributeList = [
      new CognitoUserAttribute({ Name: "email", Value: user.email }),
      new CognitoUserAttribute({
        Name: "phone_number",
        Value: "+1" + user.phone_number,
      }),
    ];

    userPool.signUp(
      user.email,
      user.password,
      attributeList,
      null,
      (err, result) => {
        if (err) {
          console.error("err:", err);
          reject(err);
          return;
        }
        resolve(result);
      }
    );
  });
};

export const signUpConfirmCode = (userName, code) => {
  return new Promise((resolve, reject) => {
    const userPool = new CognitoUserPool({
      UserPoolId: `${import.meta.env.VITE_USER_POOL_ID}`,
      ClientId: `${import.meta.env.VITE_CLIENT_ID}`,
    });
    const cognitoUser = new CognitoUser({
      Username: userName,
      Pool: userPool,
    });

    console.log(cognitoUser, "cognitoUser---");

    if (!cognitoUser) {
      reject("User not found!");
      return;
    }

    cognitoUser.confirmRegistration(code, true, (err, result) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(result, cognitoUser);
    });
  });
};

export const checkLogin = (userName, password) => {
  return new Promise((resolve, reject) => {
    const userPool = new CognitoUserPool({
      UserPoolId: import.meta.env.VITE_USER_POOL_ID,
      ClientId: import.meta.env.VITE_CLIENT_ID,
    });

    const authenticationData = {
      Username: userName,
      Password: password,
    };

    const authenticationDetails = new AuthenticationDetails(authenticationData);

    const userData = {
      Username: userName,
      Pool: userPool,
    };

    const cognitoUser = new CognitoUser(userData);

    cognitoUser.authenticateUser(authenticationDetails, {
      onSuccess: (result) => {
        cognitoUser.getSession((err, session) => {
          if (err) {
            reject("Session error");
          } else {
            resolve(true);
          }
        });
      },
      onFailure: (error) => {
        reject(error);
      },
    });
  });
};

export const getIdToken = () => {
  return new Promise((resolve, reject) => {
    const userPool = new CognitoUserPool({
      UserPoolId: `${import.meta.env.VITE_USER_POOL_ID}`,
      ClientId: `${import.meta.env.VITE_CLIENT_ID}`,
    });

    const cognitoUser = userPool.getCurrentUser();

    if (!cognitoUser) {
      reject("No user found");
      return;
    }

    cognitoUser.getSession((err, session) => {
      if (err) {
        reject("Session error");
        return;
      }
      if (!session) {
        reject("No session available");
        return;
      }

      const idToken = session.getIdToken().getJwtToken();
      return idToken;
    });
  });
};

export const logOutUser = () => {
  return new Promise((resolve, reject) => {
    const userPool = new CognitoUserPool({
      UserPoolId: `${import.meta.env.VITE_USER_POOL_ID}`,
      ClientId: `${import.meta.env.VITE_CLIENT_ID}`,
    });
    const cognitoUser = userPool.getCurrentUser();

    if (cognitoUser) {
      cognitoUser.signOut();
      resolve("Sign out successful");
    } else {
      resolve("No user found");
    }
  });
};

export const getCurrentUserAttrValue = (fieldName) => {
  return new Promise((resolve, reject) => {
    const userPool = new CognitoUserPool({
      UserPoolId: `${import.meta.env.VITE_USER_POOL_ID}`,
      ClientId: `${import.meta.env.VITE_CLIENT_ID}`,
    });

    const cognitoUser = userPool.getCurrentUser();
    if (!cognitoUser) {
      reject("No user found");
      return;
    }

    cognitoUser.getSession((err, session) => {
      if (err) {
        reject("Session error");
        return;
      }
      if (!session) {
        reject("No session available");
        return;
      }
      cognitoUser.getUserAttributes((err, attributes) => {
        if (err) {
          reject(err);
          return;
        }
        // Get email
        const fieldValue = attributes
          ?.find((attr) => attr.getName() === fieldName)
          ?.getValue();
        resolve(fieldValue);
      });
    });
  });
};

export const getCognitoSession = () => {
  return new Promise((resolve, reject) => {
    const userPool = new CognitoUserPool({
      UserPoolId: `${import.meta.env.VITE_USER_POOL_ID}`,
      ClientId: `${import.meta.env.VITE_CLIENT_ID}`,
    });
    const cognitoUser = userPool.getCurrentUser();

    if (cognitoUser) {
      cognitoUser.getSession(async (err, session) => {
        if (err) {
          console.error("Session error", err);
          reject(err); // Reject the promise if there's an error
          return;
        }
        if (!session) {
          console.error("No session available");
          reject(new Error("No session available")); // Reject if no session
          return;
        }

        try {
          const idToken = await session.getIdToken().getJwtToken();
          const email = await getCurrentUserAttrValue("email");

          resolve({ idToken, email, session }); // Resolve the promise with idToken and email
        } catch (error) {
          reject(error); // Reject the promise if there's an error fetching the attributes
        }
      });
    } else {
      reject(null); // Reject if there's no current user
    }
  });
};

// export const getCognitoSession = () => {
//   const userPool = new CognitoUserPool({
//     UserPoolId: `${import.meta.env.VITE_USER_POOL_ID}`,
//     ClientId: `${import.meta.env.VITE_CLIENT_ID}`,
//   });
//   const cognitoUser = userPool.getCurrentUser();

//   if (cognitoUser) {
//     cognitoUser.getSession(async (err, session) => {
//       if (err) {
//         console.error("Session error", err);
//         return;
//       }
//       if (!session) {
//         console.error("No session available");
//         return;
//       }
//       //   console.log("Session", session);
//       const idToken = await session.getIdToken().getJwtToken();
//       console.log("idToken", idToken);
//       const email = await getCurrentUserAttrValue("email");
//       console.log("email", email);
//     });
//   }
// };

export const resendVerificationCode = (inUserName) => {
  return new Promise((resolve, reject) => {
    const userPool = new CognitoUserPool({
      UserPoolId: `${import.meta.env.VITE_USER_POOL_ID}`,
      ClientId: `${import.meta.env.VITE_CLIENT_ID}`,
    });

    const cognitoUser = new CognitoUser({
      Username: inUserName,
      Pool: userPool,
    });
    if (!cognitoUser) {
      reject("User not found!");
      return;
    }
    cognitoUser.resendConfirmationCode((err, result) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(result);
    });
  });
};
