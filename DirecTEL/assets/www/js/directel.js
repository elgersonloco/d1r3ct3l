/*
 * 
 */
//var serverA="http://54.244.124.64:8080/VNServicios/ServletVServicios";

	var serverA="http://187.137.163.189:666/VNServicios/ServletVServicios";

	var p1="1"; //  tipo servicio  ['1'=get lis de estados | '2'=get lis de anuncios regex]
	var p2="parametro2";
	var xsize,ysize;
	var stri="";
	
	var ciudad_actual   ="";     //Id de la ciudad actual
	var anuncioActualId ="";     //Id del Anuncio actual
	var categoria_actual="";     //Nombre de la Categora que se va a visualizar
	
	//Informacion del Cliente
	var client_logo = "";       //Logotipo del cliente
	var client_name = "";       //Nombre del cliente
	var client_desc = "";       //Descripcion corta del cliente
	var client_addr = "";       //Direccion del cliente
	var client_tels = "";       //Telefonos del cliente
	var client_hours= "";       //Horario del cliente
	var client_email= "";       //Email del cliente
	var client_web  = "";       //Webs del cliente
	var client_map     = "";    //Mapa del cliente
	var client_map_ext = "";    //Mapa del cliente grande
	
	var flagFav = false;        //Bandera que indica si el anuncio es favorito
	var flagVer = false;        //Bandera que indica si la app esta actualizada
	
// <img src="http://maps.googleapis.com/maps/api/staticmap?center=22.1514818,-100.9802254&zoom=17&size=500x500&markers=color:blue%7Clabel:S%7C22.1514818,-100.9802254&sensor=false"  width="288" height="200"/>
	
	
function init(){

	//Init
	onLoad(); 
	initialize();
	
	//Verifica la versi�n
	version_ok();
	
}//init


function init_ok(){
	//consulta de ciudades pantalla inicial 
	   $.ajax(
    	    {
    	        url: serverA,
    	        data: {tipoServicio:0,anyparam:p2,displaysize:""},
    	        success: function(response)
    	        {
    	         
		    	 $('#ciudades_busqueda').append(response);
		    	 $('ul').listview('refresh');
		    	 
    	        }//success
	     });//.ajax
	

	 //eventos en la page de lista de categorias
	   $(document).on("click",".categoria",function(e){
		   					
			//Asigna el nombre de la Categoria que se va a visitar
			categoria_actual=$('#'+this.id).attr("id");
			put_catIcon();
			
			p2=$('#'+this.id).attr("title");
	 
	    	 $.ajax(
		    	    {
		    	        url: serverA,
		    	        data: {tipoServicio:"2",anyparam:p2,displaysize:"",idciudad:ciudad_actual},
		    	        success: function(response)
		    	        {
		    	         
		 		    	 $('#clientes_busqueda_categoria li').remove();
		 		    	 $('#clientes_busqueda_categoria').append(response);
		 		    	 $('#clientes_busqueda_categoria').listview('refresh');
		 		    	 //eventosDinamicosAnuncios();
		 		    	 getClient_info();
	
		    	        }//success
		      });//.ajax

	  	});//.categoria
	   
	   //Seleccion de una ciudad y carga lista de categorias
	   $(document).on("click",".ciudad",function(e){
				
			//Asigna el nombre de la Categoria que se va a visitar
			ciudad_actual=$('#'+this.id).attr("id");
	 
	    	 $.ajax(
		    	    {
		    	        url: serverA,
		    	        data: {tipoServicio:"6",anyparam:"",displaysize:""},
		    	        success: function(response)
		    	        {
		    	        	
		    	        	document.getElementById('replace_categorias').innerHTML = response;
		    	        	
		    	        	//$('#replace_categorias').append(response);
		    	        	$('#replace_categorias').listview('refresh');
		 		    	 
		    	        }//success
		      });//.ajax

	  	});//.ciudad
	
}//init_ok

/********************************************************************
 * version_ok : verifica la version actualizada
 * 
 * @date    May 21th, 2013
 * @author  Howser
 * 
 ********************************************************************/
function version_ok()
{
	$.ajax(
		{
	        url: serverA,
	        data: {tipoServicio:"20",anyparam:"",displaysize:xsize + "x" + ysize},
	        success: function(response)
	        {
	        	var data=response.split("|");
	        	if(data[0]=='0.8'){
	        		flagVer = true;
	        		init_ok();
	        		//alert('a'+data[0]+'flagVer');
	        	}
	        	else{
	        		alert('LA APP NO ESTA ACTUALIZADA, FAVOR DE INSTALAR LA VERSION MAS RECIENTE ');
	        		//alert('a'+data[0]+'flagVer');
	        		flagVer = false;
	        		window.location.href = "market://details?id=com.rovio.angrybirds"; 
	        	}
	        }//success
	});//ajax
	
}//version_ok

