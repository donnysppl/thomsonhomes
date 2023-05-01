export default function Seotags({title,description,keywoard}) {
    window.$('title').text(title);
    window.$('meta[name="description"]').attr('content', description);
    window.$('meta[name="keywords"]').attr('content', keywoard);
    window.$('meta[property="og:title"]').attr('content', title);
    window.$('meta[property="og:url"]').attr('content', window.location.href);
    window.$('meta[property="og:description"]').attr('content', description);
    window.$('meta[name="twitter:title"]').attr('content', title);
    window.$('meta[name="twitter:description"]').attr('content', description);
}
