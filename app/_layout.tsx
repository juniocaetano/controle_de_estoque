import { createNativeStackNavigator } from "@react-navigation/native-stack";


import CadProduto from "./cadProduto";
import Index from "./index";
import ListaProdutos from "./listaProdutos";
import BaixaEstoque from "./baixaEstoque";
import AlteraProduto from "./alteraProduto";


export default function RootLayout() {
  
  const Stack = createNativeStackNavigator();
  return (    
    
      <Stack.Navigator
        initialRouteName="Index"
        screenOptions={{
          headerStyle: { backgroundColor: 'tomato' },
        }}>
          <Stack.Screen 
            name="Index"
            component={Index} 
            options={{ headerShown: false }} />

          <Stack.Screen 
            name="cadProduto" 
            component={CadProduto}
            options={{ title: 'Cadastro de Produto', headerTitleAlign: "center" }} />

          <Stack.Screen 
            name="alteraProduto" 
            component={AlteraProduto}
            options={{ title: 'Edita/Remove Produto', headerTitleAlign: "center" }} />

          <Stack.Screen 
            name="listaProdutos" 
            component={ListaProdutos}
            options={{ title: 'Estoque', headerTitleAlign: "center" }} />

          <Stack.Screen 
            name="baixaEstoque" 
            component={BaixaEstoque}
            options={{ title: 'Baixa de Estoque', headerTitleAlign: "center" }} />

      </Stack.Navigator>
      
  );
}
