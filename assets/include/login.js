if (sessionStorage.getItem("log") == "in") {
    window.location.href = "/";

} else {
    if (!sessionStorage.getItem("FailCounter")) {
        sessionStorage.setItem("FailCounter", 0);
    };

    $("#login").click(() => {
        var Password = $("#password").val() != "" ? $("#password").val() : missingPassword();
        var Username = $("#username").val() != "" ? $("#username").val() : missingUsername();

        if (Username != undefined && Password != undefined) {
            $("#errMsg").hide();
            $("#loader").show();

            var data = {
                Username,
                Password
            };

            $.ajax({
                    "url": Url.usuarios.login,
                    "method": "POST",
                    "data": JSON.stringify(data),
                    "headers": {
                        "Content-Type": "application/json",
                    },
                }).done(function (response) {
                    sessionStorage.removeItem("FailCounter");

                    $("#loader").hide();
                    $("#errMsg").text('').hide();
                    // . usR_ID,usR_NAME,usR_SETOR,usR_ACCESS_LEVEL,usR_ACTIVE,jwtToken
                    sessionStorage.setItem("log", "in");
                    sessionStorage.setItem("id", response.usR_ID);
                    sessionStorage.setItem("token", response.jwtToken);
                    sessionStorage.setItem("access", response.usR_ACCESS_LEVEL);

                    getTelasPermitidas(response.usR_ACCESS_LEVEL, response.jwtToken);
                })
                .fail(function (err, textStatus, xhr) {
                    $("#loader").hide();
                    $("#password").val('');
                    setTimeout(() => {
                        $("#errMsg").hide();
                    }, 10000);

                    if (err.status != 500) {
                        sessionStorage.setItem("FailCounter", parseInt(sessionStorage.getItem("FailCounter")) + 1);

                        if (parseInt(sessionStorage.getItem("FailCounter")) > 3) {
                            $("#errMsg").text("Esqueceu seu nome de usuário ou senha? Contate um administrador do sistema!").show();
                        } else {
                            $("#errMsg").text(err.responseJSON.message).show();
                        };
                    } else {
                        $("#errMsg").text(err.responseText).show();
                    };
                });
        };
    });

    function getTelasPermitidas(levelId, token) {
        $.ajax({
            "url": Url.acesso.man,
            "method": "GET",
            "headers": {
                'Content-Type': `application/json`,
                'Authorization': `Bearer ${token}`
            }
        }).done(function (response) {
            var objTelas = [];

            objTelas.push(0);
            response.forEach(element => {
                if (element.leV_ID == levelId) {
                    objTelas.push(element.scR_ID);
                };
            });
            sessionStorage.setItem("screen", objTelas);

            window.location.href = "/";
        });
    };

    $("#username").change(() => {
        $("#errUserMsg").hide();
        $(".userDiv").css({
            "border": "0px"
        });
        $("#username").focus().css({
            "border": "0px"
        });
    });

    $("#password").change(() => {
        $("#errPassMsg").hide();
        $(".passDiv").css({
            "border": "0px"
        });
        $("#password").focus().css({
            "border": "0px"
        });
    });

    function missingUsername() {
        $("#errUserMsg").show();
        $(".userDiv").css({
            "border": "1px solid red",
            "border-right": "0px"
        });
        $("#username").focus().css({
            "border": "1px solid red",
            "border-left": "0px"
        });
    };

    function missingPassword() {
        $("#errPassMsg").show();
        $(".passDiv").css({
            "border": "1px solid red",
            "border-right": "0px"
        });
        $("#password").focus().css({
            "border": "1px solid red",
            "border-left": "0px"
        });
    };

    const log = document.getElementById('log');
    document.addEventListener('keypress', logKey);

    function logKey(e) {
        if (e.key == "Enter") {
            $('#login').click();
        };
    };
};