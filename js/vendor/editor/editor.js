$(document).ready(function(){

});

function clicTool(id){
	var toolbar= "#toolbar-"+id;
	if($(toolbar).css("display") == 'block'){
		$(toolbar).fadeOut();
	}
	if($(toolbar).css("display") == 'none'){
		$(toolbar).fadeIn();
	}
}

function extend(id, width){
	if($(id).width() == '0'){
		$(id).animate({'width' : width+'px'}, 300);
	}
	if($(id).width() == width){
		$(id).animate({'width' : '0px'}, 150);
	}
}