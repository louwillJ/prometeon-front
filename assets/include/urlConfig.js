var dev = 'http://localhost:4000';
var prod = '';

var ambiente = dev;
var Url = {
  'usuarios': {
    'def': `${ambiente}/api/usuarios`,
    'logout': `${ambiente}/api/usuarios/revoke-token`
  },
  'acesso': {
    'def': `${ambiente}/api/nivelManagement`,
    'grupo': `${ambiente}/api/nivelAcesso`,
    'screen': `${ambiente}/api/screen`
  },
  'plantModel': {
    'def': `${ambiente}/api/plantModel`,
    'element': `${ambiente}/api/orgElement`
  },
  'turnos': {
    'def': `${ambiente}/api/turnos`,
    'excecao': `${ambiente}/api/turno/excecoes`
  },
  'ordemProducao': {
    'def': `${ambiente}/api/op`,
  },
  'ordemStatus': {
    'def': `${ambiente}/api/op_status`,
  }
};