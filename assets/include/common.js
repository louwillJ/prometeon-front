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