export class OngAlreadyExistsError extends Error {
  constructor() {
    super('Ong already exists.')
  }
}
