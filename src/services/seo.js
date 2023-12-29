// seo.js
import { useHead } from '@unhead/vue'

export function generateSeoMeta(pageTitle, pageDescription, pageImage, keywords) {
    const author = "BetBoost";
    const siteTitle = "Application BetBoost";
    const globalPageTitle = pageTitle + " • " + siteTitle;
    const pageUrl = window.location.href;
    const locale = "fr_FR";
    const viewport = "width=device-width, initial-scale=1.0, maximum-scale=1.0";
    const twitterAccount = "@MyBetBoost";
    const twitterCard = "summary_large_image";
    const twitterCreator = twitterAccount;

    useHead({
      title: globalPageTitle,
      meta: [
        {
            name: "viewport",
            content: viewport,
        },
        {
          name: "description",
          content: pageDescription,
        },
        {
            name: "keywords",
            content: keywords.join(", "),
        },
        {
            name: "author",
            content: author,
        },
        {
            name: "robots",
            content: "index, follow",
        },
        {
            name: "googlebot",
            content: "index, follow",
        },
        // Balises Open Graph pour les réseaux sociaux
        {
            property: "og:locale",
            content: locale,
          },
        {
          property: "og:site_name",
          content: siteTitle,
        },
        {
          property: "og:title",
          content: globalPageTitle,
        },
        {
          property: "og:url",
          content: pageUrl,
        },
        {
          property: "og:image",
          content: pageImage,
        },
        {
          property: "og:description",
          content: pageDescription,
        },
        // Balises Twitter Card
        {
          name: "twitter:title",
          content: globalPageTitle,
        },
        {
          name: "twitter:description",
          content: pageDescription,
        },
        {
          name: "twitter:image",
          content: pageImage,
        },
        {
          name: "twitter:image:alt",
          content: globalPageTitle,
        },
        {
            name: "twitter:creator",
            content: twitterCreator,
        },
        {
            name: "twitter:site",
            content: twitterAccount,
        },
        {
            name: "twitter:card",
            content: twitterCard,
        },
      ]
    });
}
