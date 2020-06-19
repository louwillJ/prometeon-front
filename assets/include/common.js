datetimepicker = function (e) {
    $(e).datetimepicker({
        format: 'DD/MM/YYYY HH:mm',
        icons: {
            time: 'far fa-clock',
            date: 'far fa-calendar-alt',
            up: "fa fa-arrow-up text-primary",
            down: "fa fa-arrow-down text-primary",
            clear: 'fas fa-trash',
            previous: 'fas fa-arrow-left',
            next: 'fas fa-arrow-right',
        }
    }).focus();
};

datepicker = function (e) {
    $(e).datetimepicker({
        format: 'DD/MM/YYYY',
        icons: {
            time: 'far fa-clock',
            date: 'far fa-calendar-alt',
            up: "fa fa-arrow-up text-primary",
            down: "fa fa-arrow-down text-primary",
            clear: 'fas fa-trash',
            previous: 'fas fa-arrow-left',
            next: 'fas fa-arrow-right',
        }
    }).focus();
};

timepicker = function (e) {
    $(e).datetimepicker({
        format: 'HH:mm',
        icons: {
            time: 'far fa-clock',
            date: 'far fa-calendar-alt',
            up: "fa fa-arrow-up text-primary",
            down: "fa fa-arrow-down text-primary",
            clear: 'fas fa-trash',
            previous: 'fas fa-arrow-left',
            next: 'fas fa-arrow-right',
        }
    }).focus();
};

getStatusOrdem = function () {
    var status;
    $http.get(Url.ordemProducao.status).then(function (data) {
        $.each(data, function (key, val) {
            status += "<option value='" + val.stA_ID + "'>" + val.stA_NOME + "</option>";
            //console.log(val.stA_NOME);  
        });

        var header = '<option value=\'\'>Select...</option>';
        $('#inputStatus').html(header + status);
    });
};

getReceita = function () {
    var status;
    $http.get(Url.receita.overview).then(function (data) {
        $.each(data, function (key, val) {
            status += "<option value='" + val.iD_RECEITA + "'>" + val.c_ESPEC + "-" + val.maT_SAP_CODE + " - " + val.material.maT_DESC + "</option>";
            //console.log(val.maT_SAP_CODE);  
        });

        var header = '<option value=\'\'>Select...</option>';
        $('#selectIdReceita').html(header + status);
    });
};

getMaterial = function () {
    var status;
    $http.get(Url.material.def).then(function (data) {
        $.each(data, function (key, val) {
            status += "<option value='" + val.maT_SAP_CODE + "'>" + val.maT_SAP_CODE + " - " + val.maT_DESC + "</option>";
            //console.log(val.maT_SAP_CODE);  
        });

        var header = '<option value=\'\'>Select...</option>';
        $('#selectMaterial').html(header + status);
    });
};