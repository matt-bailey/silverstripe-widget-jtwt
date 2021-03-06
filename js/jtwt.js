//jtwt.js by Harbor (http://jtwt.hrbor.com)

(function($){

 	$.fn.extend({
 		
		//pass the options variable to the function
 		jtwt: function(options) {


			//Set the default values, use comma to separate the settings, example:
			var defaults = {
				username : 'harbor',
                count : 4,
                image_size: 48,
                convert_links: 1,
                loader_text: 'loading new tweets'
			}
				
			var options =  $.extend(defaults, options);

    		return this.each(function() {
				var o = options;
                var obj = $(this);  
                
			$(obj).append('<ul id="jtwt"></ul>');	
			$("#jtwt", obj).append('<li id="jtwt_loader" style="display:none;">' + o.loader_text + '</li>');	
			$("#jtwt_loader").fadeIn('slow');

			// parseTwitterDate function by http://stackoverflow.com/users/367154/brady - Special thanks to @mikloshenrich
			function parseTwitterDate(tdate) {
    
    			var system_date = new Date(Date.parse(tdate));
    			var user_date = new Date();
    
    			if (K.ie) {
        			system_date = Date.parse(tdate.replace(/( \+)/, ' UTC$1'))
    			}
    
    			var diff = Math.floor((user_date - system_date) / 1000);
    			if (diff <= 1) {return "just now";}
    			if (diff < 20) {return diff + " seconds ago";}
    			if (diff < 40) {return "half a minute ago";}
    			if (diff < 60) {return "less than a minute ago";}
    			if (diff <= 90) {return "one minute ago";}
    			if (diff <= 3540) {return Math.round(diff / 60) + " minutes ago";}
    			if (diff <= 5400) {return "1 hour ago";}
    			if (diff <= 86400) {return Math.round(diff / 3600) + " hours ago";}
    			if (diff <= 129600) {return "1 day ago";}
    			if (diff < 604800) {return Math.round(diff / 86400) + " days ago";}
    			if (diff <= 777600) {return "1 week ago";}
    			return "on " + system_date;
    
    		}

    		// from http://widgets.twimg.com/j/1/widget.js
    		var K = function () {
    			var a = navigator.userAgent;
    			return {
    				ie: a.match(/MSIE\s([^;]*)/)
        		}
    		}();
	
			$.getJSON('http://api.twitter.com/1/statuses/user_timeline/' + o.username + '.json?count=' + o.count + '&include_rts=true&callback=?', function(data){ 

			$.each(data, function(i, item) {  console.log("Test");     
            
                jtweet = '<li class="jtwt_tweet">';
                
                
                
                if (o.image_size != 0) {
                
                today = new Date();
  
                jtweet += '<div class="jtwt_picture">';
                jtweet += '<a href="http://twitter.com/' + item.user['screen_name'] + '">'
                jtweet += '<img width="' + o.image_size +'" height="' + o.image_size + '" src="' + item.user['profile_image_url'] + '" />';
                jtweet += '</a><br />';
                jtweet += '</div>';

                } 
                
                
               
                var tweettext = item.text;
                var tweetdate = parseTwitterDate(item.created_at);
                
                if (o.convert_links != 0) {
                

  
                tweettext = tweettext.replace(/(http\:\/\/[A-Za-z0-9\/\.\?\=\-]*)/g,'<a href="$1">$1</a>');
                tweettext = tweettext.replace(/@([A-Za-z0-9\/_]*)/g,'<a href="http://twitter.com/$1">@$1</a>');
                tweettext = tweettext.replace(/#([A-Za-z0-9\/\.]*)/g,'<a href="http://twitter.com/search?q=$1">#$1</a>');
                
                }


                jtweet += '<p class="jtwt_tweet_text">';
                jtweet += tweettext;
				jtweet += '</p>';
               
                jtweet += '<a href="http://twitter.com/' + item.user['screen_name'] + '/statuses/' + item.id_str + '" class="jtwt_date">';
                
                jtweet += tweetdate;
                jtweet += '</a>';
 
                jtweet += '</li>';   				
                
                $("#jtwt", obj).append(jtweet);
        
    


          		 });   
                 

			$("#jtwt_loader").fadeOut('fast');   
           
		});
    
    
			
    		});
    	}
	});
	
})(jQuery);