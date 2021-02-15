export type LunarAreaId = "A1" | "A2" | "A3" | "A4" | "B1" | "B2" | "B3" | "B4";

export interface State {
  eva: {
    [key in LunarAreaId]?: {
      objectives?: string[];
      warnings?: string[];
    }
  }
}
