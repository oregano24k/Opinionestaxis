export interface GroundingChunk {
  web?: {
    // FIX: Made uri and title optional to match the type from @google/genai SDK.
    uri?: string;
    title?: string;
  };
}

export interface SearchResult {
  text: string;
  sources: GroundingChunk[];
}