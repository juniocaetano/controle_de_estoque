import { StyleSheet, Text, TextInput, View, TouchableOpacity, ScrollView } from "react-native";
import { deleteProduto, getAllProdutos, getDatabase, Produto, PRODUTOS } from './servicos/dados';
import { useCallback, useEffect, useState } from 'react';
import AntDesign from '@expo/vector-icons/AntDesign';
import { useFocusEffect } from "@react-navigation/native";



export default function AlteraProduto({ navigation }: { navigation: any }) {
    
    const [searchText, setSearchText] = useState('');
    const [listaDeProdutos, setListaDeProdutos] = useState([]);
    const [db, setDB] = useState<any>();

    //const produtosFiltrados: Produto[] = [];
    const produtosFiltrados: Produto[] = listaDeProdutos.filter((produto: Produto) =>
        produto.descricao.toLowerCase().includes(searchText.toLowerCase())
    );

    const excluir = async (id: any) => {
        await deleteProduto(id)
        //let index: number = listaDeProdutos.findIndex( p => p.id === id)
        //PRODUTOS.splice(index,1)
        setListaDeProdutos((p) => p.filter((p: Produto) => p.id !== id))//atualiza a tela        
    }

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


    function item(produtos: Produto[]){
        return produtos.map( (p: Produto) => {
            return(
                <View style={styles.item} key={p.id}>
                    <View style={styles.itemLeft}>
                        <Text style={styles.descricao}>{p.descricao} - {p.id}</Text>
                        <Text>Qtde: {p.qtde}</Text>
                        <Text>Validade: {p.validade}</Text>
                    </View>
                    <View style={styles.itemRight}>
                        <TouchableOpacity style={styles.btnEditar} 
                            onPress={() => navigation.navigate('cadProduto', {id: p.id, title: 'Edição'})} >
                                <AntDesign name="edit" size={24} color="black" />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => excluir(p.id)} style={styles.btnEcluir}>
                            <AntDesign name="delete" size={24} color="black" style={styles.btnIcon} />                            
                        </TouchableOpacity>
                    </View>
                </View>
            )
        })
    }

    return (
        <View style={styles.box}>
            <View>
                <Text>Pesquisar:</Text>
                <TextInput style={styles.input} onChangeText={setSearchText}></TextInput>
            </View>
            <Text style={styles.title}>Lista de Produtos</Text>
            <ScrollView style={ {marginBottom: 100}}>
                { item(produtosFiltrados) }
            </ScrollView>
        </View>
    );

}


const styles = StyleSheet.create({
    box: {
        margin: 10,
    },
    item: {        
        flexDirection: "row",        
        borderBottomWidth: 1,
        alignItems: "center",
        paddingBottom: 10 
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
        flexDirection: "row",
        position: "absolute",
        right: 10,
        paddingHorizontal: 1,
        justifyContent: "center",
        alignItems: "center"
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
        textAlign: "center",
        paddingBottom: 10
    },
    btnEcluir: {
        minWidth: 40,
        minHeight: 25,
      //  backgroundColor: 'red',
        borderRadius: 4,
        borderWidth: 1,
        borderColor: 'red',
        alignItems: 'center',
        margin: 5
    },
    btnEditar: {
        minWidth: 40,
        minHeight: 25,
       // backgroundColor: 'green',
        borderRadius: 4,
        borderWidth: 1,
        borderColor: 'green',
        alignItems: 'center',
        margin: 5
    },
    btnIcon: {
        justifyContent: 'center'
    }
})

