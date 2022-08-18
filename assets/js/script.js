form.addEventListener('submit', (e) => {
    let usernameErrors = []
    let emailErrors = []
    let passwordErrors = []
    let confirmPasswordErrors = []
    let userTypeErrors=[]
    let form = document.getElementById('form');
    let username = document.getElementById('u').value.trim();
    let email = document.getElementById('em').value.trim();
    let password = document.getElementById('p').value.trim();
    let confirm = document.getElementById('cp').value.trim();

    if ( username.length === 0) {
      usernameErrors.push("*Username cannot be blank");
    }
    else if (username.length < 3) {
      usernameErrors.push("*Username must  be at least 3 characters");
    }
    else { }
    if ( password.length === 0) {
      passwordErrors.push("*Password field cannot be empty");
    }
    else if (password.length < 6) {

      passwordErrors.push("*Password must  be at least 6 characters long");
    }
    else { }
    if (email.length === 0) {
      emailErrors.push("*Email field cannot be empty");
    }
    else {
      let atSymbol = email.indexOf("@");
      let dot = email.indexOf(".");
      if (atSymbol === -1) {
        emailErrors.push("*Email must include '@'");
      }
      else if (atSymbol === 0) {
        emailErrors.push("*There should be something before '@'")
      }
      else if (dot <= atSymbol + 3) {
        emailErrors.push("*Invalid email address")
      }
    }
    
    if (confirm !== password) {
      confirmPasswordErrors.push("* password is not matching")
    }

    if(!document.getElementById("userType1").checked && !document.getElementById("userType2").checked)
    { 
      userTypeErrors.push("*Please select the user type");
    }
    else{
    }
    if (usernameErrors.length > 0 || passwordErrors.length > 0 || confirmPasswordErrors.length > 0 || emailErrors.length > 0) {
      e.preventDefault();
      document.getElementById('small1').innerText = usernameErrors.join(",")
      document.getElementById('small2').innerText = passwordErrors.join(",")
      document.getElementById('small4').innerText = emailErrors.join(",")
      document.getElementById('small3').innerText = confirmPasswordErrors.join(",")
      document.getElementById('small5').innerText = userTypeErrors.join(",")
    }
  })