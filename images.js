var positioning = 0;
var mm = 3.779527559;
var set = 100;
var current = 65;

function NoClickDelay(el)
{
	this.element = el;
	if(window.Touch) this.element.addEventListener('touchstart', this, false);
}

NoClickDelay.prototype = {
	handleEvent: function(e)
	{
		switch(e.type)
		{
			case 'touchstart': this.onTouchStart(e); break;
			case 'touchmove': this.onTouchMove(e); break;
			case 'touchend':this.onTouchEnd(e); break;
		}
	},

	onTouchStart: function(e) {
		e.preventDefault();
		this.moved = false;

		this.element.addEventListener('touchmove', this, false);
		this.element.addEventListener('touchend', this, false);
	},

	onTouchMove: function(e) {
		this.moved = true;
	},

	onTouchEnd: function(e) {
		this.element.removeEventListener('touchmove', this, false);
		this.element.removeEventListener('touchend', this, false);

		if( !this.moved ) {
			var theTarget = document.elementFromPoint(e.changedTouches[0].clientX, e.changedTouches[0].clientY);
			if(theTarget.nodeType == 3) theTarget = theTarget.parentNode;

			var theEvent = document.createEvent('MouseEvents');
			theEvent.initEvent('click', true, true);
			theTarget.dispatchEvent(theEvent);
		}
	}
};

function init() {

	imgObj = document.getElementById('testImg');
	imgObj.style.position = 'relative';
	imgObj.style.left = positioning + 'px';
	imgObj.style.top = 200 + 'px'

	imgObj_2 = document.getElementById('testImg_2');
	imgObj_2.style.position = 'relative';
	imgObj_2.style.left = (positioning+set)+'px';
	imgObj_2.style.top = parseInt(imgObj.style.top) + 'px';
}

function setCenter() {
	imgObj.style.left = parseInt(imgObj.style.left) + mm + 'px';
	imgObj_2.style.left = parseInt(imgObj_2.style.left) - mm + 'px';
}

function setApart() {
	imgObj.style.left = parseInt(imgObj.style.left) - mm + 'px';
	imgObj_2.style.left = parseInt(imgObj_2.style.left) + mm + 'px';
}

function setInitial() {
    positioning = 0;
	init();
}

function loaded()
{
	var buttonCenter = document.getElementById('moveCenter');
	var buttonApart = document.getElementById('moveApart');
	var buttonReset = document.getElementById('startOver');

	new NoClickDelay(buttonCenter);
	new NoClickDelay(buttonApart);
	new NoClickDelay(buttonReset);

	buttonCenter.addEventListener('touchstart', function(e) {
			imgObj.style.left = parseInt(imgObj.style.left) + mm + 'px';
	        imgObj_2.style.left = parseInt(imgObj_2.style.left) - mm + 'px';
    }, false);

	buttonApart.addEventListener('touchstart', function(e) {
			imgObj.style.left = parseInt(imgObj.style.left) - mm + 'px';
	        imgObj_2.style.left = parseInt(imgObj_2.style.left) + mm + 'px';
	}, false);

	buttonReset.addEventListener('touchstart', function(e) {
		positioning = 0;
		init();
	}, false);
}
window.onload = init;
window.addEventListener('load', function(){ setTimeout(function(){ loaded(); }, 100) }, true);
init();