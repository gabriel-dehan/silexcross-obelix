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

function toolbarHover(src,id){
	var imgId = "#"+id;
	var hoverSrc = src.replace("tool_bar/","tool_bar/hover/");
	$(imgId).attr("src", hoverSrc);
}

function toolbarOut(src,id){
	var imgId = "#"+id;
	var outSrc = src.replace("/hover/","/");
	$(imgId).attr("src", outSrc);
}

function clicFiltre(cls, id){
	if(cls == "filtre-on"){
		$("#"+id).attr('class','filtre-off');
	}
	if(cls == "filtre-off"){
		$("#"+id).attr('class','filtre-on');
	}
	
}