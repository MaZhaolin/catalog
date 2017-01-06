(function(win){
	var catalog = function(options) {
		this.box = options.box || '';
		this.cata = [];
	}

	catalog.prototype = {
		constructor: catalog,
		init: function() {
			this.addIndex();
			this.getAllCata(2);
		},
		getAllCata: function(it) { 
			var	h1 = document.querySelectorAll(this.box + ' h' + it),
				len = h1.length - 1
				rs = []
			for (var i = len; i >= 0; i--) {
				var id = h1[i].id,
					next = it + 1;
				var h2 = document.querySelectorAll('#' + id + '~h' + next);
				rs[id] = [];
				[].map.call(h2,function(e){
					if(i !=  len && rs[h1[i + 1].id][0] == e.id) return ;
					rs[id].push(e.id);
				})
			}
			// console.log(rs);
		},
		addIndex: function(){
			for (var i = 1; i < 7; i++) {
				var title = document.querySelectorAll(this.box + ' h' + i);
				[].map.call(title,function(e,index){
					e.id = 'catalog-' + i + '-' + index;
				})
			}
			
		}
	}

	win.catalog = catalog;
})(window)

new catalog({'box': '.container'}).init();


 