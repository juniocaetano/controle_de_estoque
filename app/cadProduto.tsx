import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert } from "react-native";
import { createProduto, getAllProdutos, getDatabase, getProdutoById, Produto, PRODUTOS, updateProduto } from "./servicos/dados";
import { useEffect, useState } from "react";
import { SQLiteDatabase } from "expo-sqlite";

export default function CadProduto({ route }: any) {
  
  const { id, title } = route.params;
  //const produto: (Produto | undefined) = PRODUTOS.find( p => p.id === id);

  const [descricao, onChangeDescricao] = useState<string>();
  const [qtde, onChangeQtde] = useState<string | undefined>();
  const [validade, onChangeValidade] = useState<string | undefined>();
  const [db, setDB ] = useState<SQLiteDatabase>();

  useEffect( () =>{
    const initialize = async () => { 
      const database = await getDatabase();
      setDB(database);
      
      if(id > -1){
        const produto: any = await getProdutoById(id) ;
        console.log(id)
        onChangeDescricao(produto.descricao);
        onChangeQtde(produto.qtde.toString());
        onChangeValidade(produto.validade);
      }

    }
    initialize();
  },[id])

  function clearFields(){
    onChangeDescricao('');
    onChangeQtde('');
    onChangeValidade('');
  }

  function gravaProduto(ident: number, desc:string, qde:number, valid:string){
    let produto: Produto = {id:ident, descricao: desc, qtde: qde, validade: valid}
    try{
      if(produto.id && produto.id > 0){
        updateProduto(produto)
        Alert.alert("Sucesso", "Produto atualizado com sucesso!");

      }else{    
        produto.id =  null;  
        createProduto(produto);
        Alert.alert("Sucesso", "Produto gravado com sucesso!"); 
        clearFields();   
      }
      
     
    } catch (error) {
      Alert.alert("Erro", "Não foi possível realizar a gravação.");
      console.error(error);
    }
  }
  
  return (
      <View >
          <Text>{title}</Text>
          {/*           
          <Text style={styles.textInput}>Codigo:</Text>
          <TextInput  style={styles.input} readOnly></TextInput>
          */}
          <Text style={styles.textInput}>Descrição:</Text>            
          <TextInput  style={styles.input} value={descricao} onChangeText={onChangeDescricao}></TextInput>

          <Text style={styles.textInput}>Quantidade</Text>
          <TextInput   style={styles.input} inputMode="numeric" value={qtde} onChangeText={onChangeQtde}></TextInput>

          <Text style={styles.textInput}>Validade</Text>
          <TextInput  style={styles.input} value={validade} onChangeText={onChangeValidade}></TextInput>

          <View style={styles.buttons}>
            <TouchableOpacity style={styles.button} onPress={() => clearFields()}>
              <Text style={styles.textbutton}>Limpar</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.button}>
              <Text style={styles.textbutton} onPress={() => gravaProduto(id, String(descricao), Number(qtde), String(validade))}>Gravar</Text>
            </TouchableOpacity>
          </View>
      </View>
  );
}


const styles = StyleSheet.create({   
    textInput:{
      paddingTop: 20,
      marginLeft: 12,
      fontSize: 15,      
      textAlignVertical: "bottom",
      textAlign: "left",
      
    },
    input: {
      height: 40,
      marginLeft: 12,
      marginRight: 12,
      backgroundColor:"#E9E9E9",
      borderBottomWidth: 1,
      padding: 10,
      borderRadius: 7
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
      }

  });