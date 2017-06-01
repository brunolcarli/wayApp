/*/////////////////////////////////////
// @author: Bruno L. Carli          //
// @contact: brunolcarli@gmail.com //
//////////////////////////////////*/

var menu = {};
var logged = false;
var USUARIO = '';
var SENHA = '';

/*///////////////////////////////////////////////////////
//          ATIVAR MENU LATERAL                       //
/////////////////////////////////////////////////////*/

document.addEventListener('init', function(event){
    
    var view = event.target.id;
    
    if(view === 'menu' || 'layout'){
        
        menu[view + 'Init'](event.target);
    };
    
    if(view === 'FAQ' || 'Inicio'){
      this.layout = document.querySelector;
    };
    

}, false);

menu.layoutInit = function(target){
    this.layout = document.querySelector('#menu');
    target.querySelector('#splitter-toggle').addEventListener('click', function(){
    document.querySelector('#splitter-menu').open();
    });
};



/*///////////////////////////////////////////////////////
//                   FAQ                              //
/////////////////////////////////////////////////////*/

function faq(){
    
    clearView(); //limpa o frameview
    
    document.querySelector('#splitter-menu').close(); //fecha o menu lateral automaticamnte
    
    if(!logged){
        ons.notification.alert('Faça login para continuar')
        loginScreen();
    }else{
        //Atualiza o texto do frameview
        document.getElementById('main_header').innerHTML = '<h3 align="center"> FaQ </h3> ';
        document.getElementById('main_upframe')
        .innerHTML = "<p align='center'>Texto que será exibido <br> no corpo superior do app</p>";
        document.getElementById('main_downframe')
        .innerHTML = "<p align='center'>Texto que será exibido <br> no corpo inferior do app</p>";
        document.getElementById('main_footer')
        .innerHTML = "<p align='center'>Texto que será exibido no rodapé</p>";
    };
};

/*///////////////////////////////////////////////////////
//                   INICIO                           //
/////////////////////////////////////////////////////*/
function inicio(){
    
    clearView(); //Limpa o frameviewing
    
    if(!logged){ //verifica se o usuario estea logado
        ons.notification.alert('Faça login para continuar')
        loginScreen();
    }else{
    
        var data = new Date(); //cria uma nova data
        var dataAtual = data.getDay()+'/'+data.getMonth()+'/'+data.getFullYear(); //formata a data
        
        var user_N = localStorage.getItem("username_cadastrado"); //acessa o usuario registrado na memoria
        var user_E = localStorage.getItem("email_cadastrado"); //acessa o email cadastrado na memoria
        
        
        document.querySelector('#splitter-menu').close(); //fecha automaticamente o menu lateral
        
        //verificação para conferiri se o usuário está cadastrado
        if(!user_N){
            user_N = 'Usuário';
        };
        
        if(!user_E){
            user_E = 'Faça login com a sua conta';
        };   
        
        //atualiza o texto do frameview
        document.getElementById('main_header').innerHTML = '<h3 align="center"> Bem Vindo </h3> ';
        document.getElementById('main_upframe').innerHTML= "<p align='center'>" + user_N + "</p>";
        document.getElementById('main_downframe').innerHTML = "<p align='center'>"+ user_E + "</p>";
        document.getElementById('main_footer').innerHTML = "<p align='center'>" + dataAtual + "</p>";
    };    

};

/*///////////////////////////////////////////////////////
//                 LOGIN                              //
/////////////////////////////////////////////////////*/
function loginScreen(){
    
    clearView();
    
    document.querySelector('#splitter-menu').close();
    //document.getElementById("main_header").innerHTML = ' ';
    document.getElementById('main_upframe').innerHTML = '<div style="text-align: center; margin-top: 30px;"><p><ons-input id="username" modifier="underbar" placeholder="Username" float></ons-input></p><p><ons-input id="password" modifier="underbar" type="password" placeholder="Password" float></ons-input></p><p style="margin-top: 30px;"><ons-button onclick="login()">Log in</ons-button></p></div' ; 
    //document.getElementById("main_downframe").innerHTML = ' ';
};

function login(){
    var user = document.getElementById('username').value; //captura o username inserido
    var user_N = localStorage.getItem("username_cadastrado"); //recupera o username cadastrado
    var senha = document.getElementById('password').value; //captura a senha inserida
    var user_Pass = localStorage.getItem('senha_cadastrado');
    
    //VERIFICÇOES
    
    if(!user){ //verifica se o campo username estea vazio
        ons.notification.alert("Insira seu usuário");
    };
    
    if(!senha){ //verifica se o campo senha foi preenchido
        ons.notification.alert("Insira sua senha");
    };
    
    if(user.length > 1 && senha.length > 1){ //verifica se o usuario entrou com algum valor nos campos
        if(senha != user_Pass){ //verifica se a senha confere com o cadstro
            ons.notification.alert('Senha inválida');
        };
        
        if (user != user_N){ //verifica se o usuario confere com o cadastro
            ons.notification.alert('Usuário inválido');
        };
        
        if(user != user_N && senha != user_Pass) {//verifica se ambos usuario e senha conferem com o cadastro
            ons.notification.alert('Usuário e senha não conferem');
            loginScreen();
        } else if (user === user_N && senha === user_Pass){
            logged = true;
            inicio();
        };
    };
};  

