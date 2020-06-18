app.controller("grupoAcessoEdit", function ($scope, $http, $route, $location) {
    //SCOPE VARIABLE
    $scope.idScreen = $location.search().screen;
    $scope.usuarios = []
    $scope.telas = []
    $scope.telasPermitidas = []

    $scope.$on("$viewContentLoaded", function () {
        $('#Cadastros').addClass('show');

        //GET Usuarios
        $scope.getUsuarios();

        //Nav
        $('.TabUsuarios').css('display', 'block');
        $('.TabTelasSistema').css('display', 'none');

        $('.userTabOnClick, .moveall, .move, .telasTabOnClick').css('background-color', '#1a2c5e');
        $('.userTabOnClick').css('color', 'white');
        $('.userTabOnClick').css('border-radius', '25px');

        $('.telasTabOnClick').css('background-color', 'whitesmoke');
        $('.telasTabOnClick').css('border-radius', '25px');
        $('.telasTabOnClick').css('color', 'black');

        //Tab Usuários
        $('body').on('click', '.userTabOnClick', function () {
            $('.TabTelasSistema').css('display', 'none');
            $('.TabUsuarios').css('display', 'block');
            $('.userTabOnClick').css('background-color', '#1a2c5e');
            $('.userTabOnClick').css('color', 'white');
            $('.userTabOnClick').css('border-radius', '25px');
            $('.telasTabOnClick').css('background-color', 'whitesmoke');
            $('.telasTabOnClick').css('border-radius', '25px');
            $('.telasTabOnClick').css('color', 'black');
        });
        //Tab Telas
        $('body').on('click', '.telasTabOnClick', function () {
            $('.TabUsuarios').css('display', 'none');
            $('.TabTelasSistema').css('display', 'block');
            $('.userTabOnClick').css('background-color', 'none');
            $('.telasTabOnClick').css('background-color', '#1a2c5e');
            $('.telasTabOnClick').css('color', 'white');
            $('.telasTabOnClick').css('border-radius', '25px');
            $('.userTabOnClick').css('background-color', 'whitesmoke');
            $('.userTabOnClick').css('border-radius', '25px');
            $('.userTabOnClick').css('color', 'black');
        });
    });

    $scope.getUsuarios = () => {
        $http.get(Url.acesso.grupo + `/${$scope.idScreen}`).then(function successCallback(response) {
            $('#lvlTitle').text(response.data.leV_NAME);
        }, function errorCallback(response) {
            console.log(response)
        });
        
        $http.get(Url.usuarios.def).then(function successCallback(response) {
            $scope.usuarios = response.data;
            setTimeout(() => {
                $scope.getScreen();
            }, 100);
        }, function errorCallback(response) {
            console.log(response)
        });
    };

    $scope.getScreen = () => {
        $http.get(Url.acesso.screen).then(function successCallback(response) {
            $scope.telas = response.data;
        }, function errorCallback(response) {
            console.log(response)
        });

        $http.get(Url.acesso.def).then(function successCallback(response) {
            $scope.telasPermitidas = response.data;
            setTimeout(() => {
                $scope.getGrupos();
            }, 100);
        }, function errorCallback(response) {
            console.log(response)
        });
    };

    $scope.getGrupos = () => {
        //Grupos
        for (i = 0; i < $scope.usuarios.length; i++) {
            if ($scope.usuarios[i].usR_ACCESS_LEVEL == $scope.idScreen) {
                $("#nomeUsuario").find("option[value='" + $scope.usuarios[i].usR_ID + "']").attr('selected', 'selected');
                $("#bootstrap-duallistbox-selected-list_duallistboxUser").trigger('click');
            };
        };
        $('#nomeUsuario').bootstrapDualListbox();

        //Telas
        for (i = 0; i < $scope.telasPermitidas.length; i++) {
            for (j = 0; j < $scope.telas.length; j++) {
                if ($scope.telas[j].srC_ID == $scope.telasPermitidas[i].srC_ID) {
                    $("#telaSistema").find("option[value='" + $scope.telasPermitidas[i].scR_ID + "']").attr('selected', 'selected')
                    $("#bootstrap-duallistbox-selected-list_duallistboxTelas").trigger('click')
                };
            };
        };
        $('#telaSistema').bootstrapDualListbox(); //LISTBOX TELAS
    };

    $scope.saveData = () => {
        //Ajuste de JSON
        var idUserPermitidos = $('#nomeUsuario').val();
        var arraySendUser = [];
        idUserPermitidos.forEach(element => {
            arraySendUser.push({
                "usR_ID": Number(element)
            });
        });
        //Ajuste de JSON
        var idTelasPermitidas = $('#telaSistema').val();
        var arraySendTelas = [];
        idTelasPermitidas.forEach(element => {
            arraySendTelas.push({
                "scR_ID": Number(element)
            });
        });
        console.log(arraySendUser);
        console.log(arraySendTelas);

        //Prepara DATA

        // var usrData = {
        //     usR_ID: arraySendUser[i],
        //     usR_NAME: $("#inputUser").val(),
        //     usR_EMAIL: $("#inputNome").val(),
        //     usR_SENHA: $("#inputSenha").val(),
        //     USR_ACCESS_LEVEL: parseInt($("#inputAcesso").val()),
        //     usR_ACTIVE: true
        // };

        //  url: Url.usuarios.def + `/${_idUser}`,
        // $scope.grupo.user = arraySendUser;

        // $http.put('http://spi073:8010/authorize/api/Profile', JSON.stringify($scope.grupo)).then(function successCallback(response) {
        //     console.log('SUCESSO')
        // }, function errorCallback(response) {
        //     console.log(response)
        // });
    }
});