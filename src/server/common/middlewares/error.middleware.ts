import { isCelebrateError } from 'celebrate'
import type { NextFunction, Request, Response } from 'express'
import type { HttpExceptionError } from '~/server/common/exceptions/http.exception'
import { logger } from '~/server/common/utils/logger'

interface ValidationError {
  error: string
  location: string | undefined
}

export const errorMiddleware = (
  error: HttpExceptionError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (isCelebrateError(error)) {
      const message: ValidationError[] = []
      const status = 400

      for (const value of error.details.values()) {
        value.details.forEach((err) => {
          message.push({
            location: err.context?.key,
            error: err.message.replaceAll('"', ''),
          })
        })
      }

      logger.error(`[${req.method}] [${req.path}] [${status}], ${message}`)

      res.status(status).json({
        status: 'FAILED',
        message,
        data: null,
      })
    } else {
      const status = error.status || 500
      const message = error.message || 'Something went wrong'

      logger.error(`[${req.method}] [${req.path}] [${status}], ${message}`)

      res.status(status).json({
        status: 'FAILED',
        message,
        data: null,
      })
    }
  } catch (error) {
    next(error)
  }
}
