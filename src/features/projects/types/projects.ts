export type ProjectCategory = "Web" | "Mobile" | "Web & Mobile";

export interface ProjectItem {
  id: number;
  name: string;
  category: ProjectCategory;
  image: string;
  imageAlt: string;
  background: string;
}

export interface ProjectStackLayout {
  wrapperUnits: number;
  triggerPercent: number;
  stackOffset: string;
  zIndex: number;
}
