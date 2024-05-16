export interface DonationPoint {
  id: number;
  nome: string;
  cidade: string;
  uf: string;
  rua: string;
  numero: string;
  bairro: string;
  telefone: string;
}

export interface DonationPointRequest {
  nome: string;
  cidade: string;
  uf: string;
  rua: string;
  numero: string;
  bairro: string;
  telefone: string;
}
