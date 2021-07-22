export class UtilsService {
  /**
   * convert entity to dto class instance
   * @param {{new(entity: E, options: any): T}} model
   * @param {E} entity
   * @returns {T}
   */
  public static toDto<T, E>(model: new (entity: E) => T, entity: E): T {
    return new model(entity);
  }
}
