import React from  'react'
import { StyleSheet, TouchableOpacity } from 'react-native';



interface RadioProps {
    id: number;
    funcao: (id: number) => void;
    checked: boolean;
}

export default function RadioButton({ id, funcao, checked }: RadioProps) {
        
    const onClick = () => {
        funcao(id);
    };  
    
    return (
        <>
            <TouchableOpacity 
                style = { checked ? styles.radioSelected :  styles.radioUnSelected} 
                onPress = {onClick}>  
            </TouchableOpacity>
        </>
     );
}

const styles = StyleSheet.create({
    radioUnSelected: {
        height: 24,
        width: 24,
        borderRadius: 12,
        borderWidth: 1.5,
        borderColor: 'gray', 
        backgroundColor: 'silver'       
    },
    radioSelected: {
        height: 24,
        width: 24,
        borderRadius: 12,
        borderWidth: 3,
        backgroundColor: 'purple',
        borderColor: 'silver',        
    }
    
})