app.controller('receitas', ['$scope', '$route', '$http', function ($scope, $route, $http) {
    var consulta = 0;

    $scope.$on('$viewContentLoaded', function () {
        $('#Cadastros').addClass('show');

        $scope.getReceita();

        $scope.tableR = $('#datatable_receita').DataTable({
            "jQueryUI": true,
            "language": {
                "decimal": "",
                "emptyTable": "Nenhum resultado encontrado",
                "info": "Mostrando _START_ à _END_ de _TOTAL_ resultados",
                "infoEmpty": "Mostrando 0 à 0 de 0 resultados",
                "infoFiltered": "(filtrado de _MAX_ total resultados)",
                "infoPostFix": "",
                "thousands": ",",
                "lengthMenu": "Mostrar _MENU_ resultados",
                "loadingRecords": "Carregando...",
                "processing": "Processando...",
                "search": "Procurar entrada:",
                "zeroRecords": "Nenhum resultado encontrado com a busca",
                "paginate": {
                    "first": "Primeira",
                    "last": "Última",
                    "next": "Próxima",
                    "previous": "Anterior"
                },
                "aria": {
                    "sortAscending": ": Ative para ordenar a coluna em ordem crescente",
                    "sortDescending": ": Ative para ordenar a coluna em ordem decrescente"
                }
            },
            "pagingType": "full_numbers",
            "lengthMenu": [
                [10, 25, 50, -1],
                [10, 25, 50, "All"]
            ],
            dom: "<'row'<'col-sm-12 col-md-6'l><'col-sm-12 col-md-6'f>>" +
                "<'row'<'col-sm-12'tr>>" +
                "<'row'<'col-sm-12 col-md-5'i><'col-sm-12 col-md-7'p>>",
            responsive: true
        });
    });

    $('#datatable_mp tbody').on('click', 'tr', function () {
        console.log("passou na MP:" + $("#fieldMP").attr("disabled"));

        if (!$("#fieldMP").attr("disabled")) { //se o fieldSet estiver Habilitado

            var data = $scope.tableMP.row(this).data();

            $("#Cadastro_Materiais").show();

            $("#inputMPId").val(data.mppaR_ID);
            $("#inputMPCespec").val(data.c_ESPEC);
            $("#inputMPMtCode").val(data.maT_SAP_CODE);
            $("#inputMPIdRec").val(data.iD_RECEITA);
            $("#inputMPChildMat").val(data.chilD_MAT_SAP_CODE);
            $("#inputPeso").val(data.boM_QUANTITY);
            $("#inputTolMax").val(data.mppaR_TOLMAX);
            $("#inputTolMin").val(data.mppaR_TOLMIN);
            $("#inputVelRap").val(data.mppaR_VELRAP);
            $("#inputVelLen").val(data.mppaR_VELLEN);
            $("#inputVelJog").val(data.mppaR_VELJOG);
            $("#inputPesLen").val(data.mppaR_PESOLEN);
            $("#inputPesJog").val(data.mppaR_PESOJOG);
            $("#inputTemJog").val(data.mppaR_TEMPOJOG);
            $("#inputSilTan").val(data.mppaR_SILOTANQUE);

            //$("#btnExcluir").css("display", "block");
            //$("#btnTurno").removeClass("btn-success").addClass("btn-warning").text("Editar");

        };

    });

    $('#datatable_op tbody').on('click', 'tr', function () {
        var data = tableOP.row(this).data();
        console.log("passou na operacao:");

        if (!$("#fieldOper").attr("disabled")) { //se o fieldSet estiver Habilitado

            //$(this).css('background', '#90EE90');

            $("#Cadastro_Operacao").show();

            $("#inputCodIdOper").val(data.rproC_ID);
            $("#inputOperCespec").val(data.c_ESPEC);
            $("#inputOperMatCod").val(data.maT_SAP_CODE);
            $("#inputOperIdRec").val(data.iD_RECEITA);
            $("#inputOperSeq").val(data.opeR_SEQ);
            $("#inputCodOper").val(data.opeR_COD);
            $("#inputDescOper").val(data.opeR_DESC);
            $("#inputTempoOp").val(data.rproC_TEMPO);
            $("#inputEnergia").val(data.rproC_ENERGIA);
            $("#inputRPM").val(data.rproC_RPM);
            $("#inputTempOper").val(data.rproC_TEMPERATURA);
            $("#inputPressao").val(data.rproC_PRESSAOPISTAO);

            //$("#btnExcluir").css("display", "block");
            //$("#btnTurno").removeClass("btn-success").addClass("btn-warning").text("Editar");

        };
    });

    $("#btnCancelarPesquisa").click(function () {
        location.reload();
    });

    $("#btnCancelarMP").click(function () {
        //$("#btnTurno").removeClass("btn-warning").addClass("btn-success").text("Cadastrar");
        //$("#btnExcluir").css("display", "none");

        $("#inputMPId").val("");
        $("#inputMPCespec").val("");
        $("#inputMPMtCode").val("");
        $("#inputMPIdRec").val("");
        $("#inputMPChildMat").val("");
        $("#inputPeso").val("");
        $("#inputTolMax").val("");
        $("#inputTolMin").val("");
        $("#inputVelRap").val("");
        $("#inputVelLen").val("");
        $("#inputVelJog").val("");
        $("#inputPesLen").val("");
        $("#inputPesJog").val("");
        $("#inputTemJog").val("");
        $("#inputSilTan").val("");

        $("#Cadastro_Materiais").css("display", "none");
    });

    $("#btnCancelarOperacao").click(function () {
        //$("#btnTurno").removeClass("btn-warning").addClass("btn-success").text("Cadastrar");
        //$("#btnExcluir").css("display", "none");

        $("#inputCodIdOper").val("");
        $("#inputOperCespec").val("");
        $("#inputOperMatCod").val("");
        $("#inputOperIdRec").val("");
        $("#inputOperSeq").val("");
        $("#inputCodOper").val("");
        $("#inputDescOper").val("");
        $("#inputTempoOp").val("");
        $("#inputEnergia").val("");
        $("#inputRPM").val("");
        $("#inputTempOper").val("");
        $("#inputPressao").val("");

        $("#Cadastro_Operacao").css("display", "none");
    });

    $("#btnCancelarProcesso").click(function () {
        $("#btnSalvarProcesso").css("display", "none");
        $("#btnCancelarProcesso").css("display", "none");
        $("#btnEditarProcesso").css("display", "block");

        //$("#inputProcId").prop("disabled", false);
        //$("#inputProcIdRec").prop("disabled", false);
        //$("#inputProcEspec").prop("disabled", false);
        //$("#inputProcMatCod").prop("disabled", false);
        $("#inputTempMix1").prop("disabled", true);
        $("#inputTempMix2").prop("disabled", true);
        $("#inputTempMix3").prop("disabled", true);
        $("#inputTempSegur").prop("disabled", true);
        $("#inputPresSonda").prop("disabled", true);
        $("#inputVelRotor").prop("disabled", true);
        $("#inputNota").prop("disabled", true);


        var idProcesso = $("#inputProcId").val();

        //RECARREGA CAMPOS DE PROCESSO SEM SALVAR
        $.getJSON(Url.receita.processo + `${idProcesso}`, function (data) {
            $.each(data, function (key, val) {

                $("#inputProcId").val(val.rproC_ID);
                $("#inputProcIdRec").val(val.iD_RECEITA);
                $("#inputProcEspec").val(val.c_ESPEC);
                $("#inputProcMatCod").val(val.maT_SAP_CODE);
                $("#inputTempMix1").val(val.rproC_TEMPMIXER1);
                $("#inputTempMix2").val(val.rproC_TEMPMIXER2);
                $("#inputTempMix3").val(val.rproC_TEMPMIXER3);
                $("#inputTempSegur").val(val.rproC_TEMPSEGURANCA);
                $("#inputPresSonda").val(val.rproC_PRESSAOSONDA);
                $("#inputVelRotor").val(val.rproC_VELOCROTOR);
                $("#inputNota").val(val.rproC_NOTAS);

            });
        });
    });

    $("#btnEditarProcesso").click(function () {
        $("#btnSalvarProcesso").css("display", "block");
        $("#btnEditarProcesso").css("display", "none");
        $("#btnCancelarProcesso").css("display", "block");
        //$("#btnExcluir").css("display", "none");

        //$("#inputProcId").prop("disabled", false);
        //$("#inputProcIdRec").prop("disabled", false);
        //$("#inputProcEspec").prop("disabled", false);
        //$("#inputProcMatCod").prop("disabled", false);
        $("#inputTempMix1").prop("disabled", false);
        $("#inputTempMix2").prop("disabled", false);
        $("#inputTempMix3").prop("disabled", false);
        $("#inputTempSegur").prop("disabled", false);
        $("#inputPresSonda").prop("disabled", false);
        $("#inputVelRotor").prop("disabled", false);
        $("#inputNota").prop("disabled", false);
    });

    $("#btnGerarNovaReceita").click(function () {
        if ($("#btnGerarNovaReceita").hasClass("btn-success")) { //CRIAR NOVA VERSÃO
            Swal.fire({
                title: `Uma nova versão da receita selecionada será gerada. Deseja Continuar?`,
                type: 'warning',
                showCancelButton: true,
                reverseButtons: true,
                allowOutsideClick: false,
                confirmButtonText: 'Confirmar',
                cancelButtonText: 'Cancelar'
            }).then((result) => {
                if (result.value) {

                    var idReceitaAtual = $('#selectIdReceita option:selected').val();

                    $http({
                        url: Url.receita.overview + `?idReceita=${idReceitaAtual}&operacao=INSERT`,
                        method: 'POST',
                        processData: false
                    }).then(function successCallback(data) {
                        if (!data) {

                            Swal.fire({
                                title: 'Ocorreu um erro!',
                                type: 'error',
                                showConfirmButton: false,
                                timer: 2000
                            }).then(function () {
                                // table.ajax.reload();
                            });

                        } else {

                            if (data[0].tipO_RETORNO == 'S') {
                                Swal.fire({
                                    title: data[0].retorno,
                                    type: 'success',
                                    showConfirmButton: false,
                                    timer: 2000
                                }).then(function () {
                                    $('#btnGerarNovaReceita').css("display", "none");
                                    //atribui o id da nova receita gerado, e recarrega toda a tela com o novo id da receita
                                    consulta = data[0].novO_ID;
                                    $('#selectIdReceita').change();
                                    $("#btnGerarNovaReceita").removeClass("btn-success").addClass("btn-danger").text("Excluir versão em andamento");
                                    $("#btnCancelarPesquisa").css("display", "none");
                                    $("#selectIdReceita").prop("disabled", "true"); //bloqueia a seleção de outra lista                                        
                                    $("#btnFinalizarNovaVersao").css("display", "block"); //exibe botão finalizar                                                                             

                                });

                            } else {

                                Swal.fire({
                                    title: data[0].retorno,
                                    type: 'error',
                                    showConfirmButton: false,
                                    timer: 2000
                                }).then(function () {
                                    //table.ajax.reload();
                                });
                            }

                        }
                    }, function errorCallback() {
                        Swal.fire({
                            title: 'Refaça operação',
                            type: 'error',
                            showConfirmButton: false,
                            timer: 2000
                        });
                    });

                } else {
                    $("#btnCancelar").click();
                };
            });
        } else if ($("#btnGerarNovaReceita").hasClass("btn-danger")) { //ELIMINAR NOVA VERSÃO 
            Swal.fire({
                title: `A nova versão da receita selecionada será eliminada. Deseja Continuar?`,
                type: 'warning',
                showCancelButton: true,
                reverseButtons: true,
                allowOutsideClick: false,
                confirmButtonText: 'Confirmar',
                cancelButtonText: 'Cancelar'
            }).then((result) => {
                if (result.value) {

                    var idReceitaAtual = consulta;

                    $http({
                        url: Url.receita.overview + `?idReceita=${idReceitaAtual}&operacao=DELETE`,
                        method: 'POST',
                        processData: false
                    }).then(function successCallback(data) {
                        if (!data) {

                            Swal.fire({
                                title: 'Ocorreu um erro!',
                                type: 'error',
                                showConfirmButton: false,
                                timer: 2000
                            }).then(function () {
                                // table.ajax.reload();
                            });

                        } else {

                            if (data[0].tipO_RETORNO == 'S') {
                                Swal.fire({
                                    title: data[0].retorno,
                                    type: 'success',
                                    showConfirmButton: false,
                                    timer: 2000
                                }).then(function () {
                                    location.reload();
                                });

                            } else {

                                Swal.fire({
                                    title: data[0].retorno,
                                    type: 'error',
                                    showConfirmButton: false,
                                    timer: 2000
                                }).then(function () {
                                    //table.ajax.reload();
                                });
                            }

                        }
                    }, function errorCallback() {
                        Swal.fire({
                            title: 'Refaça operação',
                            type: 'error',
                            showConfirmButton: false,
                            timer: 2000
                        });
                    });

                } else {
                    $("#btnCancelar").click();
                };
            });
        };
    });

    $("#btnFinalizarNovaVersao").click(function () {

        Swal.fire({
            title: `A Edição da versão atual será finalizada, deseja continuar?`,
            text: `Esta versão da receita não poderá ser editada novamente.`,
            type: 'warning',
            showCancelButton: true,
            reverseButtons: true,
            allowOutsideClick: false,
            confirmButtonText: 'Confirmar',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.value) {
                $("#btnCancelarPesquisa").click();
            }
        });

    });

    $("#btnSalvarMaterial").click(function () {
        if ($("#inputPeso").val() != '') {

            Swal.fire({
                title: `Cadastrar Parâmetros para a matéria prima?`,
                type: 'warning',
                showCancelButton: true,
                reverseButtons: true,
                allowOutsideClick: false,
                confirmButtonText: 'Confirmar',
                cancelButtonText: 'Cancelar'
            }).then((result) => {
                if (result.value) {

                    var idMP = $("#inputMPId").val();
                    console.log(idMP);
                    var data = {

                        mppaR_ID: parseInt($("#inputMPId").val()),
                        c_ESPEC: $("#inputMPCespec").val(),
                        maT_SAP_CODE: $("#inputMPMtCode").val(),
                        iD_RECEITA: parseInt($("#inputMPIdRec").val()),
                        chilD_MAT_SAP_CODE: $("#inputMPChildMat").val(),
                        boM_QUANTITY: parseFloat($("#inputPeso").val().replace(",", ".")),
                        mppaR_TOLMIN: parseInt($("#inputTolMin").val()),
                        mppaR_TOLMAX: parseInt($("#inputTolMax").val()),
                        mppaR_VELRAP: parseInt($("#inputVelRap").val()),
                        mppaR_VELLEN: parseInt($("#inputVelLen").val()),
                        mppaR_VELJOG: parseInt($("#inputVelJog").val()),
                        mppaR_PESOLEN: parseInt($("#inputPesLen").val()),
                        mppaR_PESOJOG: parseInt($("#inputPesJog").val()),
                        mppaR_TEMPOJOG: parseInt($("#inputTemJog").val()),
                        mppaR_SILOTANQUE: parseInt($("#inputSilTan").val())

                    };

                    $http({
                        url: Url.receita.mp + `${idMP}`,
                        method: 'PUT',
                        data: JSON.stringify(data),
                        processData: false
                    }).then(function successCallback() {
                        Swal.fire({
                            title: 'Parâmetros da MP Cadastrados!',
                            type: 'success',
                            showConfirmButton: false,
                            timer: 2000
                        }).then(function () {
                            $("#btnCancelarMP").click();
                            // $scope.tableMP.ajax.reload();
                            $("#Cadastro_Materiais").css("display", "none");
                        });
                    }, function errorCallback() {
                        Swal.fire({
                            title: 'Refaça operação',
                            type: 'error',
                            showConfirmButton: false,
                            timer: 2000
                        });
                    });

                } else {
                    $("#btnCancelar").click();
                };
            });
        } else {
            Swal.fire({
                title: 'É necessário preencher o campo Peso.',
                type: 'info',
                showConfirmButton: false,
                timer: 2000
            }).then(function () {
                // $("#btnCancelar").click();
                $("#inputPeso").focus();
            });
        }
    });

    $("#btnSalvarOperacao").click(function () {
        if ($("#btnSalvarOperacao").hasClass("btn-success")) {
            Swal.fire({
                title: `Cadastrar Parâmetros para a Operação?`,
                type: 'warning',
                showCancelButton: true,
                reverseButtons: true,
                allowOutsideClick: false,
                confirmButtonText: 'Confirmar',
                cancelButtonText: 'Cancelar'
            }).then((result) => {
                if (result.value) {

                    var idOper = $("#inputCodIdOper").val();
                    console.log(idOper);
                    var data = {

                        rproC_ID: parseInt($("#inputCodIdOper").val()),
                        c_ESPEC: $("#inputOperCespec").val(),
                        maT_SAP_CODE: $("#inputOperMatCod").val(),
                        iD_RECEITA: parseInt($("#inputOperIdRec").val()),
                        opeR_SEQ: parseInt($("#inputOperSeq").val()),
                        opeR_COD: parseInt($("#inputCodOper").val()),
                        opeR_DESC: parseInt($("#inputDescOper").val()),
                        rproC_TEMPO: parseInt($("#inputTempoOp").val()),
                        rproC_ENERGIA: parseInt($("#inputEnergia").val()),
                        rproC_RPM: parseFloat($("#inputRPM").val().replace(",", ".")),
                        rproC_TEMPERATURA: parseFloat($("#inputTempOper").val().replace(",", ".")),
                        rproC_PRESSAOPISTAO: parseFloat($("#inputPressao").val().replace(",", "."))

                    };
                    $http({
                        url: Url.receita.operacao + `${idOper}`,
                        method: 'PUT',
                        data: JSON.stringify(data),
                        processData: false
                    }).then(function successCallback() {
                        Swal.fire({
                            title: 'Parâmetros da Operação Cadastrados!',
                            type: 'success',
                            showConfirmButton: false,
                            timer: 2000
                        }).then(function () {
                            $("#btnCancelarOperacao").click();
                            // tableOP.ajax.reload();
                            $("#Cadastro_Operacao").css("display", "none");
                        });
                    }, function errorCallback() {
                        Swal.fire({
                            title: 'Refaça operação',
                            type: 'error',
                            showConfirmButton: false,
                            timer: 2000
                        });
                    });

                } else {
                    $("#btnCancelar").click();
                };
            });
        } else if ($("#btnSalvarOperacao").hasClass("btn-warning")) {
            Swal.fire({
                title: `Editar Parâmetros da Operacao?`,
                type: 'warning',
                showCancelButton: true,
                reverseButtons: true,
                allowOutsideClick: false,
                confirmButtonText: 'Confirmar',
                cancelButtonText: 'Cancelar'
            }).then((result) => {
                if (result.value) {
                    Swal.fire({
                        title: 'Parâmetros da Operação alterados!',
                        type: 'success',
                        showConfirmButton: false,
                        timer: 2000
                    }).then(function () {
                        $("#btnCancelarOperacao").click();
                    });
                } else {
                    $("#btnCancelarOperacao").click();
                };
            });
        };
    });

    $("#btnSalvarProcesso").click(function () {
        if ($("#btnSalvarProcesso").hasClass("btn-success")) {
            Swal.fire({
                title: `Cadastrar Parâmetros de Processo para a Receita?`,
                type: 'warning',
                showCancelButton: true,
                reverseButtons: true,
                allowOutsideClick: false,
                confirmButtonText: 'Confirmar',
                cancelButtonText: 'Cancelar'
            }).then((result) => {
                if (result.value) {

                    var idProc = $("#inputProcId").val();
                    console.log(idProc);
                    var data = {

                        rproC_ID: parseInt($("#inputProcId").val()),
                        iD_RECEITA: parseInt($("#inputProcIdRec").val()),
                        c_ESPEC: $("#inputProcEspec").val(),
                        maT_SAP_CODE: $("#inputProcMatCod").val(),
                        rproC_TEMPMIXER1: parseFloat($("#inputTempMix1").val().replace(",", ".")),
                        rproC_TEMPMIXER2: parseFloat($("#inputTempMix2").val().replace(",", ".")),
                        rproC_TEMPMIXER3: parseFloat($("#inputTempMix3").val().replace(",", ".")),
                        rproC_TEMPSEGURANCA: parseFloat($("#inputTempSegur").val().replace(",", ".")),
                        rproC_PRESSAOSONDA: parseFloat($("#inputPresSonda").val().replace(",", ".")),
                        rproC_VELOCROTOR: parseFloat($("#inputVelRotor").val()),
                        rproC_NOTAS: $("#inputNota").val()

                    };

                    $http({
                        url: Url.receita.processo + `${idProc}`,
                        method: 'PUT',
                        data: JSON.stringify(data),
                        processData: false
                    }).then(function successCallback() {
                        Swal.fire({
                            title: 'Parâmetros de Processo Cadastrados!',
                            type: 'success',
                            showConfirmButton: false,
                            timer: 2000
                        }).then(function () {
                            //$("#btnCancelarProcesso").click();
                            $("#inputTempMix1").prop("disabled", true);
                            $("#inputTempMix2").prop("disabled", true);
                            $("#inputTempMix3").prop("disabled", true);
                            $("#inputTempSegur").prop("disabled", true);
                            $("#inputPresSonda").prop("disabled", true);
                            $("#inputVelRotor").prop("disabled", true);
                            $("#inputNota").prop("disabled", true);


                            $("#btnEditarProcesso").css("display", "block");
                            $("#btnSalvarProcesso").css("display", "none");
                            $("#btnCancelarProcesso").css("display", "none");
                            //------------------UUU
                        });
                    }, function errorCallback() {
                        Swal.fire({
                            title: 'Refaça operação',
                            type: 'error',
                            showConfirmButton: false,
                            timer: 2000
                        });
                    });

                } else {
                    //$("#btnCancelarProcesso").click();
                };
            });
        }
    });

    $("#btnExcluir").click(function () {
        Swal.fire({
            title: `Excluir Turno?`,
            text: `Esta operação não poderá ser desfeita!`,
            type: 'warning',
            showCancelButton: true,
            reverseButtons: true,
            allowOutsideClick: false,
            confirmButtonText: 'Confirmar',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.value) {
                Swal.fire({
                    title: 'Turno excluido!',
                    type: 'success',
                    showConfirmButton: false,
                    timer: 2000
                }).then(function () {
                    $("#btnCancelar").click();
                });
            } else {
                $("#btnCancelar").click();
            };
        });
    });

    $('#selectIdReceita').on('change', function () {

        $("#Card_Tabela_Materiais").css("display", "block");
        $("#Card_Tabela_Operacoes").css("display", "block");
        $("#Card_Processo").css("display", "block");

        if (consulta == 0) { //se 1a consulta na tela (receita original)

            var valueSelected = $('#selectIdReceita option:selected').val();

            //trava campos
            $("#fieldMP").prop("disabled", true);
            $("#fieldOper").prop("disabled", true);
            $("#btnEditarProcesso").prop("display", "none");

        } else { //se consulta de nova versão gerada
            //habilita campos

            $("#fieldMP").prop("disabled", false);
            $("#fieldOper").prop("disabled", false);
            $("#btnEditarProcesso").css("display", "block");

            var valueSelected = consulta;

        }
        //se 1a entrada na tela
        if ($("#btnGerarNovaReceita").hasClass("btn-success")) {
            $("#btnGerarNovaReceita").css("display", "block");
            $("#btnCancelarPesquisa").css("display", "block");

        }

        // $("#fieldMP").prop("disabled", false);


        carregaReceita(valueSelected);

    });

    //seleciona receita -carrega campos 
    $scope.carregaReceita = (id) => {

        //CARREGA CAMPOS PAI DA RECEITA
        $http.get(Url.receita.overview + `${id}`).then(function (data) {
            $.each(data, function (key, val) {

                $("#inputProduto").val(val.material.maT_DESC);
                $("#inputEquip").val(val.mT_CODE);
                $("#inputDtCriacao").val(moment(val.dT_IMPORT).format('DD/MM/YYYY hh:mm'));
                $("#inputVersaoReceita").val(val.versao);

            });
        });

        //CARREGA CAMPOS DE PROCESSO
        $http.get(Url.receita.overview + `Processo/${id}`).then(function (data) {
            $.each(data, function (key, val) {

                $("#inputProcId").val(val.rproC_ID);
                $("#inputProcIdRec").val(val.iD_RECEITA);
                $("#inputProcEspec").val(val.c_ESPEC);
                $("#inputProcMatCod").val(val.maT_SAP_CODE);
                $("#inputTempMix1").val(val.rproC_TEMPMIXER1);
                $("#inputTempMix2").val(val.rproC_TEMPMIXER2);
                $("#inputTempMix3").val(val.rproC_TEMPMIXER3);
                $("#inputTempSegur").val(val.rproC_TEMPSEGURANCA);
                $("#inputPresSonda").val(val.rproC_PRESSAOSONDA);
                $("#inputVelRotor").val(val.rproC_VELOCROTOR);
                $("#inputNota").val(val.rproC_NOTAS);

            });
        });

        //CARREGA DATA TABLE DE MATERIAS PRIMAS:
        if ($.fn.dataTable.isDataTable('#datatable_mp')) {
            $('#datatable_mp').DataTable().clear();
            $('#datatable_mp').DataTable().destroy();
        }

        $scope.tableMP = $('#datatable_mp').DataTable({
            "select": true,
            "language": {
                "decimal": "",
                "emptyTable": "Nenhum resultado encontrado",
                "info": "Mostrando _START_ à _END_ de _TOTAL_ resultados",
                "infoEmpty": "Mostrando 0 à 0 de 0 resultados",
                "infoFiltered": "(filtrado de _MAX_ total resultados)",
                "infoPostFix": "",
                "thousands": ",",
                "lengthMenu": "Mostrar _MENU_ resultados",
                "loadingRecords": "Carregando...",
                "processing": "Processando...",
                "search": "Procurar entrada:",
                "zeroRecords": "Nenhum resultado encontrado com a busca",
                "paginate": {
                    "first": "Primeira",
                    "last": "Última",
                    "next": "Próxima",
                    "previous": "Anterior"
                },
                "aria": {
                    "sortAscending": ": Ative para ordenar a coluna em ordem crescente",
                    "sortDescending": ": Ative para ordenar a coluna em ordem decrescente"
                }
            },
            "pagingType": "full_numbers",
            "lengthMenu": [
                [10, 25, 50, -1],
                [10, 25, 50, "All"]
            ],
            dom: "<'row'<'col-sm-12 col-md-6'l><'col-sm-12 col-md-6'f>>" +
                "<'row'<'col-sm-12'tr>>" +
                "<'row'<'col-sm-12 col-md-5'i><'col-sm-12 col-md-7'p>>",
            responsive: true,
            autoFill: {
                enable: false
            },
            columns: [{
                    data: 'chilD_MAT_SAP_CODE'
                },
                {
                    data: 'boM_QUANTITY'
                },
                {
                    data: 'mppaR_TOLMAX'
                },
                {
                    data: 'mppaR_TOLMIN'
                },
                {
                    data: 'mppaR_VELRAP'
                },
                {
                    data: 'mppaR_VELLEN'
                },
                {
                    data: 'mppaR_VELJOG'
                },
                {
                    data: 'mppaR_PESOLEN'
                },
                {
                    data: 'mppaR_PESOJOG'
                },
                {
                    data: 'mppaR_TEMPOJOG'
                },
                {
                    data: 'mppaR_SILOTANQUE'
                }
            ],
        });

        $scope.getTableMP();

        //CARREGA DATA TABLE DE OPERAÇÕES:
        if ($.fn.dataTable.isDataTable('#datatable_op')) {
            $('#datatable_op').DataTable().clear();
            $('#datatable_op').DataTable().destroy();
        }

        $scope.tableOP = $('#datatable_op').DataTable({
            "jQueryUI": true,
            "language": {
                "decimal": "",
                "emptyTable": "Nenhum resultado encontrado",
                "info": "Mostrando _START_ à _END_ de _TOTAL_ resultados",
                "infoEmpty": "Mostrando 0 à 0 de 0 resultados",
                "infoFiltered": "(filtrado de _MAX_ total resultados)",
                "infoPostFix": "",
                "thousands": ",",
                "lengthMenu": "Mostrar _MENU_ resultados",
                "loadingRecords": "Carregando...",
                "processing": "Processando...",
                "search": "Procurar entrada:",
                "zeroRecords": "Nenhum resultado encontrado com a busca",
                "paginate": {
                    "first": "Primeira",
                    "last": "Última",
                    "next": "Próxima",
                    "previous": "Anterior"
                },
                "aria": {
                    "sortAscending": ": Ative para ordenar a coluna em ordem crescente",
                    "sortDescending": ": Ative para ordenar a coluna em ordem decrescente"
                }
            },
            "pagingType": "full_numbers",
            "lengthMenu": [
                [10, 25, 50, -1],
                [10, 25, 50, "All"]
            ],
            dom: "<'row'<'col-sm-12 col-md-6'l><'col-sm-12 col-md-6'f>>" +
                "<'row'<'col-sm-12'tr>>" +
                "<'row'<'col-sm-12 col-md-5'i><'col-sm-12 col-md-7'p>>",
            responsive: true,
            columns: [{
                    data: 'opeR_SEQ'
                },
                {
                    data: 'opeR_DESC'
                },
                {
                    data: 'rproC_TEMPO'
                },
                {
                    data: 'rproC_ENERGIA'
                },
                {
                    data: 'rproC_RPM'
                },
                {
                    data: 'rproC_TEMPERATURA'
                },
                {
                    data: 'rproC_PRESSAOPISTAO'
                }
            ]
        });

        $scope.getTableOP();
    };

    $scope.getTableMP = () => {
        $http.get(Url.receita.overview + `MP/${id}`).then(function successCallback(response) {
            $scope.table.clear().draw();
            $scope.table.rows.add(response.data).draw();
        }, function errorCallback(response) {
            console.log(response)
        });
    };

    $scope.getTableOP = () => {
        $http.get(Url.receita.overview + `Operacao/${id}`).then(function successCallback(response) {
            $scope.table.clear().draw();
            $scope.table.rows.add(response.data).draw();
        }, function errorCallback(response) {
            console.log(response)
        });
    };
}]);