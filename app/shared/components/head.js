import React from 'react'
import Helmet from 'react-helmet'

export const makeHead = ({title}) => (
  <Helmet
    htmlAttributes={{'lang': 'en'}}
    title="Page not found"
    titleTemplate={`${title} | %s`}
  />
)
