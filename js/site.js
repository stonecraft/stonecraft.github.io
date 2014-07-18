(function($) {

	/* Hero image fader */
	$(document).ready(function() {
		$("#hero .dots .dot").click(function() {
			$("#hero .dots .active").removeClass("active");
			var li = $(this).closest("li");
			$(li).addClass("active");
			$("#hero .images .active").removeClass("active");
			$("#hero .images li").eq($(li).index()).addClass("active");
		});

		setInterval(function() {
			$("#hero .dots li.active").nextWrap().find(".dot").click();
		}, 7500);
	});

	/* Work item gallery */
	$(document).ready(function() {

		$("#work .gallery li").click(function(evt) {
			var src = $(this).find("img").data("fullsize-image");
			$("#work-show").removeClass("loaded").find("img.picture").attr("src", src);
			$("#work-show").addClass("active");
			evt.stopPropagation();
		});

		$("#work-show img.picture").load(function() {
			$("#work-show").addClass("loaded");
		});

		$("#work-show").click(function() {
			$("#work-show").removeClass("active");
		});

		$("#work .gallery .next").click(function() {
			var actives = $("#work .gallery .active");

			if ($(actives).last().length) {

				$(actives).slice(0, 3).removeClass("active");
				var new_actives = $(actives).last().nextAll(":lt(3)");

				$(new_actives).addClass("active");

				$(new_actives).each(function() {
					var img = $(this).find("img");
					$(img).attr("src", $(img).data("src"));
				});

			}

			checkButtons();
		});

		$("#work .gallery .prev").click(function() {
			var actives = $("#work .gallery .active");

			if ($(actives).first().length) {

				$(actives).slice(3).removeClass("active");
				var new_actives = $(actives).first().prevAll(":lt(3)");

				$(new_actives).addClass("active");

				$(new_actives).each(function() {
					var img = $(this).find("img");
					$(img).attr("src", $(img).data("src"));
				});

			}

			checkButtons();
		});

		function checkButtons() {
			var hide_prev = $("#work .gallery li").first().is(".active");
			var hide_next = $("#work .gallery li").last().is(".active");

			if (hide_prev) {
				$("#work .gallery .prev").hide();
			} else {
				$("#work .gallery .prev").show();
			}

			if (hide_next) {
				$("#work .gallery .next").hide();
			} else {
				$("#work .gallery .next").show();
			}
		}

		checkButtons();

	});

	/* Contact Form */
	$(document).ready(function() {
		$("#contact .form .submit input").click(function() {
			var name = $("#contact .form input[name='name']").val();
			var last_name = $("#contact .form input[name='last_name']").val();
			var tel_no = $("#contact .form input[name='tel_no']").val();
			var email = $("#contact .form input[name='email']").val();
			var message = $("#contact .form textarea").val();

			var subject = "Stonecraft Contact Form Submission";
			var body = "Name: " + name + "<br />" +
					   "Last Name: " + last_name + "<br />" +
					   "Telephone Number: " + tel_no + "<br />" +
					   "Email Address: " + email + "<br />" +
					   "Message: " + message + "<br />";

			if (!name || !email) {
				alert("Please enter a name and and an email address");
				return;
			}

			var mandrill_api_key = "bNzYovZ1dGIrWQk6g4zAow"; //use it to send spam. go on, I dare you.

			var submit = this;
			$(submit).val("Submitting").attr("disabled", "disabled");

			$.post("https://mandrillapp.com/api/1.0/messages/send.json", {
				"key" : mandrill_api_key,
				"message" : {
					"subject" : subject,
					"html" : body,
					"from_email" : "noreply@stonecraft4u.co.nz",
					"from_name" : "Stonecraft Website",
					"to" : [{
						"email" : "enquiries@stonecraft4u.co.nz"
					}]
				}
			}, function(data) {
				if (data[0].status != "sent") {
					alert("Error: Unable to send email: " + data[0].reject_reason);
					$(submit).removeAttr("disabled").val("Submit");
				} else {
					$("#contact").addClass("sent");
					$(submit).hide();
				}
			});

		});
	});

})(jQuery);

/* Stolen from http://darklaunch.com/2013/08/06/jquery-next-prev-with-wrapping */

(function( $ ) {
    $.fn.nextWrap = function( selector ) {
        var $next = $(this).next( selector );

        if ( ! $next.length ) {
            $next = $(this).parent().children( selector ).first();
        }

        return $next;
    };

    $.fn.prevWrap = function( selector ) {
        var $previous = $(this).prev( selector );

        if ( ! $previous.length ) {
            $previous = $(this).parent().children( selector ).last();
        }

        return $previous;
    };
})( jQuery );