(function(width, height, id, iframe, bcp) {
	iframe = document.createElement('iframe'), bcp = document.getElementById('bcp');
	iframe.width = width;
	iframe.height = height;
	iframe.src = '//playground.kennycosca.com/embed/' + id;
	bcp.parentNode.insertBefore(iframe, bcp);
})(200, 200, '550890d6dcd1f76308c90b30');