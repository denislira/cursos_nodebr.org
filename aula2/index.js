// 0 Obter um usuario
// 1 obeter o numero de telefone de um usuario a partir de seu ID
// 2 Obter o endreco do ussuairo pelo ID

function obterUsuario(callback) {
  setTimeout(function() {
    return callback(null, {
      id: 22,
      nome: "Denis",
      dataNasci: new Date()
    });
  }, 1000);
}

function obterTelefone(idUsuario, callback) {
  setTimeout(() => {
    return callback(null, {
      telefone: "81904345",
      ddd: 82
    });
  }, 2000);
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
      2000
    );
  });
}

function resolverUsuario(err, usuario) {
  console.log("usuario", usuario);
}

obterUsuario(function resolverUsuario(err, usuario) {
  if (err) {
    console.log("Deu erro de ususario", err);
    return;
  }
  obterTelefone(usuario.id, function resolverTelefone(err1, telefone) {
    if (err1) {
      console.log("Deu erro de telefone", err1);
      return;
    }
    obterTelefone(usuario.id, function resolverEndereco(err2, endereco) {
      if (err2) {
        console.log("Deu erro de Endereço", err2);
      }
      console.log(`
      Nome: ${usuario.nome},
      Endereco: ${endereco.rua},${endereco.numero}
      Telefone: (${telefone.ddd})${telefone.telefone}

      `);
    });
  });
});

// const usuario = obterUsuario();
//const telefone = obterTelefone(usuario.id);

//console.log("telefone", telefone);
