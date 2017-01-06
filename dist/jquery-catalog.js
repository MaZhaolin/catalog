$.fn.catalog = function(options) {
	var defaults = {
			'box': '.catalog'
		},
		opt = $.extend({}, defaults, options),
		header = this.children(':header');

	var addIndex = function() { 
		header.map(function(i,e){
			var index = 'catalog' + '-' + e.tagName + '-' + i; 
			e.id = index;  
		}) 

	}

	var addLink = function() {
		var data = [],
		prev = header[0].tagName.charAt(1),
		lv = 0, //深度
		li = null;

		//初始化根目录
		data[0] = $('<ul></ul>');
		data[0].appendTo($(opt.box));
		
		header.map(function(i,e){
			li = $('<li></li>');
			li.append('<a href="#' + e.id + '">' + e.innerHTML +'</a>'); 

			// 根据标签等级增加或减小深度
			if(prev > e.tagName.charAt(1)){
				lv -= parseInt(prev) - parseInt(e.tagName.charAt(1));
			}else if(prev < e.tagName.charAt(1)){
				lv += parseInt(e.tagName.charAt(1)) - parseInt(prev);
				data[lv] = $('<ul></ul>');
				prevLi.append(data[lv]);
			}


			prev = e.tagName.charAt(1) 
			data[lv].append(li);
			prevLi = li;
		})
	}

	var bindAnimate = function() {
		$(opt.box + ' a').click(function(){
			var it = this;
			$('body,html').animate({
				scrollTop: $(it.getAttribute('href')).offset().top
			}, 'fast')
			return false
		})
	}

	
	addIndex();
	addLink();
	bindAnimate();
}

$('.container').catalog();