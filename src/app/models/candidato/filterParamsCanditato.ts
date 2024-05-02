
export class FilterCandidatoParams {
    nome: string = '';
    nascimento: Date | null = null;
    sexo: string = '';
    nota: number | null = null;
  
    constructor(nome: string = '', nascimento: Date | null = null, sexo: string = '', nota: number| null = null) {
        this.nome = nome;
        this.nascimento = nascimento;
        this.sexo = sexo;
        this.nota = nota;
    }
  }