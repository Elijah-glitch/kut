import { UserService } from 'server/modules/users/services/user.service'
import { ObjectId } from 'mongodb'
import type { NextFunction, Request, RequestHandler, Response } from 'express'
import type { CustomResponse } from 'server/common/types/response.interface'
import type { UserDto } from 'server/modules/users/dto/user.dto'

export class UserController {
  private readonly userService: UserService
  constructor() {
    this.userService = new UserService()
  }

  public me: RequestHandler = async (
    req: Request,
    res: Response<CustomResponse<UserDto>>,
    next: NextFunction
  ) => {
    try {
      const { userId } = req.auth

      const id = new ObjectId(userId)

      const userDetails = await this.userService.me(id)

      return res.json({ status: 'SUCCESS', message: null, data: userDetails })
    } catch (error) {
      next(error)
    }
  }
}
