export const API_ROUTES = {
  analyzeStyle: "/api/styles/analyze",
  getStyleProfile: (id: string) => `/api/styles/${id}`,
  generateIcons: "/api/icons/generate",
  downloadIcon: (id: string) => `/api/icons/${id}/download`,
  figmaImport: "/api/figma/import"
} as const;

export type ApiRouteKey = keyof typeof API_ROUTES;
