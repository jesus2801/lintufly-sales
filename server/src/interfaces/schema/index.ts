import { Document, PaginateModel } from 'mongoose';

/**
 * Interfaz para los resultados paginados
 * @category Schema
 */
export interface PaginateResults<T> {
  docs: T[];
  totalDocs: number;
  limit: number;
  page?: number;
  totalPages: number;
  hasNextPage: boolean;
  nextPage?: number | null;
  hasPrevPage: boolean;
  prevPage?: number | null;
  pagingCounter: number;
}

export interface IModel<T extends Document> extends PaginateModel<T> {}
