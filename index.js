import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import session from 'express-session';

const porta = 3000;
const host = '0.0.0.0';

var listaUsuarios = [];
var listaBatePapo = [];

function processarCadastroUsuario(requisicao, resposta){
    const dados = requisicao.body;
    let conteudoResposta = '';

    if(!(dados.nome && dados.apelido && dados.senha && dados.email && dados.datanasc)){

        conteudoResposta = 
        `<!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Document</title>
        
            <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">
            <style>
            
            </style>
        
        </head>
        <body style="background-image: url(fundopagina.jpeg);">
            <div class="container col-5" id="form" style=" margin-top: 50px; margin-bottom: 20px; border-radius: 10px; color:rgb(1, 64, 119);" >
                <form action='/cadastrarUsuarios' method="POST"  class="row g-3 needs-validation" novalidate>
                    <fieldset class="border p-3" style="background-color: rgb(255, 251, 251); border-radius: 20px; box-shadow: 7px 7px 7px rgb(143, 143, 143);" >
                        <legend class="mb-3" style="text-align: center; font-size: 45px; font-family:Georgia, 'Times New Roman', Times, serif;color:rgb(1, 64, 119);">Cadastro de Usuários</legend>
                    <div class="col-md-4">
                      <label for="nome" class="form-label">Nome</label>
                      <input type="text" class="form-control" placeholder="Digite seu primeiro nome" value="${dados.nome}" style="border: 3px solid rgb(1, 64, 119);" id="nome" name="nome">
                    </div>`;

        if(!dados.nome){
            conteudoResposta += 
            `<div>
                <p class="text-danger">Por favor, informe seu nome</p>
            </div>`;
        }

        conteudoResposta += 
        `<div class="col-md-4">
                <label for="apelido" class="form-label">Apelido</label>
        <div class="input-group has-validation">
                <span class="input-group-text" id="inputGroupPrepend2">@</span>
                <input type="text" class="form-control" id="apelido" name="apelido" aria-describedby="inputGroupPrepend2" value="${dados.apelido}" required style="border: 3px solid rgb(1, 64, 119);">
        </div>
        </div>`;

        if(!dados.apelido){
            conteudoResposta += 
            `<div>
                <p class="text-danger">Por favor, informe seu apelino</p>
            </div>`;
        }

        conteudoResposta +=
        `<div class="col-md-4">
            <label for="senha" class="form-label">Senha</label>
            <input type="password" class="form-control" style="border: 3px solid rgb(1, 64, 119);" placeholder="**********" id="senha" name="senha" value="${dados.senha}">
         </div>`;

        if(!dados.senha){
            conteudoResposta += 
            `<div>
                <p class="text-danger">Por favor, informe sua senha</p>
            </div>`;
        }

        conteudoResposta += 
        `<div class="col-md-4">
            <label for="telefone" class="form-label">E-mail</label>
            <input type="email" class="form-control" style="border: 3px solid rgb(1, 64, 119);" id="email" name="email" value="${dados.email}" placeholder="ex@exemplo.com">
        </div>`

        if(!dados.email){
            conteudoResposta +=
            `<div>
                <p class="text-danger">Por favor, informe seu e-mail</p>
            </div>`;
        }

        conteudoResposta +=
        `<div class="col-md-4">
            <label for="endereço" class="form-label">Data de Nascimento</label>
            <input type="date" class="form-control" style="border: 3px solid rgb(1, 64, 119);" id="datanasc" name="datanasc" value="${dados.datanasc}" size="50">
        </div>`

        if(!dados.datanasc){
            conteudoResposta += 
                `<div>
                    <p class="text-danger">Por favor, informe sua data de nascimento</p>
                </div>`;
             }
            
             `<br>
            <div class="col-12">
              <center>
              <button class="btn btn-primary" type="submit" style="font-size: 20px; background-color: rgb(0, 211, 162); width: 350px; text-align: center; padding: 10px 15px;">Cadastrar</button>
              </center>
            </div>
           </fieldset>
          </form>
    </div>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM" crossorigin="anonymous"></script>
  </body>
</html>`;

    resposta.end(conteudoResposta);}

    else{
        const usuario = {
            nome: dados.nome,
            apelido: dados.apelido,
            senha: dados.senha,
            email: dados.email,
            datanasc: dados.datanasc,
        }
        listaUsuarios.push(usuario);
        //retornar a lista de usuarios
        conteudoResposta = `
        
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <title>Menu do sistema</title>
            <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">
        </head>
        <body>
            <h1> Lista de Usuário Cadastrado</h1>
            <table class="table table-hover">
            <thead>
                <tr>
                <th scope="col">Nome</th>
                <th scope="col">Apelido</th>
                <th scope="col">Senha</th>
                <th scope="col">E-mail</th>
                <th scope="col">Data de Nascimento</th>
                </tr>
            </thead>
            <tbody>`;
    
        for (const usuario of listaUsuarios){
                conteudoResposta += `
                <tr>
                    <td>${usuario.nome}</td>
                    <td>${usuario.apelido}</td>
                    <td>${usuario.senha}</td>
                    <td>${usuario.email}</td>
                    <td>${usuario.datanasc}</td>
                </tr>`;
            }
        conteudoResposta+= `
                </tbody>
                </table>
                <a class="btn btn-danger" href="/" role="button">Voltar ao Menu</a>
                <a class="btn btn-success" href="/cadastrarUsuarios.html" role="button">Continuar Cadastrando</a>
            </body>
            <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM" crossorigin="anonymous"></script>
            </html>`;
    
        resposta.end(conteudoResposta);
    }
    }

    function mensagem(requisicao,resposta){

        const dados = requisicao.body;
        let conteudoResposta = '';

    if(!(dados.name && dados.mensagem)){

        conteudoResposta = 
        `<!DOCTYPE html>
        <html lang="pt-BR">
        <head>
            <meta charset="UTF-8">
            <title>Bate-papo</title>
            <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN" crossorigin="anonymous">
            <style>
                body {
                    background-image: url('fundopagina.jpeg');
                    background-size: cover;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    height: 100vh;
                    margin: 0;
                }
        
                .chat {
                    border-radius: 8px;
                    padding: 20px;
                    background-color: rgb(255, 251, 251);
                    box-shadow: 7px 7px 7px rgb(143, 143, 143);
                }
        
                label { 
                    font-weight: 800; 
                    color: black;
                }
        
            </style>
        
        </head>
        <body>
            <div class="chat">
                <form action='\batepapo' method="POST" class="row g-3 needs-validation mx-auto my-auto" novalidate>
                    <div class="col-md-6">
                        <div class="mb-3">
                            <label for="name" class="form-label">Nome</label>
                            <select class="form-select" id="name" name="name" required>
                                <option selected disabled value="">Selecionar Usuario</option>
                            </select>
                        </div>
                    </div>`

                    for(const usuario of listaUsuarios){
                        conteudoResposta += <option value="${usuario.nome}">${usuario.nome}</option>;
                    }
                    conteudoResposta+=`
                        </select>
                        ${!users.name ? <p class="text-danger">Por favor, informe um usuário válido!</p> : ''}
                        </div></div><br/>`;

                    conteudoResposta+=`
                        <div class="col-md-6">
                        <div class="mb-3">
                            <label for="mensagem" class="form-label">Mensagem</label><br/>
                            <textarea class="form-control" id="mensagem" name="mensagem" style="width: 450px;" cols="20" placeholder="Escreva aqui sua mensagem ao usuário selecionado" required></textarea>
                            ${!users.mensagem ? <p class="text-danger">Por favor, informe uma mensagem ao usuário</p> : ''}
                            </div> 
                            <div>
                            <div class="col-12 mt-4">
                    <button class="btn btn-success" id="autoSubmit">Enviar</button>
                    </div>
                    </fieldset>
                </form>
                </div>
                </div>
            <!--<script>
        window.onload = function() {
        document.getElementById('autoSubmit').click();
        };
    </script>-->

    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-C6RzsynM9kWDrMNeT87bh95OGNyZPhcTNXj1NW7RuBCsyN/o0jlpcV8Qyq46cDfL" crossorigin="anonymous"></script>
    </body>
    </html>`;

            resposta.end(conteudoResposta);    
    }

    else{
        const usuario = {
            usuario: users.name,
            mensagem: users.mensagem,
        };

        listaBatePapo.push(usuario);
        
        conteudoResposta = `!DOCTYPE html>
        <html lang="pt-BR">
        <head>
            <meta charset="UTF-8">
            <title>Bate-papo</title>
            <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN" crossorigin="anonymous">
            <style>
                body {
                    background-size: cover;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    height: 100vh;
                    margin: 0;
                }
        
                .chat {
                    border-radius: 8px;
                    padding: 20px;
                    background-color: rgb(255, 251, 251);
                    box-shadow: 7px 7px 7px rgb(143, 143, 143);
                }
        
                label { 
                    font-weight: 800; 
                    color: black;
                }
        
                h1 {
                    text-align: center;
                    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                    color: rgb(1, 64, 119);
                }
        
            </style>
        </head>
        <body>
            <h1> Lista de Usuários do Bate Papo</h1>
            <table class="table table-hover">
            <thead>
                <tr>
                <th scope="col">Usuário</th>
                <th scope="col">Mensagem</th>
                </tr>
            </thead>
            <tbody>`;

    for (const usuario of listaBatePapo){
        conteudoResposta += `
            <tr>
                <td>${usuario.name}</td>
                <td>${usuario.mensagem}</td>
            </tr>`;
        }

        conteudoResposta +=
        `<div class="col-12 mt-4">
            <button class="btn btn-success" id="autoSubmit" style="width: 100%; background-color: rgb(0, 211, 162); font-size: 20px;">Enviar</button>
        </div>
        </form>
        </div>

        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-C6RzsynM9kWDrMNeT87bh95OGNyZPhcTNXj1NW7RuBCsyN/o0jlpcV8Qyq46cDfL" crossorigin="anonymous"></script>
        </body>
    </html>`;

     resposta.end(conteudoResposta);

    }
 }

    function autenticar(requisicao, resposta, next){
        if(requisicao.session.usuarioAutenticado){
            next();
        }
        else{
            resposta.redirect("/login.html");
        }
    }

