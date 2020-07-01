var dev = 'http://localhost:4000';
var prod = '';

var ambiente = dev;

var Url = {
  'usuarios': {
    'def': `${ambiente}/api/usuarios`,
    'login': `${ambiente}/api/usuarios/authenticate`,
    'logout': `${ambiente}/api/usuarios/revoke-token`
  },
  'acesso': {
    'man': `${ambiente}/api/nivelManagement`,
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
    'overview': `${ambiente}/api/op_overview`,
    'processo': `${ambiente}/api/op_processo`,
    'status': `${ambiente}/api/op_status`
  },
  'receita': {
    'mp': `${ambiente}/api/receita_mp/`,
    'operacao': `${ambiente}/api/receita_operacao/`,
    'overview': {
      'def': `${ambiente}/api/receita_overview/`,
      'mp': `${ambiente}/api/receita_overview/mp/`,
      'operacao': `${ambiente}/api/receita_overview/operacao/`,
      'processo': `${ambiente}/api/receita_overview/processo/`
    },
    'processo': `${ambiente}/api/receita_processo/`
  },
  'material': {
    'def': `${ambiente}/api/material/`,
    'tipo': `${ambiente}/api/tipoMaterial`
  }
};