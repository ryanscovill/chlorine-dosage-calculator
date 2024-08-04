interface Unit {
    name: string;
    factor: number;
}

export const units: Unit[] = [
    { name: "Liters", factor: 1000 },
    { name: "Cubic Meters", factor: 1 },
    { name: "Gallons (Imperial)", factor: 219.969204701183 },
    { name: "Gallons (US)", factor: 264.172 },
  ];


export default Unit;