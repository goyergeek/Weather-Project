$(function() {
    $('.myMenu > li').hover(function() {
        $(this).find('ul').stop().slideDown(200);
    },
    function() {
        $(this).find('ul').stop().slideUp(100);
    });
});

// $(function() {
//     $('.appendHere').append('<code>'+JSON.stringify(layout[0])+'</code>');
// })
