import { AuthService } from 'services/auth.service'
import type { NextFunction, Request, RequestHandler, Response } from 'express'

export class AuthController {
  private authService = new AuthService()

  public login: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email, password } = req.body

      const { accessToken, refreshToken } = await this.authService.login({ email, password })

      return res.json({ status: 'SUCCESS', message: null, data: { accessToken, refreshToken } })
    } catch (error) {
      next(error)
    }
  }

  public register: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { firstName, lastName, email, password } = req.body

      await this.authService.register({ firstName, lastName, email, password })

      return res.json({ status: 'SUCCESS', message: 'user registered successfully', data: null })
    } catch (error) {
      next(error)
    }
  }

  public me: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email } = req.auth

      const userDetails = await this.authService.me(email)

      return res.json({ status: 'SUCCESS', message: null, data: userDetails })
    } catch (error) {
      next(error)
    }
  }

  public refreshToken: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { refreshToken } = req.body

      const { accessToken } = await this.authService.refreshToken(refreshToken)

      return res.json({ status: 'SUCCESS', message: null, data: { accessToken } })
    } catch (error) {
      next(error)
    }
  }
}
