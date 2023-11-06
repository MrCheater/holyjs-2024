export type Split<
  TString extends string,
  TDelimiter extends string
> = string extends TString
  ? string[]
  : TString extends ""
  ? []
  : TString extends `${infer T}${TDelimiter}${infer U}`
  ? [T, ...Split<U, TDelimiter>]
  : [TString]

export const split = <TString extends string, TDelimiter extends string>(
  str: TString,
  delimiter: TDelimiter
): Split<TString, TDelimiter> => str.split(delimiter) as any

const words = split(`Hello world! I am a mrcheater`, " ")
const path = split(`home/mrcheater/holyjs-2024/src`, "/")
