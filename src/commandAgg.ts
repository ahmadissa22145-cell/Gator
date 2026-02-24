import { scrapeFeeds } from "./lib/db/queries/feeds";
import { fetchFeed } from "./RSS";


export async function handlerAgg(cmdName: string, ...args: string[]){

   if(args.length < 1) throw new Error("Usage: agg <durationStr>(e.g. 1ms, 5m)");

   const durationStr = args[0];
   const intervalMs  = parseDuration(durationStr);

   console.log(`Collecting feeds every ${durationStr}...`);

   await scrapeFeeds().catch(handleError)

   const interval = setInterval(() => { scrapeFeeds().catch(handleError)}, intervalMs);

   await new Promise<void>((resolve) => {
      process.on("SIGINT", () => {
      console.log("Shutting down feed aggregator...");
      clearInterval(interval);
      resolve();
      });
   });
}

function handleError(err: unknown){

   if (err instanceof Error) {
    console.error("Error:", err.message);
   } 
   else {
    console.error("Unknown error:", err);
  }
}


export function parseDuration(durationStr: string): number{

   const regex = /^(\d+)(ms|s|m|h)$/;
   const match = durationStr.match(regex);

   if (!match) {
    throw new Error("Invalid duration format. Use formats like 1s, 5m, 1h, 100ms");
   }

   const value = Number(match[1]);
   const unit = match[2];

   switch(unit){
      
      case "ms":
         return value;
        
      case "s":
         return value * 1000;
      
      case "m":
         return value * 1000 * 60 ;
         
      case "h":
         return value * 1000 * 60 * 60;

      default:
         throw new Error("Invalid time unit");    
   }
}
