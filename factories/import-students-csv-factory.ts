import Papa from 'papaparse'

export class ImportStudentsCsvFactory {
  static parse<T = unknown> (file: File, config: Papa.ParseConfig<T> = {}): Promise<Papa.ParseResult<T>> {
    return new Promise((resolve, reject) => {
      Papa.parse<T>(file, {
        ...config,
        complete: (result) => {
          resolve(result)
        },
        error: (error) => {
          reject(error)
        }
      })
    })
  }
}