const app = express();
app.use(cookieParser());
app.use(session({
    secret:"M1nH4Ch4v3S3cR3t4",
    resave: false, 
    saveUninitialized: true,
    cookie: { 
        maxAge: 1000 * 60 * 15
    }
}));
app.use(express.urlencoded({ extended: true }));

//indicando para a aplicação como servir arquivos estáticos localizados na página
app.use(express.static(path.join(process.cwd(),'paginas')));


app.get('/', autenticar, (requisicao, resposta) => {
    const dataUltimoAcesso = requisicao.cookies.DataUltimoAcesso;
    const data = new Date();
    resposta.cookie("DataUltimoAcesso", data.toLocaleString(), {
        maxAge: 1000 * 60 * 60 * 24 * 30,
        httpOnly: true
    });
    resposta.end(`
    
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <title>Menu do Sistema</title>
        <style>
        body {
            background-image: url('fundopagina.jpeg');
             }

        h1{
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            color: rgb(1, 64, 119);
            text-align: center;
            }

        .conteinerdiv {
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            font-family: Georgia, 'Times New Roman', Times, serif;
            }

        .border {
            background-color: rgb(255, 251, 251);
            border-radius: 10px;
            box-shadow: 7px 7px 7px rgb(143, 143, 143);
            padding: 20px;
            }

        button {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            border: 2px solid black;
            font-size: 20px;
            background-color: rgb(0, 211, 162);
            width: 250px;
            border-radius: 20px;
            margin-top: 20px; 
            }
        </style>
    </head>
    <body>
        <div class="container conteinerdiv">
            <div class="col-4">
                <fieldset class="border p-3">
                    <div class="mb-3">
                        <h1 class="text-center"> MENU </h1>
                        <div class="text-center">
                            <a class="btn btn-info" href="/cadastrarUsuarios.html" role="button">Cadastrar Usuários</a>
                            <br>
                            <br>
                            <a class="btn btn-info" href="/batepapo.html" role="button">Bate Papo</a>
                        </div>
                                
                    <footer>
                        <p>Seu ultimo acesso foi em ${dataUltimoAcesso}</p>
                    </footer>
            </div>
            </fieldset>
    </body>
    </html>`)

});

