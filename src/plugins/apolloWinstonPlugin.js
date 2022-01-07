import { nanoid } from 'nanoid'
import Logger from '../lib/logger'
import apolloEvents from '../utils/apolloEvents'

const stringify = (obj) => JSON.stringify(obj)

const apolloWinstonLoggingPlugin = () => {
  const {
    didEncounterErrors,
    didResolveOperation,
    executionDidStart,
    parsingDidStart,
    responseForOperation,
    validationDidStart,
    willSendResponse,
    requestDidStart,
  } = apolloEvents

  return {
    requestDidStart(context) {
      const id = nanoid()
      const { operationName } = context.request

      if (requestDidStart) {
        Logger.log(
          'info',
          stringify({
            id,
            event: 'request',
            operationName,
          }),
        )
      }
      return {
        didEncounterErrors({ errors }) {
          if (didEncounterErrors) {
            Logger.log('error', stringify({ id, event: 'errors', errors }))
          }
        },

        willSendResponse() {
          if (willSendResponse) {
            Logger.log(
              'debug',
              stringify({
                id,
                event: 'response',
              }),
            )
          }
        },

        didResolveOperation() {
          if (didResolveOperation) {
            Logger.log(
              'debug',
              stringify({
                id,
                event: 'didResolveOperation',
              }),
            )
          }
        },
        executionDidStart() {
          if (executionDidStart) {
            Logger.log('debug', stringify({ id, event: 'executionDidStart' }))
          }
        },

        parsingDidStart() {
          if (parsingDidStart) {
            Logger.log('debug', stringify({ id, event: 'parsingDidStart' }))
          }
        },

        validationDidStart() {
          if (validationDidStart) {
            Logger.log('debug', stringify({ id, event: 'validationDidStart' }))
          }
        },

        responseForOperation() {
          if (responseForOperation) {
            Logger.log(
              'debug',
              stringify({
                id,
                event: 'responseForOperation',
              }),
            )
          }
          return null
        },
      }
    },
  }
}

export default apolloWinstonLoggingPlugin