/*///////////////////////////////////////////////////////
//                   CADASTRO                         //
/////////////////////////////////////////////////////*/
function cadastro() { //formulariod e cadastro
    
    clearView(); //limpa o frameview
    
    document.querySelector('#splitter-menu').close(); //fecha o menu lateral automaticamente
    
    //atualiza o frameview com as opções de cadastro
    document.getElementById("main_header").innerHTML = '<h2 align="center+> Cadastro </h2>';
    document.getElementById("main_upframe").innerHTML = '<div align="center"><ons-input id="cad_username" modifier="underbar" placeholder="Username" float></ons-input><ons-input id="cad_email" modifier="underbar" placeholder="e-mail" float></ons-input> <ons-input id="cad_senha" modifier="underbar" type="password" placeholder="Password" float></ons-input></div>';
    document.getElementById("main_downframe").innerHTML = '<div align="center"><ons-button onclick="cadastrar()">Cadastrar</ons-button></div>';    
};

/*///////////////////////////////////////////////////////
//              CADASTRAR                             //
/////////////////////////////////////////////////////*/
function cadastrar(){ //cadastrar dados localmente quando o user apertar o botao cadastrar
    
    //captura os dados fornecidos
    var get_user = document.getElementById('cad_username').value;
    var get_email = document.getElementById('cad_email').value;
    var get_senha = document.getElementById('cad_senha').value;
    
    
    var okname = false;
    var okmail = false;
    var oksenha = false;
    
    
    var ok = false; //variavel de controle
    
    //verifica se os campos estão corretamente preenchidos
    if(!get_user || get_user.length < 5) {
        ons.notification.alert("Seu nome de usueario deve conter pelo menos 5 caracteres");
    } else{
        okname = true;
    };
    
    if(!get_email){
        ons.notification.alert("Insira um email");
    } else{
        okmail = true;
    };
    
    if(!get_senha || get_senha.length < 6){
        ons.notification.alert("Insira uma senha com pelo menos 6 digitos");
    } else{
        oksenha = true;
    };
    
    if(okname == true && okmail == true && oksenha == true){
        ok = true;
    };
    
    // Check browser support
    if (typeof(Storage) !== "undefined") {
        // Store
        localStorage.setItem("username_cadastrado",get_user);
        localStorage.setItem("email_cadastrado",get_email);
        localStorage.setItem("senha_cadastrado",get_senha);
        
        if(ok == true){
            inicio();
        };
    // Retrieve
    //document.getElementById("result").innerHTML = localStorage.getItem("lastname");
} else {
    ons.notification.alert("Seu aparelho não tem compatibilidade");
    };
};

/*///////////////////////////////////////////////////////
//              APAGAR DB                             //
/////////////////////////////////////////////////////*/
function eraseStorage(){
    localStorage.removeItem("username_cadastrado");
    localStorage.removeItem("email_cadastrado");
    localStorage.removeItem("senha_cadastrado");    
};

/*///////////////////////////////////////////////////////
//             GERA QR CODE                           //
/////////////////////////////////////////////////////*/

function gerarQRCode(){
    
	clearView();

    if(!logged){ //verifica se o usuário está logado
        ons.notification.alert('Faça login para continuar')
        loginScreen();
    }else{
    
        var user_N = localStorage.getItem("username_cadastrado");
        var user_E = localStorage.getItem("email_cadastrado");
        //
        var result =  'Nome: ' + user_N + ' email: ' + user_E;
        var qrc = new QRCode(document.getElementById("qrframe"), result);
        
        
        document.querySelector('#splitter-menu').close();
        document.getElementById("main_header").innerHTML = '<h2 align="center">Qr Code</h2>';
        document.getElementById("main_upframe").innerHTML = ' ';
        document.getElementById("main_downframe").innerHTML = ' ';
        document.getElementById("qrcode").innerHTML = '<div align="center" id="qrcode">' + qrcode + '</div>';
        
    };
};

function clearView(){
    //document.getElementById("main_frame").innerHTML = '<p></p> ';
    document.getElementById("main_upframe").innerHTML = '<p></p>';
    document.getElementById("main_downframe").innerHTML = '<p></p>';
    document.getElementById("main_header").innerHTML = '<p></p>';
    document.getElementById("qrframe").innerHTML = '<div></div>';
};
