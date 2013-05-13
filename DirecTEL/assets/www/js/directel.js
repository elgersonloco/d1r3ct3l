/*
 * 
 */
//var serverA="http://54.244.124.64:8080/VNServicios/ServletVServicios";
	var serverA="http://192.168.1.100:8084/VNServicios/ServletVServicios";
	var p1="1"; //  tipo servicio  ['1'=get lis de estados | '2'=get lis de anuncios regex]
	var p2="parametro2";
	var xsize,ysize;
	var stri="";
	var anuncioActualId="";
	
// <img src="http://maps.googleapis.com/maps/api/staticmap?center=22.1514818,-100.9802254&zoom=17&size=500x500&markers=color:blue%7Clabel:S%7C22.1514818,-100.9802254&sensor=false"  width="288" height="200"/>
	
	
function init(){

	onLoad(); 
	sliderFavoritosEvnt();
	
	//consulta de estados pantalla inicial  dfgdfg
	   $.ajax(
	    	    {
	    	        url: serverA,
	    	        data: {tipoServicio:p1,anyparam:p2,displaysize:""},
	    	        success: function(response)
	    	        {
	    	 $('#estados_busqueda').append(response);
	    	 $('ul').listview('refresh');
	    	 
	    	 
	    	 
	    	 
	    	        }
	    	    });
	
	 //eventos en la page de lista de categorias
	   $(".categoria").click(function(){
		
		    	 			p2=$('#'+this.id).attr("id");
		    	     
		    	        	 $.ajax(
		    	 		    	    {
		    	 		    	        url: serverA,
		    	 		    	        data: {tipoServicio:"2",anyparam:p2,displaysize:""},
		    	 		    	        success: function(response)
		    	 		    	        {
		    	       			 
		    	 		    	 $('#clientes_busqueda_categoria li').remove();
		    	 		    	 $('#clientes_busqueda_categoria').append(response);
		    	 		    	 $('#clientes_busqueda_categoria').listview('refresh');
		    	 		    	 eventosDinamicosAnuncios();

		    	 		    	        }
		    	 		    	    });

	  	});

}


function eventosDinamicosAnuncios()
{

	$(".listadeclientes").click(function(){
		
		
		xsize=$(window).width();   // se hace aki por que si lo hacias desde init, no alcanzaba a cargar el display size
		ysize=$(window).height();  // se hace aki por que si lo hacias desde init, no alcanzaba a cargar el display size
		actualAnuncioId=$('#'+this.id).attr("id");  //atual id de cliente usado para la categorizacion de favoritos
		 $.ajax(
				 	
		    	    {
		    	        url: serverA,
		    	        data: {tipoServicio:"3",anyparam:$('#'+this.id).attr("id"), displaysize:xsize + "x" + ysize},
		    	        success: function(response)
		    	        {
		    	        	var datos=response.split("|");
		    	        	var nombre=datos[0];
		    	        	var direccion=datos[1];
		    	        	var geopos=datos[2];
		    	        	var imagen=datos[3];//'<img src="http://localhost:8084/VNServicios/20121031115134.jpg" alt="image" style="position: absolute; top: 0%; left: 0%; margin-left: -16px; margin-top: -18px">';
		    	        	var tels=datos[4];
		    	        	var horario=datos[5];
		    	        	var descripcion=datos[6];
		    	        	var webs=datos[7];
		    	        	
		    	           	 $("#cliente_nombre b").remove();
		    	        	 $("#cliente_direccion h5").remove();
		    	        	 $("#tels li").remove();
		    	        	 $("#cliente_horario li").remove();
		    	        	 $("#imagen_logo img").remove();
		    	        	 $("#geopos img").remove();
		    	        	 $("#cliente_webs li").remove();
		    	        	 $("#cliente_descripcion a").remove();
		    	        	 $("#descripcion div").remove();
		    	        	 
		    	        	 
		    	        	 
		    	        	 
		    	        	 $("#cliente_nombre").append(nombre);
		    	        	 $("#cliente_direccion").append(direccion);
		    	        	 $("#tels").append(tels);//tel_local);
		 					 $("#cliente_horario").append(horario);
		    	        	 $("#imagen_logo").append(imagen);
		    	        	 $("#geopos").append(geopos);
		    	        	 $("#descripcion").append(descripcion);
		    	        	 $("#cliente_webs").append(webs);
							

		    	        	 $("#cliente_nombre b").animate({
		    	                 color: "#fff",
		    	                 width: 240
		    	               }, 1000 );
		    	        	 
		    	        	 $(".linkses a").animate({
		    	                 color: "#fff",
		    	                 width: 240
		    	               }, 1000 );

		    	        }
		    	    });

		});
}

	
	
	
//
function onLoad() {
	document.addEventListener("deviceready", onDeviceReady, false);
}

