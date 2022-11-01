// add to feed

let Feed = {
    headlines: [],
    initialized: false,
    allHeadlinesToFeed: () => {
        $(".feed").empty();
        Feed.headlines.forEach(headline => {
            Feed.addToFeed(headline);
        });
    },
    addToFeed: (headline) => {

        let headlineDiv_wrapper = $("<div class=\"w3-card-4 w3-margin w3-white w3-mobile\">");
        let headlineDiv         = $("<div class=\"w3-container w3-padding-16\">");
        
        let hash                = headline.hash;
        let text                = headline.text;
        let link                = headline.link;
        let date                = headline.pubDate;
        let source              = headline.source;
        let content             = headline.content;
        let media               = headline.mediaUrls;
    
        let headlineText        = $("<p>").text(text);
        let headlineLink        = $("<a>").attr("href", link).text(source);
        let headlineDate        = $("<p>").text(date);
        let headlineMedia       = $("<img>").attr("src", (media.length > 0) ? media[0] : "https://via.placeholder.com/150");

        headlineMedia.css("width", "50%");
    
        headlineDiv
            .css("margin", "0 auto")
            .addClass("headline")
            .text(headline.title)
            .append(headlineText, headlineLink, headlineDate, headlineMedia);
    
        headlineDiv_wrapper
            .append(headlineDiv)
            .attr("data-hash", hash);
        
        $(".feed").append(headlineDiv_wrapper);
    },
    fetchData: () => {
        $.getJSON("https://headlines.recon.us.com/api/v1/?action=current", (data) => {
            let mjr = data.data.major_headlines;
            Feed.headlines = data.data.major_headlines.concat(data.data.headlines);
            if (!Feed.initialized) {
                Feed.allHeadlinesToFeed();
                Feed.initialized = true;
                let scrollerString = [];
                mjr.forEach(headline => {
                    scrollerString.push(headline.text);
                });
                let scrollerStringA = scrollerString.join(" | ");
                let scrollerStringL = scrollerStringA.length;
                let scrollerStringTime = (scrollerStringL * 100) / 1e3;
                console.log(scrollerStringTime);
                $(".scroller-content")
                    .text(scrollerStringA)
                    .css("animation", `move ${scrollerStringTime/ 2}s linear infinite`)
                    .css("width", `${scrollerStringL * 10}px`);
            };
        });
    }
};

// onload
$(() => {
    Feed.fetchData();
});

