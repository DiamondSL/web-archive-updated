import React from 'react'
import parse, { HTMLReactParserOptions, domToReact } from 'html-react-parser'
import { Element } from 'domhandler'
import { Typography } from '@mui/material'

const MUIParseOptions:HTMLReactParserOptions = {
  replace: domNode => {
    if (domNode instanceof Element) {
      const childrenElements = domToReact(domNode.children)
      if (domNode.name === 'p') {
        return (
          <Typography variant={'body1'}>
            {childrenElements}
          </Typography>
        )
      }
      if (domNode.name === 'h1') {
        return (
          <Typography variant={'h1'}>
            {childrenElements}
          </Typography>
        )
      }
      if (domNode.name === 'h2') {
        return (
          <Typography variant={'h2'}>
            {childrenElements}
          </Typography>
        )
      }
      if (domNode.name === 'h3') {
        return (
          <Typography variant={'h3'}>
            {childrenElements}
          </Typography>
        )
      }
      if (domNode.name === 'h4') {
        return (
          <Typography variant={'h4'}>
            {childrenElements}
          </Typography>
        )
      }
      if (domNode.name === 'h5') {
        return (
          <Typography variant={'h5'}>
            {childrenElements}
          </Typography>
        )
      }
      if (domNode.name === 'h6') {
        return (
          <Typography variant={'h6'}>
            {childrenElements}
          </Typography>
        )
      }
    }
  }
}

const parseHTMLhelper = (htmlToParse:string) => {
  return parse(htmlToParse, MUIParseOptions)
}

export { parseHTMLhelper }