// Cordova is loaded and it is now safe to make calls Cordova methods
//
function onDeviceReady() {
    /*	
     * 	Datos tecnicos del phone o tablet o ipad etc
     *  Register the event listener
	 		alert("Device Name:" + device.name + "\n"+
		   "Device cordoba:" + device.cordova + "\n"+
		   "Devicel platform:" + device.platform + "\n"+
		   "Device uuid:" + device.uuid + "\n"+
		   "Device model:" + device.model + "\n"+
		   "Device version:" + device.version + "\n");*/
	
	
	   //window.localStorage.setItem("2323", "soy un valor pos see");
       // keyname is now equal to "key"
       var value = window.localStorage.clear(); //lo vacias siempre  solo por testing prac
	
       // localStorage is now empty
	 
}

function addFavoritos(id){
	window.localStorage.setItem(id, "soy un valor pos see");
	var keyName = window.localStorage.getItem(id);
}


function removeFavoritos(id){
	window.localStorage.removeItem(id);
}



// ************  READING WRITTTING ALSOOO REMOOUUUVVV   INICIOOOO
/*
function leerOEscribirORemover(que){
	if(que == 'read'){
	 window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, gotFS, failReading);
	}else if(que == 'remove'){
		alert("deleting :) ojala funcione we");
		 window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, removeFS, fail);
		}else if(que == 'write'){
			alert("writting :) ojala funcione we");
			 window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, writeFS, failWritting);
			}

}

function gotFS(fileSystem) {
    fileSystem.root.getFile("readme.txt", {create: true, exclusive: false}, gotFileEntry, failReading);
}

function writeFS(fileSystem) {
    fileSystem.root.getFile("readme.txt", {create: true, exclusive: false}, writeEntry, failWritting);
}


function removeFS(fileSystem){   
	fileSystem.root.getFile("readme.txt", {create: false, exclusive: false}, removeEntry, fail);
}

function removeEntry(fileEntry) {
	//primero lo leemos
    fileEntry.remove(success,fail);
}


function gotFileEntry(fileEntry) {
	//primero lo leemos
    fileEntry.file(gotFile2,failReading);
}


function writeEntry(fileEntry){
    //luego escribimos
    fileEntry.createWriter(gotFileWriter, failWritting);
}

function gotFileWriter(writer) {
    writer.onwriteend = function(evt) {
    //aki pon quehacer despues de terminar el writtend
    };
    
    
    writer.write("escrito  stri =>> "+stri + "   ");
    alert("se escribe" + +stri );
    
}

function gotFile2(file){
    readAsText2(file);
}

function readAsText2(file) {
    var reader = new FileReader();
    reader.onloadend = function(evt) {
       stri+="leido + anterior ->"+evt.target.result;
        alert("stri=> " + stri);
    };
   reader.readAsText(file);
   
}



function success(entry){
alert("accion correcta");	
}

function fail(error){
	alert(error.code);	
	}

function failReading(evt) {
  alert("error removing directory " + error.code);
}

function failWritting(error) {
    alert(error.code);
}
*/
//************READING WRITTTING ALSOOO REMOOUUUVVV   FINALLLLLLL




function sliderFavoritosEvnt(){
	var val='off';
	$('select#toggleFavorito').change(function() {
	    if($(this).val() == 'on'){
	    		addFavoritos(actualAnuncioId);
	    		alert("agregado a favoritos !!!" + $(this).val());
	    }else if($(this).val() == 'off'){
    		removeFavoritos(actualAnuncioId);
	    	alert("eliminado de   favoritos !!!" + $(this).val());
	    }
	    		
	    	
	    	
	   		    val = $(this).val();
	});
}

	