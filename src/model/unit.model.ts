
export interface IUnit {
   id?: number;
   name?: string;
   description?: string;
   expansion?:string;
   age?:string; 
   cost: ICost;
   build_time?: number;
   reload_time?: number;
   attack_delay?: number;
   movement_rate?: number;
   line_of_sight?: number;
   hit_points?:number;
   accuracy?:string;
   armor?: string;
   attack?:number;
   range?: number;
   attack_bonus?: Array<string>

}

export interface ICost {
    Wood?: number;
    Food?: number;
    Gold?: number;
}
