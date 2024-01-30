import { MetaData } from "../pagination";

export interface CommentPaginationProps {
  metaData: MetaData | null; 
  onPageChange: (page: number, pageSize: number, productId: number) => void;
  productId: number;
}
