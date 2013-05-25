
function moveArrow(height,id)
{
	$('#arrow').animate({
		"margin-top" : height
	}, 500);



	$('#deviceShow').attr('src','resources/img/newApp/'+id+'.png');
}
