import { useEffect } from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity  } from "react-native";





export default function Index({ navigation }: { navigation: any }) {
  return (
      
      <View style={styles.container}>
          <Image source={require('../assets/images/iconPrincipal.jpg')}
                style={styles.logo}/>

          <Text style={styles.title}>Controle de Estoque</Text>

          <TouchableOpacity style={styles.button} onPress={() =>
            navigation.navigate('cadProduto', {id: -1, title: 'Novo'})}>            
            <Text style={styles.textbutton}>Cadastrar Produto</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button} onPress={() =>
            navigation.navigate('alteraProduto')}>
            <Text style={styles.textbutton}>Editar ou remover produto</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button}  onPress={() =>
            navigation.navigate('listaProdutos')}>
            <Text style={styles.textbutton}>Consultar estoque</Text>
          </TouchableOpacity>

          
      </View>
      
  );
}



const styles = StyleSheet.create({

  container: {
    flexGrow: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start',//top
    paddingBottom:"10%"
  },

  logo: {
    width: 160, 
    height: 160,
    marginTop: "10%",
    borderRadius: 10,
    //borderBlockColor: 'black'
    
  },

  title: {
    //flex: 1,
    fontSize: 30,
    fontWeight: 'bold', 
    marginTop: "3%",
    paddingTop: 10,
    paddingBottom: 20
    
  },

  button: {     
    flex: 2,  
    width: "90%",
    maxHeight: 60,
    margin: 10,
    marginTop: 30,   
    paddingBottom: 5,  
    borderRadius: 8,
    backgroundColor: '#662d91',
    alignItems: 'center', 

  },

  textbutton:{
    flex: 1,
    fontSize: 20,
    color: "#FFFF",
    textAlignVertical: "center"
  }
  

});
