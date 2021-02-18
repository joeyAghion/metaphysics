import { assign, clone, get, defaults, compact } from "lodash"
import request from "request"
import config from "config"
import { HTTPError } from "lib/HTTPError"
import { parse } from "qs"

// TODO: This `any` is a shame, but
// the type seems to be a bit of a mix of the original
// response and some faffing

export default (url, options = {}) => {
  return new Promise<any>((resolve, reject) => {
    const opts: any = clone(
      defaults(options, {
        method: "GET",
        timeout: config.REQUEST_TIMEOUT_MS,
      })
    )

    // Wrap user agent
    const userAgent = opts.userAgent
      ? opts.userAgent + "; Metaphysics"
      : "Metaphysics"
    delete opts.userAgent
    opts.headers = assign({}, { "User-Agent": userAgent }, opts.headers)

    if (opts.method === "PUT" || opts.method === "POST") {
      // Move params out of url and place into `body`.
      let parts: Array<string> = url.split("?")
      url = parts[0]

      opts.body = parse(parts[1])
      opts.json = true
    }

    request(url, opts, (err, response) => {
      if (err) return reject(err)
      // If there is a non-200 status code, reject.
      if (
        response.statusCode &&
        (response.statusCode < 200 || response.statusCode >= 300)
      ) {
        const message = compact([
          get(response, "request.uri.href"),
          response.body,
        ]).join(" - ")
        return reject(
          new HTTPError(message, response.statusCode || 500, response.body)
        )
      }

      try {
        const shouldParse = typeof response.body === "string"
        const parsed = shouldParse ? JSON.parse(response.body) : response.body

        resolve({
          body: parsed,
          headers: response.headers,
        })
      } catch (error) {
        reject(error)
      }
    })
  })
}
