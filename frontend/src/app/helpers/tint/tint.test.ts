import { tint, toColorObject } from './tint'

const rgbBlue = 'rgb(20,60,200)'
const rgbaBlue = 'rgba(20,60,200,0.67423)'
const hex6Cyan = '#67DAF0'
const hex3Pink = '#F3A'
const hex4Pink = '#F3A9'
const rbgBrown = 'rgb(200,60,20)'
const rgbaBrown = 'rgba(200,60,20,0.98631)'

describe('tint', () => {
  describe('Logarithmic blending', () => {
    describe('Shades', () => {
      it('lightens rgb color', () => {
        expect(tint(0.42, rgbBlue)).toEqual('rgb(166,171,225)')
      })
      it('darkens hex color', () => {
        expect(tint(-0.4, hex3Pink)).toEqual('#c62884')
      })
      it('lightens rgba color', () => {
        expect(tint(0.42, rgbaBrown)).toEqual('rgba(225,171,166,0.986)')
      })
      it('returns black with ratio -1', () => {
        expect(tint(-1, rgbBlue)).toEqual('rgb(0,0,0)')
      })
    })
    describe('converts color notation', () => {
      it('converts from rgba to hexa', () => {
        // expect(tint(0.42, color2, "c")).toEqual("#a6abe1ac");
        expect(tint(0.42, rgbaBlue, { reformat: true })).toEqual('#a6abe1ac')
      })
      it('converts from hexa to rgba', () => {
        // expect(tint(0, color6, "c", true)).toEqual("rgba(255,51,170,0.6)");
        expect(tint(0, hex4Pink, { reformat: true })).toEqual('rgba(255,51,170,0.6)')
      })
      it('converts and returns white with ratio 1', () => {
        expect(tint(1, hex3Pink, { reformat: true })).toEqual('rgb(255,255,255)')
      })
    })
    describe('Blends two colors', () => {
      it('blends rgba with rgba', () => {
        expect(tint(-0.5, rgbaBlue, { toColor: rgbaBrown })).toEqual('rgba(142,60,142,0.83)')
      })
      it('blends rgba with rgb', () => {
        expect(tint(0.7, rgbaBlue, { toColor: rbgBrown })).toEqual('rgba(168,60,111,0.674)')
      })
      it('blends hex with rgb', () => {
        expect(tint(0.25, hex6Cyan, { toColor: rbgBrown })).toEqual('rgb(134,191,208)')
      })
      it('blends rgb with hex', () => {
        expect(tint(0.75, rbgBrown, { toColor: hex6Cyan })).toEqual('#86bfd0')
      })
    })
  })
  describe('Linear Blending', () => {
    describe('Shades', () => {
      it('lightens rgb color', () => {
        expect(tint(0.42, rgbBlue, { useLinear: true })).toEqual('rgb(119,142,223)')
      })
      it('darkens hex color', () => {
        expect(tint(-0.4, hex3Pink, { useLinear: true })).toEqual('#991f66')
      })
      it('lightens rgba color', () => {
        expect(tint(0.42, rgbaBrown, { useLinear: true })).toEqual('rgba(223,142,119,0.986)')
      })
      it('returns black with ratio -1', () => {
        expect(tint(-1, rgbBlue, { useLinear: true })).toEqual('rgb(0,0,0)')
      })
    })
    describe('converts color notation', () => {
      it('converts from rgba to hexa', () => {
        expect(tint(0.42, rgbaBlue, { reformat: true, useLinear: true })).toEqual('#778edfac')
      })
      it('converts from hexa to rgba', () => {
        expect(tint(0, hex4Pink, { reformat: true, useLinear: true })).toEqual('rgba(255,51,170,0.6)')
      })
      it('converts and returns white with ratio 1', () => {
        expect(tint(1, hex3Pink, { useLinear: true, reformat: true })).toEqual('rgb(255,255,255)')
      })
    })
    describe('Blends two colors', () => {
      it('blends rgba with rgba', () => {
        expect(tint(-0.5, rgbaBlue, { toColor: rgbaBrown, useLinear: true })).toEqual('rgba(110,60,110,0.83)')
      })
      it('blends rgba with rgb', () => {
        expect(tint(0.7, rgbaBlue, { toColor: rbgBrown, useLinear: true })).toEqual('rgba(146,60,74,0.674)')
      })
      it('blends hex with rgb', () => {
        expect(tint(0.25, hex6Cyan, { toColor: rbgBrown, useLinear: true })).toEqual('rgb(127,179,185)')
      })
      it('blends rgb with hex', () => {
        expect(tint(0.75, rbgBrown, { toColor: hex6Cyan, useLinear: true })).toEqual('#7fb3b9')
      })
    })
  })
  describe('Error handling', () => {
    describe('When invalid hex color provided', () => {
      it.each([1, 2, 5])('throws error if hex color has %s characters', (n) => {
        const correlativeNumbers = Array.from(Array(n).keys()).join('')
        expect(() => tint(0, `#${correlativeNumbers}`)).toThrow('Invalid hex color format')
      })
    })

    describe('When ratio is not between -1 and 1', () => {
      it('clamps ratio to -1', () => {
        expect(tint(-43, rgbBlue)).toEqual('rgb(0,0,0)')
      })
      it('clamps ratio to 1', () => {
        expect(tint(42, rgbBlue)).toEqual('rgb(255,255,255)')
      })
    })
  })
})

describe('toColorObject function', () => {
  it('should return a color object from hex', () => {
    expect(toColorObject('#fff')).toEqual({
      r: 255,
      g: 255,
      b: 255,
      a: -1
    })
  })
  it('should return a color object from hex with alpha', () => {
    expect(toColorObject('#fff6')).toEqual({
      r: 255,
      g: 255,
      b: 255,
      a: 0.4
    })
  })
  it('should return a color object from rgb', () => {
    expect(toColorObject('rgb(255,255,255)')).toEqual({
      r: 255,
      g: 255,
      b: 255,
      a: -1
    })
  })
  it('should return a color object from rgba', () => {
    expect(toColorObject('rgba(255,255,255,1)')).toEqual({
      r: 255,
      g: 255,
      b: 255,
      a: 1
    })
  })
  describe('Error handling', () => {
    it('should throw error if invalid color provided', () => {
      expect(() => toColorObject('foo')).toThrow('Invalid hex color format')
    })
    it('should throw error if invalid color provided', () => {
      expect(() => toColorObject('invalid color')).toThrow('Invalid color format')
    })
  })
})
