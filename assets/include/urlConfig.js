var dev = 'http://localhost:5000';
var prod = '';

var ambiente = dev;
var Url = {
    'usuarios': {
      'def': `${ambiente}/api/usuarios`,
    },
    'turnos': {
      'def': `${ambiente}/api/turnos`,
      'excecao':`${ambiente}/api/turno/excecoes`
    }
  };