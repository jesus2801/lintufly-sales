import { Document, PaginateModel } from 'mongoose';

/**
 * Interfaz para los resultados paginados
 * @category Schema
 */
export interface PaginateResults<T> {
  /**
   * Documentos de la paginación
   */
  docs: T[];
  /**
   * Total de documentos posibles
   */
  totalDocs: number;
  /**
   * Límite establecido de documentos por página
   */
  limit: number;
  /**
   * Número de página actual
   */
  page?: number;
  /**
   * Todas las posibles páginas
   */
  totalPages: number;
  /**
   * Determina si existe una página siguiente
   */
  hasNextPage: boolean;
  /**
   * Número que representa la página siguiente
   */
  nextPage?: number | null;
  /**
   * Determina si existe una página anterior
   */
  hasPrevPage: boolean;
  /**
   * Número que representa la página anterior
   */
  prevPage?: number | null;
  /**
   * Contador de la página actual
   */
  pagingCounter: number;
}

/**
 * Interfaz para establecer el tipado de los modelos
 */
export interface IModel<T extends Document> extends PaginateModel<T> {}
