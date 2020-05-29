app.controller("grupoAcessoEdit", function ($scope, $location, $route) {

    $scope.$on('$viewContentLoaded', function () {

        var url = window.location.href;
        grupoId = url.substring(url.lastIndexOf('?') + 1);

        $(document).ready(function () {
            //Nav 
            $('.TabUsuarios').css('display', 'block');
            $('.TabTelasSistema').css('display', 'none');

            $('.userTabOnClick').css('background-color', '#1a2c5e');
            $('.userTabOnClick').css('color', 'white');
            $('.userTabOnClick').css('border-radius', '25px');

            $('.telasTabOnClick').css('background-color', 'whitesmoke');
            $('.telasTabOnClick').css('border-radius', '25px');
            $('.telasTabOnClick').css('color', 'black');

            //Ajax Usuarios
            $.ajax({
                // url: SpiUrl.pessoas.def,
                // method:'GET',
                // async: false,
                // headers: {
                //     "Content-Type": "application/json",
                //     "User": Cookies.get('UId'),
                //     "Screen": $route.routes[$location.path()].controllerAs
                // },
            }).done(function (data) {
                for (i = 0; i < data.length; i++) {
                    $("#nomeUsuario").append("<option value='" + data[i].id + "'>" + data[i].nome + "</option>");
                };
            });

            //Ajax Usuarios Permitidos
            $.ajax({
                // url: SpiUrl.acesso.grupos + grupoId,
                // method:'GET',
                // async: false,
                // headers: {
                //     "Content-Type": "application/json",
                //     "User": Cookies.get('UId'),
                //     "Screen": $route.routes[$location.path()].controllerAs
                // },
            }).done(function (data) {
                var userId = [];
                for (i = 0; i < data.user.length; i++) {
                    userId = data.user[i].id;
                    $("#nomeUsuario").find("option[value='" + userId + "']").attr('selected', 'selected')
                    $("#bootstrap-duallistbox-selected-list_duallistboxUser").trigger('click')
                };
                $('select[name="duallistboxUser"]').bootstrapDualListbox(); //LISTBOX USUARIOS

                $('.btn-spi').css('display', 'none');
                $('.filter').css('position', 'relative').css('margin-left', '5px'); //ajuste css conflito


            });

            //Ajax Telas do Sistema
            $.ajax({
                // url: SpiUrl.acesso.telas,
                // method:'GET',
                // async: false,
                // headers: {
                //     "Content-Type": "application/json",
                //     "User": Cookies.get('UId'),
                //     "Screen": $route.routes[$location.path()].controllerAs
                // },
            }).done(function (data) {
                for (i = 0; i < data.length; i++) {
                    $("#telaSistema").append("<option value='" + data[i].id + "'>" + data[i].name + "</option>");
                };
            });

            //Ajax Telas Permitidas
            $.ajax({
                // url: SpiUrl.acesso.grupos + grupoId,
                // method:'GET',
                // async: false,
                // headers: {
                //     "Content-Type": "application/json",
                //     "User": Cookies.get('UId'),
                //     "Screen": $route.routes[$location.path()].controllerAs
                // },
            }).done(function (data) {
                var screenId = [];
                var trocaTitulo = 'Grupo ' + data.name;
                $('#mudaTitle').html(trocaTitulo);

                for (i = 0; i < data.profileScreen.length; i++) {
                    screenId = data.profileScreen[i].screenId;
                    $("#telaSistema").find("option[value='" + screenId + "']").attr('selected', 'selected')
                    $("#bootstrap-duallistbox-selected-list_duallistboxTelas").trigger('click')
                };
                $('select[name="duallistboxTelas"]').bootstrapDualListbox(); //LISTBOX TELAS

                $('.btn-spi').css('display', 'none');
                $('.filter').css('position', 'relative').css('margin-left', '5px'); //ajuste css conflito
            });
        });

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

        $("#btnSave").click(function () {
            //Ajuste de JSON
            var idUserPermitidos = $('#nomeUsuario').val();
            var arraySendUser = [];
            idUserPermitidos.forEach(element => {
                arraySendUser.push({
                    "id": Number(element)
                });
            });
            //Ajuste de JSON
            var idTelasPermitidas = $('#telaSistema').val();
            var arraySendTelas = [];
            idTelasPermitidas.forEach(element => {
                arraySendTelas.push({
                    "screenId": Number(element)
                });
            });

            data = {
                id: grupoId,
                profileScreen: arraySendTelas,
                user: arraySendUser
            };

            // $.ajax({
            // url: SpiUrl.acesso.grupos,
            // type: 'PUT',
            // data: JSON.stringify(data),
            // processData: false,
            // headers: {
            //     "Content-Type": "application/json",
            //     "User": Cookies.get('UId'),
            //     "Screen": $route.routes[$location.path()].controllerAs
            // },
            // success: function () {
            //         swal({
            //             title: "Grupo editado!",
            //             showConfirmButton: false,
            //             type: "success",
            //             timer: 2000
            //         }).then(function () {
            //             window.location.href = "#/grupo_acesso/";
            //         })
            //     },
            //     error: function (jqXhr, textStatus, errorThrown) {
            //         console.log(errorThrown);
            //         swal({
            //             title: "Ops, algo deu errado!",
            //             showConfirmButton: false,
            //             type: "error",
            //             timer: 2000
            //         })
            //     }
        });
        return false;
    });
});