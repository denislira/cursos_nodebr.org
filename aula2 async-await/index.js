// 0 Obter um usuario
// 1 obeter o numero de telefone de um usuario a partir de seu ID
// 2 Obter o endreco do ussuairo pelo ID
const util = require("util");
const obterEnderecoAsync = util.promisify(obterEndereco);

function obterUsuario() {
  //quand der problema, chama reject(erro)
  //quando der certo chama resolve
  return new Promise(function resolvePromise(resolve, reject) {
    setTimeout(function() {
      return resolve({
        id: 22,
        nome: "Denis",
        dataNasci: new Date()
      });
    }, 500);
  });
} //fim

function obterTelefone(idUsuario, callback) {
  return new Promise(function resolvePromise(resolve, reject) {
    setTimeout(() => {
      return resolve({
        telefone: "81904345",
        ddd: 82
      });
    }, 500);
  });
}

function obterEndereco(idUsuario, callback) {
  setTimeout(() => {
    return callback(
      null,
      {
        rua: "Novo Nordeste",
        numero: 257,
        bairro: "São Luiz"
      },
      500
    );
  });
}

function resolverUsuario(err, usuario) {
  console.log("usuario", usuario);
}

const usuarioPromise = obterUsuario();
//para manipular o sucesso usamos a funlçao .then
// para manipular erros, usamos o .catch

usuarioPromise
  .then(function(usuario) {
    return obterTelefone(usuario.id).then(function resolverTelefone(result) {
      return {
        usuario: {
          nome: usuario.nome,
          id: usuario.id
        },
        telefone: result
      };
    });
  })

  .then(function(resultado) {
    const endereco = obterEnderecoAsync(resultado.usuario.id);
    return endereco.then(function resolverEndereco(result) {
      return {
        usuario: resultado.usuario,
        telefone: resultado.telefone,
        endereco: result
      };
    });
  })
  .then(function(resultado) {
    console.log(`
      nome: ${resultado.usuario.nome}
      Endereco: ${resultado.endereco.rua}, ${resultado.endereco.numero}
      Telefone: (${resultado.telefone.ddd}) ${resultado.telefone.telefone}
      `);
  })
  .then(function(result) {
    console.log("Resultado: ", result);
  })
  .catch(function(error) {
    console.log("Erro: ", error);
  });

// obterUsuario(function resolverUsuario(err, usuario) {
//   if (err) {
//     console.log("Deu erro de ususario", err);
//     return;
//   }
//   obterTelefone(usuario.id, function resolverTelefone(err1, telefone) {
//     if (err1) {
//       console.log("Deu erro de telefone", err1);
//       return;
//     }
//     obterEndereco(usuario.id, function resolverEndereco(err2, endereco) {
//       if (err2) {
//         console.log("Deu erro de Endereço", err2);
//       }
//       console.log(`
//       Nome: ${usuario.nome},
//       Endereco: ${endereco.rua},${endereco.numero}
//       Telefone: (${telefone.ddd})${telefone.telefone}

//       `);
//     });
//   });
// });

// const usuario = obterUsuario();
//const telefone = obterTelefone(usuario.id);

//console.log("telefone", telefone);
