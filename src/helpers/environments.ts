import configs from '../config/config'

export const appInProductionEnvironment = (): boolean => {
  return configs.NODE_ENV === 'production'
}

export const appInDevelopmentEnvironment = (): boolean => {
  return configs.NODE_ENV === 'development'
}

export const appInTestEnvironment = (): boolean => {
  return configs.NODE_ENV === 'test'
}

export const appNotInTestEnvironment = (): boolean => {
  return configs.NODE_ENV !== 'test'
}
