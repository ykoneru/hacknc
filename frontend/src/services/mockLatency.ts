// Simulated network delay for mock services. Remove once Developer 4's API is live.
export const delay = <T>(value: T, ms = 250) => new Promise<T>(resolve => setTimeout(() => resolve(value), ms))
