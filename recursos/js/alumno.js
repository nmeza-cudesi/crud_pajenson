/**
 * 
 */
$(document).ready(function() {
    listar();
    limpiar();
});
var url = 'http://3.13.181.125:4000/'

function listar() {
    $.ajax({
        //data: param,
        url: url + "todos",
        type: 'GET',
        dataType: "json",
        success: function(response) {
            var x = response;
            console.log(x);
            $("#tablita tbody tr").remove();
            for (var i = 0; i < x.length; i++) {
                $("#tablita").append("<tr><td>" + (i + 1) + "</td><td>" + x[i].title + "</td><td>" + x[i].description + "</td><td>" + x[i].isFinished + "</td><td><a href='#' onclick='editar(" + x[i].id + ")'><i class='far fa-edit'></i></a></td><td><a href='#' onclick='eliminar(" + x[i].id + ")'><i class='fas fa-trash-alt'></i></a></td></tr>");
            }
        },
        error: function(jqXHR, estado, error) {
            console.log(estado)
            console.log(error)
        },
        complete: function(jqXHR, estado) {
            console.log(estado)
        }
    });
}
//registrar y editar rol
$("#boton2").click(function() {
    var idr = $("#id").val();
    if (idr == 0) {
        console.log("lleguemano");
        var titulo = $("#nombre").val()
        var descripcion = $("#telefono").val()
        var terminado = false
        var param = { "title": titulo, "description": descripcion, "isFinished": terminado };
        $.ajax({
            data: param,
            url: url + 'todos',
            type: 'POST',
            success: function(response) {
                alert(response);
                limpiar();
                listar();
            },
            error: function(jqXHR, estado, error) {
                console.log(estado)
                console.log(error)
            },
            complete: function(jqXHR, estado) {
                console.log(estado)
            }
        });
    } else {
        alert($("#id").val() + "/" + $("#nombre").val());
        var titulo = $("#nombre").val()
        var descripcion = $("#telefono").val()
        var terminado = $("#direccion").val()
        var id = $("#id").val()

        var param = { "title": titulo, "description": descripcion, "isFinished": terminado, "id": id };
        $.ajax({
            data: param, //JSON.stringify(data),
            url: url + 'todos',
            type: 'PUT',
            success: function(response) {
                alert(response);
                limpiar();
                listar();
            },
            error: function(jqXHR, estado, error) {
                console.log(estado)
                console.log(error)
            },
            complete: function(jqXHR, estado) {
                console.log(estado)
            }
        });

    }
});

function editar(id) {
    $("#boton2").html("Editar");
    $.ajax({
        //data: param,
        url: url + 'todos/' + id,
        type: 'GET',
        dataType: "json",
        success: function(response) {
            var x = response;
            console.log(x);
            $("#nombre").val(x[0].title)
            $("#telefono").val(x[0].description)
                //$("#direccion").val(x.userId)
            $("#id").val(x.id);
        },
        error: function(jqXHR, estado, error) {
            console.log(estado)
            console.log(error)
        },
        complete: function(jqXHR, estado) {
            console.log(estado)
        }
    });
}

function eliminar(id) {
    $.ajax({
        //data: param,
        url: url + 'todos/' + id,
        type: 'DELETE',
        dataType: "json",
        success: function(response) {
            alert("borrado correctamente");
        },
        error: function(jqXHR, estado, error) {
            console.log(estado)
            console.log(error)
        },
        complete: function(jqXHR, estado) {
            console.log(estado)
        }
    });
}

function limpiar() {
    $("#nombre").val("");
    $("#telefono").val("");
    $("#direccion").val("");
    $("#id").val(0);
    $("#nombre").focus();
    $("#id").val(0);
    $("#boton2").html("Crear");
}