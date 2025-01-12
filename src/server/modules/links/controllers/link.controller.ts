import { LinkService } from 'server/modules/links/services/link.service'
import type { NextFunction, Request, RequestHandler, Response } from 'express'
import type { CustomResponse } from 'server/common/types/response.interface'
import type { LinkDto } from 'server/modules/links/dto/link.dto'

export class LinkController {
  private linkService: LinkService

  constructor() {
    this.linkService = new LinkService()
  }

  public getAllLinks: RequestHandler = async (
    req: Request,
    res: Response<
      CustomResponse<{
        links: LinkDto[]
        total: number
      }>
    >,
    next: NextFunction
  ) => {
    try {
      const { userId } = req.auth
      const { offset, limit, search } = req.query

      const allLinks = await this.linkService.getAllLinks(
        userId,
        Number(offset),
        Number(limit),
        search as string
      )

      return res.json({ status: 'SUCCESS', message: null, data: allLinks })
    } catch (error) {
      next(error)
    }
  }

  public getLink: RequestHandler = async (
    req: Request,
    res: Response<CustomResponse<LinkDto>>,
    next: NextFunction
  ) => {
    try {
      const { userId } = req.auth
      const { alias } = req.params

      const link = await this.linkService.getLink(userId, alias as string)

      return res.json({ status: 'SUCCESS', message: null, data: link })
    } catch (error) {
      next(error)
    }
  }

  public createLink: RequestHandler = async (
    req: Request,
    res: Response<CustomResponse<any>>,
    next: NextFunction
  ) => {
    try {
      const { userId } = req.auth
      const {
        alias,
        target,
        description,
        meta: { password, validFrom, validTill, maxVisits, active } = {},
      }: LinkDto = req.body

      const shortenedLink = await this.linkService.createLink({
        userId,
        alias,
        target,
        description,
        meta: { password, validFrom, validTill, maxVisits, active },
      })

      return res.json({ status: 'SUCCESS', message: null, data: shortenedLink })
    } catch (error) {
      next(error)
    }
  }

  public updateLink: RequestHandler = async (
    req: Request,
    res: Response<CustomResponse<any>>,
    next: NextFunction
  ) => {
    try {
      // const { email } = req.auth
      // const { alias } = req.params
      // const linkPayload: Link = req.body
      // const shortenedLink = await this.linkService.updateLink(email, alias, linkPayload)
      // return res.json({ status: 'SUCCESS', message: null, data: shortenedLink })
    } catch (error) {
      next(error)
    }
  }

  public deleteLink: RequestHandler = async (
    req: Request,
    res: Response<CustomResponse<null>>,
    next: NextFunction
  ) => {
    try {
      const { userId } = req.auth
      const { alias } = req.params

      await this.linkService.deleteLink(userId, alias)

      return res.json({ status: 'SUCCESS', message: 'link deleted successfully', data: null })
    } catch (error) {
      next(error)
    }
  }

  public redirectLink: RequestHandler = async (
    req: Request,
    res: Response<CustomResponse<any>>,
    next: NextFunction
  ) => {
    try {
      const { alias } = req.params
      const { password } = req.body
      const { statistics } = req

      const link = await this.linkService.redirectLink(alias, statistics, password)

      return res.json({
        status: 'SUCCESS',
        message: null,
        data: link,
      })
    } catch (error) {
      next(error)
    }
  }
}
