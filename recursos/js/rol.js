$(document).ready(function(){
	listar();
limpiar();
	
});

function listar(){
	$.get("rc", {"opc":1}, function(data){
		var x= JSON.parse(data);
		$("#tablita tbody tr").remove();
		for(var i=0;i<x.length;i++){
			$("#tablita").append("<tr><td>"+(i+1)+"</td><td>"+x[i].idrol+"</td><td>"+x[i].nomrol+"</td><td><a href='#' onclick='editar("+x[i].idrol+")'><i class='far fa-edit'></i></a></td><td><a href='#' onclick='eliminar("+x[i].idrol+")'><i class='fas fa-trash-alt'></i></a></td></tr>");
		}
	});
}
//registrar y editar rol
$("#boton2").click(function(){
	var idr = $("#id").val();
	if(idr==0){
	var param = {"rol":$("#nomrol").val(), "opc":2};
	$.ajax({
		beforeSend: function(){
			$('#resultado').html('Esperando...!');
		},
		data: param,
		url: 'rc',
		type: 'POST',
		success: function(response){
			alert(response);
			limpiar();
			listar();
		},
		error: function(jqXHR, estado, error){
		console.log(estado)
		console.log(error)
		},
		complete: function (jqXHR, estado){
			console.log(estado)
		}		
	});
	}else{
		alert($("#id").val()+"/"+$("#nomrol").val());
		$.post("rc",{"id":$("#id").val(),"rol":$("#nomrol").val(),"opc":4},function (data) {
		listar();
		limpiar();	
    });
	}
});

function editar(id){
	$("#boton2").html("Editar");
	$.get("rc",{"id":id,"opc":3},function (data) {
		var x = JSON.parse(data);
        $("#nomrol").val(x.nomrol)
        $("#id").val(x.idrol);
    });
}
function eliminar(id){
	$.get("rc",{"id":id,"opc":5},function () {
        listar();
    });
}
function limpiar(){
	$("#nomrol").val("");
	$("#id").val(0);
	$("#nomrol").focus();
	$("#id").val(0);
	$("#boton2").html("Crear");
}
