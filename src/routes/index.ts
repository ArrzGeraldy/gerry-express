import { Router, Application } from 'express'
import { HealthRouter } from './health.route'
import { ProductRouter } from './product.route'
import { AuthRouter } from './auth.route'

const _routes: Array<[string, Router]> = [
  ['/health', HealthRouter],
  ['/product', ProductRouter],
  ['/auth', AuthRouter]
]

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const routes = (app: Application) => {
  _routes.forEach((route) => {
    const [url, router] = route
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    app.use(url, router)
  })
}
