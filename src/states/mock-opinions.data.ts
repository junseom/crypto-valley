import { Opinion } from "./opinions.state";

export const mockOpinionsData: Opinion[] = [
  {
    id: 0,
    cause: "CFTC Investigation",
    effect: "increase in last 2 hours",
    content:
      "The Commodity Futures Trading Commission (CFTC) is reportedly investigating Binance, the world's largest cryptocurrency exchange, for allowing Americans to place wagers that violate U.S. rules.",
    sourceType: "News",
    link: "https://www.bloomberg.com/news/articles/2021-03-12/binance-under-investigation-by-cftc-over-us-customers-report",
  },
  {
    id: 1,
    cause: "El Salvador buys 150 Bitcoins",
    effect: "increase in last 1 hours",
    content:
      "El Salvador has purchased 150 Bitcoins, President Nayib Bukele announced on Twitter. The country now holds 700 Bitcoins in its treasury.",
    sourceType: "Tweet",
    link: "https://twitter.com/nayibbukele/status/1430644110016972291",
  },
];
