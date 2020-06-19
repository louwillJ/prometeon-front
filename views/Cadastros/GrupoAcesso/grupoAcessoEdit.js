app.controller("grupoAcessoEdit", function ($scope, $http, $route, $location) {
    //SCOPE VARIABLE
    $scope.idScreen = $location.search().screen;
    $scope.usuarios = []
    $scope.usuariosDbB4Save = []
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
            console.log(response);
        });

        $http.get(Url.usuarios.def).then(function successCallback(response) {
            $scope.usuarios = response.data;
            setTimeout(() => {
                $scope.getScreen();
            }, 100);
        }, function errorCallback(response) {
            console.log(response);
        });
    };

    $scope.getScreen = () => {
        $http.get(Url.acesso.screen).then(function successCallback(response) {
            $scope.telas = response.data;
        }, function errorCallback(response) {
            console.log(response);
        });

        $http.get(Url.acesso.def).then(function successCallback(response) {
            $scope.telasPermitidas = response.data;
            setTimeout(() => {
                $scope.getGrupos();
            }, 100);
        }, function errorCallback(response) {
            console.log(response);
        });
    };

    $scope.getGrupos = () => {
        //Grupos
        for (i = 0; i < $scope.usuarios.length; i++) {
            if ($scope.usuarios[i].usR_ACCESS_LEVEL == $scope.idScreen) {
                $scope.usuariosDbB4Save.push($scope.usuarios[i].usR_ID);
                $("#nomeUsuario").find("option[value='" + $scope.usuarios[i].usR_ID + "']").attr('selected', 'selected');
                $("#bootstrap-duallistbox-selected-list_duallistboxUser").trigger('click');
            };
        };
        $('#nomeUsuario').bootstrapDualListbox();

        //Telas
        for (i = 0; i < $scope.telasPermitidas.length; i++) {
            for (j = 0; j < $scope.telas.length; j++) {
                if ($scope.telasPermitidas[i].leV_ID == $scope.idScreen) {
                    if ($scope.telas[j].srC_ID == $scope.telasPermitidas[i].srC_ID) {
                        $("#telaSistema").find("option[value='" + $scope.telasPermitidas[i].scR_ID + "']").attr('selected', 'selected');
                        $("#bootstrap-duallistbox-selected-list_duallistboxTelas").trigger('click');
                    };
                };
            };
        };
        $('#telaSistema').bootstrapDualListbox(); //LISTBOX TELAS
    };
    // console.log($scope.usuariosDbB4Save);

    $scope.saveData = () => {
        //Ajuste de JSON
        var idUserPermitidos = $('#nomeUsuario').val();
        var userObjData0 = [];
        var userObjData = [];

        $scope.usuariosDbB4Save.forEach(element => {
            userObjData0.push({
                "usR_ID": Number(element),
                "usR_ACCESS_LEVEL": 0
            });
        });

        idUserPermitidos.forEach(element => {
            userObjData.push({
                "usR_ID": Number(element),
                "usR_ACCESS_LEVEL": Number($scope.idScreen)
            });
        })
        //Ajuste de JSON
        var idTelasPermitidas = $('#telaSistema').val();
        var arraySendTelas = [];
        idTelasPermitidas.forEach(element => {
            arraySendTelas.push({
                "scR_ID": Number(element)
            });
        });
        // console.log(userObjData);
        // console.log(arraySendTelas);

        $http.put(Url.usuarios.def, JSON.stringify(userObjData0)).then(function successCallback() {
            $http.put(Url.usuarios.def, JSON.stringify(userObjData)).then(function successCallback() {
                Swal.fire({
                    title: `Grupo Salvo!`,
                    type: 'success',
                    showConfirmButton: false,
                    timer: 2000
                }).then(function () {
                    $route.reload();
                });
            }, function errorCallback(response) {
                console.log(response);
            });
        }, function errorCallback(response) {
            console.log(response);
        });
    }
});