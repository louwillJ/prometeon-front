app.controller("grupoAcessoEdit", ['$scope', '$http', '$route', '$location', function ($scope, $http, $route, $location) {
    //SCOPE VARIABLE
    $scope.idLevel = $location.search().screen;
    $scope.usuarios = []
    $scope.usuariosDbB4Save = []
    $scope.telas = []
    $scope.telasToDelete = []
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

        //Tab Grupos
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
        $http.get(Url.acesso.grupo + `/${$scope.idLevel}`).then(function successCallback(response) {
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

        $http.get(Url.acesso.man).then(function successCallback(response) {
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
            if ($scope.usuarios[i].usR_ACCESS_LEVEL == $scope.idLevel) {
                $scope.usuariosDbB4Save.push($scope.usuarios[i].usR_ID);
                $("#nomeUsuario").find("option[value='" + $scope.usuarios[i].usR_ID + "']").attr('selected', 'selected');
                $("#bootstrap-duallistbox-selected-list_duallistboxUser").trigger('click');
            };
        };
        $('#nomeUsuario').bootstrapDualListbox();

        //Telas
        for (i = 0; i < $scope.telasPermitidas.length; i++) {
            for (j = 0; j < $scope.telas.length; j++) {
                if ($scope.telasPermitidas[i].leV_ID == $scope.idLevel) {
                    if ($scope.telas[j].scR_ID == $scope.telasPermitidas[i].scR_ID) {
                        $scope.telasToDelete.push($scope.telasPermitidas[i].maN_ID)
                        $("#telaSistema").find("option[value='" + $scope.telasPermitidas[i].scR_ID + "']").attr('selected', 'selected');
                        $("#bootstrap-duallistbox-selected-list_duallistboxTelas").trigger('click');
                    };
                } else {
                    // $scope.telasToDelete.push(!$scope.telasToDelete.includes($scope.telasPermitidas[i].maN_ID) ? $scope.telasPermitidas[i].maN_ID : 0);
                };
            };
        };
        $('#telaSistema').bootstrapDualListbox(); //LISTBOX TELAS
    };
    // console.log($scope.usuariosDbB4Save);

    $scope.saveData = () => {
        //Users
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
                "usR_ACCESS_LEVEL": Number($scope.idLevel)
            });
        })

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

        //Telas
        $scope.telasToDelete = $scope.telasToDelete.filter(e => e !== 0); //remove 0 values $scope.telasToDelete.push
        var objTelasPermitidas = $('#telaSistema').val();
        var objPostTelas = [];

        $scope.telasToDelete.forEach(element => {
            $http.delete(Url.acesso.man + `/${element}`).then(function successCallback() {}, function errorCallback(response) {
                console.log(response);
            });
        });

        objTelasPermitidas.forEach(element => {
            objPostTelas.push({
                "leV_ID": Number($scope.idLevel),
                "scR_ID": Number(element),
                "maN_WRITE": true,
                "maN_EDIT": true,
                "maN_DELETE": true,
                "maN_ACTIVE": true,
            });
        });

        $http.post(Url.acesso.man, JSON.stringify(objPostTelas)).then(function successCallback() {}, function errorCallback(response) {
            console.log(response);
        });
    };

    $("#btnEditar").click(function () {
        Swal.fire({
            title: 'Editar Grupo de Acesso',
            html: '<div>' +
                '<label class="col-form-label">Nome do Grupo</label>' +
                '<input type="text" class="form-control" id="nomeGrupo">' +
                '</div>',
            preConfirm: () => {
                if ($('#nomeGrupo').val()) {
                    var data = {
                        leV_ID: Number($scope.idLevel),
                        leV_NAME: $("#nomeGrupo").val(),
                        leV_ACTIVE: true
                    };

                    $http({
                        url: Url.acesso.grupo + `/${$scope.idLevel}`,
                        method: 'PUT',
                        data: JSON.stringify(data)
                    }).then(function successCallback() {
                        Swal.fire({
                            title: 'Grupo de Acesso Editado!',
                            type: 'success',
                            showConfirmButton: false,
                            timer: 2000
                        }).then(function () {
                            $route.reload();
                        });
                    }, function errorCallback() {
                        Swal.fire({
                            title: 'Refaça operação',
                            type: 'error',
                            showConfirmButton: false,
                            timer: 2000
                        });
                    });
                };
            }
        });
    });

    $("#btnExcluir").click(function () {
        Swal.fire({
            title: `Excluir Grupo?`,
            text: `Esta operação não poderá ser desfeita!`,
            type: 'warning',
            showCancelButton: true,
            reverseButtons: true,
            allowOutsideClick: false,
            confirmButtonText: 'Confirmar',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.value) {
                $http({
                    url: Url.acesso.grupo + `/${$scope.idLevel}`,
                    method: 'DELETE',
                    processData: false
                }).then(function successCallback() {
                    Swal.fire({
                        title: 'Grupo Excluído!',
                        type: 'success',
                        showConfirmButton: false,
                        timer: 2000
                    }).then(function () {
                        $("#btnReturn").click();
                        // $route.reload();
                    });
                }, function errorCallback() {
                    Swal.fire({
                        title: 'Refaça operação',
                        type: 'error',
                        showConfirmButton: false,
                        timer: 2000
                    }).then(function () {
                        // $("#btnReturn").click();
                    });
                });
            } else {
                // $("#btnCancelar").click();
            };
        });
    });
}]);