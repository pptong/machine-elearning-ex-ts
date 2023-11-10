export interface RouterItem {
  path: string;
  method: "get" | "post" | "put" | "delete"
  action :any
}
