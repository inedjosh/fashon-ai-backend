import configs from '../config/config'

export default () => {
  const environment = configs.NODE_ENV

  switch (environment) {
    case 'production':
      return configs.PORT
    case 'development':
      return 4000
    case 'test':
      return 4001
    default:
      return configs.PORT
  }
}
