import generator from 'crypto-random-string'

export default (length: number): string => {
  return generator({ length, type: 'numeric' })
}
