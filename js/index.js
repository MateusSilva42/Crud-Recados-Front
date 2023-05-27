const formLogin = document.querySelector("#login-form");

formLogin.addEventListener("submit", (e) => {
  e.preventDefault();
  const emailLoginEl = document.querySelector("#email-login");
  const passwordLoginEl = document.querySelector("#password-login");

  const loginData = {
    email: emailLoginEl.value,
    senha: passwordLoginEl.value,
  };

  //Dando erro quando coloco await na frente de login pra retornar true or false, tive que fazer a lógica dentro da função de login.
  //  const isLogged = await login(loginData);

  login(loginData);

  //independente se o login der certo ou não, vai limpar os campos
  emailLoginEl.value = ''
  passwordLoginEl.value = ''
});

async function login(loginData) {
  try {
    const response = await api.post("/login", loginData);

    alert(response.data.Message)

    const currentUser = JSON.stringify(response.data.Data)

    localStorage.setItem('currentUser', currentUser)


    window.location.href = "notas.html"

    return true;
    // return response.data.Success ? true : false;
  } catch (error) {
    alert(error.response.data.Message);

    return false;
  }
}

function isLogged(){
  const logged = localStorage.getItem('currentUser')

  if(logged){
      window.location.href = 'notas.html'
  }
}

isLogged()