function eventosDinamicosAnuncios()
{

	$(".listadeclientes").click(function(){
		
		
		actualAnuncioId=$('#'+this.id).attr("id");  //atual id de cliente usado para la categorizacion de favoritos
		 $.ajax(
				 	
		    	    {
		    	        url: serverA,
		    	        data: {tipoServicio:"3",anyparam:$('#'+this.id).attr("id"), displaysize:xsize + "x" + ysize},
		    	        success: function(response)
		    	        {
		    	       	 xsize=$(window).width();   // se hace aki por que si lo hacias desde init, no alcanzaba a cargar el display size
		    	 		 ysize=$(window).height();  // se hace aki por que si lo hacias desde init, no alcanzaba a cargar el display size
		    	 	
		    	        	
		    	       
		    	        	if(null == window.localStorage.getItem(actualAnuncioId)){
		    	        		
		    	        	 $('#favoritoSelect h2').remove();
		    	        	 $('#favoritoSelect').append('<h2><select name="ToggleFavorito" id="toggleFavorito" class="favorClass" data-theme="a" data-role="slider"><option value="off">No</option><option value="on">Si</option></select></h2>');
				    	  	}else{
				    	    $('#favoritoSelect h2').remove();
		    	        	 $('#favoritoSelect').append('<h2><select name="ToggleFavorito" id="toggleFavorito" class="favorClass" data-theme="a" data-role="slider"><option value="on">Si</option><option value="off">No</option></select></h2>');  
			    	    	}
		    	        	
		    	        	
		    	        	
		    	         /*	if(null == window.localStorage.getItem(actualAnuncioId)){
		    	         		1=$('#favoritoSelect_').html();
			    	        	 $('#favoritoSelect_').html('');
			    	        	 $('#favoritoSelect_').append('<select name="ToggleFavorito_" id="toggleFavorito_" class="favorClass" data-theme="a" data-role="slider"><option value="off">No</option><option value="on">Si</option></select>');
					    	  	}else{
					    	    1=$('#favoritoSelect_').html();
					    	    $('#favoritoSelect_').html('');
			    	        	$('#favoritoSelect_').append('<select name="ToggleFavorito_" id="toggleFavorito_" class="favorClass" data-theme="a" data-role="slider"><option value="on">Si</option><option value="off">No</option></select>');  
				    	    	}*/
			    	        	
		    	        	
		    	        	
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
		    	                 color: "#00f",
		    	                 width: 240
		    	               }, 1000 );

		    	        	 
		    	        	 
		    	        	 sliderFavoritosEvnt();;
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
      // var value = window.localStorage.clear(); //  IMPORTANTE!! COMENTAR PARA PRODUCCION. PARA LA PERSISTENCIA DE DATOS NO NECESITAS LIMPIAR EL STORAGE
}

function addFavoritos(id){
	window.localStorage.setItem(id, "favorito");
	var keyName = window.localStorage.getItem(id);
	//alert('added to fav');
	}
	

function removeFavoritos(id){
	window.localStorage.removeItem(id);
	//alert('remove from fav');
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
  
	$('.favorClass').change(function() {
		 if($(this).val() == 'on'){
	    	addFavoritos(actualAnuncioId);
	    }else if($(this).val() == 'off'){
    		removeFavoritos(actualAnuncioId);
	    }
	    		
	   		
	   		     
	   		     
	});
}

/********************************************************************
 * favorChange : Añade o Elimina a la publicacion de favoritos
 * 
 * @date    May 20th, 2013
 * @author  Howser
 * 
 ********************************************************************/
function favorChange(fav_check){
	
	if(fav_check.checked){
		addFavoritos(actualAnuncioId);
	}else{
		removeFavoritos(actualAnuncioId);
	}
	
}//favorChange


/********************************************************************
 * put_catIcon : coloca la imagen que le corresponde a la Categora
 * 
 * @date    May 14th, 2013
 * @author  Howser
 * 
 ********************************************************************/
function put_catIcon(){
	
	//Coloca Imagenes
	document.getElementById('cat_name').setAttribute('src', "img/cat/tag_" +categoria_actual+".png");
	document.getElementById('cat_icon').setAttribute('src', "img/cat/logo_"+categoria_actual+".png");
	
	
	//Coloca color de Fondo
	var color="#ffffff";
	
	switch(categoria_actual){
		case "apoyos_financieros":
			  //color = "#7f5e3f";
			  color = "#805e3d";
			  break;
		case "automotriz":
			  //color = "#a32431";
			  color = "#a6262e";
			  break;
		case "construccion":
			  //color = "#e9ae4a";
			  color = "#ebb042";
			  break;
		case "deporte":
			  //color = "#cf4239";
			  color = "#d34435";
			  break;
		case "educacion":
			  //color = "#ca0088";
			  color = "#ce2689";
			  break;
		case "gobiernos":
			  //color = "#7d2b8b";
			  color = "#7f278c";
			  break;
		case "hogar":
			  //color = "#9fc54d";
			  color = "#9ec646";
			  break;
		case "medios_e_imagen":
			  //color = "#39673e";
			  color = "#37673c";
			  break;
		case "industria":
			  //color = "#6e6659";
			  color = "#6e6758";
			  break;
		case "oficinas":
			  //color = "#882461";
			  color = "#8a2362";
			  break;
		case "profesionistas":
			  //color = "#5aa69d";
			  color = "#55a69d";
			  break;
		case "recreacion_y_eventos_sociales":
			  //color = "#cc2229";
			  color = "#cf2624";
			  break;
		case "salud_y_belleza":
			  //color = "#00acec";
			  color = "#00aaee";
			  break;	  
		case "servicios_generales":
			  //color = "#f2ca3c";
			  color = "#f4cc2c";
			  break;
	}//switch
	
	document.getElementById('header_categoria').style.backgroundColor = color; 
	//document.getElementById('cat_name').style.backgroundColor = color; 
	//document.getElementById('cat_icon').style.backgroundColor = color; 
	
	
}//function put_catIcon


/********************************************************************
 * getClient_info : carga la informacion del cliente
 * 
 * @date    May 17th, 2013
 * @author  Howser
 * 
 ********************************************************************/
function getClient_info(){
	
    $(".listadeclientes").click(function(){
		
    	//Limpia informacion
    	cleanClient_info();
    	
    	client_logo    = "";       //Logotipo del cliente
    	client_name    = "";       //Nombre del cliente
    	client_desc    = "";       //Descripcion corta del cliente
    	client_addr    = "";       //Direccion del cliente
    	client_tels    = "";       //Telefonos del cliente
    	client_hours   = "";       //Horario del cliente
    	client_email   = "";       //Email del cliente
    	client_web 	   = "";       //Webs del cliente
    	client_map     = "";       //Mapa del cliente
    	client_map_ext = "";       //Mapa del cliente grande
    	
    	flagFav        = false     //Badera que indica si el anuncio es favorito
    	
	     //ID
	     actualAnuncioId=$('#'+this.id).attr("id");  //atual id de cliente usado para la categorizacion de favoritos
		 
	     //Obtiene la info desde el WS
		 //data: {tipoServicio:"10",anyparam:$('#'+this.id).attr("id"), displaysize:xsize + "x" + ysize},
		 xsize=$(window).width();     // se hace aki por que si lo hacias desde init, no alcanzaba a cargar el display size
		 ysize=$(window).height();    // se hace aki por que si lo hacias desde init, no alcanzaba a cargar el display size
		
			 
		$.ajax(
			{
			 url: serverA,
		     data: {tipoServicio:"10",anyparam:$('#'+this.id).attr("id"), displaysize:xsize + "x" + ysize},
		     success: function(response)
		     {
		    	 xsize=$(window).width();     // se hace aki por que si lo hacias desde init, no alcanzaba a cargar el display size
		    	 ysize=$(window).height();    // se hace aki por que si lo hacias desde init, no alcanzaba a cargar el display size
		 	
		    	 var data=response.split("|");
		    	 //if(data.lenght>=7){
		    		 client_logo 	= data[0];
		    		 client_name 	= data[1];   
		    		 client_desc 	= data[2]; 
		    		 client_addr 	= data[3];      
		    		 client_tels 	= data[4];      
		    		 client_hours	= data[5];       
		    		 client_email	= data[6];       
		    		 client_web  	= data[7];   
		    		 client_map  	= data[8];
		    		 client_map_ext = data[9];
		    		 
		    	 //}//if
		    		 
	    		//Verifica si esta marcado como favorito
	    			 if(null == window.localStorage.getItem(actualAnuncioId))
	    			    	flagFav = false;	
	    			 else
	    					flagFav = true;
		    	
		         //Llena dartos del cliente
		    		 fillClient_info();
		     }
			});//ajax
		
		
    });//(".listadeclientes").click

}//getClient_info


/********************************************************************
 * cleanClient_info : Reemplaza la informacion del DOM en HTML a vacio
 * 
 * @date    May 17th, 2013
 * @author  Howser
 * 
 ********************************************************************/
function cleanClient_info(){
	
	//Logo
	document.getElementById('replace_logo').setAttribute('src', '');
	
	//Nombre
	document.getElementById('replace_nombre').innerHTML = '';
	
	//Descripci�n
	document.getElementById('replace_desc').innerHTML = '';
	
	//Direcci�n
	document.getElementById('replace_direccion').innerHTML = '';
	
	//Telefonos
	document.getElementById('replace_tels').innerHTML = '';
	
	//Horario
	document.getElementById('replace_horario').innerHTML = '';
	
	//Webs
	document.getElementById('replace_web').innerHTML = '';
	
	//Email
	document.getElementById('replace_email').innerHTML = '';
	
	//Mapa
	document.getElementById('replace_map').innerHTML = '';
	
	//Mapa Grande
	document.getElementById('replace_map_ext').innerHTML = '';
	
	//Marcado como favorito
	document.getElementById("check_fav").checked = false;

}//cleanClient_info



/********************************************************************
 * fillClient_info : Reemplaza la informacion del DOM en HTML con la nueva informacion del cliente
 * 
 * @date    May 17th, 2013
 * @author  Howser
 * 
 ********************************************************************/
function fillClient_info(){
	
	//Logo
	document.getElementById('replace_logo').setAttribute('src', client_logo);
	
	//Nombre
	document.getElementById('replace_nombre').innerHTML = client_name;
	
	//Descripci�n
	document.getElementById('replace_desc').innerHTML = client_desc;
	
	//Direcci�n
	document.getElementById('replace_direccion').innerHTML = client_addr;
	
	//Telefonos
	document.getElementById('replace_tels').innerHTML = client_tels;
	
	//Horario
	document.getElementById('replace_horario').innerHTML = client_hours;
	
	//Webs
	document.getElementById('replace_web').innerHTML = client_web;
	
	//Email
	document.getElementById('replace_email').innerHTML = client_email;
	
	//Mapa
	document.getElementById('replace_map').innerHTML = client_map;
	
	//Mapa Grande
	document.getElementById('replace_map_ext').innerHTML = client_map_ext;
	
	//Marcado como favorito
	document.getElementById("check_fav").checked = flagFav;
}//fillClient_info



function cargaFavoritos(){
	var favorsCadena="";
	 xsize=$(window).width();   // se hace aki por que si lo hacias desde init, no alcanzaba a cargar el display size
     ysize=$(window).height();  // se hace aki por que si lo hacias desde init, no alcanzaba a cargar el display size
	
	
	for(var i=0;i<window.localStorage.length;i++){
		if(i!=window.localStorage.length-1)
		favorsCadena+=""+window.localStorage.key(i)+",";
		else
		favorsCadena+=""+window.localStorage.key(i);
	}
	
	
	//alert("String favors -> " +  favorsCadena);
	
	   //data: {tipoServicio:"4",anyparam:favorsCadena,displaysize:xsize + "x" + ysize},
	   $.ajax(
	    	    {
	    	        url: serverA,
	    	        data: {tipoServicio:"4",anyparam:favorsCadena,displaysize:xsize + "x" + ysize},
	    	        success: function(response)
	    	        {
	    	 
	    	 $('#favoritos_busqueda li').remove();
	    	 $('#favoritos_busqueda').append(response);
	    	 $('#favoritos_busqueda').listview('refresh');
	    	 
	    	 
	    	 
	    	 getClient_info(); //para agregar aventos al igual que cuando consultas clientes por categoria
	    	        }
	    	    });
	
}



function busqueda(){
	 //eventos en la page de lista de categorias
	 
		   					
			p2=$("#textABuscar").val();
       	    $.ajax(
		    	    {
		    	        url: serverA,
		    	        data: {tipoServicio:"5",anyparam:p2,displaysize:"",idciudad:ciudad_actual},
		    	        success: function(response)
		    	        {
					    	 $('#clientes_busqueda li').remove();
					    	 $('#clientes_busqueda').append(response);
					    	 $('#clientes_busqueda').listview('refresh');
					    	 getClient_info();
		    	        }//success
		    	    });//.ajax

}//busqueda


function initialize() {

	$("#map_canvas").css("height","400")
	
    var mapOptions = {
      center: new google.maps.LatLng(-34.397, 150.644),
      zoom: 4,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    var map = new google.maps.Map(document.getElementById("map_canvas"),
        mapOptions);
  }



	
