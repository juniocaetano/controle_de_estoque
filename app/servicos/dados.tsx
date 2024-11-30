import * as SQLite from 'expo-sqlite';
import { SQLiteDatabase } from 'expo-sqlite';


export type Produto = {
  id: number | null;
  descricao: string;
  qtde: number;
  validade: string;
};

// Produtos de exemplo
export const PRODUTOS: Produto[] = [
  { id: 1, descricao: 'Desodorante Avanço', qtde: 7, validade: '11-11-2026' },
  { id: 2, descricao: 'Perfume Alfabela', qtde: 5, validade: '11-11-2024' },
  { id: 3, descricao: 'Creme O Boticário', qtde: 4, validade: '05-11-2028' },
  { id: 4, descricao: 'Argila Facial', qtde: 3, validade: '10-11-1996' },
];

// Abrir ou criar o banco de dados
export let db : SQLiteDatabase | null = null;;

// Inicializar o banco de dados
export async function getDatabase(): Promise<SQLiteDatabase> {
    if (!db) {
      db = await SQLite.openDatabaseAsync('estoqueDB'); // Abre o banco apenas uma vez
      await db.execAsync(`
        CREATE TABLE IF NOT EXISTS produtos (
          id INTEGER PRIMARY KEY NOT NULL,
          descricao TEXT NOT NULL,
          qtde INTEGER NOT NULL,
          validade TEXT NOT NULL
        );
      `);
      console.log('Banco de dados inicializado!');
    }
    return db;
}

// Inserir um produto
export async function createProduto(produto: Produto) {
  await db?.runAsync(
    `INSERT INTO produtos ( id, descricao, qtde, validade) VALUES ( ?, ?, ?, ? )`,
    produto.id,
    produto.descricao,
    produto.qtde,
    produto.validade,
    null, produto.descricao, produto.qtde, produto.validade
  );
  console.log('Produto inserido:', produto);
}

// Atualizar um produto
export async function updateProduto(produto: Produto) {
  await db?.runAsync(
    `UPDATE produtos SET descricao = ?, qtde = ?, validade = ? WHERE id = ?`,
    produto.descricao,
    produto.qtde,
    produto.validade,
    produto.id
  );
  console.log('Produto atualizado:', produto);
}

// Obter todos os produtos
export async function getAllProdutos(): Promise<Produto[]>  {
  let produtos: any = await db?.getAllAsync<Produto>('SELECT * FROM produtos');
  console.log('Produtos encontrados:', produtos);  


  return produtos? produtos : [];
}

// Obter todos os produtos
export async function getProdutoById(id: number): Promise<Produto | null | undefined> {
    const produto = await db?.getFirstAsync<Produto>('SELECT * FROM produtos WHERE id=?', id);
    console.log('Produto encontrado:', produto);
    return produto;
  }

// Deletar um produto pelo ID
export async function deleteProduto(id: number) {
  await db?.runAsync(`DELETE FROM produtos WHERE id = ?`, id);
  console.log(`Produto com ID ${id} deletado.`);
}
