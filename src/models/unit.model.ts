interface Unit {
    name: string;
    factor: number;
}

export const volumeUnits: Unit[] = [
    { name: "Liters", factor: 1000 },
    { name: "Cubic Meters", factor: 1 },
    { name: "Gallons (Imperial)", factor: 219.969204701183 },
    { name: "Gallons (US)", factor: 264.172 },
  ];

export const lengthUnits: Unit[] = [
    { name: "Meters", factor: 1 },
    { name: "Feet", factor: 3.28084 },
    { name: "Inches", factor: 39.3701 },
    { name: "Yards", factor: 1.09361 },
  ];


export default Unit;