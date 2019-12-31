$(function () {
	$('#formLinkShortener').submit((event) => {
		event.preventDefault();
		const postdata = $('#formLinkShortener').serialize();
		$.ajax({  
			type: 'POST',
			url: '../../php/shortenLink.php', 
			data: postdata,
			success: (text) => {
                try {
                    $(".results").html(JSON.parse(text).message);
                } catch (error) { 
					$(".results").html("URL invalide.");
				}
			}
		});

		// Affiche l'input selon le choix de l'utilisateur sur la page linkShortener
		$('.hideUserShortcut').hide();
		$("#option").bind("keyup change", () => {
			if ($("#option").val() == "userShortcut") {
				$('.hideUserShortcut').show();
			} else {
				$('.hideUserShortcut').hide();
			}
		});
    });
});