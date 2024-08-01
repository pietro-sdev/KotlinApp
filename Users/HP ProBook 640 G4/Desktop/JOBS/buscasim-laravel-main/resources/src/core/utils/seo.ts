export async function gaPageView(title: string) {
  if ('dataLayer' in window && Array.isArray(window.dataLayer)) {
    const path = window.location.pathname + window.location.search;

    window.dataLayer?.push({
      event: 'pageview',
      page: {
        page_title: title,
        page_location: path,
      },
    });
  }
}

export function gaConversion(conversionId: string) {
  if ('gtag' in window && typeof window.gtag === 'function') {
    window.gtag('event', 'conversion', {
      send_to: conversionId,
    });
  }
}
