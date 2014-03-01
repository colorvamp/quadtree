quadtree
========

Quadtree implementation for check 2D collisions with low CPU cost.

Demo here: ![Demo](http://jsfiddle.net/sombra2eternity/vNS7m/)

  * Red squares represents Quadtree Sub-divisions.
  * Grey squares represents Quadtree registered items.
  * Green square represent the collision zone, It will follow mouse move.
  * White squares represents items that could collide with our collision zone.

Usage:

Create a new Quadtree. Params: width, height, top, left, depth
<pre>
var quadtree = new _quadtree(400,400);
</pre>

Insert an element in the Quadtree. (Extra params could be added to any item and will be retrieved)
<pre>
quadtree.insert({
	x : 200,
	y : 150,
	w : 20,
	h : 20
});
</pre>

Get elements near a collision zone defined by bounds.
<pre>
var elements = quadtree.retrieve({
	x : 150,
	y : 100,
	w : 20,
	h : 20
});
</pre>

Clear the Quadtree
<pre>
quadtree.clear();
</pre>
