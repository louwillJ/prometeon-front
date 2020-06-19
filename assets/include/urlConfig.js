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
    'overview': `${ambiente}/api/op_overview`,
    'processo': `${ambiente}/api/op_processo`,
    'status': `${ambiente}/api/op_status`
  },
  // 'ordemStatus': {
  //   'def': `${ambiente}/api/op_status`,
  // },
  // 'ordemProducaoOverview': {
  //   'def': `${ambiente}/api/op_overview`,
  // },
  // 'ordemProducaoOverviewBusca': {
  //   'def': `${ambiente}/api/op_overview/`,
  // },
  // 'op_processo': {
  //   'def': `${ambiente}/api/op_processo/`,
  // },
  'receita': {
    'mp': `${ambiente}/api/receita_mp/`,
    'operacao': `${ambiente}/api/receita_operacao/`,
    'overview': `${ambiente}/api/receita_overview/`,
    'processo': `${ambiente}/api/receita_processo/`
  },
  // 'receitaOverview': {
  //   'def': `${ambiente}/api/receita_overview/`,
  // },
  // 'receitaMP': {
  //   'def': `${ambiente}/api/receita_mp/`,
  // },
  // 'receitaOperacao': {
  //   'def': `${ambiente}/api/receita_operacao/`,
  // },
  // 'receitaProcesso': {
  //   'def': `${ambiente}/api/receita_processo/`,
  // },
  'material': {
    'def': `${ambiente}/api/material/`,
  }
};