const enum IElement {
  Fire = 1 << 0,
  Water = 1 << 1,
  Earth = 1 << 2
}

const enum ISingleElementMonster {
  Noggin = IElement.Fire,
  Mammott = IElement.Water,
  Kayna = IElement.Earth
}

const enum IDoubleElementMonster {
  Maw = IElement.Fire | IElement.Water,
  Drumpler = IElement.Fire | IElement.Earth,
  Fwog = IElement.Water | IElement.Earth
}

type IMonster = ISingleElementMonster | IDoubleElementMonster

const monsters: IMonster[] = [
  ISingleElementMonster.Noggin,
  ISingleElementMonster.Mammott,
  ISingleElementMonster.Kayna,
  IDoubleElementMonster.Maw,
  IDoubleElementMonster.Drumpler,
  IDoubleElementMonster.Fwog
]
