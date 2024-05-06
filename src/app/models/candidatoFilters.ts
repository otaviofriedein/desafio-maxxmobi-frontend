export interface CandidatoFilters {   
    nome: string;
    nascimento: Date;
    sexo: string;
    nota: number;    
    sortBy: { value: string, direction: string };
}