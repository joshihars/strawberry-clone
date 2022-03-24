let container = document.getElementById("container");
let signin_cont = document.getElementById("signin_cont");
let newhere_cont = document.getElementById("newhere_cont");
let forgot_pass_wrap = document.getElementById("forgot_pass_wrap");
let auth_error = document.getElementById("auth_error");

forgot_pass_wrap.style.display = "none";

let signinDisplay = () => {
  container.innerHTML = signin_cont.innerHTML;
};

let newhereDisplay = () => {
  container.innerHTML = newhere_cont.innerHTML;
};

let forgotPass = () => {
  container.innerHTML = forgot_pass_wrap.innerHTML;
};

//style updates on clicking the input element

let inputClick = (e) => {
  e.target.style.border = "1px solid dodgerblue";
  e.target.style["box-shadow"] = "rgba(3, 200, 214, 0.1) 0px 0px 5px 5px";
  e.target.addEventListener("blur", () => {
    if (e.target.value == "") {
      e.target.style.border = "1px solid red";
    } else {
      e.target.style.border = "1px solid #623380";
      e.target.style["box-shadow"] = "none";
    }
  });
};

//Forgot Password Section

let forgotEmailsend = () => {
  let forgot_pass_email = document.getElementById("forgot_pass_email");
  let forgot_email_link = document.getElementById("forgot_email_link");

  forgot_email_link.innerHTML = "";

  if (forgot_pass_email.value != false) {
    forgot_email_link.style["display"] = "block";
    forgot_email_link.textContent = `An email containing a link has been sent to: ${forgot_pass_email.value}`;
  } else {
    forgot_pass_email.style["border"] = "1px solid red";
  }
};

//SIGN UP section

setInterval(() => {
  let password_val = document.getElementById("password").value;
  let repassword_val = document.getElementById("repassword").value;
  let repass_error = document.getElementById("repass_error");

  if (password_val != repassword_val && repassword_val != "") {
    let repassword = document.getElementById("repassword");
    repass_error.style.display = "block";
    repassword.style.border = "1px solid red";
  } else {
    repass_error.style.display = "none";
  }
}, 3000);

let registerUser = async () => {
  let signup_data = {
    name: document.getElementById("name").value,
    email: document.getElementById("email").value,
    password: document.getElementById("password").value,
    username: document.getElementById("email").value,
    description: document.getElementById("lastname").value,
    mobile: document.getElementById("repassword").value,
  };

  signup_data = JSON.stringify(signup_data);
  console.log(signup_data);

  const register_url = `https://masai-api-mocker.herokuapp.com/auth/register`;

  let res = await fetch(register_url, {
    method: "POST",
    body: signup_data,
    headers: {
      "Content-Type": "application/json",
    },
  });

  let data = await res.json();
  console.log(data);

  if (data.error == false) {
    container.innerHTML = signin_cont.innerHTML;
  }
};

//   LOGIN section

let signinUser = async () => {
  let login_data = {
    username: document.getElementById("auth_email").value,
    password: document.getElementById("auth_pass").value,
  };

  let log_data = JSON.stringify(login_data);
  console.log(login_data.username);

  const login_url = `https://masai-api-mocker.herokuapp.com/auth/login`;

  let res = await fetch(login_url, {
    method: "POST",
    body: log_data,
    headers: {
      "Content-Type": "application/json",
    },
  });

  let data = await res.json();
  console.log(data);

  let token=data.token;
 console.log( token)
  
  if (data.error == true) {
        auth_error.style["display"] = "block";
     
  }
   else {
    const getuser_url = `https://masai-api-mocker.herokuapp.com/user/${login_data.username}`;

    let result = await fetch(getuser_url, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    let getuser_data = await result.json();
    console.log(getuser_data);

    localStorage.setItem("userProfile", JSON.stringify(getuser_data));
    window.location.href = "../Home page and footer/homepage.html";
  }
 
};
