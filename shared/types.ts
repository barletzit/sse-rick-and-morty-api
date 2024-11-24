export interface Character {
  id: number;
  name: string;
  status: string;
  species: string;
  type: string;
  gender: string;
  origin: {
    name: string;
    url: string;
  };
  location: {
    name: string;
    url: string;
  };
  image: string;
  episode: string[];
  url: string;
  created: string;
}

export interface ApiResponse {
  info: {
    count: number;
    pages: number;
    next: string | null;
    prev: string | null;
  };
  results: Character[];
}

export type ProgressEvent = {
  resourceType: Resource;
  type: "progress";
  page: number;
  totalPages: number;
  processedData: number;
  total: number;
  percentage: number;
  resourceData: Character[];
};

export type CompleteEvent = {
  type: "complete";
  totalProcessed: number;
};

export type ErrorEvent = {
  type: "error";
  message: string;
};

export type SyncEvent = ProgressEvent | CompleteEvent | ErrorEvent;

const status = {
  idle: "idle",
  fetching: "fetching",
  completed: "completed",
  error: "error",
} as const;

type SyncStatus = keyof typeof status;

export interface SyncState {
  status: SyncStatus;
  progress: number;
  currentPage: number;
  totalPages: number;
  processedCharacters: number;
  totalCharacters: number;
  characters: Character[];
  error: string | null;
}

const resource = {
  character: "character",
  location: "location",
  episode: "episode",
} as const;

export type Resource = keyof typeof resource;

export type ProcessDataResult = Omit<SyncEvent, "type" | "percentage">;
