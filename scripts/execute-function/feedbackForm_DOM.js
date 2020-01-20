$(function () {
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