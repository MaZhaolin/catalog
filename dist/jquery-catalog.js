
(function($){
	$.fn.catalog = function(options) {
		var opt = $.extend({
				'box': '.catalog'
			}, options),
			header = this.children(':header');

		return this.each(function() {

			//给标题添加ID
			var addIndex = function() { 
				header.map(function(i,e){
					var index = 'catalog' + '-' + e.tagName + '-' + i; 
					e.id = index;  
				}) 

			}

			//生成菜单
			var createCatalog = function() {
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

			//切换动画
			var bindAnimate = function() { 
				$(opt.box + ' a').click(function(){

					$(window).unbind('scroll');

					var it = this;
					$('body').animate({
						scrollTop: $($(it).attr('href')).offset().top
					}, 'fast',function(){
						bindScroll();
					})
					toggleActive($(it));
					return false;
				})
			}

			var bindScroll = function() {
				$(window).scroll(function(){
					header.map(function(i,e){
						if ($(window).scrollTop() > e.offsetTop) {
							toggleActive($(opt.box + ' a[href="#' + e.id + '"]'))
						}
					})
				})
			}

			var toggleActive = function(e) {
				$(opt.box + ' a').removeClass('active');
				e.addClass('active');
				$(opt.box + ' ul > li > ul').hide();
				$(opt.box + ' .active').parents('ul').show();
				$(opt.box + ' .active ~ ul').show();
			}

			var init = function() { 
				$(opt.box + ' ul > li > ul').hide();

				addIndex();
				createCatalog();
				bindAnimate();
				bindScroll();
			}	
			
			init();
		})

	}
})(window.jQuery); 
$('.container').catalog();

