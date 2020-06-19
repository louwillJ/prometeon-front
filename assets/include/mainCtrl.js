var app = angular.module("prometeon", ['ngRoute']);

app.config(function ($routeProvider, $locationProvider) {
  $routeProvider
    .when('/', {
      templateUrl: 'views/Index/inicio.html'
    })
    .when('/Cadastros/GrupoAcesso', {
      templateUrl: 'views/Cadastros/GrupoAcesso/grupoAcesso.html',
      controller: 'grupoAcesso'
    })
    .when('/Cadastros/GrupoAcesso/Edit', {
      templateUrl: 'views/Cadastros/GrupoAcesso/grupoAcessoEdit.html',
      controller: 'grupoAcessoEdit'
    })
    .when('/Cadastros/PlantModel', {
      templateUrl: 'views/Cadastros/PlantModel/plantModel.html',
      controller: 'plantModel'
    })
    .when('/Cadastros/Usuarios', {
      templateUrl: 'views/Cadastros/Usuarios/usuario.html',
      controller: 'usuario'
    })
    .when('/Cadastros/Turnos', {
      templateUrl: 'views/Cadastros/Turnos/turno.html',
      controller: 'turno'
    })
    .when('/Cadastros/Turno/Excecao', {
      templateUrl: 'views/Cadastros/Turnos/excecaoTurno.html',
      controller: 'excecaoTurno'
    })
    .when('/Cadastros/OrdemProducao', {
      templateUrl: 'views/Cadastros/OrdemProducao/ordemProducao.html',
      controller: 'ordemProducao'
    })
    .when('/Cadastros/OrdemProducao/Overview', {
      templateUrl: 'views/Cadastros/OrdemProducao/ordemProducaoOverview.html',
      controller: 'ordemProducaoOverview'
    })
    .when('/Cadastros/Receitas', {
      templateUrl: 'views/Cadastros/Receitas/receitas.html',
      controller: 'receitas'
    })
    .when('/Cadastros/Receitas/HistoricoRevisao', {
      templateUrl: 'views/Cadastros/Receitas/receitasHistoricoRevisao.html',
      controller: 'receitasHistoricoRevisao'
    })
    .otherwise({
      redirectTo: '/login.html'
    });
  $locationProvider.hashPrefix('');
});

app.controller('mainCtrl', ['$scope', '$location', function ($scope, $location) {
  if (sessionStorage.getItem("log") != "in") {
    window.location.href = "login.html";
  };

  //   $scope.tokenIsValid = function () {
  //     $.ajax({
  //         type: "GET",
  //         url: "url",
  //         data: {
  //         "token": "ENTER THE ACTIVE REFRESH TOKEN HERE"
  //       },
  //       dataType: "dataType",
  //       success: function (response) {

  //       }
  //     });
  // };

  $scope.isActive = function (viewLocation) {
    var str = $location.path();
    var current = (viewLocation === str);
    return current;
  };
}]);