app.post('/login', (requisicao, resposta)=>{
    const usuario = requisicao.body.usuario;
    const senha = requisicao.body.senha;
    if(usuario && senha && (usuario === 'any') && (senha === '1234')){
        requisicao.session.usuarioAutenticado = true;
        resposta.redirect('/');
    }
    else{
        resposta.end(`
        <!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Falha na autenticação</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">
    <style>
        body {
            background-image: url('fundopagina.jpeg');
        }

        .conteinerdiv {
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
        }

        .border {
            background-color: rgb(255, 251, 251);
            border-radius: 10px;
            box-shadow: 7px 7px 7px rgb(143, 143, 143);
            padding: 20px;
        }

        h3 {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            color: red;
            margin: 20px 0;
            white-space: nowrap;
            text-align: center; 
        }

        button {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            border: 2px solid black;
            font-size: 20px;
            background-color: rgb(0, 211, 162);
            width: 250px;
            border-radius: 20px;
            margin-top: 20px; 
        }

        a {
            color: black;
            text-decoration: none;
        }
    </style>
</head>
<body>
    <div class="container conteinerdiv">
        <div class="col-4">
            <fieldset class="border p-3">
                <div class="mb-3">
                    <h3>Usuário ou senha inválidos!</h3>
                </div>
                <div class="text-center">
                <a class="btn btn-danger" href="/login.html" role="button" style="text-align: center;">Voltar ao login</a>
                </div>
            </fieldset>
        </div>
    </div>
</body>
</html>
                  `);
    }
});

//rota para processar o cadastro de usuários - endpoint = '/cadastrarUsuarios
app.post('/cadastrarUsuarios', autenticar, processarCadastroUsuario);
app.post('/batepapo', autenticar, mensagem);

app.listen(porta, host, () => {
    console.log(`Servidor executando na url http://${host}:${porta}`);

});


