import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import RadioButton from "./components/radioButton";
import { useCallback, useEffect, useState } from "react";

import { getAllProdutos, getDatabase, Produto, PRODUTOS } from './servicos/dados';
import { SQLiteDatabase } from "expo-sqlite";
import { useFocusEffect } from "@react-navigation/native";

export default function ListaProdutos({ navigation }: { navigation: any }) {  
    const [selectedItem, setSelectedItem] = useState<number | null>(null);
    const [searchText, setSearchText] = useState('');
    const [db, setDB] = useState<SQLiteDatabase>();
    const [listaDeProdutos, setListaDeProdutos] = useState<Produto[]>([]);

    const produtosFiltrados: Produto[] = listaDeProdutos.filter((produto: Produto) =>
        produto.descricao.toLowerCase().includes(searchText.toLowerCase())
    ).sort((a: Produto, b: Produto) => {//Ordena pela descrição depois pela validade.
        // Comparação pelo campo 'descricao'
        const descricaoComparison = a.descricao.localeCompare(b.descricao, 'pt', { sensitivity: 'base' });
        if (descricaoComparison !== 0) {
          return descricaoComparison; // Se as descrições forem diferentes, use essa ordenação.
        }
        // Comparação pelo campo 'validade' (convertendo para datas)
        const dateA = new Date(a.validade);
        const dateB = new Date(b.validade);
        return dateA.getTime() - dateB.getTime(); // Ordena por tempo em milissegundos.
      })
    const select = (id: number) => {
        setSelectedItem(id);
    };
   
    const initialize = useCallback(async () => {
        console.log('Inicializando...');
        const database = await getDatabase();
        setDB(database);
    
        const produtos: any = await getAllProdutos();
        setListaDeProdutos(produtos);
      }, []);
    
      useFocusEffect(
        useCallback(() => {
          initialize(); // Chama a função de inicialização
          return () => console.log('Tela perdeu o foco'); // Função de limpeza
        }, [initialize]) // Passa `initialize` como dependência
      );

    return (
        
        <ScrollView style={styles.box}>
            <View>
                <Text>Pesquisar:</Text>
                <TextInput style={styles.input} onChangeText={setSearchText}></TextInput>
            </View>         

            { item(selectedItem, select, produtosFiltrados) }
            
            <View style={styles.buttons}>
              <TouchableOpacity style={styles.button} onPress={ () => navigation.navigate('baixaEstoque', {selectedItem})}>
                <Text style={styles.textbutton}>Baixar do estoque</Text>
              </TouchableOpacity>
            </View>
        </ScrollView>
    );

}

function item(selectedItem: number | null, select: any, produtos: Produto[]) {
    return produtos.map( p => {        
        return (            
            <View style={styles.item} key={p.id}>
                <View style={styles.itemLeft}>
                    <Text style={styles.descricao}>{p.descricao}</Text>
                    <Text>Qtde: {p.qtde}</Text>
                    <Text>Validade: {p.validade}</Text>
                </View>
                <View style={styles.itemRight}>                     
                    <RadioButton 
                        id={p.id} 
                        funcao={(id) => {select(id)}} 
                        checked={p.id === selectedItem} >
                    </RadioButton>
                </View>
            </View>
        )
    })
}



const styles = StyleSheet.create({
    box: {
        margin: 10,
    },
    item: {        
        flexDirection: "row",        
        borderBottomWidth: 1,
        alignItems: "center",
        padding: 10 
    },
    descricao: {
        fontSize: 18,
        textAlign: "left"
    },
    itemLeft: {
        flex: 1,
        paddingHorizontal: 1
    },
    itemRight: {
        position: "absolute",
        right: 10,
        paddingHorizontal: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    buttons: {
        marginTop: 120,
        height: 100,
        flexDirection: "row",
        alignItems: 'center',
        justifyContent: 'center'
    },
    button: {       
        width: "45%",
        height: "45%",
        margin: 5,
        paddingTop: 5,  
        borderRadius: 8,
        backgroundColor: '#662d91',      
        
    },
      textbutton:{
        fontSize: 20,
        color: "#FFFF",
        textAlignVertical: "center",
        textAlign: "center"
    },
    searchTxt: {
        textAlignVertical: "center",
        textAlign: "center"
    },
    input: {
      height: 40,
      backgroundColor:"#E9E9E9",
      borderBottomWidth: 1,
      padding: 10,
      borderRadius: 7
    },
    title: {
        paddingTop: 20,
        fontSize: 20,
        fontWeight:"bold",
        textAlign: "center"
    }
      
})

