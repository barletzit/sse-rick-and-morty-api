import { ApiResponse, Resource, SyncEvent } from "../../shared/types";

const baseUrl = "https://rickandmortyapi.com/api";

export const processData = async (
  resource: Resource,
  sendEvent: (data: SyncEvent) => void
) => {
  try {
    const resourceUrl = `${baseUrl}/${resource}`;
    const firstPageResponse = await fetch(resourceUrl);

    if (!firstPageResponse.ok)
      throw new Error(`HTTP error! status: ${firstPageResponse.status}`);

    const initialData: ApiResponse = await firstPageResponse.json();

    const { pages, count } = initialData.info;
    let processedData = initialData.results.length;

    for (let page = 2; page <= pages; page++) {
      const pageResponse = await fetch(`${resourceUrl}?page=${page}`);

      if (!pageResponse.ok)
        throw new Error(`HTTP error! status: ${pageResponse.status}`);

      const data: ApiResponse = await pageResponse.json();

      const resourceData = data.results;

      processedData += resourceData.length;

      sendEvent({
        type: "progress",
        resourceType: resource,
        page,
        totalPages: pages,
        processedData,
        total: count,
        percentage: Math.round((processedData / count) * 100),
        resourceData,
      });

      await new Promise((resolve) => setTimeout(resolve, 1000));
    }
    sendEvent({
      type: "complete",
      totalProcessed: processedData,
    });
  } catch (error) {
    sendEvent({
      type: "error",
      message:
        error instanceof Error ? error.message : "An unknown error occurred",
    });
  }
};
