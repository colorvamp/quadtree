var q = false;
var myObjects = [];
var myHero = {x:0,y:0,w:20,h:20};
var rAF = window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.requestAnimationFrame;

addEventListener('load',function(e){
	var randMinMax = function(min,max){var d = max-min;return min+Math.floor((Math.random()*d));};
	var canvas = document.getElementById('canvas');
	var ctx = canvas.getContext('2d');
	q = new _quadtree(canvas.width,canvas.height);
	canvas.addEventListener('mousemove',function(e){
		var mx, my;

		if(e.offsetX){mx = e.offsetX;my = e.offsetY;}
		else if(e.layerX){mx = e.layerX;my = e.layerY;}

		myHero.x = mx;
		myHero.y = my;
	});

	var createObjects = function(){
		var myObjects = [];
		for(var i=0;i<200;i++){
			myObjects.push({
				x:randMinMax(10,390),
				y:randMinMax(10,390),
				w:randMinMax(10,20),
				h:randMinMax(10,20),
				vx:randMinMax(-1,1),
				vy:randMinMax(-1,1),
				check:false
			});
		}
		return myObjects;
	};

	var drawQuadtree = function(space,ctx){
		/* no subnodes? draw the current node */
		if(space.spaces.length === 0){
			var t = space.getTop();
			var l = space.getLeft();
			var w = space.getWidth();
			var h = space.getHeight();
			ctx.strokeStyle = 'rgba(255,0,0,0.2)';
			ctx.strokeRect(l,t,w,h);
			return true;
		}
		for(var i=0;i<space.spaces.length;i++){drawQuadtree(space.spaces[i],ctx);}
	};
	var drawObjects = function(space,ctx){
		/* draw each object in current node */
		for(var i=0;i<space.childs.length;i++){
			var obj = space.childs[i];
			ctx.strokeStyle = obj.check ? 'rgba(255,255,255,1)' : 'rgba(255,255,255,.1)';
			ctx.strokeRect(obj.x,obj.y,obj.w,obj.h);
		}

		/* drawObjects for every subnode, too */
		for(var i=0;i<space.spaces.length;i++){drawObjects(space.spaces[i],ctx);}
	};

	var loop = function(ctx){
		q.clear();
		ctx.clearRect(0,0,ctx.canvas.width,ctx.canvas.height);
		for(i in myObjects){
			myObjects[i].x += myObjects[i].vx;
			myObjects[i].y += myObjects[i].vy;
			myObjects[i].check = false;

			if(myObjects[i].x > ctx.canvas.width){myObjects[i].x = 0;}
			if(myObjects[i].x < 0){myObjects[i].x = ctx.canvas.width;}
			if(myObjects[i].y > ctx.canvas.height){myObjects[i].y = 0;}
			if(myObjects[i].y < 0){myObjects[i].y = ctx.canvas.height;}

			q.insert(myObjects[i]);
		}


		/* draw hero */
		ctx.strokeStyle = 'rgba(0,255,0,0.5)';
		ctx.strokeRect(myHero.x,myHero.y,myHero.w,myHero.w);

		/* retrieve all objects in the bounds of the hero */
		returnObjects = q.retrieve(myHero);

		/* flag retrieved objects */
		for(i in returnObjects){returnObjects[i].check = true;}

		drawQuadtree(q,ctx);
		drawObjects(q,ctx);
		rAF(function(){loop(ctx);});
	}

	myObjects = createObjects();
	loop(ctx);
});
