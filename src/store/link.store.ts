import { defineStore } from 'pinia'
import { FetchError } from 'ofetch'
import { logger } from 'utils/logger'
import type { Link } from 'interfaces/link.interface'

interface State {
  allLinks: Link[]
  link: Link | null
  linkViews: Record<string, number> | null
  overviewStats: Record<string, number> | null
  target: string | null
  totalCount: number
}

export const useLinkStore = defineStore('links', {
  state: (): State => ({
    allLinks: [],
    link: null,
    linkViews: null,
    overviewStats: null,
    target: null,
    totalCount: 0,
  }),

  actions: {
    async shortenLink(linkPayload: Pick<Link, 'alias' | 'target' | 'meta' | 'description'>) {
      try {
        const response = await this.$http.link.shorten(linkPayload)

        if (response.data) this.allLinks.unshift(response.data)

        return { error: null }
      } catch (err) {
        const error = (err as FetchError) || Error
        logger.error(error?.message)
        return { error: error?.data?.message || error?.message }
      }
    },

    async fetchAllLinks(offset = 0, limit = 5, search?: string) {
      try {
        const response = await this.$http.link.fetchLinks(offset, limit, search)
        this.allLinks = []
        this.totalCount = 0

        this.allLinks = response.data!.links!
        this.totalCount = response.data!.total!

        return { error: null }
      } catch (err) {
        const error = (err as FetchError) || Error
        logger.error(error?.message)
        return { error: error?.data?.message || error?.message }
      }
    },

    async fetchLinkByAlias(alias: string) {
      try {
        const response = await this.$http.link.fetchLink(alias)

        this.link = response.data!

        return { error: null }
      } catch (err) {
        const error = (err as FetchError) || Error
        logger.error(error?.message)
        return { error: error?.data?.message || error?.message }
      }
    },

    async redirectProtectedLink(alias: string, useragent: string, password: string) {
      try {
        const response = await this.$http.link.redirectProtectedLink(alias, useragent, password)

        this.target = response.data

        return { error: null }
      } catch (err) {
        const error = (err as FetchError) || Error
        logger.error(error?.message)
        return { error: error?.data?.message || error?.message, data: null }
      }
    },

    async deleteLink(alias: string) {
      try {
        await this.$http.link.deleteLink(alias)

        return { error: null }
      } catch (err) {
        const error = (err as FetchError) || Error
        logger.error(error?.message)
        return { error: error?.data?.message || error?.message, data: null }
      }
    },

    async fetchLinkViewStats(alias: string, period?: string) {
      try {
        const views = await this.$http.statistics.linkViews(alias, period)

        this.linkViews = views.data!
      } catch (error) {
        if (error instanceof FetchError) {
          logger.error(error.message)
        }
      }
    },

    async fetchOverviewStats() {
      try {
        const views = await this.$http.statistics.overview()

        this.overviewStats = views.data!
      } catch (error) {
        if (error instanceof FetchError) {
          logger.error(error.message)
        }
      }
    },
  },
})
