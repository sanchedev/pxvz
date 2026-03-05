export class Theme {
  constructor(public textStyle: TextStyle = TextStyle.DEFAULT) {}
}

export class TextStyle {
  static get DEFAULT() {
    return new TextStyle()
  }

  constructor(
    public foregroundColor: string = '#000000',
    public fontSize: number = 16,
    public fontFamily: string = 'sans-serif',
    public fontWeight: FontWeight = FontWeight.Normal,
    public textAlign: TextAlign = TextAlign.Start,
  ) {}
}

export enum TextAlign {
  Start = 'start',
  Center = 'center',
  End = 'end',
}

export enum FontWeight {
  Normal = 'normal',
  Bold = 'bold',
}
