const jwt = require("jsonwebtoken");
// JWT Utilities -> needs '.env' , I'll do this later
const jwtSecretKey = process.env.JWT_SECRET_KEY;


export async function getServerSideProps(context) {
  let res = await fetch("http://localhost:3000/api/posts", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  let utilisateur = await res.json();
  return {
    props: { utilisateur },
  };
}

let users=[{
  _id: '636d611962db1105dd2e5ccb',
  username: 'saf',
  password: '123',
  email: 'saf@gmail.com'
}]
/*
export function findUser(username) {
  return users.find((user) => user.username === username);
}

export function isUserExists(username) {
  return findUser(username) || false;
}
// ----------------------------------------------------*
export function login(username, password) {
  if (!username || !password) {
    return {
      error: "WRONG_CREDENTIAL",
      message: `Both Username and Password are required.`,
    };
  }

  if (!isUserExists(username)) {
    return {
      error: "USER_NOT_FOUND",
      message: `${username} is not defined, make sure the user is registered before.`,
    };
  }

  const user = findUser(username); //user={}
  const hashedPassword = (password);
  // console.log(hashedPassword);

  if (!checkPassword(hashedPassword, user.password)) {
    return {
      error: "WRONG_CREDENTIAL",
      message: "Your Password is wrong. Shame on you!(^_^)",
    };
  }
  // Create new token by username
  const token = jwt.sign({ username: user.username, email: user.email, id: user._id }, jwtSecretKey, {
    expiresIn: 3000, // 50min
  });


  return {
    payload: {
      token,
    },
  };
}
*/


export function isUserExists(username,user) {
   return username===user.username
}
// ----------------------------------------------------*
export function login(username, password) {
  
  
  
  if (!username || !password) {
    return {
      error: "WRONG_CREDENTIAL",
      message: `Both Username and Password are required.`,
    };
  }

 
  getServerSideProps().then((data)=>{
    let res
    data.props.utilisateur.map((d)=>{
      if(d.username===username){
        res=d
    }
    })
    return res
  }).then((user)=>{
    if (!checkPassword(password, user.password)) {
      return {
        error: "WRONG_CREDENTIAL",
        message: "Your Password is wrong. Shame on you!(^_^)",
      };
    }
      const token = jwt.sign({ username: user.username,email: user.email, id: user._id }, jwtSecretKey, {
        expiresIn: 3000,
      });
      return {
        payload: {
          token,
        },
      };



  })

  
}


export function whoAmI(username) {
  /*if (!username || !isUserExists(username)) {
    return {
      error: "USER_NOT_FOUND",
      message: `${username} is not defined, make sure the user is registered before.`,
    };
  }*/
  
  getServerSideProps().then((data)=>{
    let res
    data.props.utilisateur.map((d)=>{
      if(d.username===username){
        res=d
    }
    })
    return res
  }).then((user)=>{
    return {
      isSuccessful: true,
      payload: {
        username: user.username,
        id: user._id,
      },
    };
  })
  
}

function checkPassword(currentPassword, Password) {
  return currentPassword===Password;
}

export function verifyToken(token) {
  return jwt.verify(token, jwtSecretKey);
}


function errorMessage(error, message) {
  return {
    isSuccessful: false,
    error,
    message,
  };
}
