$('.search').on('input', function(e) {
    let val = $(this).val();
    $(".feed").empty();
    Feed.headlines.map(x => x.text.toLowerCase().includes(val.toLowerCase()) ? Feed.addToFeed(x) : null);
});