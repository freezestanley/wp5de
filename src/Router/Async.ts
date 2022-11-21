import loadable from '@loadable/component'
export const AsyncCanvas = loadable(
  () =>
    import(
      /*
      webpackChunkName: "Stage",
      webpackPrefetch: true,
      webpackPreload: true
      */
      `@/Pages/Stage`
    )
)

export const AsyncDocument = loadable(
  () =>
    import(
      /*
      webpackChunkName: "Document",
      webpackPrefetch: true,
      webpackPreload: true
      */
      `@/Pages/Document`
    )
)
