export interface ICreditCardType {
    niceType: string;
    type: string;
    patterns: number[] | [number[]];
    gaps: number[];
    lengths: number[];
    code: {
        size: number;
        name: string;
    };
    matchStrength?: number;
}
declare type TGetTypeCard = [ICreditCardType, string];
export declare const getTypeCard: (value: string, availableOptions?: string[]) => TGetTypeCard;
export declare const formatValue: (value: string, type: ICreditCardType) => string;
export {};
