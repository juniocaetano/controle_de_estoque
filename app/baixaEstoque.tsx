import React, { useEffect, useState } from "react";
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { getDatabase, getProdutoById, Produto, PRODUTOS, updateProduto } from "./servicos/dados";
import { SQLiteDatabase } from "expo-sqlite";



const showAlert = () =>
    Alert.alert('', 'Saldo insuficiente', [
      {text: 'OK', onPress: () => console.log('OK Pressed')},
    ]);


export default function BaixaEstoque({ route }: any){
    
    const { selectedItem } = route.params;
    //let produto: Produto | null | undefined;// = PRODUTOS.find( p => p.id === selectedItem)
    const [produto, setProduto] = useState<Produto>();
    
    const [valueInput, setValueInput] = useState<string>('');
    const [db, setDB] = useState<SQLiteDatabase>();

    
  useEffect( () =>{
    const initialize = async () => { 
      const database = await getDatabase();
      setDB(database);
      console.log('asdf')
      if(selectedItem > -1){
        const fetchedProduto = await getProdutoById(selectedItem);
        if (fetchedProduto) {
          setProduto(fetchedProduto);
        }
    }

    }
    initialize();
  },[selectedItem])

    function subtrair() {
        console.log('teste 2')
        console.log(produto)
        if(produto?.id && valueInput) {
            console.log('teste 3') 
            let valueIn = parseInt(valueInput, 10)
            if(valueIn > produto.qtde){
                showAlert();
                return;
            }
            
          
            produto.qtde = produto.qtde - parseInt(valueInput, 10);
            setProduto(produto);
            setValueInput('');
          
            updateProduto(produto).then( () =>{
               Alert.alert("Sucesso", "Produto atualizado com sucesso!");
            })
            
            

            //const index = PRODUTOS.findIndex((prod) => prod.id === produto.id);
            //if (index !== -1) {
             //   PRODUTOS[index] = produto;
            //}
        }
        getProdutoById(selectedItem);
    }
   
    return (
        <View  style={styles.box}>
            <Text style={styles.title}>Item </Text>
            <Text>Código {selectedItem}</Text>
            <View  style={styles.item}>
                <Text style={styles.descricao}>{produto?.descricao}</Text>
                <Text style={styles.validade}>Validade: {produto?.validade}</Text>
                <Text  style={styles.qtde}>Quantidade: {produto?.qtde}</Text>                
            </View>

            <Text style={styles.title}>Qtde a subtrair</Text>
            <TextInput keyboardType='numeric' style={styles.input} onChangeText={setValueInput} value={valueInput}></TextInput>
          
            <TouchableOpacity style={styles.button} onPress={ subtrair }>
                <Text style={styles.textbutton}>Confirmar</Text>
              </TouchableOpacity>
        </View>
    );
}



const styles = StyleSheet.create({
    item: {               
        paddingTop: 30,
        alignItems: "center",
        padding: 6
    },
    descricao: {
        fontWeight:"bold",
        fontSize: 25,
        textAlign: "left",
        padding: 10
    },
    validade: {
        fontSize: 20,
        textAlign: "left",
        padding: 5
    },
    qtde: {
        fontSize: 20,
        textAlign: "left",
        padding: 5
    },
    title: {
        paddingTop: 50,
        paddingBottom: 5,
        textAlign: "center"
    },
    button: {
        marginTop: 60,
        width: 250,
        height: 50,        
        borderRadius: 8,
        backgroundColor: '#662d91',
    },    
    textbutton:{
        flex: 1,
        fontSize: 20,
        color: "#FFFF",
        textAlignVertical: "center",
        textAlign: "center",
        
    },
    box: {
        alignItems: "center",
    },
    input: {
        height: 40,
        width: 100,
        backgroundColor:"#E9E9E9",
        padding: 10,
        borderRadius: 7,
        marginBottom: 10,
        borderBottomWidth: 1,
        textAlign: 'center'
      },


});


