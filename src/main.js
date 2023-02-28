/**
 * This template is a production ready boilerplate for developing with `PlaywrightCrawler`.
 * Use this to bootstrap your projects using the most up-to-date code.
 * If you're looking for examples or want to learn more, see README.
 */

// For more information, see https://sdk.apify.com
import { Actor } from "apify";
// For more information, see https://crawlee.dev
import { PlaywrightCrawler } from "crawlee";
import { router } from "./routes.js";

// Initialize the Apify SDK
await Actor.init();

const startUrls = [
    "https://www.linkedin.com/jobs/search/?currentJobId=3496413045&f_TPR=r86400&geoId=103644278&keywords=visa%20sponsorship&location=United%20States&refresh=true",
];

// const proxyConfiguration = await Actor.createProxyConfiguration();

const crawler = new PlaywrightCrawler({
    // proxyConfiguration,
    requestHandler: router,
});

await crawler.run(startUrls);

// Exit successfully
await Actor.exit();
