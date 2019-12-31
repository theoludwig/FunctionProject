$(function () {
    if (localStorage.getItem('convertedHTML') && localStorage.getItem('texteMarkdown')) {
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
});