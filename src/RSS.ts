import { XMLParser } from "fast-xml-parser";

export async function fetchFeed(feedURL: string){

    const response = await fetch(feedURL, {
        headers:{
            "User-Agent":"gator",
        },
    });

    const xmlData = await response.text();

    const xmlParser = new XMLParser();

    const parsedFeed  = xmlParser.parse(xmlData) as RSSFeed;

    if(!validRSSFeed(parsedFeed))
        throw new Error(`The website with url : ${feedURL} \n did not return a valid RSS feed`);

    const channel = parsedFeed.rss.channel;

    const metaData = {
        title: channel.title,
        link: channel.link,
        description: channel.description,
    }

    const feedItems = Array.isArray(channel.item) ? channel.item : channel.item ? [channel.item] : [];

    const validItems = validRSSItems(feedItems);

    return{
        channel:{
            title: metaData.title,
            link: metaData.link,
            description: metaData.description,
        } ,
        items: validItems,
    };

}   

function validRSSFeed(feed: RSSFeed){
    return (
           feed?.rss.channel                                  &&
           typeof feed.rss.channel.title       ==="string"    &&
           typeof feed.rss.channel.link        ==="string"    &&
           typeof feed.rss.channel.description ==="string"    
        );
}

function validRSSItems(items: RSSItem[]){

    const arrValidItems = items.filter( i =>{
        
       return (
                i.title?.trim().length > 0 &&
                i.link?.trim().length > 0 &&
                i.pubDate?.trim().length > 0
       );

    })
    return arrValidItems;
}

export type RSSFeed = {
    rss:{
        channel: {
            title: string;
            link: string;
            description: string;
            item: RSSItem[];
        };
    };
}

type RSSItem = {
    title: string;
    link: string;
    description: string;
    pubDate: string;
};

