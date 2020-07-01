var app = angular.module("prometeon", ['ngRoute']);

app.config(function ($routeProvider, $locationProvider) {
  $routeProvider
    .when('/', {
      templateUrl: 'views/Index/inicio.html',
      controller: 'mainCtrl',
      controllerAs: 0
    })
    .when('/Cadastros/GrupoAcesso', {
      templateUrl: 'views/Cadastros/GrupoAcesso/grupoAcesso.html',
      controller: 'grupoAcesso',
      controllerAs: 1
    })
    .when('/Cadastros/GrupoAcesso/Edit', {
      templateUrl: 'views/Cadastros/GrupoAcesso/grupoAcessoEdit.html',
      controller: 'grupoAcessoEdit',
      controllerAs: 1
    })
    .when('/Cadastros/Materiais', {
      templateUrl: 'views/Cadastros/Materiais/materiais.html',
      controller: 'materiais',
      controllerAs: 2
    })
    .when('/Cadastros/OrdemProducao', {
      templateUrl: 'views/Cadastros/OrdemProducao/ordemProducao.html',
      controller: 'ordemProducao',
      controllerAs: 3
    })
    .when('/Cadastros/OrdemProducao/Overview', {
      templateUrl: 'views/Cadastros/OrdemProducao/ordemProducaoOverview.html',
      controller: 'ordemProducaoOverview',
      controllerAs: 3
    })
    .when('/Cadastros/PlantModel', {
      templateUrl: 'views/Cadastros/PlantModel/plantModel.html',
      controller: 'plantModel',
      controllerAs: 4
    })
    .when('/Cadastros/Receitas', {
      templateUrl: 'views/Cadastros/Receitas/receitas.html',
      controller: 'receitas',
      controllerAs: 5
    })
    .when('/Cadastros/Receitas/HistoricoRevisao', {
      templateUrl: 'views/Cadastros/Receitas/receitasHistoricoRevisao.html',
      controller: 'receitasHistoricoRevisao',
      controllerAs: 5
    })
    .when('/Cadastros/Turnos', {
      templateUrl: 'views/Cadastros/Turnos/turno.html',
      controller: 'turno',
      controllerAs: 6
    })
    .when('/Cadastros/Turno/Excecao', {
      templateUrl: 'views/Cadastros/Turnos/excecaoTurno.html',
      controller: 'excecaoTurno',
      controllerAs: 6
    })
    .when('/Cadastros/Usuarios', {
      templateUrl: 'views/Cadastros/Usuarios/usuario.html',
      controller: 'usuario',
      controllerAs: 7
    })
    .when('/Relatorio/Carga/MP', {
      templateUrl: 'views/Index/inicio.html',
      controller: 'relatorios',
      controllerAs: 8
    })
    .when('/Relatorio/Carga/ParamProducao', {
      templateUrl: 'views/Index/inicio.html',
      controller: 'relatorios',
      controllerAs: 9
    })
    .when('/Relatorio/GoldenBatch', {
      templateUrl: 'views/Index/inicio.html',
      controller: 'relatorios',
      controllerAs: 10
    })
    .when('/Relatorio/Producao', {
      templateUrl: 'views/Index/inicio.html',
      controller: 'relatorios',
      controllerAs: 11
    })
    .otherwise({
      redirectTo: '/login.html'
    });
  $locationProvider.hashPrefix('');
});

app.controller('mainCtrl', ['$scope', '$http', '$location', function ($scope, $http, $location) {
  if (sessionStorage.getItem("log") != "in") {
    window.location.href = "login.html";
  };

  $scope.$on('$viewContentLoaded', function () {
    var objTelas = sessionStorage.getItem("screen");
    var objTelas = objTelas.split(',');

    objTelas.forEach(element => {
      $(`#screen${element}`).show();
    });
  });
  
  $scope.logout = () => {
    $http.get(Url.usuarios.def + `/${sessionStorage.getItem("id")}/refresh-tokens`).then(function successCallback(response) {
      var data = {
        "token": response.data[response.data.length - 1].token
      };
      $http.post(Url.usuarios.logout, JSON.stringify(data)).then(function successCallback() {
        sessionStorage.clear();
        window.location.href = "login.html";
      }, function errorCallback(response) {
        console.log(response);
      });
    }, function errorCallback(response) {
      console.log(response);
    });
  };

  $scope.isActive = function (viewLocation) {
    var str = $location.path();
    var current = (viewLocation === str);
    return current;
  };
}]);

app.run(function ($rootScope, $route) {
  $rootScope.$on("$locationChangeSuccess", function (event, next, current) {
    var objScreen = sessionStorage.getItem("screen");
    var objTelas = objScreen.split(',');
    objScreen = [];

    objTelas.map(x => {
      objScreen.push(Number(x))
    });

    if (!objScreen.includes($route.current.$$route.controllerAs)) {
      if ($route.current.originalPath !== "/") {
        window.location.href = "/";
      };
    };
  });
});