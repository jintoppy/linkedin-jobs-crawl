import { Dataset, createPlaywrightRouter } from "crawlee";
import { Actor } from "apify";

export const router = createPlaywrightRouter();

router.addDefaultHandler(async ({ enqueueLinks, log }) => {
    try {
        log.info(`enqueueing new URLs`);
        await enqueueLinks({
            selector: "ul.jobs-search__results-list li a.base-card__full-link",
            label: "detail",
        });
    } catch (error) {}
});

router.addHandler("detail", async ({ request, page, log }) => {
    try {
        await page.click("button.show-more-less-html__button");
        const companyLogo = await page
            .locator("img.artdeco-entity-image.artdeco-entity-image--square-5")
            .getAttribute("src");
        const title = await page
            .locator("h1.top-card-layout__title.topcard__title")
            .textContent();
        const companyName = await page
            .locator("a.topcard__org-name-link")
            .textContent();
        const description = await page
            .locator("div.description__text")
            .textContent();
        log.info(`${title}`, { url: request.loadedUrl });

        await Actor.pushData({
            url: request.loadedUrl,
            companyLogo,
            title,
            companyName,
            description,
        });
    } catch (e) {}
});
