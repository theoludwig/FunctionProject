$(function () {
    /* ÉXECUTION DES FONCTONS */

    // Touche entrer génère un clique sur les classes .btn à part sur la page convertEncoding
    $("body").keydown(function(e){
        if(e.which === 13 && chemin !== '/views/function-views/convertEncoding.php'){
            $(".btn").click();
        }
    });

    if (chemin === "/views/function-views/convertMarkdown.php" && localStorage.getItem('convertedHTML') && localStorage.getItem('texteMarkdown')) {
        $('.results').html(localStorage.getItem('convertedHTML'));
        $('#texteMarkdown').val(localStorage.getItem('texteMarkdown'));
    }
    $("#texteMarkdown").bind("keyup change", () => {
        const textMarkdown = $('#texteMarkdown').val();
        const convertedHTML = marked(textMarkdown);
        localStorage.setItem("convertedHTML", convertedHTML);
        localStorage.setItem("texteMarkdown", textMarkdown);
        $('.results').html(convertedHTML);
    });

	$('#formLinkShortener').submit((e) => {
		e.preventDefault();
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
    });
    
	$('#feedbackForm').submit((e) => {
		e.preventDefault();
		const postdata = $('#feedbackForm').serialize();
		$.ajax({  
			type: 'POST',
			url: '../../php/feedbackForm.php', 
			data: postdata,
            success: (response) => {
                const result = JSON.parse(response);
                $(".results").html(result.message);
                if(result.isSuccess) {
                    $("#feedbackForm")[0].reset();
                }
			}
		});
	});

});